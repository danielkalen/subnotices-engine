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

module.exports.version = "3.0.0";

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9wYXJ0cy9oZWxwZXJzLmNvZmZlZSIsIl9wYXJ0cy9zdHlsZXMuY29mZmVlIiwiaW5kZXguY29mZmVlIiwiX3BhcnRzL21hcmt1cC5jb2ZmZWUiLCJfcGFydHMvU3Vibm90aWNlLmNvZmZlZSIsIl9wYXJ0cy9Ccm93c2VyTm90aWNlLmNvZmZlZSIsIi4uL3BhY2thZ2UuanNvbiIsIi4uL25vZGVfbW9kdWxlcy9zbWFydC1leHRlbmQvc3JjL2luZGV4LmNvZmZlZSIsIi4uL25vZGVfbW9kdWxlcy9zbWFydC1leHRlbmQvbm9kZV9tb2R1bGVzL3NtYXJ0LWV4dGVuZC9wYWNrYWdlLmpzb24iLCIuLi9ub2RlX21vZHVsZXMvc21hcnQtZXh0ZW5kL3NyYy9leHRlbmQuY29mZmVlIl0sIm5hbWVzIjpbImlubGluZToxIiwiaW5saW5lOjIiLCJpbXBvcnQ6NyIsImlubGluZTozIiwiaW5saW5lOjQiLCJpbmxpbmU6NSIsImlubGluZTo2IiwiaW1wb3J0OjEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxRUNBOztBQ3JFREM7Ozs7O1dDbUVpZ0JDLFVBQXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FEc0JyaEJEOztBRXpGREU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY3lEQTs7QUNkekRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0ZDQTs7QUNwRkRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXbURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQ1huREMsT0E0QkVBOzs7Ozs7Ozs7Ozs7Ozs7O1NDekJLQyxVQUNNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNKYlAsT0F1R0VBOzs7OztBQ3ZHRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJhcHBseVN0eWxlcyA9IChlbCwgc3R5bGVPYmplY3QsIGFkZGl0aW9uYWwpLT5cblx0c3R5bGVPYmplY3QgPSAkLmV4dGVuZCB7fSwgc3R5bGVPYmplY3QsIGFkZGl0aW9uYWwgaWYgYWRkaXRpb25hbFxuXHR0YXJnZXQgPSAoZWxbMF0gb3IgZWwpXG5cdFxuXHRmb3Iga2V5LHZhbHVlIG9mIHN0eWxlT2JqZWN0XG5cdFx0c3dpdGNoIHR5cGVvZiB2YWx1ZVxuXHRcdFx0d2hlbiAnb2JqZWN0J1xuXHRcdFx0XHRAYXBwbHlTdHlsZXModGFyZ2V0LCB2YWx1ZSlcblxuXHRcdFx0d2hlbiAnZnVuY3Rpb24nXG5cdFx0XHRcdHJldHVybmVkVmFsdWUgPSB2YWx1ZShAKVxuXHRcdFx0XHRpZiB0eXBlb2YgcmV0dXJuZWRWYWx1ZSBpcyAnb2JqZWN0J1xuXHRcdFx0XHRcdEBhcHBseVN0eWxlcyh0YXJnZXQsIHJldHVybmVkVmFsdWUpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0YXJnZXQuc3R5bGVba2V5XSA9IHJldHVybmVkVmFsdWVcblx0XHRcdFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0YXJnZXQuc3R5bGVba2V5XSA9IHZhbHVlXG5cblx0cmV0dXJuIGVsXG5cblxucmVtb3ZlU3R5bGVzID0gKGVsLCBzdHlsZU9iamVjdCwgc3R5bGVzVG9SZWluc3RhdGUpLT5cblx0c3R5bGVzVG9SZW1vdmUgPSBuZXcgKCktPiBAW2tleV09JycgZm9yIGtleSBvZiBzdHlsZU9iamVjdDsgQFxuXG5cdEBhcHBseVN0eWxlcyhlbCwgc3R5bGVzVG9SZW1vdmUsIHN0eWxlc1RvUmVpbnN0YXRlKVxuXG5cbmdldFN1Ym5vdGljZUNvbnRhaW5lciA9IChkaXJlY3Rpb24pLT5cblx0ZXhpc3RpbmdDb250YWluZXIgPSAkKFwiLlN1Ym5vdGljZXMuZGlyZWN0aW9uLS0tI3tkaXJlY3Rpb259XCIsIFN1Ym5vdGljZS5jb250ZXh0KVxuXHRcblx0aWYgZXhpc3RpbmdDb250YWluZXIubGVuZ3RoXG5cdFx0cmV0dXJuIGV4aXN0aW5nQ29udGFpbmVyXG5cdGVsc2Vcblx0XHRjb250YWluZXIgPSAkKG1hcmt1cC5jb250YWluZXIgZGlyZWN0aW9uKS5hcHBlbmRUbyhTdWJub3RpY2UuY29udGV4dClcblx0XHRhcHBseVN0eWxlcyhjb250YWluZXIsIFN1Ym5vdGljZS5zdHlsZVtkaXJlY3Rpb25dLmNvbnRhaW5lcilcblx0XHRcblx0XHRyZXR1cm4gY29udGFpbmVyXG5cdFxuXG5nZXRUcmFuc2xhdGVTdHlsZU9iamVjdCA9ICh2YWx1ZSktPlxuXHR3ZWJraXRUcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHRtb3pUcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHRtc1RyYW5zZm9ybTogXCJ0cmFuc2xhdGVZKCN7dmFsdWV9KVwiXG5cdG9UcmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXHR0cmFuc2Zvcm06IFwidHJhbnNsYXRlWSgje3ZhbHVlfSlcIlxuXG5cblxucmVnRXhNYXRyaXhWYWx1ZXMgPSAvbWF0cml4Mz9kP1xcKCguKylcXCkvXG5yZWdFeENvbW1hTGlzdCA9IC8sXFxzKi9cbmdldEN1cnJlbnRUcmFuc2xhdGlvbiA9IChzdWJub3RpY2UpLT5cblx0Y29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN1Ym5vdGljZS5lbHMuc3Vibm90aWNlWzBdKVxuXHRtYXRyaXggPSBjb21wdXRlZFN0eWxlLnRyYW5zZm9ybSBvciBjb21wdXRlZFN0eWxlLndlYmtpdFRyYW5zZm9ybSBvciBjb21wdXRlZFN0eWxlLm1velRyYW5zZm9ybVxuXHRcblx0aWYgbWF0cml4Py5sZW5ndGggYW5kIG1hdHJpeCBpc250ICdub25lJ1xuXHRcdHZhbHVlcyA9IG1hdHJpeC5tYXRjaChyZWdFeE1hdHJpeFZhbHVlcylbMV1cblx0XHR0cmFuc2xhdGVZID0gdmFsdWVzLnNwbGl0KHJlZ0V4Q29tbWFMaXN0KS5zbGljZSgtMSlbMF1cblx0ZWxzZVxuXHRcdHRyYW5zbGF0ZVkgPSAwXG5cdFxuXHRyZXR1cm4gcGFyc2VGbG9hdCh0cmFuc2xhdGVZKVxuXG5cblxuXG5cblxuXG5cbiIsInN0eWxlID0ge31cbnN0eWxlT3BlblN0YXRlID0ge31cblxuc3R5bGUuYm90dG9tID1cblx0Y29udGFpbmVyOlxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnXG5cdFx0ekluZGV4OiAnMTAwMDAnXG5cdFx0Ym90dG9tOiAnMCdcblx0XHRsZWZ0OiAnMCdcblx0XHR3aWR0aDogJzEwMCUnXG5cblx0c3Vibm90aWNlOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0Ym90dG9tOiAwXG5cdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdHBhZGRpbmc6ICcxM3B4IDQ1cHggMTBweCdcblx0XHRib3hTaXppbmc6ICdib3JkZXItYm94J1xuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzEwMCUnKVxuXHRcdGJhY2tncm91bmRDb2xvcjogKG5vdGljZSktPiBTdWJub3RpY2UuY29sb3JzWyBTdWJub3RpY2UuY29sb3JNYXBwaW5nW25vdGljZS50eXBlXSBdIG9yICdncmV5J1xuXHRcdGNvbG9yOiAobm90aWNlKS0+IGlmIFN1Ym5vdGljZS5yZXF1aXJlc0RhcmtUZXh0W25vdGljZS50eXBlXSB0aGVuIFN1Ym5vdGljZS5jb2xvcnMuZGFyayBlbHNlIFN1Ym5vdGljZS5jb2xvcnMubGlnaHRcblx0XHR0cmFuc2l0aW9uOiAobm90aWNlKS0+IFwidHJhbnNmb3JtICN7bm90aWNlLmFuaW1hdGlvblNwZWVkLzEwMDB9c1wiXG5cblxuXHR0ZXh0OlxuXHRcdGZvbnRTaXplOiAnMTNweCdcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRsaW5lSGVpZ2h0OiAxXG5cblxuXHRpY29uOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0dG9wOiAnNTAlJ1xuXHRcdGxlZnQ6ICcxNHB4J1xuXHRcdHdpZHRoOiAnMjBweCdcblx0XHRoZWlnaHQ6ICcyMHB4J1xuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJy01MCUnKVxuXHRcdGJvcmRlclJhZGl1czogJzUwJSdcblx0XHRmb250U2l6ZTogJzExcHgnXG5cdFx0bGluZUhlaWdodDogJzIwcHgnXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdGJhY2tncm91bmRDb2xvcjogKG5vdGljZSktPiBpZiBTdWJub3RpY2UucmVxdWlyZXNEYXJrVGV4dFtub3RpY2UudHlwZV0gdGhlbiBTdWJub3RpY2UuY29sb3JzLmRhcmsgZWxzZSBTdWJub3RpY2UuY29sb3JzLmxpZ2h0XG5cdFx0Y29sb3I6IChub3RpY2UpLT4gU3Vibm90aWNlLmNvbG9yc1sgU3Vibm90aWNlLmNvbG9yTWFwcGluZ1tub3RpY2UudHlwZV0gXSBvciAnZ3JleSdcblxuXG5cdGNsb3NlOlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0dG9wOiAnNTAlJ1xuXHRcdHJpZ2h0OiAnMTBweCdcblx0XHR0cmFuc2Zvcm06IGdldFRyYW5zbGF0ZVN0eWxlT2JqZWN0KCctNTAlJylcblx0XHRmb250U2l6ZTogJzE1cHgnXG5cdFx0bGluZUhlaWdodDogMVxuXHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cblxuXG5cbnN0eWxlLnRvcCA9IFxuXHRjb250YWluZXI6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uY29udGFpbmVyLFxuXHRcdHRvcDogMFxuXHRcdGJvdHRvbTogJ2F1dG8nXG5cdFxuXHRzdWJub3RpY2U6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uc3Vibm90aWNlLFxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzAlJylcblx0XG5cdHRleHQ6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20udGV4dFxuXHRpY29uOiAkLmV4dGVuZCB7fSwgc3R5bGUuYm90dG9tLmljb25cblx0Y2xvc2U6ICQuZXh0ZW5kIHt9LCBzdHlsZS5ib3R0b20uY2xvc2VcblxuXG5cblxuc3R5bGVPcGVuU3RhdGUuYm90dG9tID0gXG5cdHN1Ym5vdGljZTpcblx0XHRtYXJnaW5Cb3R0b206IChub3RpY2UpLT4gXCIje25vdGljZS5wbGFjZW1lbnRPZmZzZXR9cHhcIlxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzAlJylcblxuXG5zdHlsZU9wZW5TdGF0ZS50b3AgPSBcblx0c3Vibm90aWNlOlxuXHRcdG1hcmdpbkJvdHRvbTogKG5vdGljZSktPiBcIi0je25vdGljZS5wbGFjZW1lbnRPZmZzZXR9cHhcIlxuXHRcdHRyYW5zZm9ybTogZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoJzEwMCUnKVxuXG5cblxuXG5cblxuXG5cblxuIiwiXyRzbSgnLi9fcGFydHMvaGVscGVycycgKVxuXyRzbSgnLi9fcGFydHMvc3R5bGVzJyApXG5fJHNtKCcuL19wYXJ0cy9tYXJrdXAnIClcbl8kc20oJy4vX3BhcnRzL1N1Ym5vdGljZScgKVxuXyRzbSgnLi9fcGFydHMvQnJvd3Nlck5vdGljZScgKVxuXG5zdWJub3RpZnkgPSAoe3R5cGU9J2luZm8nLCB0aXRsZT0nJywgdGV4dD0nJywgdGltZT1TdWJub3RpY2UudGltZSwgZGVsYXk9U3Vibm90aWNlLmRlbGF5LCBleHRyYUNsYXNzbmFtZXMsIGJyb3dzZXJOb3RpY2V9KS0+XG5cdHN1Ym5vdGljZSA9IG5ldyBTdWJub3RpY2Uge3R5cGUsIHRleHQsIHRpbWUsIGV4dHJhQ2xhc3NuYW1lc31cblxuXHRpZiBicm93c2VyTm90aWNlXG5cdFx0bmV3IEJyb3dzZXJOb3RpY2Uge3RpdGxlLCB0ZXh0fVxuXG5cdHNldFRpbWVvdXQgKCktPlxuXHRcdHN1Ym5vdGljZS5yZXZlYWwoKVxuXHQsIGRlbGF5XG5cblx0cmV0dXJuIHN1Ym5vdGljZVxuXG5cblxuXG5cblxuXHRcblN1Ym5vdGljZS5tYXJrdXAgPSBtYXJrdXBcblN1Ym5vdGljZS5zdHlsZSA9IHN0eWxlXG5TdWJub3RpY2Uuc3R5bGVPcGVuU3RhdGUgPSBzdHlsZU9wZW5TdGF0ZVxuU3Vibm90aWNlLmluc3RhbmNlcyA9IFtdXG5TdWJub3RpY2UuZGlyZWN0aW9uID0gJ2JvdHRvbSdcblN1Ym5vdGljZS5jbGlja0V2ZW50ID0gJ2NsaWNrJ1xuU3Vibm90aWNlLmFuaW1hdGlvblNwZWVkID0gMzAwXG5TdWJub3RpY2UudGltZSA9IDEwMDAwXG5TdWJub3RpY2UuZGVsYXkgPSAyNTBcblN1Ym5vdGljZS5jb250ZXh0ID0gZG9jdW1lbnQuYm9keVxuU3Vibm90aWNlLnJlcXVpcmVzRGFya1RleHQgPVxuXHQnaW5mbyc6IHRydWVcblxuU3Vibm90aWNlLmNvbG9yTWFwcGluZyA9IFxuXHQnaW5mbyc6ICdncmV5J1xuXHQnc3VjY2Vzcyc6ICdncmVlbidcblx0J2Vycm9yJzogJ3JlZCdcblx0J3dhcm5pbmcnOiAneWVsbG93J1xuXG5TdWJub3RpY2UuY29sb3JzID1cblx0J2xpZ2h0JzogJyNmZmZmZmYnXG5cdCdkYXJrJzogJyMzMTMxMzEnXG5cdCMgJ2RhcmsnOiAnIzE4MTgxOCdcblx0J2dyZWVuJzogJyM3MmMzMjInXG5cdCdyZWQnOiAnIzk1MTkwYydcblx0J3llbGxvdyc6ICcjZTNiNTA1J1xuXHQnZ3JleSc6ICcjYTJhM2E1J1xuXG5TdWJub3RpY2UuaWNvbnMgPVxuXHQnaW5mbyc6ICcnXG5cdCdzdWNjZXNzJzogJydcblx0J2Vycm9yJzogJydcblx0J3dhcm5pbmcnOiAnJ1xuXHQnY2xvc2UnOiAnJ1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJub3RpZnlcbm1vZHVsZS5leHBvcnRzLnZlcnNpb24gPSBfJHNtKCcuLi9wYWNrYWdlLmpzb24gJCB2ZXJzaW9uJyApXG5tb2R1bGUuZXhwb3J0cy5TdWJub3RpY2UgPSBTdWJub3RpY2Vcbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IChzZXR0aW5ncyktPlxuXHRleHRlbmQgPSBfJHNtKCdzbWFydC1leHRlbmQnIClcblx0ZXh0ZW5kLmRlZXAgU3Vibm90aWNlLCBzZXR0aW5nc1xuXHRyZXR1cm4gc3Vibm90aWZ5IiwibWFya3VwID0gXG5cdGNvbnRhaW5lcjogKGRpcmVjdGlvbiktPlxuXHRcdFwiPGRpdiBjbGFzcz0nU3Vibm90aWNlcyBkaXJlY3Rpb24tLS0je2RpcmVjdGlvbn0nPjwvZGl2PlwiXG5cblx0c3Vibm90aWNlOiAodHlwZSwgZXh0cmFDbGFzc25hbWVzPScnKS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UgX18je3R5cGV9ICN7ZXh0cmFDbGFzc25hbWVzfSc+PC9kaXY+XCJcblx0XG5cdGljb246IChpY29uPScnKS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UtaWNvbic+PGRpdj4je2ljb259PC9kaXY+PC9kaXY+XCJcblx0XG5cdHRleHQ6ICh0ZXh0KS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdTdWJub3RpY2UtdGV4dCc+PGRpdj4je3RleHR9PC9kaXY+PC9kaXY+XCJcblx0XG5cdGNsb3NlOiAoaWNvbj0nJyktPlxuXHRcdFwiPGRpdiBjbGFzcz0nU3Vibm90aWNlLWNsb3NlJz48ZGl2PiN7aWNvbn08L2Rpdj48L2Rpdj5cIiIsIlN1Ym5vdGljZSA9ICh7QHR5cGUsIEB0ZXh0LCBAdGltZSwgQGljb249U3Vibm90aWNlLmljb25zW0B0eXBlXSwgQGV4dHJhQ2xhc3NuYW1lc30pLT5cblx0QGFuaW1hdGlvblNwZWVkID0gU3Vibm90aWNlLmFuaW1hdGlvblNwZWVkXG5cdEBkaXJlY3Rpb24gPSBTdWJub3RpY2UuZGlyZWN0aW9uXG5cdEBlbHMgPSB7fVxuXHRAZWxzLmNvbnRhaW5lciA9IGdldFN1Ym5vdGljZUNvbnRhaW5lcihAZGlyZWN0aW9uKVxuXHRAZWxzLnN1Ym5vdGljZSA9ICQobWFya3VwLnN1Ym5vdGljZShAdHlwZSwgQGV4dHJhQ2xhc3NuYW1lcykpLmRhdGEgJ1N1Ym5vdGljZScsIEBcblx0QGVscy5pY29uID0gJChtYXJrdXAuaWNvbihAaWNvbikpLmFwcGVuZFRvKEBlbHMuc3Vibm90aWNlKVxuXHRAZWxzLnRleHQgPSAkKG1hcmt1cC50ZXh0KEB0ZXh0KSkuYXBwZW5kVG8oQGVscy5zdWJub3RpY2UpXG5cdEBlbHMuY2xvc2UgPSAkKG1hcmt1cC5jbG9zZShTdWJub3RpY2UuaWNvbnMuY2xvc2UpKS5hcHBlbmRUbyhAZWxzLnN1Ym5vdGljZSlcblx0QGlzQWN0aXZlID0gdHJ1ZVxuXG5cdEBub3RpY2VzTGlzdCA9IEBlbHMuY29udGFpbmVyWzBdLm5vdGljZXNMaXN0ID89IFtdXG5cdEBhcHBseVN0eWxlcyA9IGFwcGx5U3R5bGVzLmJpbmQoQClcblx0QHJlbW92ZVN0eWxlcyA9IHJlbW92ZVN0eWxlcy5iaW5kKEApXG5cdFxuXHRAYXBwZW5kVG9ET00oKVxuXHRAYXR0YWNoRXZlbnRzKClcblx0U3Vibm90aWNlLmluc3RhbmNlcy5wdXNoKEApXG5cdHJldHVybiBAXG5cblxuXG5cblN1Ym5vdGljZTo6YXBwZW5kVG9ET00gPSAoKS0+XG5cdEBhcHBseVN0eWxlcyhAZWxzLmNvbnRhaW5lciwgU3Vibm90aWNlLnN0eWxlW0BkaXJlY3Rpb25dLmNvbnRhaW5lcilcblx0QGFwcGx5U3R5bGVzKEBlbHMuc3Vibm90aWNlLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uc3Vibm90aWNlKVxuXHRAYXBwbHlTdHlsZXMoQGVscy5pY29uLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uaWNvbilcblx0QGFwcGx5U3R5bGVzKEBlbHMudGV4dCwgU3Vibm90aWNlLnN0eWxlW0BkaXJlY3Rpb25dLnRleHQpXG5cdEBhcHBseVN0eWxlcyhAZWxzLmNsb3NlLCBTdWJub3RpY2Uuc3R5bGVbQGRpcmVjdGlvbl0uY2xvc2UpXG5cblx0QGVscy5zdWJub3RpY2UuYXBwZW5kVG8oQGVscy5jb250YWluZXIpXG5cblxuXG5cblN1Ym5vdGljZTo6cmV2ZWFsID0gKCktPlxuXHRvdGhlck5vdGljZXNIZWlnaHRzID0gQG5vdGljZXNMaXN0LnNsaWNlKCkubWFwIChub3RpY2UpLT4gaWYgbm90aWNlLmJlaW5nRGVzdHJveWVkIHRoZW4gMCBlbHNlIG5vdGljZS5lbHMuc3Vibm90aWNlWzBdLm9mZnNldEhlaWdodFxuXHRAcGxhY2VtZW50T2Zmc2V0ID0gaWYgbm90IG90aGVyTm90aWNlc0hlaWdodHMubGVuZ3RoIHRoZW4gMCBlbHNlIG90aGVyTm90aWNlc0hlaWdodHMucmVkdWNlIChhPTAsYj0wKS0+IGErYlxuXG5cdEBub3RpY2VzTGlzdC5wdXNoKEApXG5cdEBhcHBseVN0eWxlcyhAZWxzLnN1Ym5vdGljZSwgU3Vibm90aWNlLnN0eWxlT3BlblN0YXRlW0BkaXJlY3Rpb25dLnN1Ym5vdGljZSwge3pJbmRleDogMTAwLShAbm90aWNlc0xpc3QubGVuZ3RoKX0pXG5cblx0aWYgQHRpbWUgaXNudCBmYWxzZVxuXHRcdHNldFRpbWVvdXQgKCgpPT4gQGRlc3Ryb3koKSksIEB0aW1lXG5cblxuXG5TdWJub3RpY2U6OmF0dGFjaEV2ZW50cyA9ICgpLT5cblx0QGVscy5jbG9zZS5vbiBTdWJub3RpY2UuY2xpY2tFdmVudCwgKCk9PiBAZGVzdHJveSgpXG5cblxuXG5TdWJub3RpY2U6OmRlc3Ryb3kgPSAoYW5pbWF0aW9uU3BlZWQ9QGFuaW1hdGlvblNwZWVkKS0+IGlmIEBpc0FjdGl2ZVxuXHRAYmVpbmdEZXN0cm95ZWQgPSB0cnVlXG5cdFxuXHRub3RpY2VzSW5Gcm9udCA9IEBub3RpY2VzTGlzdC5zbGljZShAbm90aWNlc0xpc3QuaW5kZXhPZihAKSkgIyBJbmNsdWRpbmcgc2VsZlxuXHRub3RpY2VIZWlnaHQgPSBAZWxzLnN1Ym5vdGljZVswXS5vZmZzZXRIZWlnaHRcblx0bm90aWNlSGVpZ2h0ICo9IC0xIGlmIEBkaXJlY3Rpb24gaXMgJ3RvcCdcblx0XG5cdG5vdGljZXNJbkZyb250LmNvbmNhdChAKS5mb3JFYWNoIChzdWJub3RpY2UpPT5cblx0XHRuZXdUcmFuc2xhdGUgPSBnZXRDdXJyZW50VHJhbnNsYXRpb24oc3Vibm90aWNlKSArIG5vdGljZUhlaWdodFxuXHRcdHN1Ym5vdGljZS5hcHBseVN0eWxlcyhzdWJub3RpY2UuZWxzLnN1Ym5vdGljZSwgZ2V0VHJhbnNsYXRlU3R5bGVPYmplY3QoXCIje25ld1RyYW5zbGF0ZX1weFwiKSlcblxuXHRcblx0aWYgU3Vibm90aWNlLmluc3RhbmNlcy5pbmNsdWRlcyhAKSB0aGVuIFN1Ym5vdGljZS5pbnN0YW5jZXMuc3BsaWNlIFN1Ym5vdGljZS5pbnN0YW5jZXMuaW5kZXhPZihAKSwxXG5cdFxuXHRzZXRUaW1lb3V0ICgpPT5cblx0XHRyZXR1cm4gaWYgbm90IEBpc0FjdGl2ZVxuXHRcdEBpc0FjdGl2ZSA9IEBiZWluZ0Rlc3Ryb3llZCA9IGZhbHNlXG5cdFx0XHRcdFxuXHRcdEBub3RpY2VzTGlzdC5zcGxpY2UgQG5vdGljZXNMaXN0LmluZGV4T2YoQCksMVxuXHRcdEBlbHMuc3Vibm90aWNlLnJlbW92ZSgpXG5cdCwgYW5pbWF0aW9uU3BlZWQrMjBcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIkJyb3dzZXJOb3RpY2UgPSAoe0B0aXRsZSwgQHRleHR9KS0+XG5cdHJldHVybiBAIHVubGVzcyBOb3RpZmljYXRpb24/XG5cdGlmIE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uIGlzICdncmFudGVkJ1xuXHRcdEByZXZlYWwoKVxuXHRlbHNlXG5cdFx0Tm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbiAoc3RhdGUpPT4gQHJldmVhbCgpIHVubGVzcyBzdGF0ZSBpc250ICdncmFudGVkJ1xuXG5cdHJldHVybiBAXG5cblxuQnJvd3Nlck5vdGljZTo6cmV2ZWFsID0gKCktPlxuXHRAbm90aWNlID0gbmV3IE5vdGlmaWNhdGlvbihAdGl0bGUsIHsnYm9keSc6QHRleHR9KSIsIntcbiAgXCJuYW1lXCI6IFwiQGRhbmllbGthbGVuL3N1Ym5vdGljZXMtZW5naW5lXCIsXG4gIFwidmVyc2lvblwiOiBcIjMuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBub3RpY2UgYW5kIHN1Ym5vdGljZSBkaXNwbGF5IHN5c3RlbVwiLFxuICBcIm1haW5cIjogXCJkaXN0L3N1Ym5vdGljZXMuanNcIixcbiAgXCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3N1Ym5vdGljZXMtZW5naW5lXCIsXG4gIFwiYXV0aG9yXCI6IFwiZGFuaWVsa2FsZW5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwb3N0dmVyc2lvblwiOiBcIm5wbSBydW4gYnVpbGQgJiYgZ2l0IGFkZCAuICYmIGdpdCBjb21taXQgLW0gJ1tCdWlsZF0nXCIsXG4gICAgXCJwb3N0cHVibGlzaFwiOiBcImdpdCBwdXNoXCIsXG4gICAgXCJidWlsZFwiOiBcIm5wbSBydW4gY29tcGlsZSAmJiBucG0gcnVuIG1pbmlmeVwiLFxuICAgIFwiY29tcGlsZVwiOiBcInNpbXBseWltcG9ydCBidW5kbGUgLWQgLS11bWQgbm90aWZ5IHNyYy9pbmRleC5jb2ZmZWUgPiBkaXN0L3N1Ym5vdGljZXMuanNcIixcbiAgICBcIm1pbmlmeVwiOiBcImNsb3N1cmUtc2VydmljZSBkaXN0L3N1Ym5vdGljZXMuanMgPiBkaXN0L3N1Ym5vdGljZXMubWluLmpzXCIsXG4gICAgXCJ3YXRjaFwiOiBcInNpbXBseXdhdGNoIC1nICdzcmMvKicgLXggJ25wbSBydW4gY29tcGlsZSAtcydcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjbG9zdXJlLWNvbXBpbGVyLXNlcnZpY2VcIjogXCJeMC41LjBcIixcbiAgICBcImNvZmZlZS1zY3JpcHRcIjogXCJeMS4xMC4wXCIsXG4gICAgXCJqc29uXCI6IFwiXjkuMC40XCIsXG4gICAgXCJzaW1wbHlpbXBvcnRcIjogXCJeNC4wLjAtczM1XCIsXG4gICAgXCJzaW1wbHl3YXRjaFwiOiBcIl4zLjAuMC1sMlwiLFxuICAgIFwidWdsaWZ5XCI6IFwiKlwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImpxdWVyeVwiOiBcIl4zLjEuMVwiLFxuICAgIFwic21hcnQtZXh0ZW5kXCI6IFwiXjEuNy4zXCJcbiAgfVxufVxuIiwiZXh0ZW5kID0gcmVxdWlyZSAnLi9leHRlbmQnXG5cbm5vcm1hbGl6ZUtleXMgPSAoa2V5cyktPiBpZiBrZXlzXG5cdG91dHB1dCA9IHt9XG5cdGlmIHR5cGVvZiBrZXlzIGlzbnQgJ29iamVjdCdcblx0XHRvdXRwdXRba2V5c10gPSB0cnVlXG5cdGVsc2Vcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoa2V5cykgaWYgbm90IEFycmF5LmlzQXJyYXkoa2V5cylcblx0XHRvdXRwdXRba2V5XSA9IHRydWUgZm9yIGtleSBpbiBrZXlzXG5cblx0cmV0dXJuIG91dHB1dFxuXG5cbm5ld0J1aWxkZXIgPSAoaXNCYXNlKS0+XG5cdGJ1aWxkZXIgPSAodGFyZ2V0KS0+XG5cdFx0RVhQQU5EX0FSR1VNRU5UUyhzb3VyY2VzKVxuXHRcdGlmIGJ1aWxkZXIub3B0aW9ucy50YXJnZXRcblx0XHRcdHRoZVRhcmdldCA9IGJ1aWxkZXIub3B0aW9ucy50YXJnZXRcblx0XHRlbHNlXG5cdFx0XHR0aGVUYXJnZXQgPSB0YXJnZXRcblx0XHRcdHNvdXJjZXMuc2hpZnQoKVxuXHRcdFxuXHRcdGV4dGVuZChidWlsZGVyLm9wdGlvbnMsIHRoZVRhcmdldCwgc291cmNlcylcblx0XG5cdGJ1aWxkZXIuaXNCYXNlID0gdHJ1ZSBpZiBpc0Jhc2Vcblx0YnVpbGRlci5vcHRpb25zID0ge31cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYnVpbGRlciwgbW9kaWZpZXJzKVxuXHRyZXR1cm4gYnVpbGRlclxuXG5cbm1vZGlmaWVycyA9IFxuXHQnZGVlcCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5kZWVwID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J293bic6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5vd24gPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnYWxsb3dOdWxsJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLmFsbG93TnVsbCA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdudWxsRGVsZXRlcyc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5udWxsRGVsZXRlcyA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdjb25jYXQnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMuY29uY2F0ID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J2Nsb25lJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLnRhcmdldCA9IHt9XG5cdFx0cmV0dXJuIF9cblxuXHQnbm90RGVlcCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLm5vdERlZXAgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCdkZWVwT25seSc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLmRlZXBPbmx5ID0gbm9ybWFsaXplS2V5cyhrZXlzKVx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXHQna2V5cyc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoa2V5cyktPlxuXHRcdFx0Xy5vcHRpb25zLmtleXMgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCdub3RLZXlzJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChrZXlzKS0+XG5cdFx0XHRfLm9wdGlvbnMubm90S2V5cyA9IG5vcm1hbGl6ZUtleXMoa2V5cylcdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblx0J3RyYW5zZm9ybSc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAodHJhbnNmb3JtKS0+XG5cdFx0XHRpZiB0eXBlb2YgdHJhbnNmb3JtIGlzICdmdW5jdGlvbidcblx0XHRcdFx0Xy5vcHRpb25zLmdsb2JhbFRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuXHRcdFx0ZWxzZSBpZiB0cmFuc2Zvcm0gYW5kIHR5cGVvZiB0cmFuc2Zvcm0gaXMgJ29iamVjdCdcblx0XHRcdFx0Xy5vcHRpb25zLnRyYW5zZm9ybXMgPSB0cmFuc2Zvcm1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXG5cdCdmaWx0ZXInOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGZpbHRlciktPlxuXHRcdFx0aWYgdHlwZW9mIGZpbHRlciBpcyAnZnVuY3Rpb24nXG5cdFx0XHRcdF8ub3B0aW9ucy5nbG9iYWxGaWx0ZXIgPSBmaWx0ZXJcblx0XHRcdGVsc2UgaWYgZmlsdGVyIGFuZCB0eXBlb2YgZmlsdGVyIGlzICdvYmplY3QnXG5cdFx0XHRcdF8ub3B0aW9ucy5maWx0ZXJzID0gZmlsdGVyXG5cdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBuZXdCdWlsZGVyKHRydWUpXG5leHBvcnRzLnZlcnNpb24gPSBpbXBvcnQgJy4uL3BhY2thZ2UuanNvbiAkIHZlcnNpb24nIiwie1xuICBcIl9mcm9tXCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gIFwiX2lkXCI6IFwic21hcnQtZXh0ZW5kQDEuNy4zXCIsXG4gIFwiX2luQnVuZGxlXCI6IGZhbHNlLFxuICBcIl9pbnRlZ3JpdHlcIjogXCJzaGE1MTItUFZFRVZZRER6eXhLQTBHTkZMY1dZNm9KU2tRS2RjMXc3MThlUXBFSGNOdVRTV1l4REszNUd6aHNHaE1rVVU4bEJJZ1NFRGJ0NXg1cDQ2cFJ6M0F1YkE9PVwiLFxuICBcIl9sb2NhdGlvblwiOiBcIi9zbWFydC1leHRlbmRcIixcbiAgXCJfcGhhbnRvbUNoaWxkcmVuXCI6IHt9LFxuICBcIl9yZXF1ZXN0ZWRcIjoge1xuICAgIFwidHlwZVwiOiBcInRhZ1wiLFxuICAgIFwicmVnaXN0cnlcIjogdHJ1ZSxcbiAgICBcInJhd1wiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICAgIFwibmFtZVwiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICAgIFwiZXNjYXBlZE5hbWVcIjogXCJzbWFydC1leHRlbmRcIixcbiAgICBcInJhd1NwZWNcIjogXCJcIixcbiAgICBcInNhdmVTcGVjXCI6IG51bGwsXG4gICAgXCJmZXRjaFNwZWNcIjogXCJsYXRlc3RcIlxuICB9LFxuICBcIl9yZXF1aXJlZEJ5XCI6IFtcbiAgICBcIiNVU0VSXCIsXG4gICAgXCIvXCIsXG4gICAgXCIvc2ltcGx5d2F0Y2hcIlxuICBdLFxuICBcIl9yZXNvbHZlZFwiOiBcImh0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnL3NtYXJ0LWV4dGVuZC8tL3NtYXJ0LWV4dGVuZC0xLjcuMy50Z3pcIixcbiAgXCJfc2hhc3VtXCI6IFwiMGZlNGE0MjZjODYzOGY0OGY5OWI3Y2M4NWUyNzY3OTFlY2Y1YWYyYlwiLFxuICBcIl9zcGVjXCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gIFwiX3doZXJlXCI6IFwiL1VzZXJzL2RhbmllbGthbGVuL3NhbmRib3gvc3Vibm90aWNlcy1lbmdpbmVcIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcImRhbmllbGthbGVuXCJcbiAgfSxcbiAgXCJicm93c2VyXCI6IHtcbiAgICBcIi4vZGVidWdcIjogXCJkaXN0L3NtYXJ0LWV4dGVuZC5kZWJ1Zy5qc1wiLFxuICAgIFwiLi9kaXN0L3NtYXJ0LWV4dGVuZC5qc1wiOiBcInNyYy9pbmRleC5jb2ZmZWVcIlxuICB9LFxuICBcImJyb3dzZXJpZnlcIjoge1xuICAgIFwidHJhbnNmb3JtXCI6IFtcbiAgICAgIFwic2ltcGx5aW1wb3J0L2NvbXBhdFwiXG4gICAgXVxuICB9LFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3NtYXJ0LWV4dGVuZC9pc3N1ZXNcIlxuICB9LFxuICBcImJ1bmRsZURlcGVuZGVuY2llc1wiOiBmYWxzZSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZmFsYWZlbFwiOiBcIl4yLjEuMFwiXG4gIH0sXG4gIFwiZGVwcmVjYXRlZFwiOiBmYWxzZSxcbiAgXCJkZXNjcmlwdGlvblwiOiBcIk1lcmdlL2V4dGVuZCBvYmplY3RzIChzaGFsbG93L2RlZXApIHdpdGggZ2xvYmFsL2luZGl2aWR1YWwgZmlsdGVycyBhbmQgbW9yZSBmZWF0dXJlc1wiLFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJiYWRnZS1nZW5cIjogXCJeMS4wLjJcIixcbiAgICBcImJsdWViaXJkXCI6IFwiXjMuNC43XCIsXG4gICAgXCJjaGFpXCI6IFwiXjMuNS4wXCIsXG4gICAgXCJjb2ZmZWUtcmVnaXN0ZXJcIjogXCJeMC4xLjBcIixcbiAgICBcImNvZmZlZWlmeS1jYWNoZWRcIjogXCJeMi4xLjFcIixcbiAgICBcImV4dGVuZFwiOiBcIl4zLjAuMVwiLFxuICAgIFwiZ29vZ2xlLWNsb3N1cmUtY29tcGlsZXItanNcIjogXCJeMjAxNzA2MjYuMC4wXCIsXG4gICAgXCJtb2NoYVwiOiBcIl4zLjIuMFwiLFxuICAgIFwic2ltcGx5aW1wb3J0XCI6IFwiXjQuMC4wLXMyMVwiLFxuICAgIFwic2ltcGx5d2F0Y2hcIjogXCJeMy4wLjAtbDJcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIl4zLjAuMjRcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2RhbmllbGthbGVuL3NtYXJ0LWV4dGVuZCNyZWFkbWVcIixcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJleHRlbmRcIixcbiAgICBcImNsb25lXCIsXG4gICAgXCJmaWx0ZXJcIixcbiAgICBcInNlbGVjdGl2ZVwiLFxuICAgIFwibWVyZ2VcIixcbiAgICBcImFzc2lnblwiLFxuICAgIFwicHJvcGVydGllc1wiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIklTQ1wiLFxuICBcIm1haW5cIjogXCJkaXN0L3NtYXJ0LWV4dGVuZC5qc1wiLFxuICBcIm1vY2hhX29wdHNcIjogXCItdSB0ZGQgLS1jb21waWxlcnMgY29mZmVlOmNvZmZlZS1yZWdpc3RlciAtLXNsb3cgMTAwMCAtLXRpbWVvdXQgNTAwMFwiLFxuICBcIm5hbWVcIjogXCJzbWFydC1leHRlbmRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdCtodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vc21hcnQtZXh0ZW5kLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcIm1rZGlyIC1wIGRpc3QvOyBucG0gcnVuIGJ1aWxkOmRlYnVnICYmIG5wbSBydW4gYnVpbGQ6cmVsZWFzZVwiLFxuICAgIFwiYnVpbGQ6ZGVidWdcIjogXCJzaW1wbHlpbXBvcnQgYnVuZGxlIHNyYy9pbmRleC5jb2ZmZWUgLWQgLS10YXJnZXQgbm9kZSAtLXVtZCBzbWFydC1leHRlbmQgPiBkaXN0L3NtYXJ0LWV4dGVuZC5kZWJ1Zy5qc1wiLFxuICAgIFwiYnVpbGQ6cmVsZWFzZVwiOiBcInNpbXBseWltcG9ydCBidW5kbGUgc3JjL2luZGV4LmNvZmZlZSAtLXRhcmdldCBub2RlIC0tdW1kIHNtYXJ0LWV4dGVuZCA+IGRpc3Qvc21hcnQtZXh0ZW5kLmpzXCIsXG4gICAgXCJjb3ZlcmFnZVwiOiBcIm5wbSBydW4gY292ZXJhZ2U6cnVuICYmIG5wbSBydW4gY292ZXJhZ2U6YmFkZ2VcIixcbiAgICBcImNvdmVyYWdlOmJhZGdlXCI6IFwiYmFkZ2UtZ2VuIC1kIC5jb25maWcvYmFkZ2VzL2NvdmVyYWdlXCIsXG4gICAgXCJjb3ZlcmFnZTpydW5cIjogXCJmb3JDb3ZlcmFnZT10cnVlIGlzdGFuYnVsIGNvdmVyIC0tZGlyIGNvdmVyYWdlIG5vZGVfbW9kdWxlcy9tb2NoYS9iaW4vX21vY2hhIC0tICRucG1fcGFja2FnZV9tb2NoYV9vcHRzXCIsXG4gICAgXCJwb3N0cHVibGlzaFwiOiBcImdpdCBwdXNoXCIsXG4gICAgXCJwb3N0dmVyc2lvblwiOiBcIm5wbSBydW4gYnVpbGQgJiYgZ2l0IGFkZCAuICYmIGdpdCBjb21taXQgLWEgLW0gJ1tCdWlsZF0nXCIsXG4gICAgXCJwcmVwdWJsaXNoT25seVwiOiBcIkNJPTEgbnBtIHJ1biB0ZXN0XCIsXG4gICAgXCJ0ZXN0XCI6IFwibW9jaGEgJG5wbV9wYWNrYWdlX21vY2hhX29wdHNcIixcbiAgICBcIndhdGNoXCI6IFwic2ltcGx5d2F0Y2ggLWcgJ3NyYy8qJyAteCAnbnBtIHJ1biBidWlsZDpkZWJ1ZyAtcydcIlxuICB9LFxuICBcInNpbXBseWltcG9ydFwiOiB7XG4gICAgXCJ0cmFuc2Zvcm1cIjogW1xuICAgICAgXCJjb2ZmZWVpZnktY2FjaGVkXCIsXG4gICAgICBcIi4vLmNvbmZpZy90cmFuc2Zvcm1zL21hY3Jvc1wiXG4gICAgXSxcbiAgICBcImZpbmFsVHJhbnNmb3JtXCI6IFtcbiAgICAgIFwiLmNvbmZpZy90cmFuc2Zvcm1zL21pbmlmeS1zdXBlclwiLFxuICAgICAgXCIuY29uZmlnL3RyYW5zZm9ybXMvbWluaWZ5LXJlbmFtZVwiLFxuICAgICAgXCIuY29uZmlnL3RyYW5zZm9ybXMvbWluaWZ5LXNpbXBsZVwiXG4gICAgXVxuICB9LFxuICBcInZlcnNpb25cIjogXCIxLjcuM1wiXG59XG4iLCJ2YXIgZXh0ZW5kLCBpc0FycmF5LCBpc09iamVjdCwgc2hvdWxkRGVlcEV4dGVuZDtcblxuaXNBcnJheSA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xufTtcblxuaXNPYmplY3QgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFyZ2V0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgaXNBcnJheSh0YXJnZXQpO1xufTtcblxuc2hvdWxkRGVlcEV4dGVuZCA9IGZ1bmN0aW9uKG9wdGlvbnMsIHRhcmdldCwgcGFyZW50S2V5KSB7XG4gIGlmIChvcHRpb25zLmRlZXApIHtcbiAgICBpZiAob3B0aW9ucy5ub3REZWVwKSB7XG4gICAgICByZXR1cm4gIW9wdGlvbnMubm90RGVlcFt0YXJnZXRdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5kZWVwT25seSkge1xuICAgIHJldHVybiBvcHRpb25zLmRlZXBPbmx5W3RhcmdldF0gfHwgcGFyZW50S2V5ICYmIHNob3VsZERlZXBFeHRlbmQob3B0aW9ucywgcGFyZW50S2V5KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQgPSBmdW5jdGlvbihvcHRpb25zLCB0YXJnZXQsIHNvdXJjZXMsIHBhcmVudEtleSkge1xuICB2YXIgaSwga2V5LCBsZW4sIHNvdXJjZSwgc291cmNlVmFsdWUsIHN1YlRhcmdldCwgdGFyZ2V0VmFsdWU7XG4gIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmIHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0YXJnZXQgPSB7fTtcbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgc291cmNlID0gc291cmNlc1tpXTtcbiAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICBzb3VyY2VWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICAgICAgICBpZiAoc291cmNlVmFsdWUgPT09IHRhcmdldCB8fCBzb3VyY2VWYWx1ZSA9PT0gdm9pZCAwIHx8IChzb3VyY2VWYWx1ZSA9PT0gbnVsbCAmJiAhb3B0aW9ucy5hbGxvd051bGwgJiYgIW9wdGlvbnMubnVsbERlbGV0ZXMpIHx8IChvcHRpb25zLmtleXMgJiYgIW9wdGlvbnMua2V5c1trZXldKSB8fCAob3B0aW9ucy5ub3RLZXlzICYmIG9wdGlvbnMubm90S2V5c1trZXldKSB8fCAob3B0aW9ucy5vd24gJiYgIXNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB8fCAob3B0aW9ucy5nbG9iYWxGaWx0ZXIgJiYgIW9wdGlvbnMuZ2xvYmFsRmlsdGVyKHNvdXJjZVZhbHVlLCBrZXksIHNvdXJjZSkpIHx8IChvcHRpb25zLmZpbHRlcnMgJiYgb3B0aW9ucy5maWx0ZXJzW2tleV0gJiYgIW9wdGlvbnMuZmlsdGVyc1trZXldKHNvdXJjZVZhbHVlLCBrZXksIHNvdXJjZSkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZVZhbHVlID09PSBudWxsICYmIG9wdGlvbnMubnVsbERlbGV0ZXMpIHtcbiAgICAgICAgICBkZWxldGUgdGFyZ2V0W2tleV07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZ2xvYmFsVHJhbnNmb3JtKSB7XG4gICAgICAgICAgc291cmNlVmFsdWUgPSBvcHRpb25zLmdsb2JhbFRyYW5zZm9ybShzb3VyY2VWYWx1ZSwga2V5LCBzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybXMgJiYgb3B0aW9ucy50cmFuc2Zvcm1zW2tleV0pIHtcbiAgICAgICAgICBzb3VyY2VWYWx1ZSA9IG9wdGlvbnMudHJhbnNmb3Jtc1trZXldKHNvdXJjZVZhbHVlLCBrZXksIHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChmYWxzZSkge1xuICAgICAgICAgIGNhc2UgIShvcHRpb25zLmNvbmNhdCAmJiBpc0FycmF5KHNvdXJjZVZhbHVlKSAmJiBpc0FycmF5KHRhcmdldFZhbHVlKSk6XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICEoc2hvdWxkRGVlcEV4dGVuZChvcHRpb25zLCBrZXksIHBhcmVudEtleSkgJiYgaXNPYmplY3Qoc291cmNlVmFsdWUpKTpcbiAgICAgICAgICAgIHN1YlRhcmdldCA9IGlzT2JqZWN0KHRhcmdldFZhbHVlKSA/IHRhcmdldFZhbHVlIDogaXNBcnJheShzb3VyY2VWYWx1ZSkgPyBbXSA6IHt9O1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBleHRlbmQob3B0aW9ucywgc3ViVGFyZ2V0LCBbc291cmNlVmFsdWVdLCBrZXkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUl1TGk5dWIyUmxYMjF2WkhWc1pYTXZjMjFoY25RdFpYaDBaVzVrTDNOeVl5OWxlSFJsYm1RdVkyOW1abVZsSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iXX0=