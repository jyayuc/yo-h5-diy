// import tmCommon from '@/common/common';
export const getLang = function (lang) {
  lang = lang.toLowerCase()
  // tmCommon.log("-----"+lang);
  if (!lang) {
    lang = 'zh'
  }
  const langObj = require('./' + lang + '.js')
  // tmCommon.log(langObj,"---------");
  return langObj.default
}
