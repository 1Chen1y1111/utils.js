// 获取页面位置
export function pagePos(e) {
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    cLeft = document.documentElement.clientLeft || 0,
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
    top: offsetTopgit
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
      return window.getComputedStyle(ele, null)[props]
    } else {
      return window.getComputedStyle(ele, null)
    }
  } else {
    if (props) {
      return ele.currentStyle[props]
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
 * @param {Event} e 事件
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
 * @param {Event} e 事件
 */
export function preventDefaultEvent(e) {
  var e = e || window.event;
  if (e.preventDefaultEvent) {
    e.preventDefaultEvent()
  } else {
    event.returnValue = false
  }
}