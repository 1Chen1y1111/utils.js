// 查看滚动条距离
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

// 当前元素相对于父级定位节点的边界偏移的像素值
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

// 查看计算样式
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

// 绑定事件处理函数
export function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEvenetListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEventt('on' + type, function () {
      fn.call(el)
    })
  } else {
    el['on' + type] = fn
  }
}

// 获取元素节点
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

// 查找子元素
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