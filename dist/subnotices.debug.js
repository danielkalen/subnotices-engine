(function (require, global) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
var subnotify;

var applyStyles, getCurrentTranslation, getSubnoticeContainer, getTranslateStyleObject, regExCommaList, regExMatrixValues, removeStyles;

applyStyles = function(el, styleObject, additional) {
  var key, returnedValue, target, value;
  if (additional) {
    styleObject = $.extend({}, styleObject, additional);
  }
  target = el[0] || el;
  for (key in styleObject) {
    value = styleObject[key];
    switch (typeof value) {
      case 'object':
        this.applyStyles(target, value);
        break;
      case 'function':
        returnedValue = value(this);
        if (typeof returnedValue === 'object') {
          this.applyStyles(target, returnedValue);
        } else {
          target.style[key] = returnedValue;
        }
        break;
      default:
        target.style[key] = value;
    }
  }
  return el;
};

removeStyles = function(el, styleObject, stylesToReinstate) {
  var stylesToRemove;
  stylesToRemove = new function() {
    var key;
    for (key in styleObject) {
      this[key] = '';
    }
    return this;
  };
  return this.applyStyles(el, stylesToRemove, stylesToReinstate);
};

getSubnoticeContainer = function(direction) {
  var container, existingContainer;
  existingContainer = $(".Subnotices.direction---" + direction, Subnotice.context);
  if (existingContainer.length) {
    return existingContainer;
  } else {
    container = $(markup.container(direction)).appendTo(Subnotice.context);
    applyStyles(container, Subnotice.style[direction].container);
    return container;
  }
};

getTranslateStyleObject = function(value) {
  return {
    webkitTransform: "translateY(" + value + ")",
    mozTransform: "translateY(" + value + ")",
    msTransform: "translateY(" + value + ")",
    oTransform: "translateY(" + value + ")",
    transform: "translateY(" + value + ")"
  };
};

regExMatrixValues = /matrix3?d?\((.+)\)/;

regExCommaList = /,\s*/;

getCurrentTranslation = function(subnotice) {
  var computedStyle, matrix, translateY, values;
  computedStyle = window.getComputedStyle(subnotice.els.subnotice[0]);
  matrix = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
  if ((matrix != null ? matrix.length : void 0) && matrix !== 'none') {
    values = matrix.match(regExMatrixValues)[1];
    translateY = values.split(regExCommaList).slice(-1)[0];
  } else {
    translateY = 0;
  }
  return parseFloat(translateY);
};

;

var style, styleOpenState;

style = {};

styleOpenState = {};

style.bottom = {
  container: {
    position: 'fixed',
    zIndex: '10000',
    bottom: '0',
    left: '0',
    width: '100%'
  },
  subnotice: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '13px 45px 10px',
    boxSizing: 'border-box',
    transform: getTranslateStyleObject('100%'),
    backgroundColor: function(notice) {
      return Subnotice.colors[Subnotice.colorMapping[notice.type]] || 'grey';
    },
    color: function(notice) {
      if (Subnotice.requiresDarkText[notice.type]) {
        return Subnotice.colors.dark;
      } else {
        return Subnotice.colors.light;
      }
    },
    transition: function(notice) {
      return "transform " + (notice.animationSpeed / 1000) + "s";
    }
  },
  text: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '14px',
    width: '20px',
    height: '20px',
    transform: getTranslateStyleObject('-50%'),
    borderRadius: '50%',
    fontSize: '11px',
    lineHeight: '20px',
    textAlign: 'center',
    backgroundColor: function(notice) {
      if (Subnotice.requiresDarkText[notice.type]) {
        return Subnotice.colors.dark;
      } else {
        return Subnotice.colors.light;
      }
    },
    color: function(notice) {
      return Subnotice.colors[Subnotice.colorMapping[notice.type]] || 'grey';
    }
  },
  close: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: getTranslateStyleObject('-50%'),
    fontSize: '15px',
    lineHeight: 1,
    cursor: 'pointer'
  }
};

style.top = {
  container: $.extend({}, style.bottom.container, {
    top: 0,
    bottom: 'auto'
  }),
  subnotice: $.extend({}, style.bottom.subnotice, {
    transform: getTranslateStyleObject('0%')
  }),
  text: $.extend({}, style.bottom.text),
  icon: $.extend({}, style.bottom.icon),
  close: $.extend({}, style.bottom.close)
};

styleOpenState.bottom = {
  subnotice: {
    marginBottom: function(notice) {
      return notice.placementOffset + "px";
    },
    transform: getTranslateStyleObject('0%')
  }
};

styleOpenState.top = {
  subnotice: {
    marginBottom: function(notice) {
      return "-" + notice.placementOffset + "px";
    },
    transform: getTranslateStyleObject('100%')
  }
};

;

var markup;

markup = {
  container: function(direction) {
    return "<div class='Subnotices direction---" + direction + "'></div>";
  },
  subnotice: function(type, extraClassnames) {
    if (extraClassnames == null) {
      extraClassnames = '';
    }
    return "<div class='Subnotice __" + type + " " + extraClassnames + "'></div>";
  },
  icon: function(icon) {
    if (icon == null) {
      icon = '';
    }
    return "<div class='Subnotice-icon'><div>" + icon + "</div></div>";
  },
  text: function(text) {
    return "<div class='Subnotice-text'><div>" + text + "</div></div>";
  },
  close: function(icon) {
    if (icon == null) {
      icon = '';
    }
    return "<div class='Subnotice-close'><div>" + icon + "</div></div>";
  }
};

;

var Subnotice;

Subnotice = function(arg) {
  var base, ref;
  this.type = arg.type, this.text = arg.text, this.time = arg.time, this.icon = (ref = arg.icon) != null ? ref : Subnotice.icons[this.type], this.extraClassnames = arg.extraClassnames;
  this.animationSpeed = Subnotice.animationSpeed;
  this.direction = Subnotice.direction;
  this.els = {};
  this.els.container = getSubnoticeContainer(this.direction);
  this.els.subnotice = $(markup.subnotice(this.type, this.extraClassnames)).data('Subnotice', this);
  this.els.icon = $(markup.icon(this.icon)).appendTo(this.els.subnotice);
  this.els.text = $(markup.text(this.text)).appendTo(this.els.subnotice);
  this.els.close = $(markup.close(Subnotice.icons.close)).appendTo(this.els.subnotice);
  this.isActive = true;
  this.noticesList = (base = this.els.container[0]).noticesList != null ? base.noticesList : base.noticesList = [];
  this.applyStyles = applyStyles.bind(this);
  this.removeStyles = removeStyles.bind(this);
  this.appendToDOM();
  this.attachEvents();
  Subnotice.instances.push(this);
  return this;
};

Subnotice.prototype.appendToDOM = function() {
  this.applyStyles(this.els.container, Subnotice.style[this.direction].container);
  this.applyStyles(this.els.subnotice, Subnotice.style[this.direction].subnotice);
  this.applyStyles(this.els.icon, Subnotice.style[this.direction].icon);
  this.applyStyles(this.els.text, Subnotice.style[this.direction].text);
  this.applyStyles(this.els.close, Subnotice.style[this.direction].close);
  return this.els.subnotice.appendTo(this.els.container);
};

Subnotice.prototype.reveal = function() {
  var otherNoticesHeights;
  otherNoticesHeights = this.noticesList.slice().map(function(notice) {
    if (notice.beingDestroyed) {
      return 0;
    } else {
      return notice.els.subnotice[0].offsetHeight;
    }
  });
  this.placementOffset = !otherNoticesHeights.length ? 0 : otherNoticesHeights.reduce(function(a, b) {
    if (a == null) {
      a = 0;
    }
    if (b == null) {
      b = 0;
    }
    return a + b;
  });
  this.noticesList.push(this);
  this.applyStyles(this.els.subnotice, Subnotice.styleOpenState[this.direction].subnotice, {
    zIndex: 100 - this.noticesList.length
  });
  if (this.time !== false) {
    return setTimeout(((function(_this) {
      return function() {
        return _this.destroy();
      };
    })(this)), this.time);
  }
};

