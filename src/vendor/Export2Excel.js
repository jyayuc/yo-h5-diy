/* eslint-disable */
// require('script-loader!file-saver');
// require('script-loader!vendor/Blob');
import "@/vendor/Blob"
import "file-saver"
// import XLSX from 'xlsx'
var DENSE = null;

function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({s: {r: R, c: outRow.length}, e: {r: R + rowspan - 1, c: outRow.length + colspan - 1}});
            }
            ;

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
export function encode_col(col) { if(col < 0) throw new Error("invalid column " + col); var s=""; for(++col; col; col=Math.floor((col-1)/26)) s = String.fromCharCode(((col-1)%26) + 65) + s; return s; }

function encode_row(row) { return "" + (row + 1); }

function encode_cell(cell) { return encode_col(cell.c) + encode_row(cell.r); }

function encode_range(cs,ce) {
	if(typeof ce === 'undefined' || typeof ce === 'number') {
return encode_range(cs.s, cs.e);
	}
if(typeof cs !== 'string') cs = encode_cell((cs));
	if(typeof ce !== 'string') ce = encode_cell((ce));
return cs == ce ? cs : cs + ":" + ce;
}
function sheet_add_aoa(_ws, data, opts) {
	var o = opts || {};
	var dense = _ws ? Array.isArray(_ws) : o.dense;
	if(DENSE != null && dense == null) dense = DENSE;
	var ws = _ws || (dense ? ([]) : ({}));
	var _R = 0, _C = 0;
	if(ws && o.origin != null) {
		if(typeof o.origin == 'number') _R = o.origin;
		else {
			var _origin = typeof o.origin == "string" ? decode_cell(o.origin) : o.origin;
			_R = _origin.r; _C = _origin.c;
		}
	}
	var range = ({s: {c:10000000, r:10000000}, e: {c:0, r:0}});
	if(ws['!ref']) {
		var _range = safe_decode_range(ws['!ref']);
		range.s.c = _range.s.c;
		range.s.r = _range.s.r;
		range.e.c = Math.max(range.e.c, _range.e.c);
		range.e.r = Math.max(range.e.r, _range.e.r);
		if(_R == -1) range.e.r = _R = _range.e.r + 1;
	}
	for(var R = 0; R != data.length; ++R) {
		if(!data[R]) continue;
		if(!Array.isArray(data[R])) throw new Error("aoa_to_sheet expects an array of arrays");
		for(var C = 0; C != data[R].length; ++C) {
			if(typeof data[R][C] === 'undefined') continue;
			var cell = ({v: data[R][C] });
			var __R = _R + R, __C = _C + C;
			if(range.s.r > __R) range.s.r = __R;
			if(range.s.c > __C) range.s.c = __C;
			if(range.e.r < __R) range.e.r = __R;
			if(range.e.c < __C) range.e.c = __C;
			if(data[R][C] && typeof data[R][C] === 'object' && !Array.isArray(data[R][C]) && !(data[R][C] instanceof Date)) cell = data[R][C];
			else {
				if(Array.isArray(cell.v)) { cell.f = data[R][C][1]; cell.v = cell.v[0]; }
				if(cell.v === null) { if(cell.f) cell.t = 'n'; else if(!o.sheetStubs) continue; else cell.t = 'z'; }
				else if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.z = o.dateNF || SSF._table[14];
					if(o.cellDates) { cell.t = 'd'; cell.w = SSF.format(cell.z, datenum(cell.v)); }
					else { cell.t = 'n'; cell.v = datenum(cell.v); cell.w = SSF.format(cell.z, cell.v); }
				}
				else cell.t = 's';
			}
			if(dense) {
				if(!ws[__R]) ws[__R] = [];
				if(ws[__R][__C] && ws[__R][__C].z) cell.z = ws[__R][__C].z;
				ws[__R][__C] = cell;
			} else {
				var cell_ref = encode_cell(({c:__C,r:__R}));
				if(ws[cell_ref] && ws[cell_ref].z) cell.z = ws[cell_ref].z;
				ws[cell_ref] = cell;
			}
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = encode_range(range);
	return ws;
}
export function aoa_to_sheet(data, opts) { return sheet_add_aoa(null, data, opts); }

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {v: data[R][C]};
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";
    console.log(data);

    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});

    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "test.xlsx")
}

export function export_json_to_excel(th, jsonData, defaultTitle) {

    /* original data */

    var data = jsonData;
    data.unshift(th);
    var ws_name = "SheetJS";

    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);


    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
    var title = defaultTitle || '列表'
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), title + ".xlsx")
}
