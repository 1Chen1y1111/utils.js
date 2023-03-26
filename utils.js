// 获取鼠标点击pageX\Y
export function pagePos(e) {
  var sLeft = getScrollOffset().left,  // 滚动条距离
    sTop = getScrollOffset().top,
    cLeft = document.documentElement.clientLeft || 0, // 文档偏移
    cTop = document.documentElement.clientTop || 0;
  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop,
  }
}
// 获取滚动条距离
export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

// 浏览器可视区域尺寸
export function getViewsSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (window.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

// 元素内容尺寸
export function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      heigh: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

/**
 * 当前元素相对于父级定位节点的边界偏移的像素值
 * @param {HTMLElement} el 当前元素节点
 * @returns 
 */
export function getEleDocPosition(el) {
  var parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop
  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return {
    left: offsetLeft,
    top: offsetTop
  }
}

/**
 * 获取样式属性
 * @param {HTMLElement} ele   当前元素节点
 * @param {*}           props 所要获取的计算样式
 * @returns 
 */
export function getStyles(ele, props) {
  if (window.getComputedStyle) {
    if (props) {
      return parseInt(window.getComputedStyle(ele, null)[props])
    } else {
      return window.getComputedStyle(ele, null)
    }
  } else {
    if (props) {
      return parseInt(ele.currentStyle[props])
    } else {
      return ele.currentStyle
    }
  }
}

/**
 * 绑定事件处理函数
 * @param {HTMLElement} el    当前元素节点
 * @param {String}      type  所要绑定的事件名
 * @param {Function}    fn    事件回调函数
 */
export function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el)
    })
  } else {
    el['on' + type] = fn
  }
}

/**
 * 绑定事件处理函数
 * @param {HTMLElement} el    当前元素节点
 * @param {String}      type  所要绑定的事件名
 * @param {Function}    fn    事件回调函数
 */
export function removeEvent(el, type, fn) {
  if (el.addEventListener) {
    el.removeEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.detachEvent('on' + type, function () {
      fn.call(el)
    })
  } else {
    el['on' + type] = null
  }
}

/**
 * 获取元素节点
 * @param {HTMLElement} node 当前元素节点
 * @returns 
 */
export function eleChildren(node) {
  var arr = [],
    children = node.childNodes
  for (var i = 0; i < children.length; i++) {
    var childItem = children[i]
    if (childItem.nodeType === 1) {
      arr.push(childItem)
    }
  }
  return arr
}

/**
 * 查找子元素
 * @param {HTMLElement} node 所要查找的元素节点
 * @returns 
 */
export function elemChildren(node) {
  var temp = {
    'length': 0,
    'splice': Array.prototype.splice
  },
    len = node.childNodes.length;
  for (var i = 0; i < len; i++) {
    var childItem = node.childNodes[i];
    if (childItem.nodeType === 1) {
      temp[temp.length] = childItem;
      temp['length']++
    }
  }
  return temp
}

/**
 * 寻找兄弟元素节点（考虑兼容性）
 * @param {HTMLElement} node 
 * @param {Number} n >0 之后  <0 之前 =0 返回自身
 * @returns 
 */
export function elemSibling(node, n) {
  while (n) {
    if (n > 0) {
      node = node.nextSibling
      while (node && node.nodeType !== 1) {
        node = node.nextSibling
      }
      n--
      // for (node = node.nextSibling; node && node.nodeType !== 1; node = node.nextSibling);
    } else if (n < 0) {
      node = node.previousSibling
      while (node && node.nodeType !== 1) {
        node = node.previousSibling
      }
      n++
    }
  }
  return node
}

/**
 * 获取所有子节点
 * @param {HTMLElement} node 
 */
export function getFullChildren(node) {
  var children = node.childNodes,
    len = children.length,
    item;
  if (node && node.nodeType === 1) {
    console.log(node);
  }
  for (var i = 0; i < len; i++) {
    item = children[i]
    if (item.nodeType === 1) {
      getFullChildren(item)
    }
  }
}

/**
 * 查找父级元素
 * @param {HTMLElement} node 当前元素节点
 * @param {Number}      n    第几个父级元素
 */
export function elemParent(node, n) {
  var type = typeof (n);
  if (type === 'undefined') {
    return node.parentNode
  } else if (n <= 0 || type !== 'number') {
    return undefined
  }

  while (n) {
    node = node.parentNode
    n--
  }
  return node
}

/**
 * 取消冒泡行为
 * @param {Event} e 事件对象
 */
export function cancelBubble(e) {
  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}

/**
 * 阻止默认行为
 * @param {Event} e 事件对象
 */
export function preventDefaultEvent(e) {
  var e = e || window.event;
  if (e.preventDefaultEvent) {
    e.preventDefaultEvent()
  } else {
    event.returnValue = false
  }
}

/**
 * 拖拽函数
 * @param {HTMLElement} elem 当前元素节点 
 */