Subnotice.prototype.attachEvents = function() {
  return this.els.close.on(Subnotice.clickEvent, (function(_this) {
    return function() {
      return _this.destroy();
    };
  })(this));
};

Subnotice.prototype.destroy = function(animationSpeed) {
  var noticeHeight, noticesInFront;
  if (animationSpeed == null) {
    animationSpeed = this.animationSpeed;
  }
  if (this.isActive) {
    this.beingDestroyed = true;
    noticesInFront = this.noticesList.slice(this.noticesList.indexOf(this));
    noticeHeight = this.els.subnotice[0].offsetHeight;
    if (this.direction === 'top') {
      noticeHeight *= -1;
    }
    noticesInFront.concat(this).forEach((function(_this) {
      return function(subnotice) {
        var newTranslate;
        newTranslate = getCurrentTranslation(subnotice) + noticeHeight;
        return subnotice.applyStyles(subnotice.els.subnotice, getTranslateStyleObject(newTranslate + "px"));
      };
    })(this));
    if (Subnotice.instances.includes(this)) {
      Subnotice.instances.splice(Subnotice.instances.indexOf(this), 1);
    }
    return setTimeout((function(_this) {
      return function() {
        if (!_this.isActive) {
          return;
        }
        _this.isActive = _this.beingDestroyed = false;
        _this.noticesList.splice(_this.noticesList.indexOf(_this), 1);
        return _this.els.subnotice.remove();
      };
    })(this), animationSpeed + 20);
  }
};

;

var BrowserNotice;

BrowserNotice = function(arg) {
  this.title = arg.title, this.text = arg.text;
  if (typeof Notification === "undefined" || Notification === null) {
    return this;
  }
  if (Notification.permission === 'granted') {
    this.reveal();
  } else {
    Notification.requestPermission().then((function(_this) {
      return function(state) {
        if (state === 'granted') {
          return _this.reveal();
        }
      };
    })(this));
  }
  return this;
};

BrowserNotice.prototype.reveal = function() {
  return this.notice = new Notification(this.title, {
    'body': this.text
  });
};

;

subnotify = function(arg) {
  var browserNotice, delay, extraClassnames, ref, ref1, ref2, ref3, ref4, subnotice, text, time, title, type;
  type = (ref = arg.type) != null ? ref : 'info', title = (ref1 = arg.title) != null ? ref1 : '', text = (ref2 = arg.text) != null ? ref2 : '', time = (ref3 = arg.time) != null ? ref3 : Subnotice.time, delay = (ref4 = arg.delay) != null ? ref4 : Subnotice.delay, extraClassnames = arg.extraClassnames, browserNotice = arg.browserNotice;
  subnotice = new Subnotice({
    type: type,
    text: text,
    time: time,
    extraClassnames: extraClassnames
  });
  if (browserNotice) {
    new BrowserNotice({
      title: title,
      text: text
    });
  }
  setTimeout(function() {
    return subnotice.reveal();
  }, delay);
  return subnotice;
};

Subnotice.markup = markup;

Subnotice.style = style;

Subnotice.styleOpenState = styleOpenState;

Subnotice.instances = [];

Subnotice.direction = 'bottom';

Subnotice.clickEvent = 'click';

Subnotice.animationSpeed = 300;

Subnotice.time = 10000;

Subnotice.delay = 250;

Subnotice.context = document.body;

Subnotice.requiresDarkText = {
  'info': true
};

Subnotice.colorMapping = {
  'info': 'grey',
  'success': 'green',
  'error': 'red',
  'warning': 'yellow'
};

Subnotice.colors = {
  'light': '#ffffff',
  'dark': '#313131',
  'green': '#72c322',
  'red': '#95190c',
  'yellow': '#e3b505',
  'grey': '#a2a3a5'
};

Subnotice.icons = {
  'info': '',
  'success': '',
  'error': '',
  'warning': '',
  'close': ''
};

module.exports = subnotify;

module.exports.version = "3.1.1";

module.exports.Subnotice = Subnotice;

module.exports.config = function(settings) {
  var extend;
  extend = require(7);
  extend.deep(Subnotice, settings);
  return subnotify;
};

;
return module.exports;
},
7: function (require, module, exports) {
var exports, extend, modifiers, newBuilder, normalizeKeys;

extend = require(8);

normalizeKeys = function(keys) {
  var i, key, len, output;
  if (keys) {
    output = {};
    if (typeof keys !== 'object') {
      output[keys] = true;
    } else {
      if (!Array.isArray(keys)) {
        keys = Object.keys(keys);
      }
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        output[key] = true;
      }
    }
    return output;
  }
};

newBuilder = function(isBase) {
  var builder;
  builder = function(target) {
    var theTarget;
    var $_len = arguments.length, $_i = -1, sources = new Array($_len); while (++$_i < $_len) sources[$_i] = arguments[$_i];
    if (builder.options.target) {
      theTarget = builder.options.target;
    } else {
      theTarget = target;
      sources.shift();
    }
    return extend(builder.options, theTarget, sources);
  };
  if (isBase) {
    builder.isBase = true;
  }
  builder.options = {};
  Object.defineProperties(builder, modifiers);
  return builder;
};

modifiers = {
  'deep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.deep = true;
      return _;
    }
  },
  'own': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.own = true;
      return _;
    }
  },
  'allowNull': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.allowNull = true;
      return _;
    }
  },
  'nullDeletes': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.nullDeletes = true;
      return _;
    }
  },
  'concat': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.concat = true;
      return _;
    }
  },
  'clone': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.target = {};
      return _;
    }
  },
  'notDeep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notDeep = normalizeKeys(keys);
        return _;
      };
    }
  },
  'deepOnly': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.deepOnly = normalizeKeys(keys);
        return _;
      };
    }
  },
  'keys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.keys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'notKeys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notKeys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'transform': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(transform) {
        if (typeof transform === 'function') {
          _.options.globalTransform = transform;
        } else if (transform && typeof transform === 'object') {
          _.options.transforms = transform;
        }
        return _;
      };
    }
  },
  'filter': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(filter) {
        if (typeof filter === 'function') {
          _.options.globalFilter = filter;
        } else if (filter && typeof filter === 'object') {
          _.options.filters = filter;
        }
        return _;
      };
    }
  }
};

module.exports = exports = newBuilder(true);

exports.version = "1.7.3";

