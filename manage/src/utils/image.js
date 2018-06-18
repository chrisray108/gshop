var qiniu = require('qiniu-js')

/* 返回 PC 缩略图   300 * 300 */
/* 返回 桌面缩略图   75 * 75 */
export function thumbImageUrl(url) {  

  if (!url.length) {
    return '';
  }

  var mode = ''
  var w    = ''
  var h    = ''
  var format = ''
  var q    = ''

  if( IsPC )
  {
       mode = '2'
          w = '300'
          h = '300'
     format = 'png'
          q = '100'
  }
  else
  {
          mode = '2'
          w = '75'
          h = '75'
     format = 'png'
          q = '80'
  }

  return url + '?imageView2/' + mode + '/w/' + w + '/h/' + h + '/format/' + format + '/q/' + q
}


function IsPC(){    
	var userAgentInfo = navigator.userAgent;  
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
	var flag = true;    
	for (var v = 0; v < Agents.length; v++) {    
	    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
	}    
	return flag;    
}  



