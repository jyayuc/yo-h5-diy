/* @Print.js
 * DH (http://denghao.me)
 * 2017-7-14
 * https://github.com/denghao123/Print.js/blob/master/files/Print.js
 */
// (function (window, document) {

var Print = function (id, options) {
  if (!(this instanceof Print)) return new Print(id, options)

  this.options = this.extend({
    noPrint: '.no-print',
    remove: 'colgroup',
    title: '',
    onStart: function () { },
    onEnd: function () { }
  }, options)

  if ((typeof id) === 'string') {
    this.dom = document.querySelector(id)
  } else {
    console.error('请输入正确的id或者类名')
    return
  }
  this.id = id

  this.init()
}
Print.prototype = {
  init: function () {
    var content = document.body.innerHTML
    this.writeIframe(document.head.innerHTML, content)
  },
  extend: function (obj, obj2) {
    for (var k in obj2) {
      obj[k] = obj2[k]
    }
    return obj
  },

  getStyle: function () {
    var str = ''
    //   styles = doc.querySelectorAll('style,link');
    // for (var i = 0; i < styles.length; i++) {
    //   str += styles[i].outerHTML;
    // }
    str += '<style>' + (this.options.noPrint ? this.options.noPrint : '.no-print') + '{display:none;}</style>'

    return str
  },

  getHtml: function (doc) {
    var inputs = doc.querySelectorAll('input')
    var textareas = doc.querySelectorAll('textarea')
    var selects = doc.querySelectorAll('select')

    for (var k in inputs) {
      if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
        if (inputs[k].checked === true) {
          inputs[k].setAttribute('checked', 'checked')
        } else {
          inputs[k].removeAttribute('checked')
        }
      } else if (inputs[k].type === 'text') {
        inputs[k].setAttribute('value', inputs[k].value)
      }
    }

    for (var k2 in textareas) {
      if (textareas[k2].type === 'textarea') {
        textareas[k2].innerHTML = textareas[k2].value
      }
    }

    for (var k3 in selects) {
      if (selects[k3].type === 'select-one') {
        var child = selects[k3].children
        for (var i in child) {
          if (child[i].tagName === 'OPTION') {
            if (child[i].selected === true) {
              child[i].setAttribute('selected', 'selected')
            } else {
              child[i].removeAttribute('selected')
            }
          }
        }
      }
    }
  },

  writeIframe: function (header, content) {
    var _this = this
    var w; var doc; var iframe = document.createElement('iframe')
    var f = document.body.appendChild(iframe)
    iframe.id = 'printIframe'
    iframe.style.cssText = 'position:absolute;width:0;height:0;top:-10px;left:-10px;'
    // iframe.style.cssText = "position:absolute;top:-10px;left:-10px;width:100%;height:100%;z-index:99999;";

    w = f.contentWindow || f.contentDocument
    doc = f.contentDocument || f.contentWindow.document
    // doc.open();
    // doc.write(content);
    // doc.close();
    header += this.getStyle()
    doc.body.innerHTML = content
    doc.head.innerHTML = header
    this.getHtml(doc)
    doc.title = this.options.title
    const printObj = doc.querySelector(_this.id)
    const removes = (_this.options.remove || '').split(',')
    if (removes && removes.length > 0) {
      removes.forEach(item => {
        const objs = doc.querySelectorAll(item)
        const len = objs ? objs.length : 0
        for (let i = 0; i < len; i++) {
          // eslint-disable-next-line no-unused-expressions
          objs[i]?.remove()
        }
      })
    }
    printObj.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;'
    // this.getStyle(doc);
    this.toPrint(w, () => {
      document.body.removeChild(iframe)
      const { options = {} } = _this
      const { onEnd = '' } = options
      onEnd && onEnd()
    })
  },

  toPrint: function (w, cb) {
    var _this = this
    _this.setTimeoutId = setTimeout(() => {
      clearTimeout(_this.setTimeoutId)
      w.print()
      w.close()
      cb && cb()
    }, 500)
    // w.onload = function () {
    //   try {
    //     setTimeout(function () {
    //       w.focus();
    //       typeof _this.options.onStart === 'function' && _this.options.onStart();
    //       if (!w.document.execCommand('print', false, null)) {
    //         w.print();
    //       }
    //       typeof _this.options.onEnd === 'function' && _this.options.onEnd();
    //       w.close();
    //       cb && cb();
    //     });
    //   } catch (err) {
    //     console.log('err', err);
    //   }
    // }
  }
}
//   window.Print = Print;
// }(window, document));
export default Print