;
return module.exports;
},
8: function (require, module, exports) {
var extend, isArray, isObject, shouldDeepExtend;

isArray = function(target) {
  return Array.isArray(target);
};

isObject = function(target) {
  return target && Object.prototype.toString.call(target) === '[object Object]' || isArray(target);
};

shouldDeepExtend = function(options, target, parentKey) {
  if (options.deep) {
    if (options.notDeep) {
      return !options.notDeep[target];
    } else {
      return true;
    }
  } else if (options.deepOnly) {
    return options.deepOnly[target] || parentKey && shouldDeepExtend(options, parentKey);
  }
};

module.exports = extend = function(options, target, sources, parentKey) {
  var i, key, len, source, sourceValue, subTarget, targetValue;
  if (!target || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  for (i = 0, len = sources.length; i < len; i++) {
    source = sources[i];
    if (source != null) {
      for (key in source) {
        sourceValue = source[key];
        targetValue = target[key];
        if (sourceValue === target || sourceValue === void 0 || (sourceValue === null && !options.allowNull && !options.nullDeletes) || (options.keys && !options.keys[key]) || (options.notKeys && options.notKeys[key]) || (options.own && !source.hasOwnProperty(key)) || (options.globalFilter && !options.globalFilter(sourceValue, key, source)) || (options.filters && options.filters[key] && !options.filters[key](sourceValue, key, source))) {
          continue;
        }
        if (sourceValue === null && options.nullDeletes) {
          delete target[key];
          continue;
        }
        if (options.globalTransform) {
          sourceValue = options.globalTransform(sourceValue, key, source);
        }
        if (options.transforms && options.transforms[key]) {
          sourceValue = options.transforms[key](sourceValue, key, source);
        }
        switch (false) {
          case !(options.concat && isArray(sourceValue) && isArray(targetValue)):
            target[key] = targetValue.concat(sourceValue);
            break;
          case !(shouldDeepExtend(options, key, parentKey) && isObject(sourceValue)):
            subTarget = isObject(targetValue) ? targetValue : isArray(sourceValue) ? [] : {};
            target[key] = extend(options, subTarget, [sourceValue], key);
            break;
          default:
            target[key] = sourceValue;
        }
      }
    }
  }
  return target;
};

;
return module.exports;
}
}, this);
if (typeof define === 'function' && define.umd) {
define(function () {
return require(0);
});
} else if (typeof module === 'object' && module.exports) {
module.exports = require(0);
} else {
return this['notify'] = require(0);
}
}).call(this, null, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : this);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9wYXJ0cy9oZWxwZXJzLmNvZmZlZSIsIl9wYXJ0cy9zdHlsZXMuY29mZmVlIiwiaW5kZXguY29mZmVlIiwiX3BhcnRzL21hcmt1cC5jb2ZmZWUiLCJfcGFydHMvU3Vibm90aWNlLmNvZmZlZSIsIl9wYXJ0cy9Ccm93c2VyTm90aWNlLmNvZmZlZSIsIi4uL3BhY2thZ2UuanNvbiIsIi4uL25vZGVfbW9kdWxlcy9zbWFydC1leHRlbmQvc3JjL2luZGV4LmNvZmZlZSIsIi4uL25vZGVfbW9kdWxlcy9zbWFydC1leHRlbmQvbm9kZV9tb2R1bGVzL3NtYXJ0LWV4dGVuZC9wYWNrYWdlLmpzb24iLCIuLi9ub2RlX21vZHVsZXMvc21hcnQtZXh0ZW5kL3NyYy9leHRlbmQuY29mZmVlIl0sIm5hbWVzIjpbImlubGluZToxIiwiaW5saW5lOjIiLCJpbXBvcnQ6NyIsImlubGluZTozIiwiaW5saW5lOjQiLCJpbmxpbmU6NSIsImlubGluZTo2IiwiaW1wb3J0OjEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxRUNBOztBQ3JFREM7Ozs7O1dDbUVpZ0JDLFVBQXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FEc0JyaEJEOztBRXpGREU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY3lEQTs7QUNkekRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0ZDQTs7QUNwRkRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXbURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQ1huREMsT0FnQ0VBOzs7Ozs7Ozs7Ozs7Ozs7O1NDN0JLQyxVQUNNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNKYlAsT0F1R0VBOzs7OztBQ3ZHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJhcHBseVN0eWxlcyA9IChlbCwgc3R5bGVPYmplY3QsIGFkZGl0aW9uYWwpLT5cblx0c3R5bGVPYmplY3QgPSAkLmV4dGVuZCB7fSwgc3R5bGVPYmplY3QsIGFkZGl0aW9uYWwgaWYgYWRkaXRpb25hbFxuXHR0YXJnZXQgPSAoZWxbMF0gb3IgZWwpXG5cdFxuXHRmb3Iga2V5LHZhbHVlIG9mIHN0eWxlT2JqZWN0XG5cdFx0c3dpdGNoIHR5cGVvZiB2YWx1ZVxuXHRcdFx0d2hlbiAnb2JqZWN0J1xuXHRcdFx0XHRAYXBwbHlTdHlsZXModGFyZ2V0LCB2YWx1ZSlcblxuXHRcdFx0d2hlbiAnZnVuY3Rpb24nXG5cdFx0XHRcdHJldHVybmVkVmFsdWUgPSB2YWx1ZShAKVxuXHRcdFx0XHRpZiB0eXBlb2YgcmV0dXJuZWRWYWx1ZSBpcyAnb2JqZWN0J1xuXHRcdFx0XHRcdEBhcHBseVN0eWxlcyh0YXJnZXQsIHJldHVybmVkVmFsdWUpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0YXJnZXQuc3R5bGVba2V5XSA9IHJldHVybmVkVmFsdWVcblx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0YXJnZXQuc3R5bGVba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIGVsXG5cblxucmVtb3ZlU3R5bGVzID0gKGVsLCBzdHlsZU9iamVjdCwgc3R5bGVzVG9SZWluc3RhdGUpLT5cblx0c3R5bGVzVG9SZW1vdmUgPSBuZXcgKCktPiBAW2tleV09JycgZm9yIGtleSBvZiBzdHlsZU9iamVjdDsgQFxuXG5cdEBhcHBseVN0eWxlcyhlbCwgc3R5bGVzVG9SZW1vdmUsIHN0eWxlc1RvUmVpbnN0YXRlKVxuXG5cbmdldFN1Ym5vdGljZUNvbnRhaW5lciA9IChkaXJlY3Rpb24pLT5cblx0ZXhpc3RpbmdDb250YWluZXIgPSAkKFwiLlN1Ym5vdGljZXMuZGlyZWN0aW9uLS0tI3tkaXJlY3Rpb259XCIsIFN1Ym5vdGljZS5jb250ZXh0KVxuXHRcblx0aWYgZXhpc3RpbmdDb250YWluZXIubGVuZ3RoXG5cdFx0cmV0dXJuIGV4aXN0aW5nQ29udGFpbmVyXG5cdGVsc2Vcblx0XHRjb250YWluZXIgPSAkKG1hcmt1cC5jb250YWluZXIgZGlyZWN0aW9uKS5hcHBlbmRUbyhTdWJub3RpY2UuY29udGV4dClcblx0XHRhcHBseVN0eWxlcyhjb250YWluZXIsIFN1Ym5vdGljZS5zdHlsZVtkaXJlY3Rpb25dLmNvbnRhaW5lcilcblx0XHRcblx0XHRyZXR1cm4gY29udGFpbmVyXG5cdFxuXG5nZXRUcmFuc2xhdGVTdHlsZU9iamVjdCA9ICh2YWx1ZSktPlxuXHR3ZWJraXRUcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHRtb3pUcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHRtc1RyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKCN7dmFsdWV9KVwiXG5cdG9UcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXG5cblxucmVnRXhNYXRyaXhWYWx1ZXMgPSAvbWF0cml4Mz9kP1xcKCguKylcXCkvXG5yZWdFeENvbW1hTGlzdCA9IC8sXFxzKi9cbmdldEN1cnJlbnRUcmFuc2xhdGlvbiA9IChzdWJub3RpY2UpLT5cblx0Y29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN1Ym5vdGljZS5lbHMuc3Vibm90aWNlWzBdKVxuXHRtYXRyaXggPSBjb21wdXRlZFN0eWxlLnRyYW5zZm9ybSBvciBjb21wdXRlZFN0eWxlLndlYmtpdFRyYW5zZm9ybSBvciBjb21wdXRlZFN0eWxlLm1velRyYW5zZm9ybVxuXHRcblx0aWYgbWF0cml4Py5sZW5ndGggYW5kIG1hdHJpeCBpc250ICdub25lJ1xuXHRcdHZhbHVlcyA9IG1hdHJpeC5tYXRjaChyZWdFeE1hdHJpeFZhbHVlcylbMV1cblx0XHR0cmFuc2xhdGVZID0gdmFsdWVzLnNwbGl0KHJlZ0V4Q29tbWFMaXN0KS5zbGljZSgtMSlbMF1cblx0ZWxzZVxuXHRcdHRyYW5zbGF0ZVkgPSAwXG5cdFxuXHRyZXR1cm4gcGFyc2VGbG9hdCh0cmFuc2xhdGVZKVxuXG5cblxuXG5cblxuXG5cbiIsInN0eWxlID0ge31cbnN0eWxlT3BlblN0YXRlID0ge31cblxuc3R5bGUuYm90dG9tID1cblx0Y29udGFpbmVyOlxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnXG5cdFx0ekluZGV4OiAnMTAwMDAnXG5cdFx0Ym90dG9tOiAnMCdcblx0XHRsZWZ0OiAnMCdcblx0XHR3aWR0aDogJzEwMCUnXG5cblx0c3Vibm90aWNlOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0Ym90dG9tOiAwXG5cdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdHBhZGRpbmc6ICcxM3B4IDQ1cHggMTBweCdcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzEwMCUnKVxuXHRcdGJhY2tncm91bmRDb2xvcjogKG5vdGljZSktPiBTdWJub3RpY2UuY29sb3JzWyBTdWJub3RpY2UuY29sb3JNYXBwaW5nW25vdGljZS50eXBlXSBdIG9yICdncmV5J1xuXHRcdGNvbG9yOiAobm90aWNlKS0+IGlmIFN1Ym5vdGljZS5yZXF1aXJlc0RhcmtUZXh0W25vdGljZS50eXBlXSB0aGVuIFN1Ym5vdGljZS5jb2xvcnMuZGFyayBlbHNlIFN1Ym5vdGljZS5jb2xvcnMubGlnaHRcblx0XHR0cmFuc2l0aW9uOiAobm90aWNlKS0+IFwidHJhbnNmb3JtICN7bm90aWNlLmFuaW1hdGlvblNwZWVkLzEwMDB9c1wiXG5cblxuXHR0ZXh0OlxuXHRcdGZvbnRTaXplOiAnMTNweCdcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRsaW5lSGVpZ2h0OiAxXG5cblxuXHRpY29uOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0dG9wOiAnNTAlJ1xuXHRcdGxlZnQ6ICcxNHB4J1xuXHRcdHdpZHRoOiAnMjBweCdcblx0XHRoZWlnaHQ6ICcyMHB4J1xuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJy01MCUnKVxuXHRcdGJvcmRlclJhZGl1czogJzUwJSdcblx0XHRmb250U2l6ZTogJzExcHgnXG5cdFx0bGluZUhlaWdodDogJzIwcHgnXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdGJhY2tncm91bmRDb2xvcjogKG5vdGljZSktPiBpZiBTdWJub3RpY2UucmVxdWlyZXNEYXJrVGV4dFtub3RpY2UudHlwZV0gdGhlbiBTdWJub3RpY2UuY29sb3JzLmRhcmsgZWxzZSBTdWJub3RpY2UuY29sb3JzLmxpZ2h0XG5cdFx0Y29sb3I6IChub3RpY2UpLT4gU3Vibm90aWNlLmNvbG9yc1sgU3Vibm90aWNlLmNvbG9yTWFwcGluZ1tub3RpY2UudHlwZV0gXSBvciAnZ3JleSdcblxuXG5cdGNsb3NlOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0dG9wOiAnNTAlJ1xuXHRcdHJpZ2h0OiAnMTBweCdcblx0XHR0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0eWxlT2JqZWN0KCctNTAlJylcblx0XHRmb250U2l6ZTogJzE1cHgnXG5cdFx0bGluZUhlaWdodDogMVxuXHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cblxuXG5cbnN0eWxlLnRvcCA9IFxuXHRjb250YWluZXI6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uY29udGFpbmVyLFxuXHRcdHRvcDogMFxuXHRcdGJvdHRvbTogJ2F1dG8nXG5cdFxuXHRzdWJub3RpY2U6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uc3Vibm90aWNlLFxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzAlJylcblx0XG5cdHRleHQ6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20udGV4dFxuXHRpY29uOiAkLmV4dGVuZCB7fSwgc3R5bGUuYm90dG9tLmljb25cblx0Y2xvc2U6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uY2xvc2VcblxuXG5cblxuc3R5bGVPcGVuU3RhdGUuYm90dG9tID0gXG5cdHN1Ym5vdGljZTpcblx0XHRtYXJnaW5Cb3R0b206IChub3RpY2UpLT4gXCIje25vdGljZS5wbGFjZW1lbnRPZmZzZXR9cHhcIlxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzAlJylcblxuXG5zdHlsZU9wZW5TdGF0ZS50b3AgPSBcblx0c3Vibm90aWNlOlxuXHRcdG1hcmdpbkJvdHRvbTogKG5vdGljZSktPiBcIi0je25vdGljZS5wbGFjZW1lbnRPZmZzZXR9cHhcIlxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzEwMCUnKVxuXG5cblxuXG5cblxuXG5cblxuIiwiXyRzbSgnLi9fcGFydHMvaGVscGVycycgKVxuXyRzbSgnLi9fcGFydHMvc3R5bGVzJyApXG5fJHNtKCcuL19wYXJ0cy9tYXJrdXAnIClcbl8kc20oJy4vX3BhcnRzL1N1Ym5vdGljZScgKVxuXyRzbSgnLi9fcGFydHMvQnJvd3Nlck5vdGljZScgKVxuXG5zdWJub3RpZnkgPSAoe3R5cGU9J2luZm8nLCB0aXRsZT0nJywgdGV4dD0nJywgdGltZT1TdWJub3RpY2UudGltZSwgZGVsYXk9U3Vibm90aWNlLmRlbGF5LCBleHRyYUNsYXNzbmFtZXMsIGJyb3dzZXJOb3RpY2V9KS0+XG5cdHN1Ym5vdGljZSA9IG5ldyBTdWJub3RpY2Uge3R5cGUsIHRleHQsIHRpbWUsIGV4dHJhQ2xhc3NuYW1lc31cblxuXHRpZiBicm93c2VyTm90aWNlXG5cdFx0bmV3IEJyb3dzZXJOb3RpY2Uge3RpdGxlLCB0ZXh0fVxuXG5cdHNldFRpbWVvdXQgKCktPlxuXHRcdHN1Ym5vdGljZS5yZXZlYWwoKVxuXHQsIGRlbGF5XG5cblx0cmV0dXJuIHN1Ym5vdGljZVxuXG5cblxuXG5cblxuXHRcblN1Ym5vdGljZS5tYXJrdXAgPSBtYXJrdXBcblN1Ym5vdGljZS5zdHlsZSA9IHN0eWxlXG5TdWJub3RpY2Uuc3R5bGVPcGVuU3RhdGUgPSBzdHlsZU9wZW5TdGF0ZVxuU3Vibm90aWNlLmluc3RhbmNlcyA9IFtdXG5TdWJub3RpY2UuZGlyZWN0aW9uID0gJ2JvdHRvbSdcblN1Ym5vdGljZS5jbGlja0V2ZW50ID0gJ2NsaWNrJ1xuU3Vibm90aWNlLmFuaW1hdGlvblNwZWVkID0gMzAwXG5TdWJub3RpY2UudGltZSA9IDEwMDAwXG5TdWJub3RpY2UuZGVsYXkgPSAyNTBcblN1Ym5vdGljZS5jb250ZXh0ID0gZG9jdW1lbnQuYm9keVxuU3Vibm90aWNlLnJlcXVpcmVzRGFya1RleHQgPVxuXHQnaW5mbyc6IHRydWVcblxuU3Vibm90aWNlLmNvbG9yTWFwcGluZyA9IFxuXHQnaW5mbyc6ICdncmV5J1xuXHQnc3VjY2Vzcyc6ICdncmVlbidcblx0J2Vycm9yJzogJ3JlZCdcblx0J3dhcm5pbmcnOiAneWVsbG93J1xuXG5TdWJub3RpY2UuY29sb3JzID1cblx0J2xpZ2h0JzogJyNmZmZmZmYnXG5cdCdkYXJrJzogJyMzMTMxMzEnXG5cdCMgJ2RhcmsnOiAnIzE4MTgxOCdcblx0J2dyZWVuJzogJyM3MmMzMjInXG5cdCdyZWQnOiAnIzk1MTkwYydcblx0J3llbGxvdyc6ICcjZTNiNTA1J1xuXHQnZ3JleSc6ICcjYTJhM2E1J1xuXG5TdWJub3RpY2UuaWNvbnMgPVxuXHQnaW5mbyc6ICcnXG5cdCdzdWNjZXNzJzogJydcblx0J2Vycm9yJzogJydcblx0J3dhcm5pbmcnOiAnJ1xuXHQnY2xvc2UnOiAnJ1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJub3RpZnlcbm1vZHVsZS5leHBvcnRzLnZlcnNpb24gPSBfJHNtKCcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyApXG5tb2R1bGUuZXhwb3J0cy5TdWJub3RpY2UgPSBTdWJub3RpY2Vcbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IChzZXR0aW5ncyktPlxuXHRleHRlbmQgPSBfJHNtKCdzbWFydC1leHRlbmQnIClcblx0ZXh0ZW5kLmRlZXAgU3Vibm90aWNlLCBzZXR0aW5nc1xuXHRyZXR1cm4gc3Vibm90aWZ5IiwibWFya3VwID0gXG5cdGNvbnRhaW5lcjogKGRpcmVjdGlvbiktPlxuXHRcdFwiPGRpdiBjbGFzcz0nU3Vibm90aWNlcyBkaXJlY3Rpb24tLS0je2RpcmVjdGlvbn0nPjwvZGl2PlwiXG5cblx0c3Vibm90aWNlOiAodHlwZSwgZXh0cmFDbGFzc25hbWVzPScnKS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UgX18je3R5cGV9ICN7ZXh0cmFDbGFzc25hbWVzfSc+PC9kaXY+XCJcblx0XG5cdGljb246IChpY29uPScnKS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UtaWNvbic+PGRpdj4je2ljb259PC9kaXY+PC9kaXY+XCJcblx0XG5cdHRleHQ6ICh0ZXh0KS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UtdGV4dCc+PGRpdj4je3RleHR9PC9kaXY+PC9kaXY+XCJcblx0XG5cdGNsb3NlOiAoaWNvbj0nJyktPlxuXHRcdFwiPGRpdiBjbGFzcz0nU3Vibm90aWNlLWNsb3NlJz48ZGl2PiN7aWNvbn08L2Rpdj48L2Rpdj5cIiIsIlN1Ym5vdGljZSA9ICh7QHR5cGUsIEB0ZXh0LCBAdGltZSwgQGljb249U3Vibm90aWNlLmljb25zW0B0eXBlXSwgQGV4dHJhQ2xhc3NuYW1lc30pLT5cblx0QGFuaW1hdGlvblNwZWVkID0gU3Vibm90aWNlLmFuaW1hdGlvblNwZWVkXG5cdEBkaXJlY3Rpb24gPSBTdWJub3RpY2UuZGlyZWN0aW9uXG5cdEBlbHMgPSB7fVxuXHRAZWxzLmNvbnRhaW5lciA9IGdldFN1Ym5vdGljZUNvbnRhaW5lcihAZGlyZWN0aW9uKVxuXHRAZWxzLnN1Ym5vdGljZSA9ICQobWFya3VwLnN1Ym5vdGljZShAdHlwZSwgQGV4dHJhQ2xhc3NuYW1lcykpLmRhdGEgJ1N1Ym5vdGljZScsIEBcblx0QGVscy5pY29uID0gJChtYXJrdXAuaWNvbihAaWNvbikpLmFwcGVuZFRvKEBlbHMuc3Vibm90aWNlKVxuXHRAZWxzLnRleHQgPSAkKG1hcmt1cC50ZXh0KEB0ZXh0KSkuYXBwZW5kVG8oQGVscy5zdWJub3RpY2UpXG5cdEBlbHMuY2xvc2UgPSAkKG1hcmt1cC5jbG9zZShTdWJub3RpY2UuaWNvbnMuY2xvc2UpKS5hcHBlbmRUbyhAZWxzLnN1Ym5vdGljZSlcblx0QGlzQWN0aXZlID0gdHJ1ZVxuXG5cdEBub3RpY2VzTGlzdCA9IEBlbHMuY29udGFpbmVyWzBdLm5vdGljZXNMaXN0ID89IFtdXG5cdEBhcHBseVN0eWxlcyA9IGFwcGx5U3R5bGVzLmJpbmQoQClcblx0QHJlbW92ZVN0eWxlcyA9IHJlbW92ZVN0eWxlcy5iaW5kKEApXG5cdFxuXHRAYXBwZW5kVG9ET00oKVxuXHRAYXR0YWNoRXZlbnRzKClcblx0U3Vibm90aWNlLmluc3RhbmNlcy5wdXNoKEApXG5cdHJldHVybiBAXG5cblxuXG5cblN1Ym5vdGljZTo6YXBwZW5kVG9ET00gPSAoKS0+XG5cdEBhcHBseVN0eWxlcyhAZWxzLmNvbnRhaW5lciwgU3Vibm90aWNlLnN0eWxlW0BkaXJlY3Rpb25dLmNvbnRhaW5lcilcblx0QGFwcGx5U3R5bGVzKEBlbHMuc3Vibm90aWNlLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uc3Vibm90aWNlKVxuXHRAYXBwbHlTdHlsZXMoQGVscy5pY29uLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uaWNvbilcblx0QGFwcGx5U3R5bGVzKEBlbHMudGV4dCwgU3Vibm90aWNlLnN0eWxlW0BkaXJlY3Rpb25dLnRleHQpXG5cdEBhcHBseVN0eWxlcyhAZWxzLmNsb3NlLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uY2xvc2UpXG5cblx0QGVscy5zdWJub3RpY2UuYXBwZW5kVG8oQGVscy5jb250YWluZXIpXG5cblxuXG5cblN1Ym5vdGljZTo6cmV2ZWFsID0gKCktPlxuXHRvdGhlck5vdGljZXNIZWlnaHRzID0gQG5vdGljZXNMaXN0LnNsaWNlKCkubWFwIChub3RpY2UpLT4gaWYgbm90aWNlLmJlaW5nRGVzdHJveWVkIHRoZW4gMCBlbHNlIG5vdGljZS5lbHMuc3Vibm90aWNlWzBdLm9mZnNldEhlaWdodFxuXHRAcGxhY2VtZW50T2Zmc2V0ID0gaWYgbm90IG90aGVyTm90aWNlc0hlaWdodHMubGVuZ3RoIHRoZW4gMCBlbHNlIG90aGVyTm90aWNlc0hlaWdodHMucmVkdWNlIChhPTAsYj0wKS0+IGErYlxuXG5cdEBub3RpY2VzTGlzdC5wdXNoKEApXG5cdEBhcHBseVN0eWxlcyhAZWxzLnN1Ym5vdGljZSwgU3Vibm90aWNlLnN0eWxlT3BlblN0YXRlW0BkaXJlY3Rpb25dLnN1Ym5vdGljZSwge3pJbmRleDogMTAwLShAbm90aWNlc0xpc3QubGVuZ3RoKX0pXG5cblx0aWYgQHRpbWUgaXNudCBmYWxzZVxuXHRcdHNldFRpbWVvdXQgKCgpPT4gQGRlc3Ryb3koKSksIEB0aW1lXG5cblxuXG5TdWJub3RpY2U6OmF0dGFjaEV2ZW50cyA9ICgpLT5cblx0QGVscy5jbG9zZS5vbiBTdWJub3RpY2UuY2xpY2tFdmVudCwgKCk9PiBAZGVzdHJveSgpXG5cblxuXG5TdWJub3RpY2U6OmRlc3Ryb3kgPSAoYW5pbWF0aW9uU3BlZWQ9QGFuaW1hdGlvblNwZWVkKS0+IGlmIEBpc0FjdGl2ZVxuXHRAYmVpbmdEZXN0cm95ZWQgPSB0cnVlXG5cdFxuXHRub3RpY2VzSW5Gcm9udCA9IEBub3RpY2VzTGlzdC5zbGljZShAbm90aWNlc0xpc3QuaW5kZXhPZihAKSkgIyBJbmNsdWRpbmcgc2VsZlxuXHRub3RpY2VIZWlnaHQgPSBAZWxzLnN1Ym5vdGljZVswXS5vZmZzZXRIZWlnaHRcblx0bm90aWNlSGVpZ2h0ICo9IC0xIGlmIEBkaXJlY3Rpb24gaXMgJ3RvcCdcblx0XG5cdG5vdGljZXNJbkZyb250LmNvbmNhdChAKS5mb3JFYWNoIChzdWJub3RpY2UpPT5cblx0XHRuZXdUcmFuc2xhdGUgPSBnZXRDdXJyZW50VHJhbnNsYXRpb24oc3Vibm90aWNlKSArIG5vdGljZUhlaWdodFxuXHRcdHN1Ym5vdGljZS5hcHBseVN0eWxlcyhzdWJub3RpY2UuZWxzLnN1Ym5vdGljZSwgZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoXCIje25ld1RyYW5zbGF0ZX1weFwiKSlcblxuXHRcblx0aWYgU3Vibm90aWNlLmluc3RhbmNlcy5pbmNsdWRlcyhAKSB0aGVuIFN1Ym5vdGljZS5pbnN0YW5jZXMuc3BsaWNlIFN1Ym5vdGljZS5pbnN0YW5jZXMuaW5kZXhPZihAKSwxXG5cdFxuXHRzZXRUaW1lb3V0ICgpPT5cblx0XHRyZXR1cm4gaWYgbm90IEBpc0FjdGl2ZVxuXHRcdEBpc0FjdGl2ZSA9IEBiZWluZ0Rlc3Ryb3llZCA9IGZhbHNlXG5cdFx0XHRcdFxuXHRcdEBub3RpY2VzTGlzdC5zcGxpY2UgQG5vdGljZXNMaXN0LmluZGV4T2YoQCksMVxuXHRcdEBlbHMuc3Vibm90aWNlLnJlbW92ZSgpXG5cdCwgYW5pbWF0aW9uU3BlZWQrMjBcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIkJyb3dzZXJOb3RpY2UgPSAoe0B0aXRsZSwgQHRleHR9KS0+XG5cdHJldHVybiBAIHVubGVzcyBOb3RpZmljYXRpb24/XG5cdGlmIE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uIGlzICdncmFudGVkJ1xuXHRcdEByZXZlYWwoKVxuXHRlbHNlXG5cdFx0Tm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbiAoc3RhdGUpPT4gQHJldmVhbCgpIHVubGVzcyBzdGF0ZSBpc250ICdncmFudGVkJ1xuXG5cdHJldHVybiBAXG5cblxuQnJvd3Nlck5vdGljZTo6cmV2ZWFsID0gKCktPlxuXHRAbm90aWNlID0gbmV3IE5vdGlmaWNhdGlvbihAdGl0bGUsIHsnYm9keSc6QHRleHR9KSIsIntcbiAgXCJuYW1lXCI6IFwiQGRhbmllbGthbGVuL3N1Ym5vdGljZXMtZW5naW5lXCIsXG4gIFwidmVyc2lvblwiOiBcIjMuMS4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBub3RpY2UgYW5kIHN1Ym5vdGljZSBkaXNwbGF5IHN5c3RlbVwiLFxuICBcIm1haW5cIjogXCJkaXN0L3N1Ym5vdGljZXMuanNcIixcbiAgXCJicm93c2VyXCI6IHtcbiAgICBcIi4vZGVidWdcIjogXCIuL2Rpc3Qvc3Vibm90aWNlcy5kZWJ1Zy5qc1wiLFxuICAgIFwiLi9kaXN0L3N1Ym5vdGljZXMuanNcIjogXCIuL3NyYy9pbmRleC5jb2ZmZWVcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vc3Vibm90aWNlcy1lbmdpbmVcIixcbiAgXCJhdXRob3JcIjogXCJkYW5pZWxrYWxlblwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInBvc3R2ZXJzaW9uXCI6IFwibnBtIHJ1biBidWlsZCAmJiBnaXQgYWRkIC4gJiYgZ2l0IGNvbW1pdCAtbSAnW0J1aWxkXSdcIixcbiAgICBcInBvc3RwdWJsaXNoXCI6IFwiZ2l0IHB1c2hcIixcbiAgICBcImJ1aWxkXCI6IFwibnBtIHJ1biBjb21waWxlICYmIG5wbSBydW4gbWluaWZ5XCIsXG4gICAgXCJjb21waWxlXCI6IFwic2ltcGx5aW1wb3J0IGJ1bmRsZSAtZCAtLXVtZCBub3RpZnkgc3JjL2luZGV4LmNvZmZlZSA+IGRpc3Qvc3Vibm90aWNlcy5kZWJ1Zy5qc1wiLFxuICAgIFwibWluaWZ5XCI6IFwiY2xvc3VyZS1zZXJ2aWNlIGRpc3Qvc3Vibm90aWNlcy5kZWJ1Zy5qcyA+IGRpc3Qvc3Vibm90aWNlcy5qc1wiLFxuICAgIFwid2F0Y2hcIjogXCJzaW1wbHl3YXRjaCAtZyAnc3JjLyonIC14ICducG0gcnVuIGNvbXBpbGUgLXMnXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2xvc3VyZS1jb21waWxlci1zZXJ2aWNlXCI6IFwiXjAuNS4wXCIsXG4gICAgXCJjb2ZmZWUtc2NyaXB0XCI6IFwiXjEuMTAuMFwiLFxuICAgIFwianNvblwiOiBcIl45LjAuNFwiLFxuICAgIFwic2ltcGx5aW1wb3J0XCI6IFwiXjQuMC4wLXMzNVwiLFxuICAgIFwic2ltcGx5d2F0Y2hcIjogXCJeMy4wLjAtbDJcIixcbiAgICBcInVnbGlmeVwiOiBcIipcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJqcXVlcnlcIjogXCJeMy4xLjFcIixcbiAgICBcInNtYXJ0LWV4dGVuZFwiOiBcIl4xLjcuM1wiXG4gIH1cbn1cbiIsImV4dGVuZCA9IHJlcXVpcmUgJy4vZXh0ZW5kJ1xuXG5ub3JtYWxpemVLZXlzID0gKGtleXMpLT4gaWYga2V5c1xuXHRvdXRwdXQgPSB7fVxuXHRpZiB0eXBlb2Yga2V5cyBpc250ICdvYmplY3QnXG5cdFx0b3V0cHV0W2tleXNdID0gdHJ1ZVxuXHRlbHNlXG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKGtleXMpIGlmIG5vdCBBcnJheS5pc0FycmF5KGtleXMpXG5cdFx0b3V0cHV0W2tleV0gPSB0cnVlIGZvciBrZXkgaW4ga2V5c1xuXG5cdHJldHVybiBvdXRwdXRcblxuXG5uZXdCdWlsZGVyID0gKGlzQmFzZSktPlxuXHRidWlsZGVyID0gKHRhcmdldCktPlxuXHRcdEVYUEFORF9BUkdVTUVOVFMoc291cmNlcylcblx0XHRpZiBidWlsZGVyLm9wdGlvbnMudGFyZ2V0XG5cdFx0XHR0aGVUYXJnZXQgPSBidWlsZGVyLm9wdGlvbnMudGFyZ2V0XG5cdFx0ZWxzZVxuXHRcdFx0dGhlVGFyZ2V0ID0gdGFyZ2V0XG5cdFx0XHRzb3VyY2VzLnNoaWZ0KClcblx0XHRcblx0XHRleHRlbmQoYnVpbGRlci5vcHRpb25zLCB0aGVUYXJnZXQsIHNvdXJjZXMpXG5cdFxuXHRidWlsZGVyLmlzQmFzZSA9IHRydWUgaWYgaXNCYXNlXG5cdGJ1aWxkZXIub3B0aW9ucyA9IHt9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGJ1aWxkZXIsIG1vZGlmaWVycylcblx0cmV0dXJuIGJ1aWxkZXJcblxuXG5tb2RpZmllcnMgPSBcblx0J2RlZXAnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMuZGVlcCA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdvd24nOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMub3duID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J2FsbG93TnVsbCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5hbGxvd051bGwgPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnbnVsbERlbGV0ZXMnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMubnVsbERlbGV0ZXMgPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnY29uY2F0JzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLmNvbmNhdCA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdjbG9uZSc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy50YXJnZXQgPSB7fVxuXHRcdHJldHVybiBfXG5cblx0J25vdERlZXAnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGtleXMpLT5cblx0XHRcdF8ub3B0aW9ucy5ub3REZWVwID0gbm9ybWFsaXplS2V5cyhrZXlzKVx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXHQnZGVlcE9ubHknOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGtleXMpLT5cblx0XHRcdF8ub3B0aW9ucy5kZWVwT25seSA9IG5vcm1hbGl6ZUtleXMoa2V5cylcdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblx0J2tleXMnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGtleXMpLT5cblx0XHRcdF8ub3B0aW9ucy5rZXlzID0gbm9ybWFsaXplS2V5cyhrZXlzKVx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXHQnbm90S2V5cyc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLm5vdEtleXMgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCd0cmFuc2Zvcm0nOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKHRyYW5zZm9ybSktPlxuXHRcdFx0aWYgdHlwZW9mIHRyYW5zZm9ybSBpcyAnZnVuY3Rpb24nXG5cdFx0XHRcdF8ub3B0aW9ucy5nbG9iYWxUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1cblx0XHRcdGVsc2UgaWYgdHJhbnNmb3JtIGFuZCB0eXBlb2YgdHJhbnNmb3JtIGlzICdvYmplY3QnXG5cdFx0XHRcdF8ub3B0aW9ucy50cmFuc2Zvcm1zID0gdHJhbnNmb3JtXG5cdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblxuXHQnZmlsdGVyJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChmaWx0ZXIpLT5cblx0XHRcdGlmIHR5cGVvZiBmaWx0ZXIgaXMgJ2Z1bmN0aW9uJ1xuXHRcdFx0XHRfLm9wdGlvbnMuZ2xvYmFsRmlsdGVyID0gZmlsdGVyXG5cdFx0XHRlbHNlIGlmIGZpbHRlciBhbmQgdHlwZW9mIGZpbHRlciBpcyAnb2JqZWN0J1xuXHRcdFx0XHRfLm9wdGlvbnMuZmlsdGVycyA9IGZpbHRlclxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gbmV3QnVpbGRlcih0cnVlKVxuZXhwb3J0cy52ZXJzaW9uID0gaW1wb3J0ICcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyIsIntcbiAgXCJfZnJvbVwiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICBcIl9pZFwiOiBcInNtYXJ0LWV4dGVuZEAxLjcuM1wiLFxuICBcIl9pbkJ1bmRsZVwiOiBmYWxzZSxcbiAgXCJfaW50ZWdyaXR5XCI6IFwic2hhNTEyLVBWRUVWWUREenl4S0EwR05GTGNXWTZvSlNrUUtkYzF3NzE4ZVFwRUhjTnVUU1dZeERLMzVHemhzR2hNa1VVOGxCSWdTRURidDV4NXA0NnBSejNBdWJBPT1cIixcbiAgXCJfbG9jYXRpb25cIjogXCIvc21hcnQtZXh0ZW5kXCIsXG4gIFwiX3BoYW50b21DaGlsZHJlblwiOiB7fSxcbiAgXCJfcmVxdWVzdGVkXCI6IHtcbiAgICBcInR5cGVcIjogXCJ0YWdcIixcbiAgICBcInJlZ2lzdHJ5XCI6IHRydWUsXG4gICAgXCJyYXdcIjogXCJzbWFydC1leHRlbmRcIixcbiAgICBcIm5hbWVcIjogXCJzbWFydC1leHRlbmRcIixcbiAgICBcImVzY2FwZWROYW1lXCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gICAgXCJyYXdTcGVjXCI6IFwiXCIsXG4gICAgXCJzYXZlU3BlY1wiOiBudWxsLFxuICAgIFwiZmV0Y2hTcGVjXCI6IFwibGF0ZXN0XCJcbiAgfSxcbiAgXCJfcmVxdWlyZWRCeVwiOiBbXG4gICAgXCIjVVNFUlwiLFxuICAgIFwiL1wiLFxuICAgIFwiL3NpbXBseXdhdGNoXCJcbiAgXSxcbiAgXCJfcmVzb2x2ZWRcIjogXCJodHRwczovL3JlZ2lzdHJ5Lm5wbWpzLm9yZy9zbWFydC1leHRlbmQvLS9zbWFydC1leHRlbmQtMS43LjMudGd6XCIsXG4gIFwiX3NoYXN1bVwiOiBcIjBmZTRhNDI2Yzg2MzhmNDhmOTliN2NjODVlMjc2NzkxZWNmNWFmMmJcIixcbiAgXCJfc3BlY1wiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICBcIl93aGVyZVwiOiBcIi9Vc2Vycy9kYW5pZWxrYWxlbi9zYW5kYm94L3N1Ym5vdGljZXMtZW5naW5lXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJkYW5pZWxrYWxlblwiXG4gIH0sXG4gIFwiYnJvd3NlclwiOiB7XG4gICAgXCIuL2RlYnVnXCI6IFwiZGlzdC9zbWFydC1leHRlbmQuZGVidWcuanNcIixcbiAgICBcIi4vZGlzdC9zbWFydC1leHRlbmQuanNcIjogXCJzcmMvaW5kZXguY29mZmVlXCJcbiAgfSxcbiAgXCJicm93c2VyaWZ5XCI6IHtcbiAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICBcInNpbXBseWltcG9ydC9jb21wYXRcIlxuICAgIF1cbiAgfSxcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZWxrYWxlbi9zbWFydC1leHRlbmQvaXNzdWVzXCJcbiAgfSxcbiAgXCJidW5kbGVEZXBlbmRlbmNpZXNcIjogZmFsc2UsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImZhbGFmZWxcIjogXCJeMi4xLjBcIlxuICB9LFxuICBcImRlcHJlY2F0ZWRcIjogZmFsc2UsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJNZXJnZS9leHRlbmQgb2JqZWN0cyAoc2hhbGxvdy9kZWVwKSB3aXRoIGdsb2JhbC9pbmRpdmlkdWFsIGZpbHRlcnMgYW5kIG1vcmUgZmVhdHVyZXNcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYmFkZ2UtZ2VuXCI6IFwiXjEuMC4yXCIsXG4gICAgXCJibHVlYmlyZFwiOiBcIl4zLjQuN1wiLFxuICAgIFwiY2hhaVwiOiBcIl4zLjUuMFwiLFxuICAgIFwiY29mZmVlLXJlZ2lzdGVyXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJjb2ZmZWVpZnktY2FjaGVkXCI6IFwiXjIuMS4xXCIsXG4gICAgXCJleHRlbmRcIjogXCJeMy4wLjFcIixcbiAgICBcImdvb2dsZS1jbG9zdXJlLWNvbXBpbGVyLWpzXCI6IFwiXjIwMTcwNjI2LjAuMFwiLFxuICAgIFwibW9jaGFcIjogXCJeMy4yLjBcIixcbiAgICBcInNpbXBseWltcG9ydFwiOiBcIl40LjAuMC1zMjFcIixcbiAgICBcInNpbXBseXdhdGNoXCI6IFwiXjMuMC4wLWwyXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJeMy4wLjI0XCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZWxrYWxlbi9zbWFydC1leHRlbmQjcmVhZG1lXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiZXh0ZW5kXCIsXG4gICAgXCJjbG9uZVwiLFxuICAgIFwiZmlsdGVyXCIsXG4gICAgXCJzZWxlY3RpdmVcIixcbiAgICBcIm1lcmdlXCIsXG4gICAgXCJhc3NpZ25cIixcbiAgICBcInByb3BlcnRpZXNcIlxuICBdLFxuICBcImxpY2Vuc2VcIjogXCJJU0NcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9zbWFydC1leHRlbmQuanNcIixcbiAgXCJtb2NoYV9vcHRzXCI6IFwiLXUgdGRkIC0tY29tcGlsZXJzIGNvZmZlZTpjb2ZmZWUtcmVnaXN0ZXIgLS1zbG93IDEwMDAgLS10aW1lb3V0IDUwMDBcIixcbiAgXCJuYW1lXCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3NtYXJ0LWV4dGVuZC5naXRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJta2RpciAtcCBkaXN0LzsgbnBtIHJ1biBidWlsZDpkZWJ1ZyAmJiBucG0gcnVuIGJ1aWxkOnJlbGVhc2VcIixcbiAgICBcImJ1aWxkOmRlYnVnXCI6IFwic2ltcGx5aW1wb3J0IGJ1bmRsZSBzcmMvaW5kZXguY29mZmVlIC1kIC0tdGFyZ2V0IG5vZGUgLS11bWQgc21hcnQtZXh0ZW5kID4gZGlzdC9zbWFydC1leHRlbmQuZGVidWcuanNcIixcbiAgICBcImJ1aWxkOnJlbGVhc2VcIjogXCJzaW1wbHlpbXBvcnQgYnVuZGxlIHNyYy9pbmRleC5jb2ZmZWUgLS10YXJnZXQgbm9kZSAtLXVtZCBzbWFydC1leHRlbmQgPiBkaXN0L3NtYXJ0LWV4dGVuZC5qc1wiLFxuICAgIFwiY292ZXJhZ2VcIjogXCJucG0gcnVuIGNvdmVyYWdlOnJ1biAmJiBucG0gcnVuIGNvdmVyYWdlOmJhZGdlXCIsXG4gICAgXCJjb3ZlcmFnZTpiYWRnZVwiOiBcImJhZGdlLWdlbiAtZCAuY29uZmlnL2JhZGdlcy9jb3ZlcmFnZVwiLFxuICAgIFwiY292ZXJhZ2U6cnVuXCI6IFwiZm9yQ292ZXJhZ2U9dHJ1ZSBpc3RhbmJ1bCBjb3ZlciAtLWRpciBjb3ZlcmFnZSBub2RlX21vZHVsZXMvbW9jaGEvYmluL19tb2NoYSAtLSAkbnBtX3BhY2thZ2VfbW9jaGFfb3B0c1wiLFxuICAgIFwicG9zdHB1Ymxpc2hcIjogXCJnaXQgcHVzaFwiLFxuICAgIFwicG9zdHZlcnNpb25cIjogXCJucG0gcnVuIGJ1aWxkICYmIGdpdCBhZGQgLiAmJiBnaXQgY29tbWl0IC1hIC1tICdbQnVpbGRdJ1wiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJDST0xIG5wbSBydW4gdGVzdFwiLFxuICAgIFwidGVzdFwiOiBcIm1vY2hhICRucG1fcGFja2FnZV9tb2NoYV9vcHRzXCIsXG4gICAgXCJ3YXRjaFwiOiBcInNpbXBseXdhdGNoIC1nICdzcmMvKicgLXggJ25wbSBydW4gYnVpbGQ6ZGVidWcgLXMnXCJcbiAgfSxcbiAgXCJzaW1wbHlpbXBvcnRcIjoge1xuICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgIFwiY29mZmVlaWZ5LWNhY2hlZFwiLFxuICAgICAgXCIuLy5jb25maWcvdHJhbnNmb3Jtcy9tYWNyb3NcIlxuICAgIF0sXG4gICAgXCJmaW5hbFRyYW5zZm9ybVwiOiBbXG4gICAgICBcIi5jb25maWcvdHJhbnNmb3Jtcy9taW5pZnktc3VwZXJcIixcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1yZW5hbWVcIixcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1zaW1wbGVcIlxuICAgIF1cbiAgfSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS43LjNcIlxufVxuIiwidmFyIGV4dGVuZCwgaXNBcnJheSwgaXNPYmplY3QsIHNob3VsZERlZXBFeHRlbmQ7XG5cbmlzQXJyYXkgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcbn07XG5cbmlzT2JqZWN0ID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRhcmdldCkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IGlzQXJyYXkodGFyZ2V0KTtcbn07XG5cbnNob3VsZERlZXBFeHRlbmQgPSBmdW5jdGlvbihvcHRpb25zLCB0YXJnZXQsIHBhcmVudEtleSkge1xuICBpZiAob3B0aW9ucy5kZWVwKSB7XG4gICAgaWYgKG9wdGlvbnMubm90RGVlcCkge1xuICAgICAgcmV0dXJuICFvcHRpb25zLm5vdERlZXBbdGFyZ2V0XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9wdGlvbnMuZGVlcE9ubHkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5kZWVwT25seVt0YXJnZXRdIHx8IHBhcmVudEtleSAmJiBzaG91bGREZWVwRXh0ZW5kKG9wdGlvbnMsIHBhcmVudEtleSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kID0gZnVuY3Rpb24ob3B0aW9ucywgdGFyZ2V0LCBzb3VyY2VzLCBwYXJlbnRLZXkpIHtcbiAgdmFyIGksIGtleSwgbGVuLCBzb3VyY2UsIHNvdXJjZVZhbHVlLCBzdWJUYXJnZXQsIHRhcmdldFZhbHVlO1xuICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGFyZ2V0ID0ge307XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgaWYgKHNvdXJjZVZhbHVlID09PSB0YXJnZXQgfHwgc291cmNlVmFsdWUgPT09IHZvaWQgMCB8fCAoc291cmNlVmFsdWUgPT09IG51bGwgJiYgIW9wdGlvbnMuYWxsb3dOdWxsICYmICFvcHRpb25zLm51bGxEZWxldGVzKSB8fCAob3B0aW9ucy5rZXlzICYmICFvcHRpb25zLmtleXNba2V5XSkgfHwgKG9wdGlvbnMubm90S2V5cyAmJiBvcHRpb25zLm5vdEtleXNba2V5XSkgfHwgKG9wdGlvbnMub3duICYmICFzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkgfHwgKG9wdGlvbnMuZ2xvYmFsRmlsdGVyICYmICFvcHRpb25zLmdsb2JhbEZpbHRlcihzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpKSB8fCAob3B0aW9ucy5maWx0ZXJzICYmIG9wdGlvbnMuZmlsdGVyc1trZXldICYmICFvcHRpb25zLmZpbHRlcnNba2V5XShzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VWYWx1ZSA9PT0gbnVsbCAmJiBvcHRpb25zLm51bGxEZWxldGVzKSB7XG4gICAgICAgICAgZGVsZXRlIHRhcmdldFtrZXldO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmdsb2JhbFRyYW5zZm9ybSkge1xuICAgICAgICAgIHNvdXJjZVZhbHVlID0gb3B0aW9ucy5nbG9iYWxUcmFuc2Zvcm0oc291cmNlVmFsdWUsIGtleSwgc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm1zICYmIG9wdGlvbnMudHJhbnNmb3Jtc1trZXldKSB7XG4gICAgICAgICAgc291cmNlVmFsdWUgPSBvcHRpb25zLnRyYW5zZm9ybXNba2V5XShzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZmFsc2UpIHtcbiAgICAgICAgICBjYXNlICEob3B0aW9ucy5jb25jYXQgJiYgaXNBcnJheShzb3VyY2VWYWx1ZSkgJiYgaXNBcnJheSh0YXJnZXRWYWx1ZSkpOlxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAhKHNob3VsZERlZXBFeHRlbmQob3B0aW9ucywga2V5LCBwYXJlbnRLZXkpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSk6XG4gICAgICAgICAgICBzdWJUYXJnZXQgPSBpc09iamVjdCh0YXJnZXRWYWx1ZSkgPyB0YXJnZXRWYWx1ZSA6IGlzQXJyYXkoc291cmNlVmFsdWUpID8gW10gOiB7fTtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gZXh0ZW5kKG9wdGlvbnMsIHN1YlRhcmdldCwgW3NvdXJjZVZhbHVlXSwga2V5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lJdUxpOXViMlJsWDIxdlpIVnNaWE12YzIxaGNuUXRaWGgwWlc1a0wzTnlZeTlsZUhSbGJtUXVZMjltWm1WbElpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sdGRmUT09Il19