export function elemDrag(elem) {
  var x,
    y;

  addEvent(elem, 'mousedown', function (e) {
    var e = e || window.event;
    x = pagePos(e).X - getStyles(elem, 'left')
    y = pagePos(e).Y - getStyles(elem, 'top')

    addEvent(document, 'mousemove', mouseMove)
    addEvent(document, 'mouseup', mouseUp)
    cancelBubble(e)
    preventDefaultEvent(e)
  })

  function mouseMove(e) {
    var e = e || window.event;
    elem.style.top = pagePos(e).Y - y + 'px'
    elem.style.left = pagePos(e).X - x + 'px'
  }

  function mouseUp(e) {
    var e = e || window.event;
    removeEvent(document, 'mousemove', mouseMove)
    removeEvent(document, 'mouseup', mouseUp)
  }
}

/**
 * 判断点是否在一个三角形内
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export function vec(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

export function vecProduct(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}

export function sameSymbols(a, b) {
  return (a ^ b) >= 0
}

export function pointInTriangle(p, a, b, c) {
  var PA = vec(p, a),
    PB = vec(p, b),
    PC = vec(p, c),
    R1 = vecProduct(PA, PB),
    R2 = vecProduct(PB, PC),
    R3 = vecProduct(PC, PA);
  return sameSymbols(R1, R2) && sameSymbols(R2, R3)
}

/**
 * typeof
 * @param {*} val 
 * @returns 
 */
export function myTypeOf(val) {
  var type = typeof val;
  var resSet = {
    "[Object Object]": 'object',
    "[Object Array]": 'array',
    "[Object Number]": 'obj_number',
    "[Object String]": 'obj_string',
    "[Object Boolean]": 'obj_boolean',
    "[Object Date]": 'date',
    "[Object RegExp]": 'regexp'
  }

  if (val === null) {
    return null
  } else if (type === 'object') {
    var res = Object.prototype.toString.call(val);
    return resSet[res]
  } else {
    return type
  }
}

/**
 * 文档解析完毕
 * @param {Function} fn 
 * @returns 
 */
export function domReady(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', arguments.callee, false)
    }, false)
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (this.readyState === 'complete') {
        document.attachEvent('onreadystatechange', arguments.callee);
        fn()
      }
    })
  }

  // 容错机制 IE6\7
  if (document.documentElement.doScroll && typeof (window.frameElement) === 'undefined') {
    try {
      document.documentElement.doScroll('left')
    } catch (e) {
      return setTimeout(arguments.callee, 20)
    }
    fn()
  }
}

/**
 * 获取浏览器基础信息
 * @returns Object 浏览器信息
 */
export function checkBrowser() {
  var nVer = navigator.appVersion,
    nAgt = navigator.userAgent,
    browser = navigator.appName,
    version = '' + parseFloat(navigator.appVersion),
    majorVersion,
    nameOffset,
    verOffset,
    ix,
    network = 'unknown';

  // Opera浏览器（老版本）
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Opera浏览器（新版本）
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 4);
  }
  // IE浏览器
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(verOffset + 5);
  }
  // Chrome浏览器
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
    version = nAgt.substring(verOffset + 7);
  }
  // Safari浏览器
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Firefox浏览器
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
    version = nAgt.substring(verOffset + 8);
  }
  // IE11+浏览器
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
  // 微信浏览器
  else if (nAgt.indexOf('NetType/') != -1) {
    browser = 'WeiXin';
    if (nAgt.indexOf('NetType/WIFI') != -1) {
      network = 'WIFI';
    } else if (nAgt.indexOf('NetType/2G') != -1) {
      network = '2G';
    } else if (nAgt.indexOf('NetType/3G+') != -1) {
      network = '3G+';
    }
    verOffset = nAgt.lastIndexOf('/')
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }
  //其他浏览器
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  //版本字符串整理
  if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);
  majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  //移动版本
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

  //系统探测
  var os = '';
  var clientStrings = [
    { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
    { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
    { s: 'Windows Vista', r: /Windows NT 6.0/ },
    { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
    { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
    { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
    { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
    { s: 'Windows 98', r: /(Windows 98|Win98)/ },
    { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
    { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: 'Windows CE', r: /Windows CE/ },
    { s: 'Windows 3.11', r: /Win16/ },
    { s: 'Android', r: /Android/ },
    { s: 'Open BSD', r: /OpenBSD/ },
    { s: 'Sun OS', r: /SunOS/ },
    { s: 'Linux', r: /(Linux|X11)/ },
    { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
    { s: 'Mac OS X', r: /Mac OS X/ },
    { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: 'QNX', r: /QNX/ },
    { s: 'UNIX', r: /UNIX/ },
    { s: 'BeOS', r: /BeOS/ },
    { s: 'OS/2', r: /OS\/2/ },
    { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
  ];
  for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }
  var osVersion = '';
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }
  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
      break;
    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
      break;
    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  //返回数据集合
  return {
    //操作系统
    os: os,
    //操作系统版本
    osVersion: osVersion ? osVersion : 'unknown',
    //是否移动端访问
    mobile: mobile,
    //浏览器类型
    browser: browser,
    //浏览器版本
    browserVersion: version,
    //浏览器major版本
    browserMajorVersion: majorVersion
  };
}

/**
 * 获取浏览器网络情况
 * @returns 
 */
export function networkType() {
  var type = navigator.connection.effectiveType;
  switch (type) {
    case 'slow-2g':
      return '2G-'
      break;
    case '2g':
      return '2G'
      break;
    case '3g':
      return '3G'
      break;
    case '4g':
      return '4G'
      break;
    default:
      return 'Unknown network'
  }
}