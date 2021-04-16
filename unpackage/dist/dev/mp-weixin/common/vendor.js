(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/store/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));
var _api = _interopRequireDefault(__webpack_require__(/*! ../common/api.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    token: '' },

  mutations: {
    // 设置登录的token
    SET_TOKEN: function SET_TOKEN(state, token) {
      console.log(token);
      state.token = token;
    } },

  actions: {
    /**
              * 获取用户登录的token
              * data: Object上送参数
              * 			clientId
              * 			code
              */
    setUserToken: function setUserToken(_ref, _ref2) {var commit = _ref.commit,state = _ref.state;var data = _ref2.data,callback = _ref2.callback;
      _api.default.getToken(data).then(function (res) {
        if (res && res.data.indexOf('?token=') != -1) {
          var token = res.data.split('?token=')[1];
          commit('SET_TOKEN', token);
          if (callback) {callback();}
        }
      });
    } },

  getters: {
    // 获取存储的token值
    getUserToken: function getUserToken(state) {return state.token;} } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 121:
/*!************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      // TODO
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum || rule.minimum) {
        result = 'rangeNumber';
      } else if (rule.maxLength || rule.minLength) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var
    range = rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var

    minimum = rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ? 'exclusiveMinimum' : 'minimum']);
    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ? 'exclusiveMaximum' : 'maximum']);
    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {return keys2.indexOf(key) < 0;});
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 13:
/*!*******************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/common/api.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  // 登录
  login: function login(params) {
    return _request.default.httpRequest("/api/auth/accessCode", "POST", params);
  },
  getToken: function getToken(params) {
    return _request.default.httpRequest("/api/sso/login", "GET", params);
  },
  // -----------------------------个人中心------------------------------------
  // 获取个人信息
  getCurrentUser: function getCurrentUser(params) {
    return _request.default.httpTokenRequest("/guns-cloud-system/entUser/getCurrentUser", "GET");
  },
  // 修改个人信息
  saveCurrentUser: function saveCurrentUser(params) {
    return _request.default.httpTokenRequest("/guns-cloud-system/entUser/saveCurrentUser", "POST", params);
  },
  // 修改密码
  updatePwd: function updatePwd(params) {
    return _request.default.httpTokenRequest("/guns-cloud-system/entUser/updatePassword", "POST", params);
  },


  // ---------------------------首页----------------------------------
  // 筛选待检测项目
  queryList: function queryList(params) {
    return _request.default.httpRequest("/guns-cloud-config/projectDevice/queryList", "GET", params);
  } };exports.default = _default;

/***/ }),

/***/ 14:
/*!***********************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/common/request.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../store/index.js */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 全局请求封装
var baseUrl = 'http://47.114.76.25:9505';
// 不需要token的请求
var httpRequest = function httpRequest(url, method, params) {
  uni.showLoading({
    title: "加载中" });

  var httpDefaultOpts = {
    url: baseUrl + url,
    data: params,
    method: method,
    header: method == 'GET' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8" } :
    {
      'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'Content-Type': 'application/json; charset=UTF-8' },

    dataType: 'json' };

  var promise = new Promise(function (resolve, reject) {
    uni.request(httpDefaultOpts).then(
    function (res) {
      resolve(res[1]);
    }).
    catch(
    function (response) {
      reject(response);
    });

    uni.hideLoading();
  });
  return promise;
};
//带Token请求
var httpTokenRequest = function httpTokenRequest(url, method, params) {
  uni.showLoading({
    title: "加载中" });

  var token = _index.default.state.token ? _index.default.state.token : '';
  var httpDefaultOpts = {
    url: baseUrl + url,
    data: params,
    method: method,
    header: method == 'GET' ? {
      'Authorization': token,
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8" } :
    {
      'Authorization': token,
      'X-Requested-With': 'XMLHttpRequest',
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      "Content-Type": "application/json; charset=UTF-8" },

    dataType: 'json' };

  var promise = new Promise(function (resolve, reject) {
    uni.request(httpDefaultOpts).then(
    function (res) {
      resolve(res[1]);
    }).
    catch(
    function (response) {
      reject(response);
    });

    uni.hideLoading();
  });
  return promise;
};var _default =
{
  baseUrl: baseUrl,
  httpRequest: httpRequest,
  httpTokenRequest: httpTokenRequest };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!***********************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 16));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 17));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 21));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 22));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 26));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 27));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 28));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 29));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 30));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 31));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 32));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 19));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 18));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 33));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 20));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 34));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 35));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 36));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 37));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 38));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 39);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 40));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 41));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 42));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**********************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/mixin/mixin.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/request/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 18));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 171:
/*!***********************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/util/emitter.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 18:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/deepMerge.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 186:
/*!******************************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uni_modules/uni-easyinput/components/uni-easyinput/common.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.throttle = exports.debounce = void 0; /**
                                                                                                                          * @desc 函数防抖
                                                                                                                          * @param func 目标函数
                                                                                                                          * @param wait 延迟执行毫秒数
                                                                                                                          * @param immediate true - 立即执行， false - 延迟执行
                                                                                                                          */
var debounce = function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timer;
  console.log(1);
  return function () {
    console.log(123);
    var context = this,
    args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
};
/**
    * @desc 函数节流
    * @param func 函数
    * @param wait 延迟执行毫秒数
    * @param type 1 使用表时间戳，在时间段开始的时候触发 2 使用表定时器，在时间段结束的时候触发
    */exports.debounce = debounce;
var throttle = function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var previous = 0;
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (type === 1) {
      var now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
};exports.throttle = throttle;

/***/ }),

/***/ 19:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/deepClone.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/test.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 208:
/*!*********************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 21:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/queryParams.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 22:
/*!*************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/route.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 24);

/***/ }),

/***/ 24:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 25);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 25:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 26:
/*!******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/timeFormat.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 27:
/*!****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/timeFrom.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 28:
/*!*********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/colorGradient.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 29:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/guid.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!*************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/color.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 31:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/type2icon.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 32:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/randomArray.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 33:
/*!***************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/addUnit.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 34:
/*!**************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/random.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 35:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/trim.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 36:
/*!*************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/toast.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/getParent.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 38:
/*!***************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/$parent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 39:
/*!***********************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/sys.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!****************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/debounce.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 41:
/*!****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/function/throttle.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 42:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/config/config.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-03-17
var version = '1.8.4';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 43:
/*!************************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/uview-ui/libs/config/zIndex.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 50:
/*!****************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/static/js/jsencrypt.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (true)
  module.exports = factory();else
  {}
})(window, function () {
  return (/******/function () {// webpackBootstrap
      /******/"use strict";
      // 用来替换 navigator
      var navigator2 = {
        appName: 'Netscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' };


      //  用来替换window
      var window2 = {
        ASN1: null,
        Base64: null,
        Hex: null,
        crypto: null,
        href: null };

      /******/var __webpack_modules__ = {

        /***/"./lib/JSEncrypt.js":
        /*!**************************!*\
                                     !*** ./lib/JSEncrypt.js ***!
                                     \**************************/
        /***/function libJSEncryptJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"JSEncrypt\": () => (/* binding */ JSEncrypt)\n/* harmony export */ });\n/* harmony import */ var _lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jsbn/base64 */ \"./lib/lib/jsbn/base64.js\");\n/* harmony import */ var _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSEncryptRSAKey */ \"./lib/JSEncryptRSAKey.js\");\n/* harmony import */ var _version_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version.json */ \"./lib/version.json\");\n\n\n\n/**\n *\n * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour\n * possible parameters are:\n * - default_key_size        {number}  default: 1024 the key size in bit\n * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent\n * - log                     {boolean} default: false whether log warn/error or not\n * @constructor\n */\nvar JSEncrypt = /** @class */ (function () {\n    function JSEncrypt(options) {\n        options = options || {};\n        this.default_key_size = options.default_key_size ? parseInt(options.default_key_size, 10) : 1024;\n        this.default_public_exponent = options.default_public_exponent || \"010001\"; // 65537 default openssl public exponent for rsa key type\n        this.log = options.log || false;\n        // The private and public key.\n        this.key = null;\n    }\n    /**\n     * Method to set the rsa key parameter (one method is enough to set both the public\n     * and the private key, since the private key contains the public key paramenters)\n     * Log a warning if logs are enabled\n     * @param {Object|string} key the pem encoded string or an object (with or without header/footer)\n     * @public\n     */\n    JSEncrypt.prototype.setKey = function (key) {\n        if (this.log && this.key) {\n            console.warn(\"A key was already set, overriding existing.\");\n        }\n        this.key = new _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__.JSEncryptRSAKey(key);\n    };\n    /**\n     * Proxy method for setKey, for api compatibility\n     * @see setKey\n     * @public\n     */\n    JSEncrypt.prototype.setPrivateKey = function (privkey) {\n        // Create the key.\n        this.setKey(privkey);\n    };\n    /**\n     * Proxy method for setKey, for api compatibility\n     * @see setKey\n     * @public\n     */\n    JSEncrypt.prototype.setPublicKey = function (pubkey) {\n        // Sets the public key.\n        this.setKey(pubkey);\n    };\n    /**\n     * Proxy method for RSAKey object's decrypt, decrypt the string using the private\n     * components of the rsa key object. Note that if the object was not set will be created\n     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor\n     * @param {string} str base64 encoded crypted string to decrypt\n     * @return {string} the decrypted string\n     * @public\n     */\n    JSEncrypt.prototype.decrypt = function (str) {\n        // Return the decrypted string.\n        try {\n            return this.getKey().decrypt((0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.b64tohex)(str));\n        }\n        catch (ex) {\n            return false;\n        }\n    };\n    /**\n     * Proxy method for RSAKey object's encrypt, encrypt the string using the public\n     * components of the rsa key object. Note that if the object was not set will be created\n     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor\n     * @param {string} str the string to encrypt\n     * @return {string} the encrypted string encoded in base64\n     * @public\n     */\n    JSEncrypt.prototype.encrypt = function (str) {\n        // Return the encrypted string.\n        try {\n            return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getKey().encrypt(str));\n        }\n        catch (ex) {\n            return false;\n        }\n    };\n    /**\n     * Proxy method for RSAKey object's sign.\n     * @param {string} str the string to sign\n     * @param {function} digestMethod hash method\n     * @param {string} digestName the name of the hash algorithm\n     * @return {string} the signature encoded in base64\n     * @public\n     */\n    JSEncrypt.prototype.sign = function (str, digestMethod, digestName) {\n        // return the RSA signature of 'str' in 'hex' format.\n        try {\n            return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getKey().sign(str, digestMethod, digestName));\n        }\n        catch (ex) {\n            return false;\n        }\n    };\n    /**\n     * Proxy method for RSAKey object's verify.\n     * @param {string} str the string to verify\n     * @param {string} signature the signature encoded in base64 to compare the string to\n     * @param {function} digestMethod hash method\n     * @return {boolean} whether the data and signature match\n     * @public\n     */\n    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {\n        // Return the decrypted 'digest' of the signature.\n        try {\n            return this.getKey().verify(str, (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.b64tohex)(signature), digestMethod);\n        }\n        catch (ex) {\n            return false;\n        }\n    };\n    /**\n     * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object\n     * will be created and returned\n     * @param {callback} [cb] the callback to be called if we want the key to be generated\n     * in an async fashion\n     * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object\n     * @public\n     */\n    JSEncrypt.prototype.getKey = function (cb) {\n        // Only create new if it does not exist.\n        if (!this.key) {\n            // Get a new private key.\n            this.key = new _JSEncryptRSAKey__WEBPACK_IMPORTED_MODULE_1__.JSEncryptRSAKey();\n            if (cb && {}.toString.call(cb) === \"[object Function]\") {\n                this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);\n                return;\n            }\n            // Generate the key.\n            this.key.generate(this.default_key_size, this.default_public_exponent);\n        }\n        return this.key;\n    };\n    /**\n     * Returns the pem encoded representation of the private key\n     * If the key doesn't exists a new key will be created\n     * @returns {string} pem encoded representation of the private key WITH header and footer\n     * @public\n     */\n    JSEncrypt.prototype.getPrivateKey = function () {\n        // Return the private representation of this key.\n        return this.getKey().getPrivateKey();\n    };\n    /**\n     * Returns the pem encoded representation of the private key\n     * If the key doesn't exists a new key will be created\n     * @returns {string} pem encoded representation of the private key WITHOUT header and footer\n     * @public\n     */\n    JSEncrypt.prototype.getPrivateKeyB64 = function () {\n        // Return the private representation of this key.\n        return this.getKey().getPrivateBaseKeyB64();\n    };\n    /**\n     * Returns the pem encoded representation of the public key\n     * If the key doesn't exists a new key will be created\n     * @returns {string} pem encoded representation of the public key WITH header and footer\n     * @public\n     */\n    JSEncrypt.prototype.getPublicKey = function () {\n        // Return the private representation of this key.\n        return this.getKey().getPublicKey();\n    };\n    /**\n     * Returns the pem encoded representation of the public key\n     * If the key doesn't exists a new key will be created\n     * @returns {string} pem encoded representation of the public key WITHOUT header and footer\n     * @public\n     */\n    JSEncrypt.prototype.getPublicKeyB64 = function () {\n        // Return the private representation of this key.\n        return this.getKey().getPublicBaseKeyB64();\n    };\n    JSEncrypt.version = _version_json__WEBPACK_IMPORTED_MODULE_2__.version;\n    return JSEncrypt;\n}());\n\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/JSEncrypt.js?");

          /***/},

        /***/"./lib/JSEncryptRSAKey.js":
        /*!********************************!*\
                                           !*** ./lib/JSEncryptRSAKey.js ***!
                                           \********************************/
        /***/function libJSEncryptRSAKeyJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"JSEncryptRSAKey\": () => (/* binding */ JSEncryptRSAKey)\n/* harmony export */ });\n/* harmony import */ var _lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/jsbn/base64 */ \"./lib/lib/jsbn/base64.js\");\n/* harmony import */ var _lib_asn1js_hex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/asn1js/hex */ \"./lib/lib/asn1js/hex.js\");\n/* harmony import */ var _lib_asn1js_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/asn1js/base64 */ \"./lib/lib/asn1js/base64.js\");\n/* harmony import */ var _lib_asn1js_asn1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/asn1js/asn1 */ \"./lib/lib/asn1js/asn1.js\");\n/* harmony import */ var _lib_jsbn_rsa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/jsbn/rsa */ \"./lib/lib/jsbn/rsa.js\");\n/* harmony import */ var _lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/jsbn/jsbn */ \"./lib/lib/jsbn/jsbn.js\");\n/* harmony import */ var _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/jsrsasign/asn1-1.0 */ \"./lib/lib/jsrsasign/asn1-1.0.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n\n\n\n\n/**\n * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.\n * This object is just a decorator for parsing the key parameter\n * @param {string|Object} key - The key in string format, or an object containing\n * the parameters needed to build a RSAKey object.\n * @constructor\n */\nvar JSEncryptRSAKey = /** @class */ (function (_super) {\n    __extends(JSEncryptRSAKey, _super);\n    function JSEncryptRSAKey(key) {\n        var _this = _super.call(this) || this;\n        // Call the super constructor.\n        //  RSAKey.call(this);\n        // If a key key was provided.\n        if (key) {\n            // If this is a string...\n            if (typeof key === \"string\") {\n                _this.parseKey(key);\n            }\n            else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) ||\n                JSEncryptRSAKey.hasPublicKeyProperty(key)) {\n                // Set the values for the key.\n                _this.parsePropertiesFrom(key);\n            }\n        }\n        return _this;\n    }\n    /**\n     * Method to parse a pem encoded string containing both a public or private key.\n     * The method will translate the pem encoded string in a der encoded string and\n     * will parse private key and public key parameters. This method accepts public key\n     * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).\n     *\n     * @todo Check how many rsa formats use the same format of pkcs #1.\n     *\n     * The format is defined as:\n     * PublicKeyInfo ::= SEQUENCE {\n     *   algorithm       AlgorithmIdentifier,\n     *   PublicKey       BIT STRING\n     * }\n     * Where AlgorithmIdentifier is:\n     * AlgorithmIdentifier ::= SEQUENCE {\n     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm\n     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)\n     * }\n     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING\n     * RSAPublicKey ::= SEQUENCE {\n     *   modulus           INTEGER,  -- n\n     *   publicExponent    INTEGER   -- e\n     * }\n     * it's possible to examine the structure of the keys obtained from openssl using\n     * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/\n     * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer\n     * @private\n     */\n    JSEncryptRSAKey.prototype.parseKey = function (pem) {\n        try {\n            var modulus = 0;\n            var public_exponent = 0;\n            var reHex = /^\\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\\s*)+$/;\n            var der = reHex.test(pem) ? _lib_asn1js_hex__WEBPACK_IMPORTED_MODULE_1__.Hex.decode(pem) : _lib_asn1js_base64__WEBPACK_IMPORTED_MODULE_2__.Base64.unarmor(pem);\n            var asn1 = _lib_asn1js_asn1__WEBPACK_IMPORTED_MODULE_3__.ASN1.decode(der);\n            // Fixes a bug with OpenSSL 1.0+ private keys\n            if (asn1.sub.length === 3) {\n                asn1 = asn1.sub[2].sub[0];\n            }\n            if (asn1.sub.length === 9) {\n                // Parse the private key.\n                modulus = asn1.sub[1].getHexStringValue(); // bigint\n                this.n = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(modulus, 16);\n                public_exponent = asn1.sub[2].getHexStringValue(); // int\n                this.e = parseInt(public_exponent, 16);\n                var private_exponent = asn1.sub[3].getHexStringValue(); // bigint\n                this.d = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(private_exponent, 16);\n                var prime1 = asn1.sub[4].getHexStringValue(); // bigint\n                this.p = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(prime1, 16);\n                var prime2 = asn1.sub[5].getHexStringValue(); // bigint\n                this.q = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(prime2, 16);\n                var exponent1 = asn1.sub[6].getHexStringValue(); // bigint\n                this.dmp1 = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(exponent1, 16);\n                var exponent2 = asn1.sub[7].getHexStringValue(); // bigint\n                this.dmq1 = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(exponent2, 16);\n                var coefficient = asn1.sub[8].getHexStringValue(); // bigint\n                this.coeff = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(coefficient, 16);\n            }\n            else if (asn1.sub.length === 2) {\n                // Parse the public key.\n                var bit_string = asn1.sub[1];\n                var sequence = bit_string.sub[0];\n                modulus = sequence.sub[0].getHexStringValue();\n                this.n = (0,_lib_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_5__.parseBigInt)(modulus, 16);\n                public_exponent = sequence.sub[1].getHexStringValue();\n                this.e = parseInt(public_exponent, 16);\n            }\n            else {\n                return false;\n            }\n            return true;\n        }\n        catch (ex) {\n            return false;\n        }\n    };\n    /**\n     * Translate rsa parameters in a hex encoded string representing the rsa key.\n     *\n     * The translation follow the ASN.1 notation :\n     * RSAPrivateKey ::= SEQUENCE {\n     *   version           Version,\n     *   modulus           INTEGER,  -- n\n     *   publicExponent    INTEGER,  -- e\n     *   privateExponent   INTEGER,  -- d\n     *   prime1            INTEGER,  -- p\n     *   prime2            INTEGER,  -- q\n     *   exponent1         INTEGER,  -- d mod (p1)\n     *   exponent2         INTEGER,  -- d mod (q-1)\n     *   coefficient       INTEGER,  -- (inverse of q) mod p\n     * }\n     * @returns {string}  DER Encoded String representing the rsa private key\n     * @private\n     */\n    JSEncryptRSAKey.prototype.getPrivateBaseKey = function () {\n        var options = {\n            array: [\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ int: 0 }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.n }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ int: this.e }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.d }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.p }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.q }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.dmp1 }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.dmq1 }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.coeff })\n            ]\n        };\n        var seq = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence(options);\n        return seq.getEncodedHex();\n    };\n    /**\n     * base64 (pem) encoded version of the DER encoded representation\n     * @returns {string} pem encoded representation without header and footer\n     * @public\n     */\n    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function () {\n        return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getPrivateBaseKey());\n    };\n    /**\n     * Translate rsa parameters in a hex encoded string representing the rsa public key.\n     * The representation follow the ASN.1 notation :\n     * PublicKeyInfo ::= SEQUENCE {\n     *   algorithm       AlgorithmIdentifier,\n     *   PublicKey       BIT STRING\n     * }\n     * Where AlgorithmIdentifier is:\n     * AlgorithmIdentifier ::= SEQUENCE {\n     *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm\n     *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)\n     * }\n     * and PublicKey is a SEQUENCE encapsulated in a BIT STRING\n     * RSAPublicKey ::= SEQUENCE {\n     *   modulus           INTEGER,  -- n\n     *   publicExponent    INTEGER   -- e\n     * }\n     * @returns {string} DER Encoded String representing the rsa public key\n     * @private\n     */\n    JSEncryptRSAKey.prototype.getPublicBaseKey = function () {\n        var first_sequence = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({\n            array: [\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERObjectIdentifier({ oid: \"1.2.840.113549.1.1.1\" }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERNull()\n            ]\n        });\n        var second_sequence = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({\n            array: [\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ bigint: this.n }),\n                new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERInteger({ int: this.e })\n            ]\n        });\n        var bit_string = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERBitString({\n            hex: \"00\" + second_sequence.getEncodedHex()\n        });\n        var seq = new _lib_jsrsasign_asn1_1_0__WEBPACK_IMPORTED_MODULE_6__.KJUR.asn1.DERSequence({\n            array: [\n                first_sequence,\n                bit_string\n            ]\n        });\n        return seq.getEncodedHex();\n    };\n    /**\n     * base64 (pem) encoded version of the DER encoded representation\n     * @returns {string} pem encoded representation without header and footer\n     * @public\n     */\n    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function () {\n        return (0,_lib_jsbn_base64__WEBPACK_IMPORTED_MODULE_0__.hex2b64)(this.getPublicBaseKey());\n    };\n    /**\n     * wrap the string in block of width chars. The default value for rsa keys is 64\n     * characters.\n     * @param {string} str the pem encoded string without header and footer\n     * @param {Number} [width=64] - the length the string has to be wrapped at\n     * @returns {string}\n     * @private\n     */\n    JSEncryptRSAKey.wordwrap = function (str, width) {\n        width = width || 64;\n        if (!str) {\n            return str;\n        }\n        var regex = \"(.{1,\" + width + \"})( +|$\\n?)|(.{1,\" + width + \"})\";\n        return str.match(RegExp(regex, \"g\")).join(\"\\n\");\n    };\n    /**\n     * Retrieve the pem encoded private key\n     * @returns {string} the pem encoded private key with header/footer\n     * @public\n     */\n    JSEncryptRSAKey.prototype.getPrivateKey = function () {\n        var key = \"-----BEGIN RSA PRIVATE KEY-----\\n\";\n        key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + \"\\n\";\n        key += \"-----END RSA PRIVATE KEY-----\";\n        return key;\n    };\n    /**\n     * Retrieve the pem encoded public key\n     * @returns {string} the pem encoded public key with header/footer\n     * @public\n     */\n    JSEncryptRSAKey.prototype.getPublicKey = function () {\n        var key = \"-----BEGIN PUBLIC KEY-----\\n\";\n        key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + \"\\n\";\n        key += \"-----END PUBLIC KEY-----\";\n        return key;\n    };\n    /**\n     * Check if the object contains the necessary parameters to populate the rsa modulus\n     * and public exponent parameters.\n     * @param {Object} [obj={}] - An object that may contain the two public key\n     * parameters\n     * @returns {boolean} true if the object contains both the modulus and the public exponent\n     * properties (n and e)\n     * @todo check for types of n and e. N should be a parseable bigInt object, E should\n     * be a parseable integer number\n     * @private\n     */\n    JSEncryptRSAKey.hasPublicKeyProperty = function (obj) {\n        obj = obj || {};\n        return (obj.hasOwnProperty(\"n\") &&\n            obj.hasOwnProperty(\"e\"));\n    };\n    /**\n     * Check if the object contains ALL the parameters of an RSA key.\n     * @param {Object} [obj={}] - An object that may contain nine rsa key\n     * parameters\n     * @returns {boolean} true if the object contains all the parameters needed\n     * @todo check for types of the parameters all the parameters but the public exponent\n     * should be parseable bigint objects, the public exponent should be a parseable integer number\n     * @private\n     */\n    JSEncryptRSAKey.hasPrivateKeyProperty = function (obj) {\n        obj = obj || {};\n        return (obj.hasOwnProperty(\"n\") &&\n            obj.hasOwnProperty(\"e\") &&\n            obj.hasOwnProperty(\"d\") &&\n            obj.hasOwnProperty(\"p\") &&\n            obj.hasOwnProperty(\"q\") &&\n            obj.hasOwnProperty(\"dmp1\") &&\n            obj.hasOwnProperty(\"dmq1\") &&\n            obj.hasOwnProperty(\"coeff\"));\n    };\n    /**\n     * Parse the properties of obj in the current rsa object. Obj should AT LEAST\n     * include the modulus and public exponent (n, e) parameters.\n     * @param {Object} obj - the object containing rsa parameters\n     * @private\n     */\n    JSEncryptRSAKey.prototype.parsePropertiesFrom = function (obj) {\n        this.n = obj.n;\n        this.e = obj.e;\n        if (obj.hasOwnProperty(\"d\")) {\n            this.d = obj.d;\n            this.p = obj.p;\n            this.q = obj.q;\n            this.dmp1 = obj.dmp1;\n            this.dmq1 = obj.dmq1;\n            this.coeff = obj.coeff;\n        }\n    };\n    return JSEncryptRSAKey;\n}(_lib_jsbn_rsa__WEBPACK_IMPORTED_MODULE_4__.RSAKey));\n\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/JSEncryptRSAKey.js?");

          /***/},

        /***/"./lib/index.js":
        /*!**********************!*\
                                 !*** ./lib/index.js ***!
                                 \**********************/
        /***/function libIndexJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"JSEncrypt\": () => (/* reexport safe */ _JSEncrypt__WEBPACK_IMPORTED_MODULE_0__.JSEncrypt),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _JSEncrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSEncrypt */ \"./lib/JSEncrypt.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_JSEncrypt__WEBPACK_IMPORTED_MODULE_0__.JSEncrypt);\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/index.js?");

          /***/},

        /***/"./lib/lib/asn1js/asn1.js":
        /*!********************************!*\
                                           !*** ./lib/lib/asn1js/asn1.js ***!
                                           \********************************/
        /***/function libLibAsn1jsAsn1Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Stream\": () => (/* binding */ Stream),\n/* harmony export */   \"ASN1\": () => (/* binding */ ASN1),\n/* harmony export */   \"ASN1Tag\": () => (/* binding */ ASN1Tag)\n/* harmony export */ });\n/* harmony import */ var _int10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./int10 */ \"./lib/lib/asn1js/int10.js\");\n// ASN.1 JavaScript decoder\n// Copyright (c) 2008-2014 Lapo Luchini <lapo@lapo.it>\n// Permission to use, copy, modify, and/or distribute this software for any\n// purpose with or without fee is hereby granted, provided that the above\n// copyright notice and this permission notice appear in all copies.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\n// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\n// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\n// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\n// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\n// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\n// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */\n/*global oids */\n\nvar ellipsis = \"\\u2026\";\nvar reTimeS = /^(\\d\\d)(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])([01]\\d|2[0-3])(?:([0-5]\\d)(?:([0-5]\\d)(?:[.,](\\d{1,3}))?)?)?(Z|[-+](?:[0]\\d|1[0-2])([0-5]\\d)?)?$/;\nvar reTimeL = /^(\\d\\d\\d\\d)(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])([01]\\d|2[0-3])(?:([0-5]\\d)(?:([0-5]\\d)(?:[.,](\\d{1,3}))?)?)?(Z|[-+](?:[0]\\d|1[0-2])([0-5]\\d)?)?$/;\nfunction stringCut(str, len) {\n    if (str.length > len) {\n        str = str.substring(0, len) + ellipsis;\n    }\n    return str;\n}\nvar Stream = /** @class */ (function () {\n    function Stream(enc, pos) {\n        this.hexDigits = \"0123456789ABCDEF\";\n        if (enc instanceof Stream) {\n            this.enc = enc.enc;\n            this.pos = enc.pos;\n        }\n        else {\n            // enc should be an array or a binary string\n            this.enc = enc;\n            this.pos = pos;\n        }\n    }\n    Stream.prototype.get = function (pos) {\n        if (pos === undefined) {\n            pos = this.pos++;\n        }\n        if (pos >= this.enc.length) {\n            throw new Error(\"Requesting byte offset \" + pos + \" on a stream of length \" + this.enc.length);\n        }\n        return (\"string\" === typeof this.enc) ? this.enc.charCodeAt(pos) : this.enc[pos];\n    };\n    Stream.prototype.hexByte = function (b) {\n        return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);\n    };\n    Stream.prototype.hexDump = function (start, end, raw) {\n        var s = \"\";\n        for (var i = start; i < end; ++i) {\n            s += this.hexByte(this.get(i));\n            if (raw !== true) {\n                switch (i & 0xF) {\n                    case 0x7:\n                        s += \"  \";\n                        break;\n                    case 0xF:\n                        s += \"\\n\";\n                        break;\n                    default:\n                        s += \" \";\n                }\n            }\n        }\n        return s;\n    };\n    Stream.prototype.isASCII = function (start, end) {\n        for (var i = start; i < end; ++i) {\n            var c = this.get(i);\n            if (c < 32 || c > 176) {\n                return false;\n            }\n        }\n        return true;\n    };\n    Stream.prototype.parseStringISO = function (start, end) {\n        var s = \"\";\n        for (var i = start; i < end; ++i) {\n            s += String.fromCharCode(this.get(i));\n        }\n        return s;\n    };\n    Stream.prototype.parseStringUTF = function (start, end) {\n        var s = \"\";\n        for (var i = start; i < end;) {\n            var c = this.get(i++);\n            if (c < 128) {\n                s += String.fromCharCode(c);\n            }\n            else if ((c > 191) && (c < 224)) {\n                s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));\n            }\n            else {\n                s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));\n            }\n        }\n        return s;\n    };\n    Stream.prototype.parseStringBMP = function (start, end) {\n        var str = \"\";\n        var hi;\n        var lo;\n        for (var i = start; i < end;) {\n            hi = this.get(i++);\n            lo = this.get(i++);\n            str += String.fromCharCode((hi << 8) | lo);\n        }\n        return str;\n    };\n    Stream.prototype.parseTime = function (start, end, shortYear) {\n        var s = this.parseStringISO(start, end);\n        var m = (shortYear ? reTimeS : reTimeL).exec(s);\n        if (!m) {\n            return \"Unrecognized time: \" + s;\n        }\n        if (shortYear) {\n            // to avoid querying the timer, use the fixed range [1970, 2069]\n            // it will conform with ITU X.400 [-10, +40] sliding window2 until 2030\n            m[1] = +m[1];\n            m[1] += (+m[1] < 70) ? 2000 : 1900;\n        }\n        s = m[1] + \"-\" + m[2] + \"-\" + m[3] + \" \" + m[4];\n        if (m[5]) {\n            s += \":\" + m[5];\n            if (m[6]) {\n                s += \":\" + m[6];\n                if (m[7]) {\n                    s += \".\" + m[7];\n                }\n            }\n        }\n        if (m[8]) {\n            s += \" UTC\";\n            if (m[8] != \"Z\") {\n                s += m[8];\n                if (m[9]) {\n                    s += \":\" + m[9];\n                }\n            }\n        }\n        return s;\n    };\n    Stream.prototype.parseInteger = function (start, end) {\n        var v = this.get(start);\n        var neg = (v > 127);\n        var pad = neg ? 255 : 0;\n        var len;\n        var s = \"\";\n        // skip unuseful bits (not allowed in DER)\n        while (v == pad && ++start < end) {\n            v = this.get(start);\n        }\n        len = end - start;\n        if (len === 0) {\n            return neg ? -1 : 0;\n        }\n        // show bit length of huge integers\n        if (len > 4) {\n            s = v;\n            len <<= 3;\n            while (((+s ^ pad) & 0x80) == 0) {\n                s = +s << 1;\n                --len;\n            }\n            s = \"(\" + len + \" bit)\\n\";\n        }\n        // decode the integer\n        if (neg) {\n            v = v - 256;\n        }\n        var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10(v);\n        for (var i = start + 1; i < end; ++i) {\n            n.mulAdd(256, this.get(i));\n        }\n        return s + n.toString();\n    };\n    Stream.prototype.parseBitString = function (start, end, maxLength) {\n        var unusedBit = this.get(start);\n        var lenBit = ((end - start - 1) << 3) - unusedBit;\n        var intro = \"(\" + lenBit + \" bit)\\n\";\n        var s = \"\";\n        for (var i = start + 1; i < end; ++i) {\n            var b = this.get(i);\n            var skip = (i == end - 1) ? unusedBit : 0;\n            for (var j = 7; j >= skip; --j) {\n                s += (b >> j) & 1 ? \"1\" : \"0\";\n            }\n            if (s.length > maxLength) {\n                return intro + stringCut(s, maxLength);\n            }\n        }\n        return intro + s;\n    };\n    Stream.prototype.parseOctetString = function (start, end, maxLength) {\n        if (this.isASCII(start, end)) {\n            return stringCut(this.parseStringISO(start, end), maxLength);\n        }\n        var len = end - start;\n        var s = \"(\" + len + \" byte)\\n\";\n        maxLength /= 2; // we work in bytes\n        if (len > maxLength) {\n            end = start + maxLength;\n        }\n        for (var i = start; i < end; ++i) {\n            s += this.hexByte(this.get(i));\n        }\n        if (len > maxLength) {\n            s += ellipsis;\n        }\n        return s;\n    };\n    Stream.prototype.parseOID = function (start, end, maxLength) {\n        var s = \"\";\n        var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();\n        var bits = 0;\n        for (var i = start; i < end; ++i) {\n            var v = this.get(i);\n            n.mulAdd(128, v & 0x7F);\n            bits += 7;\n            if (!(v & 0x80)) { // finished\n                if (s === \"\") {\n                    n = n.simplify();\n                    if (n instanceof _int10__WEBPACK_IMPORTED_MODULE_0__.Int10) {\n                        n.sub(80);\n                        s = \"2.\" + n.toString();\n                    }\n                    else {\n                        var m = n < 80 ? n < 40 ? 0 : 1 : 2;\n                        s = m + \".\" + (n - m * 40);\n                    }\n                }\n                else {\n                    s += \".\" + n.toString();\n                }\n                if (s.length > maxLength) {\n                    return stringCut(s, maxLength);\n                }\n                n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();\n                bits = 0;\n            }\n        }\n        if (bits > 0) {\n            s += \".incomplete\";\n        }\n        return s;\n    };\n    return Stream;\n}());\n\nvar ASN1 = /** @class */ (function () {\n    function ASN1(stream, header, length, tag, sub) {\n        if (!(tag instanceof ASN1Tag)) {\n            throw new Error(\"Invalid tag value.\");\n        }\n        this.stream = stream;\n        this.header = header;\n        this.length = length;\n        this.tag = tag;\n        this.sub = sub;\n    }\n    ASN1.prototype.typeName = function () {\n        switch (this.tag.tagClass) {\n            case 0: // universal\n                switch (this.tag.tagNumber) {\n                    case 0x00:\n                        return \"EOC\";\n                    case 0x01:\n                        return \"BOOLEAN\";\n                    case 0x02:\n                        return \"INTEGER\";\n                    case 0x03:\n                        return \"BIT_STRING\";\n                    case 0x04:\n                        return \"OCTET_STRING\";\n                    case 0x05:\n                        return \"NULL\";\n                    case 0x06:\n                        return \"OBJECT_IDENTIFIER\";\n                    case 0x07:\n                        return \"ObjectDescriptor\";\n                    case 0x08:\n                        return \"EXTERNAL\";\n                    case 0x09:\n                        return \"REAL\";\n                    case 0x0A:\n                        return \"ENUMERATED\";\n                    case 0x0B:\n                        return \"EMBEDDED_PDV\";\n                    case 0x0C:\n                        return \"UTF8String\";\n                    case 0x10:\n                        return \"SEQUENCE\";\n                    case 0x11:\n                        return \"SET\";\n                    case 0x12:\n                        return \"NumericString\";\n                    case 0x13:\n                        return \"PrintableString\"; // ASCII subset\n                    case 0x14:\n                        return \"TeletexString\"; // aka T61String\n                    case 0x15:\n                        return \"VideotexString\";\n                    case 0x16:\n                        return \"IA5String\"; // ASCII\n                    case 0x17:\n                        return \"UTCTime\";\n                    case 0x18:\n                        return \"GeneralizedTime\";\n                    case 0x19:\n                        return \"GraphicString\";\n                    case 0x1A:\n                        return \"VisibleString\"; // ASCII subset\n                    case 0x1B:\n                        return \"GeneralString\";\n                    case 0x1C:\n                        return \"UniversalString\";\n                    case 0x1E:\n                        return \"BMPString\";\n                }\n                return \"Universal_\" + this.tag.tagNumber.toString();\n            case 1:\n                return \"Application_\" + this.tag.tagNumber.toString();\n            case 2:\n                return \"[\" + this.tag.tagNumber.toString() + \"]\"; // Context\n            case 3:\n                return \"Private_\" + this.tag.tagNumber.toString();\n        }\n    };\n    ASN1.prototype.content = function (maxLength) {\n        if (this.tag === undefined) {\n            return null;\n        }\n        if (maxLength === undefined) {\n            maxLength = Infinity;\n        }\n        var content = this.posContent();\n        var len = Math.abs(this.length);\n        if (!this.tag.isUniversal()) {\n            if (this.sub !== null) {\n                return \"(\" + this.sub.length + \" elem)\";\n            }\n            return this.stream.parseOctetString(content, content + len, maxLength);\n        }\n        switch (this.tag.tagNumber) {\n            case 0x01: // BOOLEAN\n                return (this.stream.get(content) === 0) ? \"false\" : \"true\";\n            case 0x02: // INTEGER\n                return this.stream.parseInteger(content, content + len);\n            case 0x03: // BIT_STRING\n                return this.sub ? \"(\" + this.sub.length + \" elem)\" :\n                    this.stream.parseBitString(content, content + len, maxLength);\n            case 0x04: // OCTET_STRING\n                return this.sub ? \"(\" + this.sub.length + \" elem)\" :\n                    this.stream.parseOctetString(content, content + len, maxLength);\n            // case 0x05: // NULL\n            case 0x06: // OBJECT_IDENTIFIER\n                return this.stream.parseOID(content, content + len, maxLength);\n            // case 0x07: // ObjectDescriptor\n            // case 0x08: // EXTERNAL\n            // case 0x09: // REAL\n            // case 0x0A: // ENUMERATED\n            // case 0x0B: // EMBEDDED_PDV\n            case 0x10: // SEQUENCE\n            case 0x11: // SET\n                if (this.sub !== null) {\n                    return \"(\" + this.sub.length + \" elem)\";\n                }\n                else {\n                    return \"(no elem)\";\n                }\n            case 0x0C: // UTF8String\n                return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);\n            case 0x12: // NumericString\n            case 0x13: // PrintableString\n            case 0x14: // TeletexString\n            case 0x15: // VideotexString\n            case 0x16: // IA5String\n            // case 0x19: // GraphicString\n            case 0x1A: // VisibleString\n                // case 0x1B: // GeneralString\n                // case 0x1C: // UniversalString\n                return stringCut(this.stream.parseStringISO(content, content + len), maxLength);\n            case 0x1E: // BMPString\n                return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);\n            case 0x17: // UTCTime\n            case 0x18: // GeneralizedTime\n                return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));\n        }\n        return null;\n    };\n    ASN1.prototype.toString = function () {\n        return this.typeName() + \"@\" + this.stream.pos + \"[header:\" + this.header + \",length:\" + this.length + \",sub:\" + ((this.sub === null) ? \"null\" : this.sub.length) + \"]\";\n    };\n    ASN1.prototype.toPrettyString = function (indent) {\n        if (indent === undefined) {\n            indent = \"\";\n        }\n        var s = indent + this.typeName() + \" @\" + this.stream.pos;\n        if (this.length >= 0) {\n            s += \"+\";\n        }\n        s += this.length;\n        if (this.tag.tagConstructed) {\n            s += \" (constructed)\";\n        }\n        else if ((this.tag.isUniversal() && ((this.tag.tagNumber == 0x03) || (this.tag.tagNumber == 0x04))) && (this.sub !== null)) {\n            s += \" (encapsulates)\";\n        }\n        s += \"\\n\";\n        if (this.sub !== null) {\n            indent += \"  \";\n            for (var i = 0, max = this.sub.length; i < max; ++i) {\n                s += this.sub[i].toPrettyString(indent);\n            }\n        }\n        return s;\n    };\n    ASN1.prototype.posStart = function () {\n        return this.stream.pos;\n    };\n    ASN1.prototype.posContent = function () {\n        return this.stream.pos + this.header;\n    };\n    ASN1.prototype.posEnd = function () {\n        return this.stream.pos + this.header + Math.abs(this.length);\n    };\n    ASN1.prototype.toHexString = function () {\n        return this.stream.hexDump(this.posStart(), this.posEnd(), true);\n    };\n    ASN1.decodeLength = function (stream) {\n        var buf = stream.get();\n        var len = buf & 0x7F;\n        if (len == buf) {\n            return len;\n        }\n        // no reason to use Int10, as it would be a huge buffer anyways\n        if (len > 6) {\n            throw new Error(\"Length over 48 bits not supported at position \" + (stream.pos - 1));\n        }\n        if (len === 0) {\n            return null;\n        } // undefined\n        buf = 0;\n        for (var i = 0; i < len; ++i) {\n            buf = (buf * 256) + stream.get();\n        }\n        return buf;\n    };\n    /**\n     * Retrieve the hexadecimal value (as a string) of the current ASN.1 element\n     * @returns {string}\n     * @public\n     */\n    ASN1.prototype.getHexStringValue = function () {\n        var hexString = this.toHexString();\n        var offset = this.header * 2;\n        var length = this.length * 2;\n        return hexString.substr(offset, length);\n    };\n    ASN1.decode = function (str) {\n        var stream;\n        if (!(str instanceof Stream)) {\n            stream = new Stream(str, 0);\n        }\n        else {\n            stream = str;\n        }\n        var streamStart = new Stream(stream);\n        var tag = new ASN1Tag(stream);\n        var len = ASN1.decodeLength(stream);\n        var start = stream.pos;\n        var header = start - streamStart.pos;\n        var sub = null;\n        var getSub = function () {\n            var ret = [];\n            if (len !== null) {\n                // definite length\n                var end = start + len;\n                while (stream.pos < end) {\n                    ret[ret.length] = ASN1.decode(stream);\n                }\n                if (stream.pos != end) {\n                    throw new Error(\"Content size is not correct for container starting at offset \" + start);\n                }\n            }\n            else {\n                // undefined length\n                try {\n                    for (;;) {\n                        var s = ASN1.decode(stream);\n                        if (s.tag.isEOC()) {\n                            break;\n                        }\n                        ret[ret.length] = s;\n                    }\n                    len = start - stream.pos; // undefined lengths are represented as negative values\n                }\n                catch (e) {\n                    throw new Error(\"Exception while decoding undefined length content: \" + e);\n                }\n            }\n            return ret;\n        };\n        if (tag.tagConstructed) {\n            // must have valid content\n            sub = getSub();\n        }\n        else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {\n            // sometimes BitString and OctetString are used to encapsulate ASN.1\n            try {\n                if (tag.tagNumber == 0x03) {\n                    if (stream.get() != 0) {\n                        throw new Error(\"BIT STRINGs with unused bits cannot encapsulate.\");\n                    }\n                }\n                sub = getSub();\n                for (var i = 0; i < sub.length; ++i) {\n                    if (sub[i].tag.isEOC()) {\n                        throw new Error(\"EOC is not supposed to be actual content.\");\n                    }\n                }\n            }\n            catch (e) {\n                // but silently ignore when they don't\n                sub = null;\n            }\n        }\n        if (sub === null) {\n            if (len === null) {\n                throw new Error(\"We can't skip over an invalid tag with undefined length at offset \" + start);\n            }\n            stream.pos = start + Math.abs(len);\n        }\n        return new ASN1(streamStart, header, len, tag, sub);\n    };\n    return ASN1;\n}());\n\nvar ASN1Tag = /** @class */ (function () {\n    function ASN1Tag(stream) {\n        var buf = stream.get();\n        this.tagClass = buf >> 6;\n        this.tagConstructed = ((buf & 0x20) !== 0);\n        this.tagNumber = buf & 0x1F;\n        if (this.tagNumber == 0x1F) { // long tag\n            var n = new _int10__WEBPACK_IMPORTED_MODULE_0__.Int10();\n            do {\n                buf = stream.get();\n                n.mulAdd(128, buf & 0x7F);\n            } while (buf & 0x80);\n            this.tagNumber = n.simplify();\n        }\n    }\n    ASN1Tag.prototype.isUniversal = function () {\n        return this.tagClass === 0x00;\n    };\n    ASN1Tag.prototype.isEOC = function () {\n        return this.tagClass === 0x00 && this.tagNumber === 0x00;\n    };\n    return ASN1Tag;\n}());\n\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/asn1js/asn1.js?");

          /***/},

        /***/"./lib/lib/asn1js/base64.js":
        /*!**********************************!*\
                                             !*** ./lib/lib/asn1js/base64.js ***!
                                             \**********************************/
        /***/function libLibAsn1jsBase64Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Base64\": () => (/* binding */ Base64)\n/* harmony export */ });\n// Base64 JavaScript decoder\n// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>\n// Permission to use, copy, modify, and/or distribute this software for any\n// purpose with or without fee is hereby granted, provided that the above\n// copyright notice and this permission notice appear in all copies.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\n// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\n// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\n// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\n// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\n// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\n// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */\nvar decoder;\nvar Base64 = {\n    decode: function (a) {\n        var i;\n        if (decoder === undefined) {\n            var b64 = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\n            var ignore = \"= \\f\\n\\r\\t\\u00A0\\u2028\\u2029\";\n            decoder = Object.create(null);\n            for (i = 0; i < 64; ++i) {\n                decoder[b64.charAt(i)] = i;\n            }\n            decoder['-'] = 62; //+\n            decoder['_'] = 63; //-\n            for (i = 0; i < ignore.length; ++i) {\n                decoder[ignore.charAt(i)] = -1;\n            }\n        }\n        var out = [];\n        var bits = 0;\n        var char_count = 0;\n        for (i = 0; i < a.length; ++i) {\n            var c = a.charAt(i);\n            if (c == \"=\") {\n                break;\n            }\n            c = decoder[c];\n            if (c == -1) {\n                continue;\n            }\n            if (c === undefined) {\n                throw new Error(\"Illegal character at offset \" + i);\n            }\n            bits |= c;\n            if (++char_count >= 4) {\n                out[out.length] = (bits >> 16);\n                out[out.length] = (bits >> 8) & 0xFF;\n                out[out.length] = bits & 0xFF;\n                bits = 0;\n                char_count = 0;\n            }\n            else {\n                bits <<= 6;\n            }\n        }\n        switch (char_count) {\n            case 1:\n                throw new Error(\"Base64 encoding incomplete: at least 2 bits missing\");\n            case 2:\n                out[out.length] = (bits >> 10);\n                break;\n            case 3:\n                out[out.length] = (bits >> 16);\n                out[out.length] = (bits >> 8) & 0xFF;\n                break;\n        }\n        return out;\n    },\n    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\\/=\\s]+)-----END [^-]+-----|begin-base64[^\\n]+\\n([A-Za-z0-9+\\/=\\s]+)====/,\n    unarmor: function (a) {\n        var m = Base64.re.exec(a);\n        if (m) {\n            if (m[1]) {\n                a = m[1];\n            }\n            else if (m[2]) {\n                a = m[2];\n            }\n            else {\n                throw new Error(\"RegExp out of sync\");\n            }\n        }\n        return Base64.decode(a);\n    }\n};\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/asn1js/base64.js?");

          /***/},

        /***/"./lib/lib/asn1js/hex.js":
        /*!*******************************!*\
                                          !*** ./lib/lib/asn1js/hex.js ***!
                                          \*******************************/
        /***/function libLibAsn1jsHexJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Hex\": () => (/* binding */ Hex)\n/* harmony export */ });\n// Hex JavaScript decoder\n// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>\n// Permission to use, copy, modify, and/or distribute this software for any\n// purpose with or without fee is hereby granted, provided that the above\n// copyright notice and this permission notice appear in all copies.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\n// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\n// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\n// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\n// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\n// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\n// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */\nvar decoder;\nvar Hex = {\n    decode: function (a) {\n        var i;\n        if (decoder === undefined) {\n            var hex = \"0123456789ABCDEF\";\n            var ignore = \" \\f\\n\\r\\t\\u00A0\\u2028\\u2029\";\n            decoder = {};\n            for (i = 0; i < 16; ++i) {\n                decoder[hex.charAt(i)] = i;\n            }\n            hex = hex.toLowerCase();\n            for (i = 10; i < 16; ++i) {\n                decoder[hex.charAt(i)] = i;\n            }\n            for (i = 0; i < ignore.length; ++i) {\n                decoder[ignore.charAt(i)] = -1;\n            }\n        }\n        var out = [];\n        var bits = 0;\n        var char_count = 0;\n        for (i = 0; i < a.length; ++i) {\n            var c = a.charAt(i);\n            if (c == \"=\") {\n                break;\n            }\n            c = decoder[c];\n            if (c == -1) {\n                continue;\n            }\n            if (c === undefined) {\n                throw new Error(\"Illegal character at offset \" + i);\n            }\n            bits |= c;\n            if (++char_count >= 2) {\n                out[out.length] = bits;\n                bits = 0;\n                char_count = 0;\n            }\n            else {\n                bits <<= 4;\n            }\n        }\n        if (char_count) {\n            throw new Error(\"Hex encoding incomplete: 4 bits missing\");\n        }\n        return out;\n    }\n};\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/asn1js/hex.js?");

          /***/},

        /***/"./lib/lib/asn1js/int10.js":
        /*!*********************************!*\
                                            !*** ./lib/lib/asn1js/int10.js ***!
                                            \*********************************/
        /***/function libLibAsn1jsInt10Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Int10\": () => (/* binding */ Int10)\n/* harmony export */ });\n// Big integer base-10 printing library\n// Copyright (c) 2014 Lapo Luchini <lapo@lapo.it>\n// Permission to use, copy, modify, and/or distribute this software for any\n// purpose with or without fee is hereby granted, provided that the above\n// copyright notice and this permission notice appear in all copies.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\n// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\n// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\n// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\n// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\n// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\n// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */\nvar max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256\nvar Int10 = /** @class */ (function () {\n    function Int10(value) {\n        this.buf = [+value || 0];\n    }\n    Int10.prototype.mulAdd = function (m, c) {\n        // assert(m <= 256)\n        var b = this.buf;\n        var l = b.length;\n        var i;\n        var t;\n        for (i = 0; i < l; ++i) {\n            t = b[i] * m + c;\n            if (t < max) {\n                c = 0;\n            }\n            else {\n                c = 0 | (t / max);\n                t -= c * max;\n            }\n            b[i] = t;\n        }\n        if (c > 0) {\n            b[i] = c;\n        }\n    };\n    Int10.prototype.sub = function (c) {\n        // assert(m <= 256)\n        var b = this.buf;\n        var l = b.length;\n        var i;\n        var t;\n        for (i = 0; i < l; ++i) {\n            t = b[i] - c;\n            if (t < 0) {\n                t += max;\n                c = 1;\n            }\n            else {\n                c = 0;\n            }\n            b[i] = t;\n        }\n        while (b[b.length - 1] === 0) {\n            b.pop();\n        }\n    };\n    Int10.prototype.toString = function (base) {\n        if ((base || 10) != 10) {\n            throw new Error(\"only base 10 is supported\");\n        }\n        var b = this.buf;\n        var s = b[b.length - 1].toString();\n        for (var i = b.length - 2; i >= 0; --i) {\n            s += (max + b[i]).toString().substring(1);\n        }\n        return s;\n    };\n    Int10.prototype.valueOf = function () {\n        var b = this.buf;\n        var v = 0;\n        for (var i = b.length - 1; i >= 0; --i) {\n            v = v * max + b[i];\n        }\n        return v;\n    };\n    Int10.prototype.simplify = function () {\n        var b = this.buf;\n        return (b.length == 1) ? b[0] : this;\n    };\n    return Int10;\n}());\n\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/asn1js/int10.js?");

          /***/},

        /***/"./lib/lib/jsbn/base64.js":
        /*!********************************!*\
                                           !*** ./lib/lib/jsbn/base64.js ***!
                                           \********************************/
        /***/function libLibJsbnBase64Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hex2b64\": () => (/* binding */ hex2b64),\n/* harmony export */   \"b64tohex\": () => (/* binding */ b64tohex),\n/* harmony export */   \"b64toBA\": () => (/* binding */ b64toBA)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./lib/lib/jsbn/util.js\");\n\nvar b64map = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\";\nvar b64pad = \"=\";\nfunction hex2b64(h) {\n    var i;\n    var c;\n    var ret = \"\";\n    for (i = 0; i + 3 <= h.length; i += 3) {\n        c = parseInt(h.substring(i, i + 3), 16);\n        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);\n    }\n    if (i + 1 == h.length) {\n        c = parseInt(h.substring(i, i + 1), 16);\n        ret += b64map.charAt(c << 2);\n    }\n    else if (i + 2 == h.length) {\n        c = parseInt(h.substring(i, i + 2), 16);\n        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);\n    }\n    while ((ret.length & 3) > 0) {\n        ret += b64pad;\n    }\n    return ret;\n}\n// convert a base64 string to hex\nfunction b64tohex(s) {\n    var ret = \"\";\n    var i;\n    var k = 0; // b64 state, 0-3\n    var slop = 0;\n    for (i = 0; i < s.length; ++i) {\n        if (s.charAt(i) == b64pad) {\n            break;\n        }\n        var v = b64map.indexOf(s.charAt(i));\n        if (v < 0) {\n            continue;\n        }\n        if (k == 0) {\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v >> 2);\n            slop = v & 3;\n            k = 1;\n        }\n        else if (k == 1) {\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)((slop << 2) | (v >> 4));\n            slop = v & 0xf;\n            k = 2;\n        }\n        else if (k == 2) {\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop);\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v >> 2);\n            slop = v & 3;\n            k = 3;\n        }\n        else {\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)((slop << 2) | (v >> 4));\n            ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(v & 0xf);\n            k = 0;\n        }\n    }\n    if (k == 1) {\n        ret += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(slop << 2);\n    }\n    return ret;\n}\n// convert a base64 string to a byte/number array\nfunction b64toBA(s) {\n    // piggyback on b64tohex for now, optimize later\n    var h = b64tohex(s);\n    var i;\n    var a = [];\n    for (i = 0; 2 * i < h.length; ++i) {\n        a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);\n    }\n    return a;\n}\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/base64.js?");

          /***/},

        /***/"./lib/lib/jsbn/jsbn.js":
        /*!******************************!*\
                                         !*** ./lib/lib/jsbn/jsbn.js ***!
                                         \******************************/
        /***/function libLibJsbnJsbnJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BigInteger\": () => (/* binding */ BigInteger),\n/* harmony export */   \"nbi\": () => (/* binding */ nbi),\n/* harmony export */   \"parseBigInt\": () => (/* binding */ parseBigInt),\n/* harmony export */   \"intAt\": () => (/* binding */ intAt),\n/* harmony export */   \"nbv\": () => (/* binding */ nbv),\n/* harmony export */   \"nbits\": () => (/* binding */ nbits)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./lib/lib/jsbn/util.js\");\n// Copyright (c) 2005  Tom Wu\n// All Rights Reserved.\n// See \"LICENSE\" for details.\n// Basic JavaScript BN library - subset useful for RSA encryption.\n\n// Bits per digit\nvar dbits;\n// JavaScript engine analysis\nvar canary = 0xdeadbeefcafe;\nvar j_lm = ((canary & 0xffffff) == 0xefcafe);\n//#region\nvar lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];\nvar lplim = (1 << 26) / lowprimes[lowprimes.length - 1];\n//#endregion\n// (public) Constructor\nvar BigInteger = /** @class */ (function () {\n    function BigInteger(a, b, c) {\n        if (a != null) {\n            if (\"number\" == typeof a) {\n                this.fromNumber(a, b, c);\n            }\n            else if (b == null && \"string\" != typeof a) {\n                this.fromString(a, 256);\n            }\n            else {\n                this.fromString(a, b);\n            }\n        }\n    }\n    //#region PUBLIC\n    // BigInteger.prototype.toString = bnToString;\n    // (public) return string representation in given radix\n    BigInteger.prototype.toString = function (b) {\n        if (this.s < 0) {\n            return \"-\" + this.negate().toString(b);\n        }\n        var k;\n        if (b == 16) {\n            k = 4;\n        }\n        else if (b == 8) {\n            k = 3;\n        }\n        else if (b == 2) {\n            k = 1;\n        }\n        else if (b == 32) {\n            k = 5;\n        }\n        else if (b == 4) {\n            k = 2;\n        }\n        else {\n            return this.toRadix(b);\n        }\n        var km = (1 << k) - 1;\n        var d;\n        var m = false;\n        var r = \"\";\n        var i = this.t;\n        var p = this.DB - (i * this.DB) % k;\n        if (i-- > 0) {\n            if (p < this.DB && (d = this[i] >> p) > 0) {\n                m = true;\n                r = (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(d);\n            }\n            while (i >= 0) {\n                if (p < k) {\n                    d = (this[i] & ((1 << p) - 1)) << (k - p);\n                    d |= this[--i] >> (p += this.DB - k);\n                }\n                else {\n                    d = (this[i] >> (p -= k)) & km;\n                    if (p <= 0) {\n                        p += this.DB;\n                        --i;\n                    }\n                }\n                if (d > 0) {\n                    m = true;\n                }\n                if (m) {\n                    r += (0,_util__WEBPACK_IMPORTED_MODULE_0__.int2char)(d);\n                }\n            }\n        }\n        return m ? r : \"0\";\n    };\n    // BigInteger.prototype.negate = bnNegate;\n    // (public) -this\n    BigInteger.prototype.negate = function () {\n        var r = nbi();\n        BigInteger.ZERO.subTo(this, r);\n        return r;\n    };\n    // BigInteger.prototype.abs = bnAbs;\n    // (public) |this|\n    BigInteger.prototype.abs = function () {\n        return (this.s < 0) ? this.negate() : this;\n    };\n    // BigInteger.prototype.compareTo = bnCompareTo;\n    // (public) return + if this > a, - if this < a, 0 if equal\n    BigInteger.prototype.compareTo = function (a) {\n        var r = this.s - a.s;\n        if (r != 0) {\n            return r;\n        }\n        var i = this.t;\n        r = i - a.t;\n        if (r != 0) {\n            return (this.s < 0) ? -r : r;\n        }\n        while (--i >= 0) {\n            if ((r = this[i] - a[i]) != 0) {\n                return r;\n            }\n        }\n        return 0;\n    };\n    // BigInteger.prototype.bitLength = bnBitLength;\n    // (public) return the number of bits in \"this\"\n    BigInteger.prototype.bitLength = function () {\n        if (this.t <= 0) {\n            return 0;\n        }\n        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));\n    };\n    // BigInteger.prototype.mod = bnMod;\n    // (public) this mod a\n    BigInteger.prototype.mod = function (a) {\n        var r = nbi();\n        this.abs().divRemTo(a, null, r);\n        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {\n            a.subTo(r, r);\n        }\n        return r;\n    };\n    // BigInteger.prototype.modPowInt = bnModPowInt;\n    // (public) this^e % m, 0 <= e < 2^32\n    BigInteger.prototype.modPowInt = function (e, m) {\n        var z;\n        if (e < 256 || m.isEven()) {\n            z = new Classic(m);\n        }\n        else {\n            z = new Montgomery(m);\n        }\n        return this.exp(e, z);\n    };\n    // BigInteger.prototype.clone = bnClone;\n    // (public)\n    BigInteger.prototype.clone = function () {\n        var r = nbi();\n        this.copyTo(r);\n        return r;\n    };\n    // BigInteger.prototype.intValue = bnIntValue;\n    // (public) return value as integer\n    BigInteger.prototype.intValue = function () {\n        if (this.s < 0) {\n            if (this.t == 1) {\n                return this[0] - this.DV;\n            }\n            else if (this.t == 0) {\n                return -1;\n            }\n        }\n        else if (this.t == 1) {\n            return this[0];\n        }\n        else if (this.t == 0) {\n            return 0;\n        }\n        // assumes 16 < DB < 32\n        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];\n    };\n    // BigInteger.prototype.byteValue = bnByteValue;\n    // (public) return value as byte\n    BigInteger.prototype.byteValue = function () {\n        return (this.t == 0) ? this.s : (this[0] << 24) >> 24;\n    };\n    // BigInteger.prototype.shortValue = bnShortValue;\n    // (public) return value as short (assumes DB>=16)\n    BigInteger.prototype.shortValue = function () {\n        return (this.t == 0) ? this.s : (this[0] << 16) >> 16;\n    };\n    // BigInteger.prototype.signum = bnSigNum;\n    // (public) 0 if this == 0, 1 if this > 0\n    BigInteger.prototype.signum = function () {\n        if (this.s < 0) {\n            return -1;\n        }\n        else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {\n            return 0;\n        }\n        else {\n            return 1;\n        }\n    };\n    // BigInteger.prototype.toByteArray = bnToByteArray;\n    // (public) convert to bigendian byte array\n    BigInteger.prototype.toByteArray = function () {\n        var i = this.t;\n        var r = [];\n        r[0] = this.s;\n        var p = this.DB - (i * this.DB) % 8;\n        var d;\n        var k = 0;\n        if (i-- > 0) {\n            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {\n                r[k++] = d | (this.s << (this.DB - p));\n            }\n            while (i >= 0) {\n                if (p < 8) {\n                    d = (this[i] & ((1 << p) - 1)) << (8 - p);\n                    d |= this[--i] >> (p += this.DB - 8);\n                }\n                else {\n                    d = (this[i] >> (p -= 8)) & 0xff;\n                    if (p <= 0) {\n                        p += this.DB;\n                        --i;\n                    }\n                }\n                if ((d & 0x80) != 0) {\n                    d |= -256;\n                }\n                if (k == 0 && (this.s & 0x80) != (d & 0x80)) {\n                    ++k;\n                }\n                if (k > 0 || d != this.s) {\n                    r[k++] = d;\n                }\n            }\n        }\n        return r;\n    };\n    // BigInteger.prototype.equals = bnEquals;\n    BigInteger.prototype.equals = function (a) {\n        return (this.compareTo(a) == 0);\n    };\n    // BigInteger.prototype.min = bnMin;\n    BigInteger.prototype.min = function (a) {\n        return (this.compareTo(a) < 0) ? this : a;\n    };\n    // BigInteger.prototype.max = bnMax;\n    BigInteger.prototype.max = function (a) {\n        return (this.compareTo(a) > 0) ? this : a;\n    };\n    // BigInteger.prototype.and = bnAnd;\n    BigInteger.prototype.and = function (a) {\n        var r = nbi();\n        this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_and, r);\n        return r;\n    };\n    // BigInteger.prototype.or = bnOr;\n    BigInteger.prototype.or = function (a) {\n        var r = nbi();\n        this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_or, r);\n        return r;\n    };\n    // BigInteger.prototype.xor = bnXor;\n    BigInteger.prototype.xor = function (a) {\n        var r = nbi();\n        this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_xor, r);\n        return r;\n    };\n    // BigInteger.prototype.andNot = bnAndNot;\n    BigInteger.prototype.andNot = function (a) {\n        var r = nbi();\n        this.bitwiseTo(a, _util__WEBPACK_IMPORTED_MODULE_0__.op_andnot, r);\n        return r;\n    };\n    // BigInteger.prototype.not = bnNot;\n    // (public) ~this\n    BigInteger.prototype.not = function () {\n        var r = nbi();\n        for (var i = 0; i < this.t; ++i) {\n            r[i] = this.DM & ~this[i];\n        }\n        r.t = this.t;\n        r.s = ~this.s;\n        return r;\n    };\n    // BigInteger.prototype.shiftLeft = bnShiftLeft;\n    // (public) this << n\n    BigInteger.prototype.shiftLeft = function (n) {\n        var r = nbi();\n        if (n < 0) {\n            this.rShiftTo(-n, r);\n        }\n        else {\n            this.lShiftTo(n, r);\n        }\n        return r;\n    };\n    // BigInteger.prototype.shiftRight = bnShiftRight;\n    // (public) this >> n\n    BigInteger.prototype.shiftRight = function (n) {\n        var r = nbi();\n        if (n < 0) {\n            this.lShiftTo(-n, r);\n        }\n        else {\n            this.rShiftTo(n, r);\n        }\n        return r;\n    };\n    // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;\n    // (public) returns index of lowest 1-bit (or -1 if none)\n    BigInteger.prototype.getLowestSetBit = function () {\n        for (var i = 0; i < this.t; ++i) {\n            if (this[i] != 0) {\n                return i * this.DB + (0,_util__WEBPACK_IMPORTED_MODULE_0__.lbit)(this[i]);\n            }\n        }\n        if (this.s < 0) {\n            return this.t * this.DB;\n        }\n        return -1;\n    };\n    // BigInteger.prototype.bitCount = bnBitCount;\n    // (public) return number of set bits\n    BigInteger.prototype.bitCount = function () {\n        var r = 0;\n        var x = this.s & this.DM;\n        for (var i = 0; i < this.t; ++i) {\n            r += (0,_util__WEBPACK_IMPORTED_MODULE_0__.cbit)(this[i] ^ x);\n        }\n        return r;\n    };\n    // BigInteger.prototype.testBit = bnTestBit;\n    // (public) true iff nth bit is set\n    BigInteger.prototype.testBit = function (n) {\n        var j = Math.floor(n / this.DB);\n        if (j >= this.t) {\n            return (this.s != 0);\n        }\n        return ((this[j] & (1 << (n % this.DB))) != 0);\n    };\n    // BigInteger.prototype.setBit = bnSetBit;\n    // (public) this | (1<<n)\n    BigInteger.prototype.setBit = function (n) {\n        return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_or);\n    };\n    // BigInteger.prototype.clearBit = bnClearBit;\n    // (public) this & ~(1<<n)\n    BigInteger.prototype.clearBit = function (n) {\n        return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_andnot);\n    };\n    // BigInteger.prototype.flipBit = bnFlipBit;\n    // (public) this ^ (1<<n)\n    BigInteger.prototype.flipBit = function (n) {\n        return this.changeBit(n, _util__WEBPACK_IMPORTED_MODULE_0__.op_xor);\n    };\n    // BigInteger.prototype.add = bnAdd;\n    // (public) this + a\n    BigInteger.prototype.add = function (a) {\n        var r = nbi();\n        this.addTo(a, r);\n        return r;\n    };\n    // BigInteger.prototype.subtract = bnSubtract;\n    // (public) this - a\n    BigInteger.prototype.subtract = function (a) {\n        var r = nbi();\n        this.subTo(a, r);\n        return r;\n    };\n    // BigInteger.prototype.multiply = bnMultiply;\n    // (public) this * a\n    BigInteger.prototype.multiply = function (a) {\n        var r = nbi();\n        this.multiplyTo(a, r);\n        return r;\n    };\n    // BigInteger.prototype.divide = bnDivide;\n    // (public) this / a\n    BigInteger.prototype.divide = function (a) {\n        var r = nbi();\n        this.divRemTo(a, r, null);\n        return r;\n    };\n    // BigInteger.prototype.remainder = bnRemainder;\n    // (public) this % a\n    BigInteger.prototype.remainder = function (a) {\n        var r = nbi();\n        this.divRemTo(a, null, r);\n        return r;\n    };\n    // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;\n    // (public) [this/a,this%a]\n    BigInteger.prototype.divideAndRemainder = function (a) {\n        var q = nbi();\n        var r = nbi();\n        this.divRemTo(a, q, r);\n        return [q, r];\n    };\n    // BigInteger.prototype.modPow = bnModPow;\n    // (public) this^e % m (HAC 14.85)\n    BigInteger.prototype.modPow = function (e, m) {\n        var i = e.bitLength();\n        var k;\n        var r = nbv(1);\n        var z;\n        if (i <= 0) {\n            return r;\n        }\n        else if (i < 18) {\n            k = 1;\n        }\n        else if (i < 48) {\n            k = 3;\n        }\n        else if (i < 144) {\n            k = 4;\n        }\n        else if (i < 768) {\n            k = 5;\n        }\n        else {\n            k = 6;\n        }\n        if (i < 8) {\n            z = new Classic(m);\n        }\n        else if (m.isEven()) {\n            z = new Barrett(m);\n        }\n        else {\n            z = new Montgomery(m);\n        }\n        // precomputation\n        var g = [];\n        var n = 3;\n        var k1 = k - 1;\n        var km = (1 << k) - 1;\n        g[1] = z.convert(this);\n        if (k > 1) {\n            var g2 = nbi();\n            z.sqrTo(g[1], g2);\n            while (n <= km) {\n                g[n] = nbi();\n                z.mulTo(g2, g[n - 2], g[n]);\n                n += 2;\n            }\n        }\n        var j = e.t - 1;\n        var w;\n        var is1 = true;\n        var r2 = nbi();\n        var t;\n        i = nbits(e[j]) - 1;\n        while (j >= 0) {\n            if (i >= k1) {\n                w = (e[j] >> (i - k1)) & km;\n            }\n            else {\n                w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);\n                if (j > 0) {\n                    w |= e[j - 1] >> (this.DB + i - k1);\n                }\n            }\n            n = k;\n            while ((w & 1) == 0) {\n                w >>= 1;\n                --n;\n            }\n            if ((i -= n) < 0) {\n                i += this.DB;\n                --j;\n            }\n            if (is1) { // ret == 1, don't bother squaring or multiplying it\n                g[w].copyTo(r);\n                is1 = false;\n            }\n            else {\n                while (n > 1) {\n                    z.sqrTo(r, r2);\n                    z.sqrTo(r2, r);\n                    n -= 2;\n                }\n                if (n > 0) {\n                    z.sqrTo(r, r2);\n                }\n                else {\n                    t = r;\n                    r = r2;\n                    r2 = t;\n                }\n                z.mulTo(r2, g[w], r);\n            }\n            while (j >= 0 && (e[j] & (1 << i)) == 0) {\n                z.sqrTo(r, r2);\n                t = r;\n                r = r2;\n                r2 = t;\n                if (--i < 0) {\n                    i = this.DB - 1;\n                    --j;\n                }\n            }\n        }\n        return z.revert(r);\n    };\n    // BigInteger.prototype.modInverse = bnModInverse;\n    // (public) 1/this % m (HAC 14.61)\n    BigInteger.prototype.modInverse = function (m) {\n        var ac = m.isEven();\n        if ((this.isEven() && ac) || m.signum() == 0) {\n            return BigInteger.ZERO;\n        }\n        var u = m.clone();\n        var v = this.clone();\n        var a = nbv(1);\n        var b = nbv(0);\n        var c = nbv(0);\n        var d = nbv(1);\n        while (u.signum() != 0) {\n            while (u.isEven()) {\n                u.rShiftTo(1, u);\n                if (ac) {\n                    if (!a.isEven() || !b.isEven()) {\n                        a.addTo(this, a);\n                        b.subTo(m, b);\n                    }\n                    a.rShiftTo(1, a);\n                }\n                else if (!b.isEven()) {\n                    b.subTo(m, b);\n                }\n                b.rShiftTo(1, b);\n            }\n            while (v.isEven()) {\n                v.rShiftTo(1, v);\n                if (ac) {\n                    if (!c.isEven() || !d.isEven()) {\n                        c.addTo(this, c);\n                        d.subTo(m, d);\n                    }\n                    c.rShiftTo(1, c);\n                }\n                else if (!d.isEven()) {\n                    d.subTo(m, d);\n                }\n                d.rShiftTo(1, d);\n            }\n            if (u.compareTo(v) >= 0) {\n                u.subTo(v, u);\n                if (ac) {\n                    a.subTo(c, a);\n                }\n                b.subTo(d, b);\n            }\n            else {\n                v.subTo(u, v);\n                if (ac) {\n                    c.subTo(a, c);\n                }\n                d.subTo(b, d);\n            }\n        }\n        if (v.compareTo(BigInteger.ONE) != 0) {\n            return BigInteger.ZERO;\n        }\n        if (d.compareTo(m) >= 0) {\n            return d.subtract(m);\n        }\n        if (d.signum() < 0) {\n            d.addTo(m, d);\n        }\n        else {\n            return d;\n        }\n        if (d.signum() < 0) {\n            return d.add(m);\n        }\n        else {\n            return d;\n        }\n    };\n    // BigInteger.prototype.pow = bnPow;\n    // (public) this^e\n    BigInteger.prototype.pow = function (e) {\n        return this.exp(e, new NullExp());\n    };\n    // BigInteger.prototype.gcd = bnGCD;\n    // (public) gcd(this,a) (HAC 14.54)\n    BigInteger.prototype.gcd = function (a) {\n        var x = (this.s < 0) ? this.negate() : this.clone();\n        var y = (a.s < 0) ? a.negate() : a.clone();\n        if (x.compareTo(y) < 0) {\n            var t = x;\n            x = y;\n            y = t;\n        }\n        var i = x.getLowestSetBit();\n        var g = y.getLowestSetBit();\n        if (g < 0) {\n            return x;\n        }\n        if (i < g) {\n            g = i;\n        }\n        if (g > 0) {\n            x.rShiftTo(g, x);\n            y.rShiftTo(g, y);\n        }\n        while (x.signum() > 0) {\n            if ((i = x.getLowestSetBit()) > 0) {\n                x.rShiftTo(i, x);\n            }\n            if ((i = y.getLowestSetBit()) > 0) {\n                y.rShiftTo(i, y);\n            }\n            if (x.compareTo(y) >= 0) {\n                x.subTo(y, x);\n                x.rShiftTo(1, x);\n            }\n            else {\n                y.subTo(x, y);\n                y.rShiftTo(1, y);\n            }\n        }\n        if (g > 0) {\n            y.lShiftTo(g, y);\n        }\n        return y;\n    };\n    // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;\n    // (public) test primality with certainty >= 1-.5^t\n    BigInteger.prototype.isProbablePrime = function (t) {\n        var i;\n        var x = this.abs();\n        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {\n            for (i = 0; i < lowprimes.length; ++i) {\n                if (x[0] == lowprimes[i]) {\n                    return true;\n                }\n            }\n            return false;\n        }\n        if (x.isEven()) {\n            return false;\n        }\n        i = 1;\n        while (i < lowprimes.length) {\n            var m = lowprimes[i];\n            var j = i + 1;\n            while (j < lowprimes.length && m < lplim) {\n                m *= lowprimes[j++];\n            }\n            m = x.modInt(m);\n            while (i < j) {\n                if (m % lowprimes[i++] == 0) {\n                    return false;\n                }\n            }\n        }\n        return x.millerRabin(t);\n    };\n    //#endregion PUBLIC\n    //#region PROTECTED\n    // BigInteger.prototype.copyTo = bnpCopyTo;\n    // (protected) copy this to r\n    BigInteger.prototype.copyTo = function (r) {\n        for (var i = this.t - 1; i >= 0; --i) {\n            r[i] = this[i];\n        }\n        r.t = this.t;\n        r.s = this.s;\n    };\n    // BigInteger.prototype.fromInt = bnpFromInt;\n    // (protected) set from integer value x, -DV <= x < DV\n    BigInteger.prototype.fromInt = function (x) {\n        this.t = 1;\n        this.s = (x < 0) ? -1 : 0;\n        if (x > 0) {\n            this[0] = x;\n        }\n        else if (x < -1) {\n            this[0] = x + this.DV;\n        }\n        else {\n            this.t = 0;\n        }\n    };\n    // BigInteger.prototype.fromString = bnpFromString;\n    // (protected) set from string and radix\n    BigInteger.prototype.fromString = function (s, b) {\n        var k;\n        if (b == 16) {\n            k = 4;\n        }\n        else if (b == 8) {\n            k = 3;\n        }\n        else if (b == 256) {\n            k = 8;\n            /* byte array */\n        }\n        else if (b == 2) {\n            k = 1;\n        }\n        else if (b == 32) {\n            k = 5;\n        }\n        else if (b == 4) {\n            k = 2;\n        }\n        else {\n            this.fromRadix(s, b);\n            return;\n        }\n        this.t = 0;\n        this.s = 0;\n        var i = s.length;\n        var mi = false;\n        var sh = 0;\n        while (--i >= 0) {\n            var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);\n            if (x < 0) {\n                if (s.charAt(i) == \"-\") {\n                    mi = true;\n                }\n                continue;\n            }\n            mi = false;\n            if (sh == 0) {\n                this[this.t++] = x;\n            }\n            else if (sh + k > this.DB) {\n                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;\n                this[this.t++] = (x >> (this.DB - sh));\n            }\n            else {\n                this[this.t - 1] |= x << sh;\n            }\n            sh += k;\n            if (sh >= this.DB) {\n                sh -= this.DB;\n            }\n        }\n        if (k == 8 && ((+s[0]) & 0x80) != 0) {\n            this.s = -1;\n            if (sh > 0) {\n                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;\n            }\n        }\n        this.clamp();\n        if (mi) {\n            BigInteger.ZERO.subTo(this, this);\n        }\n    };\n    // BigInteger.prototype.clamp = bnpClamp;\n    // (protected) clamp off excess high words\n    BigInteger.prototype.clamp = function () {\n        var c = this.s & this.DM;\n        while (this.t > 0 && this[this.t - 1] == c) {\n            --this.t;\n        }\n    };\n    // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;\n    // (protected) r = this << n*DB\n    BigInteger.prototype.dlShiftTo = function (n, r) {\n        var i;\n        for (i = this.t - 1; i >= 0; --i) {\n            r[i + n] = this[i];\n        }\n        for (i = n - 1; i >= 0; --i) {\n            r[i] = 0;\n        }\n        r.t = this.t + n;\n        r.s = this.s;\n    };\n    // BigInteger.prototype.drShiftTo = bnpDRShiftTo;\n    // (protected) r = this >> n*DB\n    BigInteger.prototype.drShiftTo = function (n, r) {\n        for (var i = n; i < this.t; ++i) {\n            r[i - n] = this[i];\n        }\n        r.t = Math.max(this.t - n, 0);\n        r.s = this.s;\n    };\n    // BigInteger.prototype.lShiftTo = bnpLShiftTo;\n    // (protected) r = this << n\n    BigInteger.prototype.lShiftTo = function (n, r) {\n        var bs = n % this.DB;\n        var cbs = this.DB - bs;\n        var bm = (1 << cbs) - 1;\n        var ds = Math.floor(n / this.DB);\n        var c = (this.s << bs) & this.DM;\n        for (var i = this.t - 1; i >= 0; --i) {\n            r[i + ds + 1] = (this[i] >> cbs) | c;\n            c = (this[i] & bm) << bs;\n        }\n        for (var i = ds - 1; i >= 0; --i) {\n            r[i] = 0;\n        }\n        r[ds] = c;\n        r.t = this.t + ds + 1;\n        r.s = this.s;\n        r.clamp();\n    };\n    // BigInteger.prototype.rShiftTo = bnpRShiftTo;\n    // (protected) r = this >> n\n    BigInteger.prototype.rShiftTo = function (n, r) {\n        r.s = this.s;\n        var ds = Math.floor(n / this.DB);\n        if (ds >= this.t) {\n            r.t = 0;\n            return;\n        }\n        var bs = n % this.DB;\n        var cbs = this.DB - bs;\n        var bm = (1 << bs) - 1;\n        r[0] = this[ds] >> bs;\n        for (var i = ds + 1; i < this.t; ++i) {\n            r[i - ds - 1] |= (this[i] & bm) << cbs;\n            r[i - ds] = this[i] >> bs;\n        }\n        if (bs > 0) {\n            r[this.t - ds - 1] |= (this.s & bm) << cbs;\n        }\n        r.t = this.t - ds;\n        r.clamp();\n    };\n    // BigInteger.prototype.subTo = bnpSubTo;\n    // (protected) r = this - a\n    BigInteger.prototype.subTo = function (a, r) {\n        var i = 0;\n        var c = 0;\n        var m = Math.min(a.t, this.t);\n        while (i < m) {\n            c += this[i] - a[i];\n            r[i++] = c & this.DM;\n            c >>= this.DB;\n        }\n        if (a.t < this.t) {\n            c -= a.s;\n            while (i < this.t) {\n                c += this[i];\n                r[i++] = c & this.DM;\n                c >>= this.DB;\n            }\n            c += this.s;\n        }\n        else {\n            c += this.s;\n            while (i < a.t) {\n                c -= a[i];\n                r[i++] = c & this.DM;\n                c >>= this.DB;\n            }\n            c -= a.s;\n        }\n        r.s = (c < 0) ? -1 : 0;\n        if (c < -1) {\n            r[i++] = this.DV + c;\n        }\n        else if (c > 0) {\n            r[i++] = c;\n        }\n        r.t = i;\n        r.clamp();\n    };\n    // BigInteger.prototype.multiplyTo = bnpMultiplyTo;\n    // (protected) r = this * a, r != this,a (HAC 14.12)\n    // \"this\" should be the larger one if appropriate.\n    BigInteger.prototype.multiplyTo = function (a, r) {\n        var x = this.abs();\n        var y = a.abs();\n        var i = x.t;\n        r.t = i + y.t;\n        while (--i >= 0) {\n            r[i] = 0;\n        }\n        for (i = 0; i < y.t; ++i) {\n            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);\n        }\n        r.s = 0;\n        r.clamp();\n        if (this.s != a.s) {\n            BigInteger.ZERO.subTo(r, r);\n        }\n    };\n    // BigInteger.prototype.squareTo = bnpSquareTo;\n    // (protected) r = this^2, r != this (HAC 14.16)\n    BigInteger.prototype.squareTo = function (r) {\n        var x = this.abs();\n        var i = r.t = 2 * x.t;\n        while (--i >= 0) {\n            r[i] = 0;\n        }\n        for (i = 0; i < x.t - 1; ++i) {\n            var c = x.am(i, x[i], r, 2 * i, 0, 1);\n            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {\n                r[i + x.t] -= x.DV;\n                r[i + x.t + 1] = 1;\n            }\n        }\n        if (r.t > 0) {\n            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);\n        }\n        r.s = 0;\n        r.clamp();\n    };\n    // BigInteger.prototype.divRemTo = bnpDivRemTo;\n    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)\n    // r != q, this != m.  q or r may be null.\n    BigInteger.prototype.divRemTo = function (m, q, r) {\n        var pm = m.abs();\n        if (pm.t <= 0) {\n            return;\n        }\n        var pt = this.abs();\n        if (pt.t < pm.t) {\n            if (q != null) {\n                q.fromInt(0);\n            }\n            if (r != null) {\n                this.copyTo(r);\n            }\n            return;\n        }\n        if (r == null) {\n            r = nbi();\n        }\n        var y = nbi();\n        var ts = this.s;\n        var ms = m.s;\n        var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus\n        if (nsh > 0) {\n            pm.lShiftTo(nsh, y);\n            pt.lShiftTo(nsh, r);\n        }\n        else {\n            pm.copyTo(y);\n            pt.copyTo(r);\n        }\n        var ys = y.t;\n        var y0 = y[ys - 1];\n        if (y0 == 0) {\n            return;\n        }\n        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);\n        var d1 = this.FV / yt;\n        var d2 = (1 << this.F1) / yt;\n        var e = 1 << this.F2;\n        var i = r.t;\n        var j = i - ys;\n        var t = (q == null) ? nbi() : q;\n        y.dlShiftTo(j, t);\n        if (r.compareTo(t) >= 0) {\n            r[r.t++] = 1;\n            r.subTo(t, r);\n        }\n        BigInteger.ONE.dlShiftTo(ys, t);\n        t.subTo(y, y); // \"negative\" y so we can replace sub with am later\n        while (y.t < ys) {\n            y[y.t++] = 0;\n        }\n        while (--j >= 0) {\n            // Estimate quotient digit\n            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);\n            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out\n                y.dlShiftTo(j, t);\n                r.subTo(t, r);\n                while (r[i] < --qd) {\n                    r.subTo(t, r);\n                }\n            }\n        }\n        if (q != null) {\n            r.drShiftTo(ys, q);\n            if (ts != ms) {\n                BigInteger.ZERO.subTo(q, q);\n            }\n        }\n        r.t = ys;\n        r.clamp();\n        if (nsh > 0) {\n            r.rShiftTo(nsh, r);\n        } // Denormalize remainder\n        if (ts < 0) {\n            BigInteger.ZERO.subTo(r, r);\n        }\n    };\n    // BigInteger.prototype.invDigit = bnpInvDigit;\n    // (protected) return \"-1/this % 2^DB\"; useful for Mont. reduction\n    // justification:\n    //         xy == 1 (mod m)\n    //         xy =  1+km\n    //   xy(2-xy) = (1+km)(1-km)\n    // x[y(2-xy)] = 1-k^2m^2\n    // x[y(2-xy)] == 1 (mod m^2)\n    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2\n    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.\n    // JS multiply \"overflows\" differently from C/C++, so care is needed here.\n    BigInteger.prototype.invDigit = function () {\n        if (this.t < 1) {\n            return 0;\n        }\n        var x = this[0];\n        if ((x & 1) == 0) {\n            return 0;\n        }\n        var y = x & 3; // y == 1/x mod 2^2\n        y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4\n        y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8\n        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16\n        // last step - calculate inverse mod DV directly;\n        // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints\n        y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits\n        // we really want the negative inverse, and -DV < y < DV\n        return (y > 0) ? this.DV - y : -y;\n    };\n    // BigInteger.prototype.isEven = bnpIsEven;\n    // (protected) true iff this is even\n    BigInteger.prototype.isEven = function () {\n        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;\n    };\n    // BigInteger.prototype.exp = bnpExp;\n    // (protected) this^e, e < 2^32, doing sqr and mul with \"r\" (HAC 14.79)\n    BigInteger.prototype.exp = function (e, z) {\n        if (e > 0xffffffff || e < 1) {\n            return BigInteger.ONE;\n        }\n        var r = nbi();\n        var r2 = nbi();\n        var g = z.convert(this);\n        var i = nbits(e) - 1;\n        g.copyTo(r);\n        while (--i >= 0) {\n            z.sqrTo(r, r2);\n            if ((e & (1 << i)) > 0) {\n                z.mulTo(r2, g, r);\n            }\n            else {\n                var t = r;\n                r = r2;\n                r2 = t;\n            }\n        }\n        return z.revert(r);\n    };\n    // BigInteger.prototype.chunkSize = bnpChunkSize;\n    // (protected) return x s.t. r^x < DV\n    BigInteger.prototype.chunkSize = function (r) {\n        return Math.floor(Math.LN2 * this.DB / Math.log(r));\n    };\n    // BigInteger.prototype.toRadix = bnpToRadix;\n    // (protected) convert to radix string\n    BigInteger.prototype.toRadix = function (b) {\n        if (b == null) {\n            b = 10;\n        }\n        if (this.signum() == 0 || b < 2 || b > 36) {\n            return \"0\";\n        }\n        var cs = this.chunkSize(b);\n        var a = Math.pow(b, cs);\n        var d = nbv(a);\n        var y = nbi();\n        var z = nbi();\n        var r = \"\";\n        this.divRemTo(d, y, z);\n        while (y.signum() > 0) {\n            r = (a + z.intValue()).toString(b).substr(1) + r;\n            y.divRemTo(d, y, z);\n        }\n        return z.intValue().toString(b) + r;\n    };\n    // BigInteger.prototype.fromRadix = bnpFromRadix;\n    // (protected) convert from radix string\n    BigInteger.prototype.fromRadix = function (s, b) {\n        this.fromInt(0);\n        if (b == null) {\n            b = 10;\n        }\n        var cs = this.chunkSize(b);\n        var d = Math.pow(b, cs);\n        var mi = false;\n        var j = 0;\n        var w = 0;\n        for (var i = 0; i < s.length; ++i) {\n            var x = intAt(s, i);\n            if (x < 0) {\n                if (s.charAt(i) == \"-\" && this.signum() == 0) {\n                    mi = true;\n                }\n                continue;\n            }\n            w = b * w + x;\n            if (++j >= cs) {\n                this.dMultiply(d);\n                this.dAddOffset(w, 0);\n                j = 0;\n                w = 0;\n            }\n        }\n        if (j > 0) {\n            this.dMultiply(Math.pow(b, j));\n            this.dAddOffset(w, 0);\n        }\n        if (mi) {\n            BigInteger.ZERO.subTo(this, this);\n        }\n    };\n    // BigInteger.prototype.fromNumber = bnpFromNumber;\n    // (protected) alternate constructor\n    BigInteger.prototype.fromNumber = function (a, b, c) {\n        if (\"number\" == typeof b) {\n            // new BigInteger(int,int,RNG)\n            if (a < 2) {\n                this.fromInt(1);\n            }\n            else {\n                this.fromNumber(a, c);\n                if (!this.testBit(a - 1)) {\n                    // force MSB set\n                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util__WEBPACK_IMPORTED_MODULE_0__.op_or, this);\n                }\n                if (this.isEven()) {\n                    this.dAddOffset(1, 0);\n                } // force odd\n                while (!this.isProbablePrime(b)) {\n                    this.dAddOffset(2, 0);\n                    if (this.bitLength() > a) {\n                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);\n                    }\n                }\n            }\n        }\n        else {\n            // new BigInteger(int,RNG)\n            var x = [];\n            var t = a & 7;\n            x.length = (a >> 3) + 1;\n            b.nextBytes(x);\n            if (t > 0) {\n                x[0] &= ((1 << t) - 1);\n            }\n            else {\n                x[0] = 0;\n            }\n            this.fromString(x, 256);\n        }\n    };\n    // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;\n    // (protected) r = this op a (bitwise)\n    BigInteger.prototype.bitwiseTo = function (a, op, r) {\n        var i;\n        var f;\n        var m = Math.min(a.t, this.t);\n        for (i = 0; i < m; ++i) {\n            r[i] = op(this[i], a[i]);\n        }\n        if (a.t < this.t) {\n            f = a.s & this.DM;\n            for (i = m; i < this.t; ++i) {\n                r[i] = op(this[i], f);\n            }\n            r.t = this.t;\n        }\n        else {\n            f = this.s & this.DM;\n            for (i = m; i < a.t; ++i) {\n                r[i] = op(f, a[i]);\n            }\n            r.t = a.t;\n        }\n        r.s = op(this.s, a.s);\n        r.clamp();\n    };\n    // BigInteger.prototype.changeBit = bnpChangeBit;\n    // (protected) this op (1<<n)\n    BigInteger.prototype.changeBit = function (n, op) {\n        var r = BigInteger.ONE.shiftLeft(n);\n        this.bitwiseTo(r, op, r);\n        return r;\n    };\n    // BigInteger.prototype.addTo = bnpAddTo;\n    // (protected) r = this + a\n    BigInteger.prototype.addTo = function (a, r) {\n        var i = 0;\n        var c = 0;\n        var m = Math.min(a.t, this.t);\n        while (i < m) {\n            c += this[i] + a[i];\n            r[i++] = c & this.DM;\n            c >>= this.DB;\n        }\n        if (a.t < this.t) {\n            c += a.s;\n            while (i < this.t) {\n                c += this[i];\n                r[i++] = c & this.DM;\n                c >>= this.DB;\n            }\n            c += this.s;\n        }\n        else {\n            c += this.s;\n            while (i < a.t) {\n                c += a[i];\n                r[i++] = c & this.DM;\n                c >>= this.DB;\n            }\n            c += a.s;\n        }\n        r.s = (c < 0) ? -1 : 0;\n        if (c > 0) {\n            r[i++] = c;\n        }\n        else if (c < -1) {\n            r[i++] = this.DV + c;\n        }\n        r.t = i;\n        r.clamp();\n    };\n    // BigInteger.prototype.dMultiply = bnpDMultiply;\n    // (protected) this *= n, this >= 0, 1 < n < DV\n    BigInteger.prototype.dMultiply = function (n) {\n        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);\n        ++this.t;\n        this.clamp();\n    };\n    // BigInteger.prototype.dAddOffset = bnpDAddOffset;\n    // (protected) this += n << w words, this >= 0\n    BigInteger.prototype.dAddOffset = function (n, w) {\n        if (n == 0) {\n            return;\n        }\n        while (this.t <= w) {\n            this[this.t++] = 0;\n        }\n        this[w] += n;\n        while (this[w] >= this.DV) {\n            this[w] -= this.DV;\n            if (++w >= this.t) {\n                this[this.t++] = 0;\n            }\n            ++this[w];\n        }\n    };\n    // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;\n    // (protected) r = lower n words of \"this * a\", a.t <= n\n    // \"this\" should be the larger one if appropriate.\n    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {\n        var i = Math.min(this.t + a.t, n);\n        r.s = 0; // assumes a,this >= 0\n        r.t = i;\n        while (i > 0) {\n            r[--i] = 0;\n        }\n        for (var j = r.t - this.t; i < j; ++i) {\n            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);\n        }\n        for (var j = Math.min(a.t, n); i < j; ++i) {\n            this.am(0, a[i], r, i, 0, n - i);\n        }\n        r.clamp();\n    };\n    // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;\n    // (protected) r = \"this * a\" without lower n words, n > 0\n    // \"this\" should be the larger one if appropriate.\n    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {\n        --n;\n        var i = r.t = this.t + a.t - n;\n        r.s = 0; // assumes a,this >= 0\n        while (--i >= 0) {\n            r[i] = 0;\n        }\n        for (i = Math.max(n - this.t, 0); i < a.t; ++i) {\n            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);\n        }\n        r.clamp();\n        r.drShiftTo(1, r);\n    };\n    // BigInteger.prototype.modInt = bnpModInt;\n    // (protected) this % n, n < 2^26\n    BigInteger.prototype.modInt = function (n) {\n        if (n <= 0) {\n            return 0;\n        }\n        var d = this.DV % n;\n        var r = (this.s < 0) ? n - 1 : 0;\n        if (this.t > 0) {\n            if (d == 0) {\n                r = this[0] % n;\n            }\n            else {\n                for (var i = this.t - 1; i >= 0; --i) {\n                    r = (d * r + this[i]) % n;\n                }\n            }\n        }\n        return r;\n    };\n    // BigInteger.prototype.millerRabin = bnpMillerRabin;\n    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)\n    BigInteger.prototype.millerRabin = function (t) {\n        var n1 = this.subtract(BigInteger.ONE);\n        var k = n1.getLowestSetBit();\n        if (k <= 0) {\n            return false;\n        }\n        var r = n1.shiftRight(k);\n        t = (t + 1) >> 1;\n        if (t > lowprimes.length) {\n            t = lowprimes.length;\n        }\n        var a = nbi();\n        for (var i = 0; i < t; ++i) {\n            // Pick bases at random, instead of starting at 2\n            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);\n            var y = a.modPow(r, this);\n            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {\n                var j = 1;\n                while (j++ < k && y.compareTo(n1) != 0) {\n                    y = y.modPowInt(2, this);\n                    if (y.compareTo(BigInteger.ONE) == 0) {\n                        return false;\n                    }\n                }\n                if (y.compareTo(n1) != 0) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n    // BigInteger.prototype.square = bnSquare;\n    // (public) this^2\n    BigInteger.prototype.square = function () {\n        var r = nbi();\n        this.squareTo(r);\n        return r;\n    };\n    //#region ASYNC\n    // Public API method\n    BigInteger.prototype.gcda = function (a, callback) {\n        var x = (this.s < 0) ? this.negate() : this.clone();\n        var y = (a.s < 0) ? a.negate() : a.clone();\n        if (x.compareTo(y) < 0) {\n            var t = x;\n            x = y;\n            y = t;\n        }\n        var i = x.getLowestSetBit();\n        var g = y.getLowestSetBit();\n        if (g < 0) {\n            callback(x);\n            return;\n        }\n        if (i < g) {\n            g = i;\n        }\n        if (g > 0) {\n            x.rShiftTo(g, x);\n            y.rShiftTo(g, y);\n        }\n        // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.\n        var gcda1 = function () {\n            if ((i = x.getLowestSetBit()) > 0) {\n                x.rShiftTo(i, x);\n            }\n            if ((i = y.getLowestSetBit()) > 0) {\n                y.rShiftTo(i, y);\n            }\n            if (x.compareTo(y) >= 0) {\n                x.subTo(y, x);\n                x.rShiftTo(1, x);\n            }\n            else {\n                y.subTo(x, y);\n                y.rShiftTo(1, y);\n            }\n            if (!(x.signum() > 0)) {\n                if (g > 0) {\n                    y.lShiftTo(g, y);\n                }\n                setTimeout(function () { callback(y); }, 0); // escape\n            }\n            else {\n                setTimeout(gcda1, 0);\n            }\n        };\n        setTimeout(gcda1, 10);\n    };\n    // (protected) alternate constructor\n    BigInteger.prototype.fromNumberAsync = function (a, b, c, callback) {\n        if (\"number\" == typeof b) {\n            if (a < 2) {\n                this.fromInt(1);\n            }\n            else {\n                this.fromNumber(a, c);\n                if (!this.testBit(a - 1)) {\n                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), _util__WEBPACK_IMPORTED_MODULE_0__.op_or, this);\n                }\n                if (this.isEven()) {\n                    this.dAddOffset(1, 0);\n                }\n                var bnp_1 = this;\n                var bnpfn1_1 = function () {\n                    bnp_1.dAddOffset(2, 0);\n                    if (bnp_1.bitLength() > a) {\n                        bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1);\n                    }\n                    if (bnp_1.isProbablePrime(b)) {\n                        setTimeout(function () { callback(); }, 0); // escape\n                    }\n                    else {\n                        setTimeout(bnpfn1_1, 0);\n                    }\n                };\n                setTimeout(bnpfn1_1, 0);\n            }\n        }\n        else {\n            var x = [];\n            var t = a & 7;\n            x.length = (a >> 3) + 1;\n            b.nextBytes(x);\n            if (t > 0) {\n                x[0] &= ((1 << t) - 1);\n            }\n            else {\n                x[0] = 0;\n            }\n            this.fromString(x, 256);\n        }\n    };\n    return BigInteger;\n}());\n\n//#region REDUCERS\n//#region NullExp\nvar NullExp = /** @class */ (function () {\n    function NullExp() {\n    }\n    // NullExp.prototype.convert = nNop;\n    NullExp.prototype.convert = function (x) {\n        return x;\n    };\n    // NullExp.prototype.revert = nNop;\n    NullExp.prototype.revert = function (x) {\n        return x;\n    };\n    // NullExp.prototype.mulTo = nMulTo;\n    NullExp.prototype.mulTo = function (x, y, r) {\n        x.multiplyTo(y, r);\n    };\n    // NullExp.prototype.sqrTo = nSqrTo;\n    NullExp.prototype.sqrTo = function (x, r) {\n        x.squareTo(r);\n    };\n    return NullExp;\n}());\n// Modular reduction using \"classic\" algorithm\nvar Classic = /** @class */ (function () {\n    function Classic(m) {\n        this.m = m;\n    }\n    // Classic.prototype.convert = cConvert;\n    Classic.prototype.convert = function (x) {\n        if (x.s < 0 || x.compareTo(this.m) >= 0) {\n            return x.mod(this.m);\n        }\n        else {\n            return x;\n        }\n    };\n    // Classic.prototype.revert = cRevert;\n    Classic.prototype.revert = function (x) {\n        return x;\n    };\n    // Classic.prototype.reduce = cReduce;\n    Classic.prototype.reduce = function (x) {\n        x.divRemTo(this.m, null, x);\n    };\n    // Classic.prototype.mulTo = cMulTo;\n    Classic.prototype.mulTo = function (x, y, r) {\n        x.multiplyTo(y, r);\n        this.reduce(r);\n    };\n    // Classic.prototype.sqrTo = cSqrTo;\n    Classic.prototype.sqrTo = function (x, r) {\n        x.squareTo(r);\n        this.reduce(r);\n    };\n    return Classic;\n}());\n//#endregion\n//#region Montgomery\n// Montgomery reduction\nvar Montgomery = /** @class */ (function () {\n    function Montgomery(m) {\n        this.m = m;\n        this.mp = m.invDigit();\n        this.mpl = this.mp & 0x7fff;\n        this.mph = this.mp >> 15;\n        this.um = (1 << (m.DB - 15)) - 1;\n        this.mt2 = 2 * m.t;\n    }\n    // Montgomery.prototype.convert = montConvert;\n    // xR mod m\n    Montgomery.prototype.convert = function (x) {\n        var r = nbi();\n        x.abs().dlShiftTo(this.m.t, r);\n        r.divRemTo(this.m, null, r);\n        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {\n            this.m.subTo(r, r);\n        }\n        return r;\n    };\n    // Montgomery.prototype.revert = montRevert;\n    // x/R mod m\n    Montgomery.prototype.revert = function (x) {\n        var r = nbi();\n        x.copyTo(r);\n        this.reduce(r);\n        return r;\n    };\n    // Montgomery.prototype.reduce = montReduce;\n    // x = x/R mod m (HAC 14.32)\n    Montgomery.prototype.reduce = function (x) {\n        while (x.t <= this.mt2) {\n            // pad x so am has enough room later\n            x[x.t++] = 0;\n        }\n        for (var i = 0; i < this.m.t; ++i) {\n            // faster way of calculating u0 = x[i]*mp mod DV\n            var j = x[i] & 0x7fff;\n            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;\n            // use am to combine the multiply-shift-add into one call\n            j = i + this.m.t;\n            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);\n            // propagate carry\n            while (x[j] >= x.DV) {\n                x[j] -= x.DV;\n                x[++j]++;\n            }\n        }\n        x.clamp();\n        x.drShiftTo(this.m.t, x);\n        if (x.compareTo(this.m) >= 0) {\n            x.subTo(this.m, x);\n        }\n    };\n    // Montgomery.prototype.mulTo = montMulTo;\n    // r = \"xy/R mod m\"; x,y != r\n    Montgomery.prototype.mulTo = function (x, y, r) {\n        x.multiplyTo(y, r);\n        this.reduce(r);\n    };\n    // Montgomery.prototype.sqrTo = montSqrTo;\n    // r = \"x^2/R mod m\"; x != r\n    Montgomery.prototype.sqrTo = function (x, r) {\n        x.squareTo(r);\n        this.reduce(r);\n    };\n    return Montgomery;\n}());\n//#endregion Montgomery\n//#region Barrett\n// Barrett modular reduction\nvar Barrett = /** @class */ (function () {\n    function Barrett(m) {\n        this.m = m;\n        // setup Barrett\n        this.r2 = nbi();\n        this.q3 = nbi();\n        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);\n        this.mu = this.r2.divide(m);\n    }\n    // Barrett.prototype.convert = barrettConvert;\n    Barrett.prototype.convert = function (x) {\n        if (x.s < 0 || x.t > 2 * this.m.t) {\n            return x.mod(this.m);\n        }\n        else if (x.compareTo(this.m) < 0) {\n            return x;\n        }\n        else {\n            var r = nbi();\n            x.copyTo(r);\n            this.reduce(r);\n            return r;\n        }\n    };\n    // Barrett.prototype.revert = barrettRevert;\n    Barrett.prototype.revert = function (x) {\n        return x;\n    };\n    // Barrett.prototype.reduce = barrettReduce;\n    // x = x mod m (HAC 14.42)\n    Barrett.prototype.reduce = function (x) {\n        x.drShiftTo(this.m.t - 1, this.r2);\n        if (x.t > this.m.t + 1) {\n            x.t = this.m.t + 1;\n            x.clamp();\n        }\n        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);\n        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);\n        while (x.compareTo(this.r2) < 0) {\n            x.dAddOffset(1, this.m.t + 1);\n        }\n        x.subTo(this.r2, x);\n        while (x.compareTo(this.m) >= 0) {\n            x.subTo(this.m, x);\n        }\n    };\n    // Barrett.prototype.mulTo = barrettMulTo;\n    // r = x*y mod m; x,y != r\n    Barrett.prototype.mulTo = function (x, y, r) {\n        x.multiplyTo(y, r);\n        this.reduce(r);\n    };\n    // Barrett.prototype.sqrTo = barrettSqrTo;\n    // r = x^2 mod m; x != r\n    Barrett.prototype.sqrTo = function (x, r) {\n        x.squareTo(r);\n        this.reduce(r);\n    };\n    return Barrett;\n}());\n//#endregion\n//#endregion REDUCERS\n// return new, unset BigInteger\nfunction nbi() { return new BigInteger(null); }\nfunction parseBigInt(str, r) {\n    return new BigInteger(str, r);\n}\n// am: Compute w_j += (x*this_i), propagate carries,\n// c is initial carry, returns final carry.\n// c < 3*dvalue, x < 2*dvalue, this_i < dvalue\n// We need to select the fastest one that works in this environment.\nvar inBrowser = typeof navigator2 !== \"undefined\";\nif (inBrowser && j_lm && (navigator2.appName == \"Microsoft Internet Explorer\")) {\n    // am2 avoids a big mult-and-extract completely.\n    // Max digit bits should be <= 30 because we do bitwise ops\n    // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)\n    BigInteger.prototype.am = function am2(i, x, w, j, c, n) {\n        var xl = x & 0x7fff;\n        var xh = x >> 15;\n        while (--n >= 0) {\n            var l = this[i] & 0x7fff;\n            var h = this[i++] >> 15;\n            var m = xh * l + h * xl;\n            l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);\n            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);\n            w[j++] = l & 0x3fffffff;\n        }\n        return c;\n    };\n    dbits = 30;\n}\nelse if (inBrowser && j_lm && (navigator2.appName != \"Netscape\")) {\n    // am1: use a single mult and divide to get the high bits,\n    // max digit bits should be 26 because\n    // max internal value = 2*dvalue^2-2*dvalue (< 2^53)\n    BigInteger.prototype.am = function am1(i, x, w, j, c, n) {\n        while (--n >= 0) {\n            var v = x * this[i++] + w[j] + c;\n            c = Math.floor(v / 0x4000000);\n            w[j++] = v & 0x3ffffff;\n        }\n        return c;\n    };\n    dbits = 26;\n}\nelse { // Mozilla/Netscape seems to prefer am3\n    // Alternately, set max digit bits to 28 since some\n    // browsers slow down when dealing with 32-bit numbers.\n    BigInteger.prototype.am = function am3(i, x, w, j, c, n) {\n        var xl = x & 0x3fff;\n        var xh = x >> 14;\n        while (--n >= 0) {\n            var l = this[i] & 0x3fff;\n            var h = this[i++] >> 14;\n            var m = xh * l + h * xl;\n            l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;\n            c = (l >> 28) + (m >> 14) + xh * h;\n            w[j++] = l & 0xfffffff;\n        }\n        return c;\n    };\n    dbits = 28;\n}\nBigInteger.prototype.DB = dbits;\nBigInteger.prototype.DM = ((1 << dbits) - 1);\nBigInteger.prototype.DV = (1 << dbits);\nvar BI_FP = 52;\nBigInteger.prototype.FV = Math.pow(2, BI_FP);\nBigInteger.prototype.F1 = BI_FP - dbits;\nBigInteger.prototype.F2 = 2 * dbits - BI_FP;\n// Digit conversions\nvar BI_RC = [];\nvar rr;\nvar vv;\nrr = \"0\".charCodeAt(0);\nfor (vv = 0; vv <= 9; ++vv) {\n    BI_RC[rr++] = vv;\n}\nrr = \"a\".charCodeAt(0);\nfor (vv = 10; vv < 36; ++vv) {\n    BI_RC[rr++] = vv;\n}\nrr = \"A\".charCodeAt(0);\nfor (vv = 10; vv < 36; ++vv) {\n    BI_RC[rr++] = vv;\n}\nfunction intAt(s, i) {\n    var c = BI_RC[s.charCodeAt(i)];\n    return (c == null) ? -1 : c;\n}\n// return bigint initialized to value\nfunction nbv(i) {\n    var r = nbi();\n    r.fromInt(i);\n    return r;\n}\n// returns bit length of the integer x\nfunction nbits(x) {\n    var r = 1;\n    var t;\n    if ((t = x >>> 16) != 0) {\n        x = t;\n        r += 16;\n    }\n    if ((t = x >> 8) != 0) {\n        x = t;\n        r += 8;\n    }\n    if ((t = x >> 4) != 0) {\n        x = t;\n        r += 4;\n    }\n    if ((t = x >> 2) != 0) {\n        x = t;\n        r += 2;\n    }\n    if ((t = x >> 1) != 0) {\n        x = t;\n        r += 1;\n    }\n    return r;\n}\n// \"constants\"\nBigInteger.ZERO = nbv(0);\nBigInteger.ONE = nbv(1);\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/jsbn.js?");

          /***/},

        /***/"./lib/lib/jsbn/prng4.js":
        /*!*******************************!*\
                                          !*** ./lib/lib/jsbn/prng4.js ***!
                                          \*******************************/
        /***/function libLibJsbnPrng4Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Arcfour\": () => (/* binding */ Arcfour),\n/* harmony export */   \"prng_newstate\": () => (/* binding */ prng_newstate),\n/* harmony export */   \"rng_psize\": () => (/* binding */ rng_psize)\n/* harmony export */ });\n// prng4.js - uses Arcfour as a PRNG\nvar Arcfour = /** @class */ (function () {\n    function Arcfour() {\n        this.i = 0;\n        this.j = 0;\n        this.S = [];\n    }\n    // Arcfour.prototype.init = ARC4init;\n    // Initialize arcfour context from key, an array of ints, each from [0..255]\n    Arcfour.prototype.init = function (key) {\n        var i;\n        var j;\n        var t;\n        for (i = 0; i < 256; ++i) {\n            this.S[i] = i;\n        }\n        j = 0;\n        for (i = 0; i < 256; ++i) {\n            j = (j + this.S[i] + key[i % key.length]) & 255;\n            t = this.S[i];\n            this.S[i] = this.S[j];\n            this.S[j] = t;\n        }\n        this.i = 0;\n        this.j = 0;\n    };\n    // Arcfour.prototype.next = ARC4next;\n    Arcfour.prototype.next = function () {\n        var t;\n        this.i = (this.i + 1) & 255;\n        this.j = (this.j + this.S[this.i]) & 255;\n        t = this.S[this.i];\n        this.S[this.i] = this.S[this.j];\n        this.S[this.j] = t;\n        return this.S[(t + this.S[this.i]) & 255];\n    };\n    return Arcfour;\n}());\n\n// Plug in your RNG constructor here\nfunction prng_newstate() {\n    return new Arcfour();\n}\n// Pool size must be a multiple of 4 and greater than 32.\n// An array of bytes the size of the pool will be passed to init()\nvar rng_psize = 256;\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/prng4.js?");

          /***/},

        /***/"./lib/lib/jsbn/rng.js":
        /*!*****************************!*\
                                        !*** ./lib/lib/jsbn/rng.js ***!
                                        \*****************************/
        /***/function libLibJsbnRngJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SecureRandom\": () => (/* binding */ SecureRandom)\n/* harmony export */ });\n/* harmony import */ var _prng4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prng4 */ \"./lib/lib/jsbn/prng4.js\");\n// Random number generator - requires a PRNG backend, e.g. prng4.js\n\nvar rng_state;\nvar rng_pool = null;\nvar rng_pptr;\n// Initialize the pool with junk if needed.\nif (rng_pool == null) {\n    rng_pool = [];\n    rng_pptr = 0;\n    var t = void 0;\n    if (window2.crypto && window2.crypto.getRandomValues) {\n        // Extract entropy (2048 bits) from RNG if available\n        var z = new Uint32Array(256);\n        window2.crypto.getRandomValues(z);\n        for (t = 0; t < z.length; ++t) {\n            rng_pool[rng_pptr++] = z[t] & 255;\n        }\n    }\n    // Use mouse events for entropy, if we do not have enough entropy by the time\n    // we need it, entropy will be generated by Math.random.\n    var count = 0;\n    var onMouseMoveListener_1 = function (ev) {\n        count = count || 0;\n        if (count >= 256 || rng_pptr >= _prng4__WEBPACK_IMPORTED_MODULE_0__.rng_psize) {\n            if (window2.removeEventListener) {\n                window2.removeEventListener(\"mousemove\", onMouseMoveListener_1, false);\n            }\n            else if (window2.detachEvent) {\n                window2.detachEvent(\"onmousemove\", onMouseMoveListener_1);\n            }\n            return;\n        }\n        try {\n            var mouseCoordinates = ev.x + ev.y;\n            rng_pool[rng_pptr++] = mouseCoordinates & 255;\n            count += 1;\n        }\n        catch (e) {\n            // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.\n        }\n    };\n    if (window2.addEventListener) {\n        window2.addEventListener(\"mousemove\", onMouseMoveListener_1, false);\n    }\n    else if (window2.attachEvent) {\n        window2.attachEvent(\"onmousemove\", onMouseMoveListener_1);\n    }\n}\nfunction rng_get_byte() {\n    if (rng_state == null) {\n        rng_state = (0,_prng4__WEBPACK_IMPORTED_MODULE_0__.prng_newstate)();\n        // At this point, we may not have collected enough entropy.  If not, fall back to Math.random\n        while (rng_pptr < _prng4__WEBPACK_IMPORTED_MODULE_0__.rng_psize) {\n            var random = Math.floor(65536 * Math.random());\n            rng_pool[rng_pptr++] = random & 255;\n        }\n        rng_state.init(rng_pool);\n        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {\n            rng_pool[rng_pptr] = 0;\n        }\n        rng_pptr = 0;\n    }\n    // TODO: allow reseeding after first request\n    return rng_state.next();\n}\nvar SecureRandom = /** @class */ (function () {\n    function SecureRandom() {\n    }\n    SecureRandom.prototype.nextBytes = function (ba) {\n        for (var i = 0; i < ba.length; ++i) {\n            ba[i] = rng_get_byte();\n        }\n    };\n    return SecureRandom;\n}());\n\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/rng.js?");

          /***/},

        /***/"./lib/lib/jsbn/rsa.js":
        /*!*****************************!*\
                                        !*** ./lib/lib/jsbn/rsa.js ***!
                                        \*****************************/
        /***/function libLibJsbnRsaJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RSAKey\": () => (/* binding */ RSAKey)\n/* harmony export */ });\n/* harmony import */ var _jsbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsbn */ \"./lib/lib/jsbn/jsbn.js\");\n/* harmony import */ var _rng__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng */ \"./lib/lib/jsbn/rng.js\");\n// Depends on jsbn.js and rng.js\n// Version 1.1: support utf-8 encoding in pkcs1pad2\n// convert a (hex) string to a bignum object\n\n\n// function linebrk(s,n) {\n//   var ret = \"\";\n//   var i = 0;\n//   while(i + n < s.length) {\n//     ret += s.substring(i,i+n) + \"\\n\";\n//     i += n;\n//   }\n//   return ret + s.substring(i,s.length);\n// }\n// function byte2Hex(b) {\n//   if(b < 0x10)\n//     return \"0\" + b.toString(16);\n//   else\n//     return b.toString(16);\n// }\nfunction pkcs1pad1(s, n) {\n    if (n < s.length + 22) {\n        console.error(\"Message too long for RSA\");\n        return null;\n    }\n    var len = n - s.length - 6;\n    var filler = \"\";\n    for (var f = 0; f < len; f += 2) {\n        filler += \"ff\";\n    }\n    var m = \"0001\" + filler + \"00\" + s;\n    return (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(m, 16);\n}\n// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint\nfunction pkcs1pad2(s, n) {\n    if (n < s.length + 11) { // TODO: fix for utf-8\n        console.error(\"Message too long for RSA\");\n        return null;\n    }\n    var ba = [];\n    var i = s.length - 1;\n    while (i >= 0 && n > 0) {\n        var c = s.charCodeAt(i--);\n        if (c < 128) { // encode using utf-8\n            ba[--n] = c;\n        }\n        else if ((c > 127) && (c < 2048)) {\n            ba[--n] = (c & 63) | 128;\n            ba[--n] = (c >> 6) | 192;\n        }\n        else {\n            ba[--n] = (c & 63) | 128;\n            ba[--n] = ((c >> 6) & 63) | 128;\n            ba[--n] = (c >> 12) | 224;\n        }\n    }\n    ba[--n] = 0;\n    var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();\n    var x = [];\n    while (n > 2) { // random non-zero pad\n        x[0] = 0;\n        while (x[0] == 0) {\n            rng.nextBytes(x);\n        }\n        ba[--n] = x[0];\n    }\n    ba[--n] = 2;\n    ba[--n] = 0;\n    return new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(ba);\n}\n// \"empty\" RSA key constructor\nvar RSAKey = /** @class */ (function () {\n    function RSAKey() {\n        this.n = null;\n        this.e = 0;\n        this.d = null;\n        this.p = null;\n        this.q = null;\n        this.dmp1 = null;\n        this.dmq1 = null;\n        this.coeff = null;\n    }\n    //#region PROTECTED\n    // protected\n    // RSAKey.prototype.doPublic = RSADoPublic;\n    // Perform raw public operation on \"x\": return x^e (mod n)\n    RSAKey.prototype.doPublic = function (x) {\n        return x.modPowInt(this.e, this.n);\n    };\n    // RSAKey.prototype.doPrivate = RSADoPrivate;\n    // Perform raw private operation on \"x\": return x^d (mod n)\n    RSAKey.prototype.doPrivate = function (x) {\n        if (this.p == null || this.q == null) {\n            return x.modPow(this.d, this.n);\n        }\n        // TODO: re-calculate any missing CRT params\n        var xp = x.mod(this.p).modPow(this.dmp1, this.p);\n        var xq = x.mod(this.q).modPow(this.dmq1, this.q);\n        while (xp.compareTo(xq) < 0) {\n            xp = xp.add(this.p);\n        }\n        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);\n    };\n    //#endregion PROTECTED\n    //#region PUBLIC\n    // RSAKey.prototype.setPublic = RSASetPublic;\n    // Set the public key fields N and e from hex strings\n    RSAKey.prototype.setPublic = function (N, E) {\n        if (N != null && E != null && N.length > 0 && E.length > 0) {\n            this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);\n            this.e = parseInt(E, 16);\n        }\n        else {\n            console.error(\"Invalid RSA public key\");\n        }\n    };\n    // RSAKey.prototype.encrypt = RSAEncrypt;\n    // Return the PKCS#1 RSA encryption of \"text\" as an even-length hex string\n    RSAKey.prototype.encrypt = function (text) {\n        var maxLength = (this.n.bitLength() + 7) >> 3;\n        var m = pkcs1pad2(text, maxLength);\n        if (m == null) {\n            return null;\n        }\n        var c = this.doPublic(m);\n        if (c == null) {\n            return null;\n        }\n        var h = c.toString(16);\n        var length = h.length;\n        // fix zero before result\n        for (var i = 0; i < maxLength * 2 - length; i++) {\n            h = \"0\" + h;\n        }\n        return h;\n    };\n    // RSAKey.prototype.setPrivate = RSASetPrivate;\n    // Set the private key fields N, e, and d from hex strings\n    RSAKey.prototype.setPrivate = function (N, E, D) {\n        if (N != null && E != null && N.length > 0 && E.length > 0) {\n            this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);\n            this.e = parseInt(E, 16);\n            this.d = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(D, 16);\n        }\n        else {\n            console.error(\"Invalid RSA private key\");\n        }\n    };\n    // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;\n    // Set the private key fields N, e, d and CRT params from hex strings\n    RSAKey.prototype.setPrivateEx = function (N, E, D, P, Q, DP, DQ, C) {\n        if (N != null && E != null && N.length > 0 && E.length > 0) {\n            this.n = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(N, 16);\n            this.e = parseInt(E, 16);\n            this.d = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(D, 16);\n            this.p = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(P, 16);\n            this.q = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(Q, 16);\n            this.dmp1 = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(DP, 16);\n            this.dmq1 = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(DQ, 16);\n            this.coeff = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(C, 16);\n        }\n        else {\n            console.error(\"Invalid RSA private key\");\n        }\n    };\n    // RSAKey.prototype.generate = RSAGenerate;\n    // Generate a new random private key B bits long, using public expt E\n    RSAKey.prototype.generate = function (B, E) {\n        var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();\n        var qs = B >> 1;\n        this.e = parseInt(E, 16);\n        var ee = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(E, 16);\n        for (;;) {\n            for (;;) {\n                this.p = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(B - qs, 1, rng);\n                if (this.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {\n                    break;\n                }\n            }\n            for (;;) {\n                this.q = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(qs, 1, rng);\n                if (this.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {\n                    break;\n                }\n            }\n            if (this.p.compareTo(this.q) <= 0) {\n                var t = this.p;\n                this.p = this.q;\n                this.q = t;\n            }\n            var p1 = this.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);\n            var q1 = this.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);\n            var phi = p1.multiply(q1);\n            if (phi.gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0) {\n                this.n = this.p.multiply(this.q);\n                this.d = ee.modInverse(phi);\n                this.dmp1 = this.d.mod(p1);\n                this.dmq1 = this.d.mod(q1);\n                this.coeff = this.q.modInverse(this.p);\n                break;\n            }\n        }\n    };\n    // RSAKey.prototype.decrypt = RSADecrypt;\n    // Return the PKCS#1 RSA decryption of \"ctext\".\n    // \"ctext\" is an even-length hex string and the output is a plain string.\n    RSAKey.prototype.decrypt = function (ctext) {\n        var c = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(ctext, 16);\n        var m = this.doPrivate(c);\n        if (m == null) {\n            return null;\n        }\n        return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);\n    };\n    // Generate a new random private key B bits long, using public expt E\n    RSAKey.prototype.generateAsync = function (B, E, callback) {\n        var rng = new _rng__WEBPACK_IMPORTED_MODULE_1__.SecureRandom();\n        var qs = B >> 1;\n        this.e = parseInt(E, 16);\n        var ee = new _jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(E, 16);\n        var rsa = this;\n        // These functions have non-descript names because they were originally for(;;) loops.\n        // I don't know about cryptography to give them better names than loop1-4.\n        var loop1 = function () {\n            var loop4 = function () {\n                if (rsa.p.compareTo(rsa.q) <= 0) {\n                    var t = rsa.p;\n                    rsa.p = rsa.q;\n                    rsa.q = t;\n                }\n                var p1 = rsa.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);\n                var q1 = rsa.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);\n                var phi = p1.multiply(q1);\n                if (phi.gcd(ee).compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0) {\n                    rsa.n = rsa.p.multiply(rsa.q);\n                    rsa.d = ee.modInverse(phi);\n                    rsa.dmp1 = rsa.d.mod(p1);\n                    rsa.dmq1 = rsa.d.mod(q1);\n                    rsa.coeff = rsa.q.modInverse(rsa.p);\n                    setTimeout(function () { callback(); }, 0); // escape\n                }\n                else {\n                    setTimeout(loop1, 0);\n                }\n            };\n            var loop3 = function () {\n                rsa.q = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.nbi)();\n                rsa.q.fromNumberAsync(qs, 1, rng, function () {\n                    rsa.q.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcda(ee, function (r) {\n                        if (r.compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {\n                            setTimeout(loop4, 0);\n                        }\n                        else {\n                            setTimeout(loop3, 0);\n                        }\n                    });\n                });\n            };\n            var loop2 = function () {\n                rsa.p = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.nbi)();\n                rsa.p.fromNumberAsync(B - qs, 1, rng, function () {\n                    rsa.p.subtract(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE).gcda(ee, function (r) {\n                        if (r.compareTo(_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {\n                            setTimeout(loop3, 0);\n                        }\n                        else {\n                            setTimeout(loop2, 0);\n                        }\n                    });\n                });\n            };\n            setTimeout(loop2, 0);\n        };\n        setTimeout(loop1, 0);\n    };\n    RSAKey.prototype.sign = function (text, digestMethod, digestName) {\n        var header = getDigestHeader(digestName);\n        var digest = header + digestMethod(text).toString();\n        var m = pkcs1pad1(digest, this.n.bitLength() / 4);\n        if (m == null) {\n            return null;\n        }\n        var c = this.doPrivate(m);\n        if (c == null) {\n            return null;\n        }\n        var h = c.toString(16);\n        if ((h.length & 1) == 0) {\n            return h;\n        }\n        else {\n            return \"0\" + h;\n        }\n    };\n    RSAKey.prototype.verify = function (text, signature, digestMethod) {\n        var c = (0,_jsbn__WEBPACK_IMPORTED_MODULE_0__.parseBigInt)(signature, 16);\n        var m = this.doPublic(c);\n        if (m == null) {\n            return null;\n        }\n        var unpadded = m.toString(16).replace(/^1f+00/, \"\");\n        var digest = removeDigestHeader(unpadded);\n        return digest == digestMethod(text).toString();\n    };\n    return RSAKey;\n}());\n\n// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext\nfunction pkcs1unpad2(d, n) {\n    var b = d.toByteArray();\n    var i = 0;\n    while (i < b.length && b[i] == 0) {\n        ++i;\n    }\n    if (b.length - i != n - 1 || b[i] != 2) {\n        return null;\n    }\n    ++i;\n    while (b[i] != 0) {\n        if (++i >= b.length) {\n            return null;\n        }\n    }\n    var ret = \"\";\n    while (++i < b.length) {\n        var c = b[i] & 255;\n        if (c < 128) { // utf-8 decode\n            ret += String.fromCharCode(c);\n        }\n        else if ((c > 191) && (c < 224)) {\n            ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));\n            ++i;\n        }\n        else {\n            ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));\n            i += 2;\n        }\n    }\n    return ret;\n}\n// https://tools.ietf.org/html/rfc3447#page-43\nvar DIGEST_HEADERS = {\n    md2: \"3020300c06082a864886f70d020205000410\",\n    md5: \"3020300c06082a864886f70d020505000410\",\n    sha1: \"3021300906052b0e03021a05000414\",\n    sha224: \"302d300d06096086480165030402040500041c\",\n    sha256: \"3031300d060960864801650304020105000420\",\n    sha384: \"3041300d060960864801650304020205000430\",\n    sha512: \"3051300d060960864801650304020305000440\",\n    ripemd160: \"3021300906052b2403020105000414\"\n};\nfunction getDigestHeader(name) {\n    return DIGEST_HEADERS[name] || \"\";\n}\nfunction removeDigestHeader(str) {\n    for (var name_1 in DIGEST_HEADERS) {\n        if (DIGEST_HEADERS.hasOwnProperty(name_1)) {\n            var header = DIGEST_HEADERS[name_1];\n            var len = header.length;\n            if (str.substr(0, len) == header) {\n                return str.substr(len);\n            }\n        }\n    }\n    return str;\n}\n// Return the PKCS#1 RSA encryption of \"text\" as a Base64-encoded string\n// function RSAEncryptB64(text) {\n//  var h = this.encrypt(text);\n//  if(h) return hex2b64(h); else return null;\n// }\n// public\n// RSAKey.prototype.encrypt_b64 = RSAEncryptB64;\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/rsa.js?");

          /***/},

        /***/"./lib/lib/jsbn/util.js":
        /*!******************************!*\
                                         !*** ./lib/lib/jsbn/util.js ***!
                                         \******************************/
        /***/function libLibJsbnUtilJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"int2char\": () => (/* binding */ int2char),\n/* harmony export */   \"op_and\": () => (/* binding */ op_and),\n/* harmony export */   \"op_or\": () => (/* binding */ op_or),\n/* harmony export */   \"op_xor\": () => (/* binding */ op_xor),\n/* harmony export */   \"op_andnot\": () => (/* binding */ op_andnot),\n/* harmony export */   \"lbit\": () => (/* binding */ lbit),\n/* harmony export */   \"cbit\": () => (/* binding */ cbit)\n/* harmony export */ });\nvar BI_RM = \"0123456789abcdefghijklmnopqrstuvwxyz\";\nfunction int2char(n) {\n    return BI_RM.charAt(n);\n}\n//#region BIT_OPERATIONS\n// (public) this & a\nfunction op_and(x, y) {\n    return x & y;\n}\n// (public) this | a\nfunction op_or(x, y) {\n    return x | y;\n}\n// (public) this ^ a\nfunction op_xor(x, y) {\n    return x ^ y;\n}\n// (public) this & ~a\nfunction op_andnot(x, y) {\n    return x & ~y;\n}\n// return index of lowest 1-bit in x, x < 2^31\nfunction lbit(x) {\n    if (x == 0) {\n        return -1;\n    }\n    var r = 0;\n    if ((x & 0xffff) == 0) {\n        x >>= 16;\n        r += 16;\n    }\n    if ((x & 0xff) == 0) {\n        x >>= 8;\n        r += 8;\n    }\n    if ((x & 0xf) == 0) {\n        x >>= 4;\n        r += 4;\n    }\n    if ((x & 3) == 0) {\n        x >>= 2;\n        r += 2;\n    }\n    if ((x & 1) == 0) {\n        ++r;\n    }\n    return r;\n}\n// return number of 1 bits in x\nfunction cbit(x) {\n    var r = 0;\n    while (x != 0) {\n        x &= x - 1;\n        ++r;\n    }\n    return r;\n}\n//#endregion BIT_OPERATIONS\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsbn/util.js?");

          /***/},

        /***/"./lib/lib/jsrsasign/asn1-1.0.js":
        /*!***************************************!*\
                                                  !*** ./lib/lib/jsrsasign/asn1-1.0.js ***!
                                                  \***************************************/
        /***/function libLibJsrsasignAsn110Js(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"KJUR\": () => (/* binding */ KJUR)\n/* harmony export */ });\n/* harmony import */ var _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jsbn/jsbn */ \"./lib/lib/jsbn/jsbn.js\");\n/* harmony import */ var _yahoo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yahoo */ \"./lib/lib/jsrsasign/yahoo.js\");\n/* asn1-1.0.13.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license\n */\n/*\n * asn1.js - ASN.1 DER encoder classes\n *\n * Copyright (c) 2013-2017 Kenji Urushima (kenji.urushima@gmail.com)\n *\n * This software is licensed under the terms of the MIT License.\n * https://kjur.github.io/jsrsasign/license\n *\n * The above copyright and license notice shall be\n * included in all copies or substantial portions of the Software.\n */\n\n\n/**\n * @fileOverview\n * @name asn1-1.0.js\n * @author Kenji Urushima kenji.urushima@gmail.com\n * @version asn1 1.0.13 (2017-Jun-02)\n * @since jsrsasign 2.1\n * @license <a href=\"https://kjur.github.io/jsrsasign/license/\">MIT License</a>\n */\n/**\n * kjur's class library name space\n * <p>\n * This name space provides following name spaces:\n * <ul>\n * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>\n * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>\n * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature\n * class and utilities</li>\n * </ul>\n * </p>\n * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.\n * @name KJUR\n * @namespace kjur's class library name space\n */\nvar KJUR = {};\n/**\n * kjur's ASN.1 class library name space\n * <p>\n * This is ITU-T X.690 ASN.1 DER encoder class library and\n * class structure and methods is very similar to\n * org.bouncycastle.asn1 package of\n * well known BouncyCaslte Cryptography Library.\n * <h4>PROVIDING ASN.1 PRIMITIVES</h4>\n * Here are ASN.1 DER primitive classes.\n * <ul>\n * <li>0x01 {@link KJUR.asn1.DERBoolean}</li>\n * <li>0x02 {@link KJUR.asn1.DERInteger}</li>\n * <li>0x03 {@link KJUR.asn1.DERBitString}</li>\n * <li>0x04 {@link KJUR.asn1.DEROctetString}</li>\n * <li>0x05 {@link KJUR.asn1.DERNull}</li>\n * <li>0x06 {@link KJUR.asn1.DERObjectIdentifier}</li>\n * <li>0x0a {@link KJUR.asn1.DEREnumerated}</li>\n * <li>0x0c {@link KJUR.asn1.DERUTF8String}</li>\n * <li>0x12 {@link KJUR.asn1.DERNumericString}</li>\n * <li>0x13 {@link KJUR.asn1.DERPrintableString}</li>\n * <li>0x14 {@link KJUR.asn1.DERTeletexString}</li>\n * <li>0x16 {@link KJUR.asn1.DERIA5String}</li>\n * <li>0x17 {@link KJUR.asn1.DERUTCTime}</li>\n * <li>0x18 {@link KJUR.asn1.DERGeneralizedTime}</li>\n * <li>0x30 {@link KJUR.asn1.DERSequence}</li>\n * <li>0x31 {@link KJUR.asn1.DERSet}</li>\n * </ul>\n * <h4>OTHER ASN.1 CLASSES</h4>\n * <ul>\n * <li>{@link KJUR.asn1.ASN1Object}</li>\n * <li>{@link KJUR.asn1.DERAbstractString}</li>\n * <li>{@link KJUR.asn1.DERAbstractTime}</li>\n * <li>{@link KJUR.asn1.DERAbstractStructured}</li>\n * <li>{@link KJUR.asn1.DERTaggedObject}</li>\n * </ul>\n * <h4>SUB NAME SPACES</h4>\n * <ul>\n * <li>{@link KJUR.asn1.cades} - CAdES long term signature format</li>\n * <li>{@link KJUR.asn1.cms} - Cryptographic Message Syntax</li>\n * <li>{@link KJUR.asn1.csr} - Certificate Signing Request (CSR/PKCS#10)</li>\n * <li>{@link KJUR.asn1.tsp} - RFC 3161 Timestamping Protocol Format</li>\n * <li>{@link KJUR.asn1.x509} - RFC 5280 X.509 certificate and CRL</li>\n * </ul>\n * </p>\n * NOTE: Please ignore method summary and document of this namespace.\n * This caused by a bug of jsdoc2.\n * @name KJUR.asn1\n * @namespace\n */\nif (typeof KJUR.asn1 == \"undefined\" || !KJUR.asn1)\n    KJUR.asn1 = {};\n/**\n * ASN1 utilities class\n * @name KJUR.asn1.ASN1Util\n * @class ASN1 utilities class\n * @since asn1 1.0.2\n */\nKJUR.asn1.ASN1Util = new function () {\n    this.integerToByteHex = function (i) {\n        var h = i.toString(16);\n        if ((h.length % 2) == 1)\n            h = '0' + h;\n        return h;\n    };\n    this.bigIntToMinTwosComplementsHex = function (bigIntegerValue) {\n        var h = bigIntegerValue.toString(16);\n        if (h.substr(0, 1) != '-') {\n            if (h.length % 2 == 1) {\n                h = '0' + h;\n            }\n            else {\n                if (!h.match(/^[0-7]/)) {\n                    h = '00' + h;\n                }\n            }\n        }\n        else {\n            var hPos = h.substr(1);\n            var xorLen = hPos.length;\n            if (xorLen % 2 == 1) {\n                xorLen += 1;\n            }\n            else {\n                if (!h.match(/^[0-7]/)) {\n                    xorLen += 2;\n                }\n            }\n            var hMask = '';\n            for (var i = 0; i < xorLen; i++) {\n                hMask += 'f';\n            }\n            var biMask = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(hMask, 16);\n            var biNeg = biMask.xor(bigIntegerValue).add(_jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger.ONE);\n            h = biNeg.toString(16).replace(/^-/, '');\n        }\n        return h;\n    };\n    /**\n     * get PEM string from hexadecimal data and header string\n     * @name getPEMStringFromHex\n     * @memberOf KJUR.asn1.ASN1Util\n     * @function\n     * @param {String} dataHex hexadecimal string of PEM body\n     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')\n     * @return {String} PEM formatted string of input data\n     * @description\n     * This method converts a hexadecimal string to a PEM string with\n     * a specified header. Its line break will be CRLF(\"\\r\\n\").\n     * @example\n     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');\n     * // value of pem will be:\n     * -----BEGIN PRIVATE KEY-----\n     * YWFh\n     * -----END PRIVATE KEY-----\n     */\n    this.getPEMStringFromHex = function (dataHex, pemHeader) {\n        return hextopem(dataHex, pemHeader);\n    };\n    /**\n     * generate ASN1Object specifed by JSON parameters\n     * @name newObject\n     * @memberOf KJUR.asn1.ASN1Util\n     * @function\n     * @param {Array} param JSON parameter to generate ASN1Object\n     * @return {KJUR.asn1.ASN1Object} generated object\n     * @since asn1 1.0.3\n     * @description\n     * generate any ASN1Object specified by JSON param\n     * including ASN.1 primitive or structured.\n     * Generally 'param' can be described as follows:\n     * <blockquote>\n     * {TYPE-OF-ASNOBJ: ASN1OBJ-PARAMETER}\n     * </blockquote>\n     * 'TYPE-OF-ASN1OBJ' can be one of following symbols:\n     * <ul>\n     * <li>'bool' - DERBoolean</li>\n     * <li>'int' - DERInteger</li>\n     * <li>'bitstr' - DERBitString</li>\n     * <li>'octstr' - DEROctetString</li>\n     * <li>'null' - DERNull</li>\n     * <li>'oid' - DERObjectIdentifier</li>\n     * <li>'enum' - DEREnumerated</li>\n     * <li>'utf8str' - DERUTF8String</li>\n     * <li>'numstr' - DERNumericString</li>\n     * <li>'prnstr' - DERPrintableString</li>\n     * <li>'telstr' - DERTeletexString</li>\n     * <li>'ia5str' - DERIA5String</li>\n     * <li>'utctime' - DERUTCTime</li>\n     * <li>'gentime' - DERGeneralizedTime</li>\n     * <li>'seq' - DERSequence</li>\n     * <li>'set' - DERSet</li>\n     * <li>'tag' - DERTaggedObject</li>\n     * </ul>\n     * @example\n     * newObject({'prnstr': 'aaa'});\n     * newObject({'seq': [{'int': 3}, {'prnstr': 'aaa'}]})\n     * // ASN.1 Tagged Object\n     * newObject({'tag': {'tag': 'a1',\n     *                    'explicit': true,\n     *                    'obj': {'seq': [{'int': 3}, {'prnstr': 'aaa'}]}}});\n     * // more simple representation of ASN.1 Tagged Object\n     * newObject({'tag': ['a1',\n     *                    true,\n     *                    {'seq': [\n     *                      {'int': 3},\n     *                      {'prnstr': 'aaa'}]}\n     *                   ]});\n     */\n    this.newObject = function (param) {\n        var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;\n        var keys = Object.keys(param);\n        if (keys.length != 1)\n            throw \"key of param shall be only one.\";\n        var key = keys[0];\n        if (\":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:\".indexOf(\":\" + key + \":\") == -1)\n            throw \"undefined key: \" + key;\n        if (key == \"bool\")\n            return new _DERBoolean(param[key]);\n        if (key == \"int\")\n            return new _DERInteger(param[key]);\n        if (key == \"bitstr\")\n            return new _DERBitString(param[key]);\n        if (key == \"octstr\")\n            return new _DEROctetString(param[key]);\n        if (key == \"null\")\n            return new _DERNull(param[key]);\n        if (key == \"oid\")\n            return new _DERObjectIdentifier(param[key]);\n        if (key == \"enum\")\n            return new _DEREnumerated(param[key]);\n        if (key == \"utf8str\")\n            return new _DERUTF8String(param[key]);\n        if (key == \"numstr\")\n            return new _DERNumericString(param[key]);\n        if (key == \"prnstr\")\n            return new _DERPrintableString(param[key]);\n        if (key == \"telstr\")\n            return new _DERTeletexString(param[key]);\n        if (key == \"ia5str\")\n            return new _DERIA5String(param[key]);\n        if (key == \"utctime\")\n            return new _DERUTCTime(param[key]);\n        if (key == \"gentime\")\n            return new _DERGeneralizedTime(param[key]);\n        if (key == \"seq\") {\n            var paramList = param[key];\n            var a = [];\n            for (var i = 0; i < paramList.length; i++) {\n                var asn1Obj = _newObject(paramList[i]);\n                a.push(asn1Obj);\n            }\n            return new _DERSequence({ 'array': a });\n        }\n        if (key == \"set\") {\n            var paramList = param[key];\n            var a = [];\n            for (var i = 0; i < paramList.length; i++) {\n                var asn1Obj = _newObject(paramList[i]);\n                a.push(asn1Obj);\n            }\n            return new _DERSet({ 'array': a });\n        }\n        if (key == \"tag\") {\n            var tagParam = param[key];\n            if (Object.prototype.toString.call(tagParam) === '[object Array]' &&\n                tagParam.length == 3) {\n                var obj = _newObject(tagParam[2]);\n                return new _DERTaggedObject({ tag: tagParam[0],\n                    explicit: tagParam[1],\n                    obj: obj });\n            }\n            else {\n                var newParam = {};\n                if (tagParam.explicit !== undefined)\n                    newParam.explicit = tagParam.explicit;\n                if (tagParam.tag !== undefined)\n                    newParam.tag = tagParam.tag;\n                if (tagParam.obj === undefined)\n                    throw \"obj shall be specified for 'tag'.\";\n                newParam.obj = _newObject(tagParam.obj);\n                return new _DERTaggedObject(newParam);\n            }\n        }\n    };\n    /**\n     * get encoded hexadecimal string of ASN1Object specifed by JSON parameters\n     * @name jsonToASN1HEX\n     * @memberOf KJUR.asn1.ASN1Util\n     * @function\n     * @param {Array} param JSON parameter to generate ASN1Object\n     * @return hexadecimal string of ASN1Object\n     * @since asn1 1.0.4\n     * @description\n     * As for ASN.1 object representation of JSON object,\n     * please see {@link newObject}.\n     * @example\n     * jsonToASN1HEX({'prnstr': 'aaa'});\n     */\n    this.jsonToASN1HEX = function (param) {\n        var asn1Obj = this.newObject(param);\n        return asn1Obj.getEncodedHex();\n    };\n};\n/**\n * get dot noted oid number string from hexadecimal value of OID\n * @name oidHexToInt\n * @memberOf KJUR.asn1.ASN1Util\n * @function\n * @param {String} hex hexadecimal value of object identifier\n * @return {String} dot noted string of object identifier\n * @since jsrsasign 4.8.3 asn1 1.0.7\n * @description\n * This static method converts from hexadecimal string representation of\n * ASN.1 value of object identifier to oid number string.\n * @example\n * KJUR.asn1.ASN1Util.oidHexToInt('550406') &rarr; \"2.5.4.6\"\n */\nKJUR.asn1.ASN1Util.oidHexToInt = function (hex) {\n    var s = \"\";\n    var i01 = parseInt(hex.substr(0, 2), 16);\n    var i0 = Math.floor(i01 / 40);\n    var i1 = i01 % 40;\n    var s = i0 + \".\" + i1;\n    var binbuf = \"\";\n    for (var i = 2; i < hex.length; i += 2) {\n        var value = parseInt(hex.substr(i, 2), 16);\n        var bin = (\"00000000\" + value.toString(2)).slice(-8);\n        binbuf = binbuf + bin.substr(1, 7);\n        if (bin.substr(0, 1) == \"0\") {\n            var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(binbuf, 2);\n            s = s + \".\" + bi.toString(10);\n            binbuf = \"\";\n        }\n    }\n    ;\n    return s;\n};\n/**\n * get hexadecimal value of object identifier from dot noted oid value\n * @name oidIntToHex\n * @memberOf KJUR.asn1.ASN1Util\n * @function\n * @param {String} oidString dot noted string of object identifier\n * @return {String} hexadecimal value of object identifier\n * @since jsrsasign 4.8.3 asn1 1.0.7\n * @description\n * This static method converts from object identifier value string.\n * to hexadecimal string representation of it.\n * @example\n * KJUR.asn1.ASN1Util.oidIntToHex(\"2.5.4.6\") &rarr; \"550406\"\n */\nKJUR.asn1.ASN1Util.oidIntToHex = function (oidString) {\n    var itox = function (i) {\n        var h = i.toString(16);\n        if (h.length == 1)\n            h = '0' + h;\n        return h;\n    };\n    var roidtox = function (roid) {\n        var h = '';\n        var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(roid, 10);\n        var b = bi.toString(2);\n        var padLen = 7 - b.length % 7;\n        if (padLen == 7)\n            padLen = 0;\n        var bPad = '';\n        for (var i = 0; i < padLen; i++)\n            bPad += '0';\n        b = bPad + b;\n        for (var i = 0; i < b.length - 1; i += 7) {\n            var b8 = b.substr(i, 7);\n            if (i != b.length - 7)\n                b8 = '1' + b8;\n            h += itox(parseInt(b8, 2));\n        }\n        return h;\n    };\n    if (!oidString.match(/^[0-9.]+$/)) {\n        throw \"malformed oid string: \" + oidString;\n    }\n    var h = '';\n    var a = oidString.split('.');\n    var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);\n    h += itox(i0);\n    a.splice(0, 2);\n    for (var i = 0; i < a.length; i++) {\n        h += roidtox(a[i]);\n    }\n    return h;\n};\n// ********************************************************************\n//  Abstract ASN.1 Classes\n// ********************************************************************\n// ********************************************************************\n/**\n * base class for ASN.1 DER encoder object\n * @name KJUR.asn1.ASN1Object\n * @class base class for ASN.1 DER encoder object\n * @property {Boolean} isModified flag whether internal data was changed\n * @property {String} hTLV hexadecimal string of ASN.1 TLV\n * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)\n * @property {String} hL hexadecimal string of ASN.1 TLV length(L)\n * @property {String} hV hexadecimal string of ASN.1 TLV value(V)\n * @description\n */\nKJUR.asn1.ASN1Object = function () {\n    var isModified = true;\n    var hTLV = null;\n    var hT = '00';\n    var hL = '00';\n    var hV = '';\n    /**\n     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)\n     * @name getLengthHexFromValue\n     * @memberOf KJUR.asn1.ASN1Object#\n     * @function\n     * @return {String} hexadecimal string of ASN.1 TLV length(L)\n     */\n    this.getLengthHexFromValue = function () {\n        if (typeof this.hV == \"undefined\" || this.hV == null) {\n            throw \"this.hV is null or undefined.\";\n        }\n        if (this.hV.length % 2 == 1) {\n            throw \"value hex must be even length: n=\" + hV.length + \",v=\" + this.hV;\n        }\n        var n = this.hV.length / 2;\n        var hN = n.toString(16);\n        if (hN.length % 2 == 1) {\n            hN = \"0\" + hN;\n        }\n        if (n < 128) {\n            return hN;\n        }\n        else {\n            var hNlen = hN.length / 2;\n            if (hNlen > 15) {\n                throw \"ASN.1 length too long to represent by 8x: n = \" + n.toString(16);\n            }\n            var head = 128 + hNlen;\n            return head.toString(16) + hN;\n        }\n    };\n    /**\n     * get hexadecimal string of ASN.1 TLV bytes\n     * @name getEncodedHex\n     * @memberOf KJUR.asn1.ASN1Object#\n     * @function\n     * @return {String} hexadecimal string of ASN.1 TLV\n     */\n    this.getEncodedHex = function () {\n        if (this.hTLV == null || this.isModified) {\n            this.hV = this.getFreshValueHex();\n            this.hL = this.getLengthHexFromValue();\n            this.hTLV = this.hT + this.hL + this.hV;\n            this.isModified = false;\n            //alert(\"first time: \" + this.hTLV);\n        }\n        return this.hTLV;\n    };\n    /**\n     * get hexadecimal string of ASN.1 TLV value(V) bytes\n     * @name getValueHex\n     * @memberOf KJUR.asn1.ASN1Object#\n     * @function\n     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes\n     */\n    this.getValueHex = function () {\n        this.getEncodedHex();\n        return this.hV;\n    };\n    this.getFreshValueHex = function () {\n        return '';\n    };\n};\n// == BEGIN DERAbstractString ================================================\n/**\n * base class for ASN.1 DER string classes\n * @name KJUR.asn1.DERAbstractString\n * @class base class for ASN.1 DER string classes\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @property {String} s internal string of value\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>str - specify initial ASN.1 value(V) by a string</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n */\nKJUR.asn1.DERAbstractString = function (params) {\n    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);\n    var s = null;\n    var hV = null;\n    /**\n     * get string value of this string object\n     * @name getString\n     * @memberOf KJUR.asn1.DERAbstractString#\n     * @function\n     * @return {String} string value of this string object\n     */\n    this.getString = function () {\n        return this.s;\n    };\n    /**\n     * set value by a string\n     * @name setString\n     * @memberOf KJUR.asn1.DERAbstractString#\n     * @function\n     * @param {String} newS value by a string to set\n     */\n    this.setString = function (newS) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.s = newS;\n        this.hV = stohex(this.s);\n    };\n    /**\n     * set value by a hexadecimal string\n     * @name setStringHex\n     * @memberOf KJUR.asn1.DERAbstractString#\n     * @function\n     * @param {String} newHexString value by a hexadecimal string to set\n     */\n    this.setStringHex = function (newHexString) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.s = null;\n        this.hV = newHexString;\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params == \"string\") {\n            this.setString(params);\n        }\n        else if (typeof params['str'] != \"undefined\") {\n            this.setString(params['str']);\n        }\n        else if (typeof params['hex'] != \"undefined\") {\n            this.setStringHex(params['hex']);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);\n// == END   DERAbstractString ================================================\n// == BEGIN DERAbstractTime ==================================================\n/**\n * base class for ASN.1 DER Generalized/UTCTime class\n * @name KJUR.asn1.DERAbstractTime\n * @class base class for ASN.1 DER Generalized/UTCTime class\n * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})\n * @extends KJUR.asn1.ASN1Object\n * @description\n * @see KJUR.asn1.ASN1Object - superclass\n */\nKJUR.asn1.DERAbstractTime = function (params) {\n    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);\n    var s = null;\n    var date = null;\n    // --- PRIVATE METHODS --------------------\n    this.localDateToUTC = function (d) {\n        utc = d.getTime() + (d.getTimezoneOffset() * 60000);\n        var utcDate = new Date(utc);\n        return utcDate;\n    };\n    /*\n     * format date string by Data object\n     * @name formatDate\n     * @memberOf KJUR.asn1.AbstractTime;\n     * @param {Date} dateObject\n     * @param {string} type 'utc' or 'gen'\n     * @param {boolean} withMillis flag for with millisections or not\n     * @description\n     * 'withMillis' flag is supported from asn1 1.0.6.\n     */\n    this.formatDate = function (dateObject, type, withMillis) {\n        var pad = this.zeroPadding;\n        var d = this.localDateToUTC(dateObject);\n        var year = String(d.getFullYear());\n        if (type == 'utc')\n            year = year.substr(2, 2);\n        var month = pad(String(d.getMonth() + 1), 2);\n        var day = pad(String(d.getDate()), 2);\n        var hour = pad(String(d.getHours()), 2);\n        var min = pad(String(d.getMinutes()), 2);\n        var sec = pad(String(d.getSeconds()), 2);\n        var s = year + month + day + hour + min + sec;\n        if (withMillis === true) {\n            var millis = d.getMilliseconds();\n            if (millis != 0) {\n                var sMillis = pad(String(millis), 3);\n                sMillis = sMillis.replace(/[0]+$/, \"\");\n                s = s + \".\" + sMillis;\n            }\n        }\n        return s + \"Z\";\n    };\n    this.zeroPadding = function (s, len) {\n        if (s.length >= len)\n            return s;\n        return new Array(len - s.length + 1).join('0') + s;\n    };\n    // --- PUBLIC METHODS --------------------\n    /**\n     * get string value of this string object\n     * @name getString\n     * @memberOf KJUR.asn1.DERAbstractTime#\n     * @function\n     * @return {String} string value of this time object\n     */\n    this.getString = function () {\n        return this.s;\n    };\n    /**\n     * set value by a string\n     * @name setString\n     * @memberOf KJUR.asn1.DERAbstractTime#\n     * @function\n     * @param {String} newS value by a string to set such like \"130430235959Z\"\n     */\n    this.setString = function (newS) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.s = newS;\n        this.hV = stohex(newS);\n    };\n    /**\n     * set value by a Date object\n     * @name setByDateValue\n     * @memberOf KJUR.asn1.DERAbstractTime#\n     * @function\n     * @param {Integer} year year of date (ex. 2013)\n     * @param {Integer} month month of date between 1 and 12 (ex. 12)\n     * @param {Integer} day day of month\n     * @param {Integer} hour hours of date\n     * @param {Integer} min minutes of date\n     * @param {Integer} sec seconds of date\n     */\n    this.setByDateValue = function (year, month, day, hour, min, sec) {\n        var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));\n        this.setByDate(dateObject);\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);\n// == END   DERAbstractTime ==================================================\n// == BEGIN DERAbstractStructured ============================================\n/**\n * base class for ASN.1 DER structured class\n * @name KJUR.asn1.DERAbstractStructured\n * @class base class for ASN.1 DER structured class\n * @property {Array} asn1Array internal array of ASN1Object\n * @extends KJUR.asn1.ASN1Object\n * @description\n * @see KJUR.asn1.ASN1Object - superclass\n */\nKJUR.asn1.DERAbstractStructured = function (params) {\n    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);\n    var asn1Array = null;\n    /**\n     * set value by array of ASN1Object\n     * @name setByASN1ObjectArray\n     * @memberOf KJUR.asn1.DERAbstractStructured#\n     * @function\n     * @param {array} asn1ObjectArray array of ASN1Object to set\n     */\n    this.setByASN1ObjectArray = function (asn1ObjectArray) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.asn1Array = asn1ObjectArray;\n    };\n    /**\n     * append an ASN1Object to internal array\n     * @name appendASN1Object\n     * @memberOf KJUR.asn1.DERAbstractStructured#\n     * @function\n     * @param {ASN1Object} asn1Object to add\n     */\n    this.appendASN1Object = function (asn1Object) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.asn1Array.push(asn1Object);\n    };\n    this.asn1Array = new Array();\n    if (typeof params != \"undefined\") {\n        if (typeof params['array'] != \"undefined\") {\n            this.asn1Array = params['array'];\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);\n// ********************************************************************\n//  ASN.1 Object Classes\n// ********************************************************************\n// ********************************************************************\n/**\n * class for ASN.1 DER Boolean\n * @name KJUR.asn1.DERBoolean\n * @class class for ASN.1 DER Boolean\n * @extends KJUR.asn1.ASN1Object\n * @description\n * @see KJUR.asn1.ASN1Object - superclass\n */\nKJUR.asn1.DERBoolean = function () {\n    KJUR.asn1.DERBoolean.superclass.constructor.call(this);\n    this.hT = \"01\";\n    this.hTLV = \"0101ff\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER Integer\n * @name KJUR.asn1.DERInteger\n * @class class for ASN.1 DER Integer\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>int - specify initial ASN.1 value(V) by integer value</li>\n * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n */\nKJUR.asn1.DERInteger = function (params) {\n    KJUR.asn1.DERInteger.superclass.constructor.call(this);\n    this.hT = \"02\";\n    /**\n     * set value by Tom Wu's BigInteger object\n     * @name setByBigInteger\n     * @memberOf KJUR.asn1.DERInteger#\n     * @function\n     * @param {BigInteger} bigIntegerValue to set\n     */\n    this.setByBigInteger = function (bigIntegerValue) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);\n    };\n    /**\n     * set value by integer value\n     * @name setByInteger\n     * @memberOf KJUR.asn1.DERInteger\n     * @function\n     * @param {Integer} integer value to set\n     */\n    this.setByInteger = function (intValue) {\n        var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(String(intValue), 10);\n        this.setByBigInteger(bi);\n    };\n    /**\n     * set value by integer value\n     * @name setValueHex\n     * @memberOf KJUR.asn1.DERInteger#\n     * @function\n     * @param {String} hexadecimal string of integer value\n     * @description\n     * <br/>\n     * NOTE: Value shall be represented by minimum octet length of\n     * two's complement representation.\n     * @example\n     * new KJUR.asn1.DERInteger(123);\n     * new KJUR.asn1.DERInteger({'int': 123});\n     * new KJUR.asn1.DERInteger({'hex': '1fad'});\n     */\n    this.setValueHex = function (newHexString) {\n        this.hV = newHexString;\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params['bigint'] != \"undefined\") {\n            this.setByBigInteger(params['bigint']);\n        }\n        else if (typeof params['int'] != \"undefined\") {\n            this.setByInteger(params['int']);\n        }\n        else if (typeof params == \"number\") {\n            this.setByInteger(params);\n        }\n        else if (typeof params['hex'] != \"undefined\") {\n            this.setValueHex(params['hex']);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER encoded BitString primitive\n * @name KJUR.asn1.DERBitString\n * @class class for ASN.1 DER encoded BitString primitive\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>bin - specify binary string (ex. '10111')</li>\n * <li>array - specify array of boolean (ex. [true,false,true,true])</li>\n * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>\n * <li>obj - specify {@link KJUR.asn1.ASN1Util.newObject}\n * argument for \"BitString encapsulates\" structure.</li>\n * </ul>\n * NOTE1: 'params' can be omitted.<br/>\n * NOTE2: 'obj' parameter have been supported since\n * asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).<br/>\n * @example\n * // default constructor\n * o = new KJUR.asn1.DERBitString();\n * // initialize with binary string\n * o = new KJUR.asn1.DERBitString({bin: \"1011\"});\n * // initialize with boolean array\n * o = new KJUR.asn1.DERBitString({array: [true,false,true,true]});\n * // initialize with hexadecimal string (04 is unused bits)\n * o = new KJUR.asn1.DEROctetString({hex: \"04bac0\"});\n * // initialize with ASN1Util.newObject argument for encapsulated\n * o = new KJUR.asn1.DERBitString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});\n * // above generates a ASN.1 data like this:\n * // BIT STRING, encapsulates {\n * //   SEQUENCE {\n * //     INTEGER 3\n * //     PrintableString 'aaa'\n * //     }\n * //   }\n */\nKJUR.asn1.DERBitString = function (params) {\n    if (params !== undefined && typeof params.obj !== \"undefined\") {\n        var o = KJUR.asn1.ASN1Util.newObject(params.obj);\n        params.hex = \"00\" + o.getEncodedHex();\n    }\n    KJUR.asn1.DERBitString.superclass.constructor.call(this);\n    this.hT = \"03\";\n    /**\n     * set ASN.1 value(V) by a hexadecimal string including unused bits\n     * @name setHexValueIncludingUnusedBits\n     * @memberOf KJUR.asn1.DERBitString#\n     * @function\n     * @param {String} newHexStringIncludingUnusedBits\n     */\n    this.setHexValueIncludingUnusedBits = function (newHexStringIncludingUnusedBits) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.hV = newHexStringIncludingUnusedBits;\n    };\n    /**\n     * set ASN.1 value(V) by unused bit and hexadecimal string of value\n     * @name setUnusedBitsAndHexValue\n     * @memberOf KJUR.asn1.DERBitString#\n     * @function\n     * @param {Integer} unusedBits\n     * @param {String} hValue\n     */\n    this.setUnusedBitsAndHexValue = function (unusedBits, hValue) {\n        if (unusedBits < 0 || 7 < unusedBits) {\n            throw \"unused bits shall be from 0 to 7: u = \" + unusedBits;\n        }\n        var hUnusedBits = \"0\" + unusedBits;\n        this.hTLV = null;\n        this.isModified = true;\n        this.hV = hUnusedBits + hValue;\n    };\n    /**\n     * set ASN.1 DER BitString by binary string<br/>\n     * @name setByBinaryString\n     * @memberOf KJUR.asn1.DERBitString#\n     * @function\n     * @param {String} binaryString binary value string (i.e. '10111')\n     * @description\n     * Its unused bits will be calculated automatically by length of\n     * 'binaryValue'. <br/>\n     * NOTE: Trailing zeros '0' will be ignored.\n     * @example\n     * o = new KJUR.asn1.DERBitString();\n     * o.setByBooleanArray(\"01011\");\n     */\n    this.setByBinaryString = function (binaryString) {\n        binaryString = binaryString.replace(/0+$/, '');\n        var unusedBits = 8 - binaryString.length % 8;\n        if (unusedBits == 8)\n            unusedBits = 0;\n        for (var i = 0; i <= unusedBits; i++) {\n            binaryString += '0';\n        }\n        var h = '';\n        for (var i = 0; i < binaryString.length - 1; i += 8) {\n            var b = binaryString.substr(i, 8);\n            var x = parseInt(b, 2).toString(16);\n            if (x.length == 1)\n                x = '0' + x;\n            h += x;\n        }\n        this.hTLV = null;\n        this.isModified = true;\n        this.hV = '0' + unusedBits + h;\n    };\n    /**\n     * set ASN.1 TLV value(V) by an array of boolean<br/>\n     * @name setByBooleanArray\n     * @memberOf KJUR.asn1.DERBitString#\n     * @function\n     * @param {array} booleanArray array of boolean (ex. [true, false, true])\n     * @description\n     * NOTE: Trailing falses will be ignored in the ASN.1 DER Object.\n     * @example\n     * o = new KJUR.asn1.DERBitString();\n     * o.setByBooleanArray([false, true, false, true, true]);\n     */\n    this.setByBooleanArray = function (booleanArray) {\n        var s = '';\n        for (var i = 0; i < booleanArray.length; i++) {\n            if (booleanArray[i] == true) {\n                s += '1';\n            }\n            else {\n                s += '0';\n            }\n        }\n        this.setByBinaryString(s);\n    };\n    /**\n     * generate an array of falses with specified length<br/>\n     * @name newFalseArray\n     * @memberOf KJUR.asn1.DERBitString\n     * @function\n     * @param {Integer} nLength length of array to generate\n     * @return {array} array of boolean falses\n     * @description\n     * This static method may be useful to initialize boolean array.\n     * @example\n     * o = new KJUR.asn1.DERBitString();\n     * o.newFalseArray(3) &rarr; [false, false, false]\n     */\n    this.newFalseArray = function (nLength) {\n        var a = new Array(nLength);\n        for (var i = 0; i < nLength; i++) {\n            a[i] = false;\n        }\n        return a;\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params == \"string\" && params.toLowerCase().match(/^[0-9a-f]+$/)) {\n            this.setHexValueIncludingUnusedBits(params);\n        }\n        else if (typeof params['hex'] != \"undefined\") {\n            this.setHexValueIncludingUnusedBits(params['hex']);\n        }\n        else if (typeof params['bin'] != \"undefined\") {\n            this.setByBinaryString(params['bin']);\n        }\n        else if (typeof params['array'] != \"undefined\") {\n            this.setByBooleanArray(params['array']);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER OctetString<br/>\n * @name KJUR.asn1.DEROctetString\n * @class class for ASN.1 DER OctetString\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * This class provides ASN.1 OctetString simple type.<br/>\n * Supported \"params\" attributes are:\n * <ul>\n * <li>str - to set a string as a value</li>\n * <li>hex - to set a hexadecimal string as a value</li>\n * <li>obj - to set a encapsulated ASN.1 value by JSON object\n * which is defined in {@link KJUR.asn1.ASN1Util.newObject}</li>\n * </ul>\n * NOTE: A parameter 'obj' have been supported\n * for \"OCTET STRING, encapsulates\" structure.\n * since asn1 1.0.11, jsrsasign 6.1.1 (2016-Sep-25).\n * @see KJUR.asn1.DERAbstractString - superclass\n * @example\n * // default constructor\n * o = new KJUR.asn1.DEROctetString();\n * // initialize with string\n * o = new KJUR.asn1.DEROctetString({str: \"aaa\"});\n * // initialize with hexadecimal string\n * o = new KJUR.asn1.DEROctetString({hex: \"616161\"});\n * // initialize with ASN1Util.newObject argument\n * o = new KJUR.asn1.DEROctetString({obj: {seq: [{int: 3}, {prnstr: 'aaa'}]}});\n * // above generates a ASN.1 data like this:\n * // OCTET STRING, encapsulates {\n * //   SEQUENCE {\n * //     INTEGER 3\n * //     PrintableString 'aaa'\n * //     }\n * //   }\n */\nKJUR.asn1.DEROctetString = function (params) {\n    if (params !== undefined && typeof params.obj !== \"undefined\") {\n        var o = KJUR.asn1.ASN1Util.newObject(params.obj);\n        params.hex = o.getEncodedHex();\n    }\n    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);\n    this.hT = \"04\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER Null\n * @name KJUR.asn1.DERNull\n * @class class for ASN.1 DER Null\n * @extends KJUR.asn1.ASN1Object\n * @description\n * @see KJUR.asn1.ASN1Object - superclass\n */\nKJUR.asn1.DERNull = function () {\n    KJUR.asn1.DERNull.superclass.constructor.call(this);\n    this.hT = \"05\";\n    this.hTLV = \"0500\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER ObjectIdentifier\n * @name KJUR.asn1.DERObjectIdentifier\n * @class class for ASN.1 DER ObjectIdentifier\n * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n */\nKJUR.asn1.DERObjectIdentifier = function (params) {\n    var itox = function (i) {\n        var h = i.toString(16);\n        if (h.length == 1)\n            h = '0' + h;\n        return h;\n    };\n    var roidtox = function (roid) {\n        var h = '';\n        var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(roid, 10);\n        var b = bi.toString(2);\n        var padLen = 7 - b.length % 7;\n        if (padLen == 7)\n            padLen = 0;\n        var bPad = '';\n        for (var i = 0; i < padLen; i++)\n            bPad += '0';\n        b = bPad + b;\n        for (var i = 0; i < b.length - 1; i += 7) {\n            var b8 = b.substr(i, 7);\n            if (i != b.length - 7)\n                b8 = '1' + b8;\n            h += itox(parseInt(b8, 2));\n        }\n        return h;\n    };\n    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);\n    this.hT = \"06\";\n    /**\n     * set value by a hexadecimal string\n     * @name setValueHex\n     * @memberOf KJUR.asn1.DERObjectIdentifier#\n     * @function\n     * @param {String} newHexString hexadecimal value of OID bytes\n     */\n    this.setValueHex = function (newHexString) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.s = null;\n        this.hV = newHexString;\n    };\n    /**\n     * set value by a OID string<br/>\n     * @name setValueOidString\n     * @memberOf KJUR.asn1.DERObjectIdentifier#\n     * @function\n     * @param {String} oidString OID string (ex. 2.5.4.13)\n     * @example\n     * o = new KJUR.asn1.DERObjectIdentifier();\n     * o.setValueOidString(\"2.5.4.13\");\n     */\n    this.setValueOidString = function (oidString) {\n        if (!oidString.match(/^[0-9.]+$/)) {\n            throw \"malformed oid string: \" + oidString;\n        }\n        var h = '';\n        var a = oidString.split('.');\n        var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);\n        h += itox(i0);\n        a.splice(0, 2);\n        for (var i = 0; i < a.length; i++) {\n            h += roidtox(a[i]);\n        }\n        this.hTLV = null;\n        this.isModified = true;\n        this.s = null;\n        this.hV = h;\n    };\n    /**\n     * set value by a OID name\n     * @name setValueName\n     * @memberOf KJUR.asn1.DERObjectIdentifier#\n     * @function\n     * @param {String} oidName OID name (ex. 'serverAuth')\n     * @since 1.0.1\n     * @description\n     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.\n     * Otherwise raise error.\n     * @example\n     * o = new KJUR.asn1.DERObjectIdentifier();\n     * o.setValueName(\"serverAuth\");\n     */\n    this.setValueName = function (oidName) {\n        var oid = KJUR.asn1.x509.OID.name2oid(oidName);\n        if (oid !== '') {\n            this.setValueOidString(oid);\n        }\n        else {\n            throw \"DERObjectIdentifier oidName undefined: \" + oidName;\n        }\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (params !== undefined) {\n        if (typeof params === \"string\") {\n            if (params.match(/^[0-2].[0-9.]+$/)) {\n                this.setValueOidString(params);\n            }\n            else {\n                this.setValueName(params);\n            }\n        }\n        else if (params.oid !== undefined) {\n            this.setValueOidString(params.oid);\n        }\n        else if (params.hex !== undefined) {\n            this.setValueHex(params.hex);\n        }\n        else if (params.name !== undefined) {\n            this.setValueName(params.name);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER Enumerated\n * @name KJUR.asn1.DEREnumerated\n * @class class for ASN.1 DER Enumerated\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>int - specify initial ASN.1 value(V) by integer value</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n * @example\n * new KJUR.asn1.DEREnumerated(123);\n * new KJUR.asn1.DEREnumerated({int: 123});\n * new KJUR.asn1.DEREnumerated({hex: '1fad'});\n */\nKJUR.asn1.DEREnumerated = function (params) {\n    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);\n    this.hT = \"0a\";\n    /**\n     * set value by Tom Wu's BigInteger object\n     * @name setByBigInteger\n     * @memberOf KJUR.asn1.DEREnumerated#\n     * @function\n     * @param {BigInteger} bigIntegerValue to set\n     */\n    this.setByBigInteger = function (bigIntegerValue) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);\n    };\n    /**\n     * set value by integer value\n     * @name setByInteger\n     * @memberOf KJUR.asn1.DEREnumerated#\n     * @function\n     * @param {Integer} integer value to set\n     */\n    this.setByInteger = function (intValue) {\n        var bi = new _jsbn_jsbn__WEBPACK_IMPORTED_MODULE_0__.BigInteger(String(intValue), 10);\n        this.setByBigInteger(bi);\n    };\n    /**\n     * set value by integer value\n     * @name setValueHex\n     * @memberOf KJUR.asn1.DEREnumerated#\n     * @function\n     * @param {String} hexadecimal string of integer value\n     * @description\n     * <br/>\n     * NOTE: Value shall be represented by minimum octet length of\n     * two's complement representation.\n     */\n    this.setValueHex = function (newHexString) {\n        this.hV = newHexString;\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params['int'] != \"undefined\") {\n            this.setByInteger(params['int']);\n        }\n        else if (typeof params == \"number\") {\n            this.setByInteger(params);\n        }\n        else if (typeof params['hex'] != \"undefined\") {\n            this.setValueHex(params['hex']);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);\n// ********************************************************************\n/**\n * class for ASN.1 DER UTF8String\n * @name KJUR.asn1.DERUTF8String\n * @class class for ASN.1 DER UTF8String\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * @see KJUR.asn1.DERAbstractString - superclass\n */\nKJUR.asn1.DERUTF8String = function (params) {\n    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);\n    this.hT = \"0c\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER NumericString\n * @name KJUR.asn1.DERNumericString\n * @class class for ASN.1 DER NumericString\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * @see KJUR.asn1.DERAbstractString - superclass\n */\nKJUR.asn1.DERNumericString = function (params) {\n    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);\n    this.hT = \"12\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER PrintableString\n * @name KJUR.asn1.DERPrintableString\n * @class class for ASN.1 DER PrintableString\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * @see KJUR.asn1.DERAbstractString - superclass\n */\nKJUR.asn1.DERPrintableString = function (params) {\n    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);\n    this.hT = \"13\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER TeletexString\n * @name KJUR.asn1.DERTeletexString\n * @class class for ASN.1 DER TeletexString\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * @see KJUR.asn1.DERAbstractString - superclass\n */\nKJUR.asn1.DERTeletexString = function (params) {\n    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);\n    this.hT = \"14\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER IA5String\n * @name KJUR.asn1.DERIA5String\n * @class class for ASN.1 DER IA5String\n * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})\n * @extends KJUR.asn1.DERAbstractString\n * @description\n * @see KJUR.asn1.DERAbstractString - superclass\n */\nKJUR.asn1.DERIA5String = function (params) {\n    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);\n    this.hT = \"16\";\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);\n// ********************************************************************\n/**\n * class for ASN.1 DER UTCTime\n * @name KJUR.asn1.DERUTCTime\n * @class class for ASN.1 DER UTCTime\n * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})\n * @extends KJUR.asn1.DERAbstractTime\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * <li>date - specify Date object.</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n * <h4>EXAMPLES</h4>\n * @example\n * d1 = new KJUR.asn1.DERUTCTime();\n * d1.setString('130430125959Z');\n *\n * d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});\n * d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});\n * d4 = new KJUR.asn1.DERUTCTime('130430125959Z');\n */\nKJUR.asn1.DERUTCTime = function (params) {\n    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);\n    this.hT = \"17\";\n    /**\n     * set value by a Date object<br/>\n     * @name setByDate\n     * @memberOf KJUR.asn1.DERUTCTime#\n     * @function\n     * @param {Date} dateObject Date object to set ASN.1 value(V)\n     * @example\n     * o = new KJUR.asn1.DERUTCTime();\n     * o.setByDate(new Date(\"2016/12/31\"));\n     */\n    this.setByDate = function (dateObject) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.date = dateObject;\n        this.s = this.formatDate(this.date, 'utc');\n        this.hV = stohex(this.s);\n    };\n    this.getFreshValueHex = function () {\n        if (typeof this.date == \"undefined\" && typeof this.s == \"undefined\") {\n            this.date = new Date();\n            this.s = this.formatDate(this.date, 'utc');\n            this.hV = stohex(this.s);\n        }\n        return this.hV;\n    };\n    if (params !== undefined) {\n        if (params.str !== undefined) {\n            this.setString(params.str);\n        }\n        else if (typeof params == \"string\" && params.match(/^[0-9]{12}Z$/)) {\n            this.setString(params);\n        }\n        else if (params.hex !== undefined) {\n            this.setStringHex(params.hex);\n        }\n        else if (params.date !== undefined) {\n            this.setByDate(params.date);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);\n// ********************************************************************\n/**\n * class for ASN.1 DER GeneralizedTime\n * @name KJUR.asn1.DERGeneralizedTime\n * @class class for ASN.1 DER GeneralizedTime\n * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})\n * @property {Boolean} withMillis flag to show milliseconds or not\n * @extends KJUR.asn1.DERAbstractTime\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>\n * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>\n * <li>date - specify Date object.</li>\n * <li>millis - specify flag to show milliseconds (from 1.0.6)</li>\n * </ul>\n * NOTE1: 'params' can be omitted.\n * NOTE2: 'withMillis' property is supported from asn1 1.0.6.\n */\nKJUR.asn1.DERGeneralizedTime = function (params) {\n    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);\n    this.hT = \"18\";\n    this.withMillis = false;\n    /**\n     * set value by a Date object\n     * @name setByDate\n     * @memberOf KJUR.asn1.DERGeneralizedTime#\n     * @function\n     * @param {Date} dateObject Date object to set ASN.1 value(V)\n     * @example\n     * When you specify UTC time, use 'Date.UTC' method like this:<br/>\n     * o1 = new DERUTCTime();\n     * o1.setByDate(date);\n     *\n     * date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59\n     */\n    this.setByDate = function (dateObject) {\n        this.hTLV = null;\n        this.isModified = true;\n        this.date = dateObject;\n        this.s = this.formatDate(this.date, 'gen', this.withMillis);\n        this.hV = stohex(this.s);\n    };\n    this.getFreshValueHex = function () {\n        if (this.date === undefined && this.s === undefined) {\n            this.date = new Date();\n            this.s = this.formatDate(this.date, 'gen', this.withMillis);\n            this.hV = stohex(this.s);\n        }\n        return this.hV;\n    };\n    if (params !== undefined) {\n        if (params.str !== undefined) {\n            this.setString(params.str);\n        }\n        else if (typeof params == \"string\" && params.match(/^[0-9]{14}Z$/)) {\n            this.setString(params);\n        }\n        else if (params.hex !== undefined) {\n            this.setStringHex(params.hex);\n        }\n        else if (params.date !== undefined) {\n            this.setByDate(params.date);\n        }\n        if (params.millis === true) {\n            this.withMillis = true;\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);\n// ********************************************************************\n/**\n * class for ASN.1 DER Sequence\n * @name KJUR.asn1.DERSequence\n * @class class for ASN.1 DER Sequence\n * @extends KJUR.asn1.DERAbstractStructured\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>array - specify array of ASN1Object to set elements of content</li>\n * </ul>\n * NOTE: 'params' can be omitted.\n */\nKJUR.asn1.DERSequence = function (params) {\n    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);\n    this.hT = \"30\";\n    this.getFreshValueHex = function () {\n        var h = '';\n        for (var i = 0; i < this.asn1Array.length; i++) {\n            var asn1Obj = this.asn1Array[i];\n            h += asn1Obj.getEncodedHex();\n        }\n        this.hV = h;\n        return this.hV;\n    };\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);\n// ********************************************************************\n/**\n * class for ASN.1 DER Set\n * @name KJUR.asn1.DERSet\n * @class class for ASN.1 DER Set\n * @extends KJUR.asn1.DERAbstractStructured\n * @description\n * <br/>\n * As for argument 'params' for constructor, you can specify one of\n * following properties:\n * <ul>\n * <li>array - specify array of ASN1Object to set elements of content</li>\n * <li>sortflag - flag for sort (default: true). ASN.1 BER is not sorted in 'SET OF'.</li>\n * </ul>\n * NOTE1: 'params' can be omitted.<br/>\n * NOTE2: sortflag is supported since 1.0.5.\n */\nKJUR.asn1.DERSet = function (params) {\n    KJUR.asn1.DERSet.superclass.constructor.call(this, params);\n    this.hT = \"31\";\n    this.sortFlag = true; // item shall be sorted only in ASN.1 DER\n    this.getFreshValueHex = function () {\n        var a = new Array();\n        for (var i = 0; i < this.asn1Array.length; i++) {\n            var asn1Obj = this.asn1Array[i];\n            a.push(asn1Obj.getEncodedHex());\n        }\n        if (this.sortFlag == true)\n            a.sort();\n        this.hV = a.join('');\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params.sortflag != \"undefined\" &&\n            params.sortflag == false)\n            this.sortFlag = false;\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);\n// ********************************************************************\n/**\n * class for ASN.1 DER TaggedObject\n * @name KJUR.asn1.DERTaggedObject\n * @class class for ASN.1 DER TaggedObject\n * @extends KJUR.asn1.ASN1Object\n * @description\n * <br/>\n * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.\n * For example, if you find '[1]' tag in a ASN.1 dump,\n * 'tagNoHex' will be 'a1'.\n * <br/>\n * As for optional argument 'params' for constructor, you can specify *ANY* of\n * following properties:\n * <ul>\n * <li>explicit - specify true if this is explicit tag otherwise false\n *     (default is 'true').</li>\n * <li>tag - specify tag (default is 'a0' which means [0])</li>\n * <li>obj - specify ASN1Object which is tagged</li>\n * </ul>\n * @example\n * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});\n * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});\n * hex = d2.getEncodedHex();\n */\nKJUR.asn1.DERTaggedObject = function (params) {\n    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);\n    this.hT = \"a0\";\n    this.hV = '';\n    this.isExplicit = true;\n    this.asn1Object = null;\n    /**\n     * set value by an ASN1Object\n     * @name setString\n     * @memberOf KJUR.asn1.DERTaggedObject#\n     * @function\n     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag\n     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag\n     * @param {ASN1Object} asn1Object ASN.1 to encapsulate\n     */\n    this.setASN1Object = function (isExplicitFlag, tagNoHex, asn1Object) {\n        this.hT = tagNoHex;\n        this.isExplicit = isExplicitFlag;\n        this.asn1Object = asn1Object;\n        if (this.isExplicit) {\n            this.hV = this.asn1Object.getEncodedHex();\n            this.hTLV = null;\n            this.isModified = true;\n        }\n        else {\n            this.hV = null;\n            this.hTLV = asn1Object.getEncodedHex();\n            this.hTLV = this.hTLV.replace(/^../, tagNoHex);\n            this.isModified = false;\n        }\n    };\n    this.getFreshValueHex = function () {\n        return this.hV;\n    };\n    if (typeof params != \"undefined\") {\n        if (typeof params['tag'] != \"undefined\") {\n            this.hT = params['tag'];\n        }\n        if (typeof params['explicit'] != \"undefined\") {\n            this.isExplicit = params['explicit'];\n        }\n        if (typeof params['obj'] != \"undefined\") {\n            this.asn1Object = params['obj'];\n            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);\n        }\n    }\n};\n_yahoo__WEBPACK_IMPORTED_MODULE_1__.YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsrsasign/asn1-1.0.js?");

          /***/},

        /***/"./lib/lib/jsrsasign/yahoo.js":
        /*!************************************!*\
                                               !*** ./lib/lib/jsrsasign/yahoo.js ***!
                                               \************************************/
        /***/function libLibJsrsasignYahooJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"YAHOO\": () => (/* binding */ YAHOO)\n/* harmony export */ });\n/*!\nCopyright (c) 2011, Yahoo! Inc. All rights reserved.\nCode licensed under the BSD License:\nhttp://developer.yahoo.com/yui/license.html\nversion: 2.9.0\n*/\nvar YAHOO = {};\nYAHOO.lang = {\n    /**\n     * Utility to set up the prototype, constructor and superclass properties to\n     * support an inheritance strategy that can chain constructors and methods.\n     * Static members will not be inherited.\n     *\n     * @method extend\n     * @static\n     * @param {Function} subc   the object to modify\n     * @param {Function} superc the object to inherit\n     * @param {Object} overrides  additional properties/methods to add to the\n     *                              subclass prototype.  These will override the\n     *                              matching items obtained from the superclass\n     *                              if present.\n     */\n    extend: function (subc, superc, overrides) {\n        if (!superc || !subc) {\n            throw new Error(\"YAHOO.lang.extend failed, please check that \" +\n                \"all dependencies are included.\");\n        }\n        var F = function () { };\n        F.prototype = superc.prototype;\n        subc.prototype = new F();\n        subc.prototype.constructor = subc;\n        subc.superclass = superc.prototype;\n        if (superc.prototype.constructor == Object.prototype.constructor) {\n            superc.prototype.constructor = superc;\n        }\n        if (overrides) {\n            var i;\n            for (i in overrides) {\n                subc.prototype[i] = overrides[i];\n            }\n            /*\n             * IE will not enumerate native functions in a derived object even if the\n             * function was overridden.  This is a workaround for specific functions\n             * we care about on the Object prototype.\n             * @property _IEEnumFix\n             * @param {Function} r  the object to receive the augmentation\n             * @param {Function} s  the object that supplies the properties to augment\n             * @static\n             * @private\n             */\n            var _IEEnumFix = function () { }, ADD = [\"toString\", \"valueOf\"];\n            try {\n                if (/MSIE/.test(navigator2.userAgent)) {\n                    _IEEnumFix = function (r, s) {\n                        for (i = 0; i < ADD.length; i = i + 1) {\n                            var fname = ADD[i], f = s[fname];\n                            if (typeof f === 'function' && f != Object.prototype[fname]) {\n                                r[fname] = f;\n                            }\n                        }\n                    };\n                }\n            }\n            catch (ex) { }\n            ;\n            _IEEnumFix(subc.prototype, overrides);\n        }\n    }\n};\n\n\n//# sourceURL=webpack://JSEncrypt/./lib/lib/jsrsasign/yahoo.js?");

          /***/},

        /***/"./lib/version.json":
        /*!**************************!*\
                                     !*** ./lib/version.json ***!
                                     \**************************/
        /***/function libVersionJson(module) {

          eval("module.exports = {\"version\":\"3.1.0\"};\n\n//# sourceURL=webpack://JSEncrypt/./lib/version.json?");

          /***/}

        /******/ };
      /************************************************************************/
      /******/ // The module cache
      /******/var __webpack_module_cache__ = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/if (__webpack_module_cache__[moduleId]) {
          /******/return __webpack_module_cache__[moduleId].exports;
          /******/}
        /******/ // Create a new module (and put it into the cache)
        /******/var module = __webpack_module_cache__[moduleId] = {
          /******/ // no module.id needed
          /******/ // no module.loaded needed
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/}
      /******/
      /************************************************************************/
      /******/ /* webpack/runtime/define property getters */
      /******/(function () {
        /******/ // define getter functions for harmony exports
        /******/__webpack_require__.d = function (exports, definition) {
          /******/for (var key in definition) {
            /******/if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
              /******/Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
              /******/}
            /******/}
          /******/};
        /******/})();
      /******/
      /******/ /* webpack/runtime/hasOwnProperty shorthand */
      /******/(function () {
        /******/__webpack_require__.o = function (obj, prop) {return Object.prototype.hasOwnProperty.call(obj, prop);};
        /******/})();
      /******/
      /******/ /* webpack/runtime/make namespace object */
      /******/(function () {
        /******/ // define __esModule on exports
        /******/__webpack_require__.r = function (exports) {
          /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/}
          /******/Object.defineProperty(exports, '__esModule', { value: true });
          /******/};
        /******/})();
      /******/
      /************************************************************************/
      /******/
      /******/ // startup
      /******/ // Load entry module and return exports
      /******/ // This entry module can't be inlined because the eval devtool is used.
      /******/var __webpack_exports__ = __webpack_require__("./lib/index.js");
      /******/__webpack_exports__ = __webpack_exports__.default;
      /******/
      /******/return __webpack_exports__;
      /******/}());

});

/***/ }),

/***/ 95:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 23));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 98);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e22) {throw _e22;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e23) {didErr = true;err = _e23;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],v = e[t + 8],w = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],A = e[t + 13],I = e[t + 14],P = e[t + 15],E = o[0],O = o[1],U = o[2],b = o[3];E = u(E, O, U, b, i, 7, a[0]), b = u(b, E, O, U, c, 12, a[1]), U = u(U, b, E, O, f, 17, a[2]), O = u(O, U, b, E, p, 22, a[3]), E = u(E, O, U, b, g, 7, a[4]), b = u(b, E, O, U, m, 12, a[5]), U = u(U, b, E, O, y, 17, a[6]), O = u(O, U, b, E, _, 22, a[7]), E = u(E, O, U, b, v, 7, a[8]), b = u(b, E, O, U, w, 12, a[9]), U = u(U, b, E, O, S, 17, a[10]), O = u(O, U, b, E, k, 22, a[11]), E = u(E, O, U, b, T, 7, a[12]), b = u(b, E, O, U, A, 12, a[13]), U = u(U, b, E, O, I, 17, a[14]), E = h(E, O = u(O, U, b, E, P, 22, a[15]), U, b, c, 5, a[16]), b = h(b, E, O, U, y, 9, a[17]), U = h(U, b, E, O, k, 14, a[18]), O = h(O, U, b, E, i, 20, a[19]), E = h(E, O, U, b, m, 5, a[20]), b = h(b, E, O, U, S, 9, a[21]), U = h(U, b, E, O, P, 14, a[22]), O = h(O, U, b, E, g, 20, a[23]), E = h(E, O, U, b, w, 5, a[24]), b = h(b, E, O, U, I, 9, a[25]), U = h(U, b, E, O, p, 14, a[26]), O = h(O, U, b, E, v, 20, a[27]), E = h(E, O, U, b, A, 5, a[28]), b = h(b, E, O, U, f, 9, a[29]), U = h(U, b, E, O, _, 14, a[30]), E = l(E, O = h(O, U, b, E, T, 20, a[31]), U, b, m, 4, a[32]), b = l(b, E, O, U, v, 11, a[33]), U = l(U, b, E, O, k, 16, a[34]), O = l(O, U, b, E, I, 23, a[35]), E = l(E, O, U, b, c, 4, a[36]), b = l(b, E, O, U, g, 11, a[37]), U = l(U, b, E, O, _, 16, a[38]), O = l(O, U, b, E, S, 23, a[39]), E = l(E, O, U, b, A, 4, a[40]), b = l(b, E, O, U, i, 11, a[41]), U = l(U, b, E, O, p, 16, a[42]), O = l(O, U, b, E, y, 23, a[43]), E = l(E, O, U, b, w, 4, a[44]), b = l(b, E, O, U, T, 11, a[45]), U = l(U, b, E, O, P, 16, a[46]), E = d(E, O = l(O, U, b, E, f, 23, a[47]), U, b, i, 6, a[48]), b = d(b, E, O, U, _, 10, a[49]), U = d(U, b, E, O, I, 15, a[50]), O = d(O, U, b, E, m, 21, a[51]), E = d(E, O, U, b, T, 6, a[52]), b = d(b, E, O, U, p, 10, a[53]), U = d(U, b, E, O, S, 15, a[54]), O = d(O, U, b, E, c, 21, a[55]), E = d(E, O, U, b, v, 6, a[56]), b = d(b, E, O, U, P, 10, a[57]), U = d(U, b, E, O, y, 15, a[58]), O = d(O, U, b, E, A, 21, a[59]), E = d(E, O, U, b, g, 6, a[60]), b = d(b, E, O, U, k, 10, a[61]), U = d(U, b, E, O, f, 15, a[62]), O = d(O, U, b, E, w, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + b | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var i = /*#__PURE__*/function (_Error) {_inherits(i, _Error);var _super = _createSuper(i);function i(e) {var _this;_classCallCheck(this, i);_this = _super.call(this, e.message), _this.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this;}return i;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),a = _e2.t,c = _e2.setLocale,u = _e2.getLocale;var h, l, d;try {h = __webpack_require__(/*! uni-stat-config */ 99).default || __webpack_require__(/*! uni-stat-config */ 99);} catch (e) {h = { appid: "" };}function f() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function p() {if ("n" === g()) {try {l = plus.runtime.getDCloudId();} catch (e) {l = "";}return l;}return l || (l = f(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: l })), l;}function g() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)["mp-weixin"];}var m = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}),  false && false;var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new i({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new i({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var y = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var _ = /*#__PURE__*/function () {function _(e) {_classCallCheck(this, _);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(a("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = y;}_createClass(_, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return m.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this2 = this;return Promise.resolve().then(function () {return _this2.hasAccessToken ? t ? _this2.requestWrapped(e) : _this2.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this2.getAccessToken();}).then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});}) : _this2.getAccessToken().then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = m.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = m.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this3 = this;return this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this3.setAccessToken(e.result.accessToken), t(_this3.accessToken)) : s(new i({ code: "AUTH_FAILED", message: "获取accessToken失败" }));});});} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this4 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (a, c) {var u = _this4.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this5 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this5.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this5.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: c }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new i({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return _;}();var v = { init: function init(e) {var t = new _(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },w = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",S = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"NODE_ENV":"development","VUE_APP_NAME":"wzxd-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var k;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(k || (k = {}));var T = function T() {};s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [],c = [];!function () {function t(t) {for (var s = e.sqrt(t), n = 2; n <= s; n++) {if (!(t % n)) return !1;}return !0;}function s(e) {return 4294967296 * (e - (0 | e)) | 0;}for (var n = 2, r = 0; r < 64;) {t(n) && (r < 8 && (a[r] = s(e.pow(n, .5))), c[r] = s(e.pow(n, 1 / 3)), r++), n++;}}();var u = [],h = i.SHA256 = o.extend({ _doReset: function _doReset() {this._hash = new r.init(a.slice(0));}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = this._hash.words, n = s[0], r = s[1], o = s[2], i = s[3], a = s[4], h = s[5], l = s[6], d = s[7], f = 0; f < 64; f++) {if (f < 16) u[f] = 0 | e[t + f];else {var p = u[f - 15],g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,m = u[f - 2],y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;u[f] = g + u[f - 7] + y + u[f - 16];}var _ = n & r ^ n & o ^ r & o,v = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),w = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & l) + c[f] + u[f];d = l, l = h, h = a, a = i + w | 0, i = o, o = r, r = n, n = w + (v + _) | 0;}s[0] = s[0] + n | 0, s[1] = s[1] + r | 0, s[2] = s[2] + o | 0, s[3] = s[3] + i | 0, s[4] = s[4] + a | 0, s[5] = s[5] + h | 0, s[6] = s[6] + l | 0, s[7] = s[7] + d | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;return s[r >>> 5] |= 128 << 24 - r % 32, s[14 + (r + 64 >>> 9 << 4)] = e.floor(n / 4294967296), s[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * s.length, this._process(), this._hash;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });t.SHA256 = o._createHelper(h), t.HmacSHA256 = o._createHmacHelper(h);}(Math), s.SHA256);}), s(function (e, t) {e.exports = n.HmacSHA256;}), s(function (e, t) {var s, r, o;e.exports = (r = (s = o = n).lib.WordArray, s.enc.Base64 = { stringify: function stringify(e) {var t = e.words,s = e.sigBytes,n = this._map;e.clamp();for (var r = [], o = 0; o < s; o += 3) {for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < s; a++) {r.push(n.charAt(i >>> 6 * (3 - a) & 63));}}var c = n.charAt(64);if (c) for (; r.length % 4;) {r.push(c);}return r.join("");}, parse: function parse(e) {var t = e.length,s = this._map,n = this._reverseMap;if (!n) {n = this._reverseMap = [];for (var o = 0; o < s.length; o++) {n[s.charCodeAt(o)] = o;}}var i = s.charAt(64);if (i) {var a = e.indexOf(i);-1 !== a && (t = a);}return function (e, t, s) {for (var n = [], o = 0, i = 0; i < t; i++) {if (i % 4) {var a = s[e.charCodeAt(i - 1)] << i % 4 * 2,c = s[e.charCodeAt(i)] >>> 6 - i % 4 * 2;n[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++;}}return r.create(n, o);}(e, t, n);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, o.enc.Base64);}), s(function (e, t) {e.exports = n.enc.Utf8;});var A = function A() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function I(e) {return void 0 === e;}function P(e) {return "[object Null]" === Object.prototype.toString.call(e);}var E;function O(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(E || (E = {}));var U = { adapter: null, runtime: void 0 },b = ["anonymousUuidKey"];var C = /*#__PURE__*/function (_T) {_inherits(C, _T);var _super2 = _createSuper(C);function C() {var _this6;_classCallCheck(this, C);_this6 = _super2.call(this), U.adapter.root.tcbObject || (U.adapter.root.tcbObject = {});return _this6;}_createClass(C, [{ key: "setItem", value: function setItem(e, t) {U.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return U.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete U.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete U.adapter.root.tcbObject;} }]);return C;}(T);function D(e, t) {switch (e) {case "local":return t.localStorage || new C();case "none":return new C();default:return t.sessionStorage || new C();}}var R = /*#__PURE__*/function () {function R(e) {_classCallCheck(this, R);if (!this._storage) {this._persistence = U.adapter.primaryStorage || e.persistence, this._storage = D(this._persistence, U.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(R, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = D(e, U.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && b.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);I(_r2) || P(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return R;}();var x = {},q = {};function F(e) {return x[e];}var L = function L(e, t) {_classCallCheck(this, L);this.data = t || null, this.name = e;};var N = /*#__PURE__*/function (_L) {_inherits(N, _L);var _super3 = _createSuper(N);function N(e, t) {var _this7;_classCallCheck(this, N);_this7 = _super3.call(this, "error", { error: e, data: t }), _this7.error = e;return _this7;}return N;}(L);var M = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof N) return console.error(e.error), this;var s = "string" == typeof e ? new L(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function $(e, t) {M.on(e, t);}function K(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};M.fire(e, t);}function B(e, t) {M.off(e, t);}var j = "loginStateChanged",H = "loginStateExpire",W = "loginTypeChanged",V = "anonymousConverted",z = "refreshAccessToken";var Y;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Y || (Y = {}));var J = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],X = { "X-SDK-Version": "1.3.5" };function G(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function Q() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, X), {}, { "x-seqid": e }) };}var Z = /*#__PURE__*/function () {function Z() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Z);var t;this.config = e, this._reqClass = new U.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = F(this.config.env), this._localCache = (t = this.config.env, q[t]), G(this._reqClass, "post", [Q]), G(this._reqClass, "upload", [Q]), G(this._reqClass, "download", [Q]);}_createClass(Z, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === Y.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:K(H), this._cache.removeStore(s);case 20:throw new Error("刷新access token失败：" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (K(z), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === J.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(w, S, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === J.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return Z;}();var ee = {};function te(e) {return ee[e];}var se = /*#__PURE__*/function () {function se(e) {_classCallCheck(this, se);this.config = e, this._cache = F(e.env), this._request = te(e.env);}_createClass(se, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return se;}();var ne = /*#__PURE__*/function () {function ne(e) {_classCallCheck(this, ne);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = F(this._envId), this._request = te(this._envId), this.setUserInfo();}_createClass(ne, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this8 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this8[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ne;}();var re = /*#__PURE__*/function () {function re(e) {_classCallCheck(this, re);if (!e) throw new Error("envId is not defined");this._cache = F(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ne(e);}_createClass(re, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Y.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Y.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Y.WECHAT || this.loginType === Y.WECHAT_OPEN || this.loginType === Y.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return re;}();var oe = /*#__PURE__*/function (_se) {_inherits(oe, _se);var _super4 = _createSuper(oe);function oe() {_classCallCheck(this, oe);return _super4.apply(this, arguments);}_createClass(oe, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e14;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:K(j);K(W, { env: this.config.env, loginType: Y.ANONYMOUS, persistence: "local" });_e14 = new re(this.config.env);_context13.next = 19;return _e14.user.refresh();case 19:return _context13.abrupt("return", _e14);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:K(V, { env: this.config.env });K(W, { loginType: Y.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, Y.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return oe;}(se);var ie = /*#__PURE__*/function (_se2) {_inherits(ie, _se2);var _super5 = _createSuper(ie);function ie() {_classCallCheck(this, ie);return _super5.apply(this, arguments);}_createClass(ie, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:K(j);K(W, { env: this.config.env, loginType: Y.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new re(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ie;}(se);var ae = /*#__PURE__*/function (_se3) {_inherits(ae, _se3);var _super6 = _createSuper(ae);function ae() {_classCallCheck(this, ae);return _super6.apply(this, arguments);}_createClass(ae, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:K(j);K(W, { env: this.config.env, loginType: Y.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new re(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return ae;}(se);var ce = /*#__PURE__*/function (_se4) {_inherits(ce, _se4);var _super7 = _createSuper(ce);function ce() {_classCallCheck(this, ce);return _super7.apply(this, arguments);}_createClass(ce, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Y.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:K(j);K(W, { env: this.config.env, loginType: Y.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new re(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ce;}(se);var ue = /*#__PURE__*/function () {function ue(e) {_classCallCheck(this, ue);this.config = e, this._cache = F(e.env), this._request = te(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), $(W, this._onLoginTypeChanged);}_createClass(ue, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new oe(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ie(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new ae(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ce(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new oe(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new ae(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ce(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new oe(this.config)), $(V, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Y.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), K(j), K(W, { env: this.config.env, loginType: Y.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this9 = this;$(j, function () {var t = _this9.hasLoginState();e.call(_this9, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {$(H, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {$(z, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {$(V, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this10 = this;$(W, function () {var t = _this10.hasLoginState();e.call(_this10, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new re(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ie(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return ue;}();var he = function he(e, t) {t = t || A();var s = te(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},le = function le(e, t) {t = t || A();var s = te(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},de = function de(_ref5, t) {var e = _ref5.fileList;if (t = t || A(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return te(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},fe = function fe(_ref6, t) {var e = _ref6.fileList;t = t || A(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return te(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},pe = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return fe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = te(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function pe(_x26, _x27) {return _ref8.apply(this, arguments);};}(),ge = function ge(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || A();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return te(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},me = { timeout: 15e3, persistence: "session" },ye = {};var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);this.config = e || this.config, this.authObj = void 0;}_createClass(_e, [{ key: "init", value: function init(e) {switch (U.adapter || (this.requestClient = new U.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, me), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new _e(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || U.adapter.primaryStorage || me.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;x[t] = new R(e), q[t] = new R(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, ee[s.env] = new Z(s), this.authObj = new ue(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return $.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return B.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return ge.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return de.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return fe.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return pe.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return he.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return le.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {ye[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = ye[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = O(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (U.adapter = t), s && (U.runtime = s);} }]);return _e;}();var ve = new _e();function we(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Se = /*#__PURE__*/function () {function Se() {_classCallCheck(this, Se);}_createClass(Se, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {y.request({ url: we("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = y.uploadFile({ url: we("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) { false && false, s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Se;}();var ke = { setItem: function setItem(e, t) {y.setStorageSync(e, t);}, getItem: function getItem(e) {return y.getStorageSync(e);}, removeItem: function removeItem(e) {y.removeStorageSync(e);}, clear: function clear() {y.clearStorageSync();} };var Te = { genAdapter: function genAdapter() {return { root: {}, reqClass: Se, localStorage: ke, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };ve.useAdapters(Te);var Ae = ve,Ie = Ae.init;var Pe, Ee;function Oe(_ref12) {var e = _ref12.name,t = _ref12.data,s = _ref12.spaceId,n = _ref12.provider;Pe || (Pe = function () {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: "mp-weixin", OS: d, APPID: h.appid, LOCALE: u(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.0" };}(), Ee = { ak: h.appid, p: "android" === d ? "a" : "i", ut: g(), uuid: p() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e15 = Object.assign({}, Ee, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: Pe, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e15)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e16 = y.getStorageSync("uni_id_token") || y.getStorageSync("uniIdToken");_e16 && (r.uniIdToken = _e16);}return r;}function Ue(_ref13) {var _this11 = this;var e = _ref13.name,t = _ref13.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,a = "http://".concat(s, ":").concat(n, "/system/check-function"),c = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {y.request({ method: "POST", url: a, data: { name: e, platform: "mp-weixin", provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref14.data;var _ref15 = e || {},t = _ref15.code,s = _ref15.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref16) {var s = _ref16.code,n = _ref16.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e17 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e17), new Error(_e17);}case "SWITCH_TO_CLOUD":break;default:{var _e18 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e18), new Error(_e18);}}return _this11.originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var a = Oe({ name: e, data: t, provider: _this11.config.provider, spaceId: o });y.request({ method: "POST", url: c, data: { provider: r, platform: "mp-weixin", param: a }, success: function success() {var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref17.statusCode,t = _ref17.data;return !e || e >= 400 ? n(new i({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new i({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}function be(e) {var t = e.callFunction;e.callFunction = function (e) {var _this12 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {e.data = Oe({ name: e.name, data: e.data, provider: _this12.config.provider, spaceId: _this12.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[_this12.config.provider];return new Promise(function (n, r) {t.call(_this12, e).then(function (t) {if (_this12.config.useDebugFunction && t && t.requestId) {var _n7 = JSON.stringify({ spaceId: _this12.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n7, "[/").concat(s, "-request]"));}n(t);}).catch(function (t) {if (_this12.config.useDebugFunction && t && t.requestId) {var _n8 = JSON.stringify({ spaceId: _this12.config.spaceId, functionName: e.name, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_n8, "[/").concat(s, "-request]"));}t && t.message && (t.message = "[".concat(e.name, "]: ").concat(t.message)), r(t);});});});};var s = e.callFunction;e.originCallFunction = e.callFunction, e.callFunction = function (t) {return o(function (t) {var _this13 = this;var n;return n = e.isReady ? Promise.resolve() : e.initUniCloud, n.then(function () {return  true && e.debugInfo && !e.debugInfo.forceRemote && [{"provider":"aliyun","spaceName":"myselffirst","spaceId":"15a6676e-a5d3-4a4a-a65c-b53188d3c5ae","clientSecret":"TVWMemqvtS8Ibg1S1bl30g==","endpoint":"https://api.bspapp.com"}] ? Ue.call(_this13, t) : s.call(_this13, t);});}).call(this, t);};}Ae.init = function (e) {e.env = e.spaceId;var t = Ie.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;}, t.customAuth = t.auth;return ["deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;};var Ce = Symbol("CLIENT_DB_INTERNAL");function De(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ce, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}var Re = /*#__PURE__*/function (_Error2) {_inherits(Re, _Error2);var _super8 = _createSuper(Re);function Re(e, t) {var _this14;_classCallCheck(this, Re);_this14 = _super8.call(this, e), _this14.code = t;return _this14;}return Re;}( /*#__PURE__*/_wrapNativeSuper(Error));function xe(e) {switch (t = e, Object.prototype.toString.call(t).slice(8, -1).toLowerCase()) {case "array":return e.map(function (e) {return xe(e);});case "object":return e._internalType === Ce || Object.keys(e).forEach(function (t) {e[t] = xe(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}var t;}function qe() {var e = y.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [] };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var n;return s;}var Fe = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref18) {var s = _ref18.onChooseFile,n = _ref18.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,o = e.sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));function Le(_x30, _x31) {return _Le.apply(this, arguments);}function _Le() {_Le = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e24, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {y.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e24 = _context32.sent;return _context32.abrupt("return", !(!_e24.data || 0 !== _e24.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _Le.apply(this, arguments);}var Ne = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && "development" === "development" && ( false || "app-plus" === "mp-weixin");switch (e.provider) {case "tencent":t = Ae.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = v.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("未提供正确的provider参数");}var n = {
    "address": [
        "127.0.0.1",
        "192.168.100.13"
    ],
    "debugPort": 55441,
    "initialLaunchType": "remote",
    "servePort": 55442
}
; true && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();return t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if ( true && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e19 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref19 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n9, _r3;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n9 = 0;case 1:if (!(_n9 < e.length)) {_context31.next = 11;break;}_r3 = e[_n9];_context31.next = 5;return Le(_r3, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r3;return _context31.abrupt("break", 11);case 8:_n9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref19.apply(this, arguments);};}()(_e19, _s4);}return Promise.resolve();}).then(function () {var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref20.address,s = _ref20.port;if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e20 =  false ? undefined : "warn",_s5 = console[_e20];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _s5("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试")) : _s5("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试");}}).then(function () {return function () {if (true) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === h.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", h.appid), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) { false ? (undefined) : setTimeout(function () {d = uni.getSystemInfoSync().platform, l = uni.getStorageSync("__DC_CLOUD_UUID") || f(32), e();}, 0);});}).then(function () {t.isReady = !0;}), be(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this15 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this15, e);});};var s = e.uploadFile;e.uploadFile = function (e) {return o(s).call(this, e);};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(n, r) {var o = this.toJSON();return o.$db.push({ $method: n, $param: r }), e.callFunction({ name: "DCloud-clientDB", data: { action: this.actionName, command: o } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired;return n ? Promise.reject(new Re(r, n)) : (o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), Promise.resolve(e));}).catch(function (e) {var t = new Re(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), Promise.reject(e);});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s6 = e.content.$method;if ("aggregate" === _s6 || "pipeline" === _s6) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: xe(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return De(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: xe(Array.from(arguments)) }, e, s);};} });}function a(_ref21) {var e = _ref21.path,t = _ref21.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var c = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: De({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return De({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: xe(Array.from(arguments)) }, null, e);};} });}, Geo: De({}, { get: function get(e, t) {return a({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return a({ path: [], method: "serverDate" });}, get RegExp() {return a({ path: [], method: "RegExp" });} },u = De(c, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: xe(Array.from(arguments)) });};} });return this._database = u, u;};}(t), function (e) {e.getCurrentUserInfo = qe, e.chooseAndUploadFile = o(Fe.initChooseAndUploadFile(e));}(t), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = {};if (1 === [{"provider":"aliyun","spaceName":"myselffirst","spaceId":"15a6676e-a5d3-4a4a-a65c-b53188d3c5ae","clientSecret":"TVWMemqvtS8Ibg1S1bl30g==","endpoint":"https://api.bspapp.com"}].length) e = [{"provider":"aliyun","spaceName":"myselffirst","spaceId":"15a6676e-a5d3-4a4a-a65c-b53188d3c5ae","clientSecret":"TVWMemqvtS8Ibg1S1bl30g==","endpoint":"https://api.bspapp.com"}][0], Ne = Ne.init(e);else {var _e21 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"],t = [{"provider":"aliyun","spaceName":"myselffirst","spaceId":"15a6676e-a5d3-4a4a-a65c-b53188d3c5ae","clientSecret":"TVWMemqvtS8Ibg1S1bl30g==","endpoint":"https://api.bspapp.com"}].length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在cloudfunctions目录右键关联服务空间";_e21.forEach(function (e) {Ne[e] = function () {return console.error(t), Promise.reject(new i({ code: "SYS_ERR", message: t }));};});}Object.assign(Ne, { get mixinDatacom() {return e = Ne, { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this16 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this16[t]);}), e;}, function (e, t) {var s = !1;var n = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (n.push(e[_r4]), s = !0);}e[0] !== t[0] && (_this16.mixinDatacomPage.current = _this16.pageCurrent), _this16.mixinDatacomPage.size = _this16.pageSize, _this16.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this17 = this;var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref22$getone = _ref22.getone,e = _ref22$getone === void 0 ? !1 : _ref22$getone,t = _ref22.success,s = _ref22.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this17.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this17.getcount && (_this17.mixinDatacomPage.count = r), _this17.mixinDatacomHasMore = n.length < _this17.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this17.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this17.mixinDatacomLoading = !1, _this17.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.groupby || this.groupby;a && (s = s.groupBy(a));var c = t.groupField || this.groupField;c && (s = s.groupField(c)), !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var u = t.orderby || this.orderby;u && (s = s.orderBy(u));var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,l = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,d = void 0 !== t.getcount ? t.getcount : this.getcount,f = void 0 !== t.gettree ? t.gettree : this.gettree,p = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,g = { getCount: d },m = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return f && (g.getTree = m), p && (g.getTreePath = m), s = s.skip(l * (h - 1)).limit(l).get(g), s;} } };var e;} });}})();var Me = Ne;var _default2 = Me;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 96)))

/***/ }),

/***/ 96:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 97);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 97:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 96)))

/***/ }),

/***/ 98:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! exports provided: I18n, initVueI18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(uni) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initVueI18n", function() { return initVueI18n; });
const isObject = (val) => val !== null && typeof val === 'object';
class BaseFormatter {
    constructor() {
        this._caches = Object.create(null);
    }
    interpolate(message, values) {
        if (!values) {
            return [message];
        }
        let tokens = this._caches[message];
        if (!tokens) {
            tokens = parse(message);
            this._caches[message] = tokens;
        }
        return compile(tokens, values);
    }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
    const tokens = [];
    let position = 0;
    let text = '';
    while (position < format.length) {
        let char = format[position++];
        if (char === '{') {
            if (text) {
                tokens.push({ type: 'text', value: text });
            }
            text = '';
            let sub = '';
            char = format[position++];
            while (char !== undefined && char !== '}') {
                sub += char;
                char = format[position++];
            }
            const isClosed = char === '}';
            const type = RE_TOKEN_LIST_VALUE.test(sub)
                ? 'list'
                : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                    ? 'named'
                    : 'unknown';
            tokens.push({ value: sub, type });
        }
        else if (char === '%') {
            // when found rails i18n syntax, skip text capture
            if (format[position] !== '{') {
                text += char;
            }
        }
        else {
            text += char;
        }
    }
    text && tokens.push({ type: 'text', value: text });
    return tokens;
}
function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values)
        ? 'list'
        : isObject(values)
            ? 'named'
            : 'unknown';
    if (mode === 'unknown') {
        return compiled;
    }
    while (index < tokens.length) {
        const token = tokens[index];
        switch (token.type) {
            case 'text':
                compiled.push(token.value);
                break;
            case 'list':
                compiled.push(values[parseInt(token.value, 10)]);
                break;
            case 'named':
                if (mode === 'named') {
                    compiled.push(values[token.value]);
                }
                else {
                    if (true) {
                        console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                    }
                }
                break;
            case 'unknown':
                if (true) {
                    console.warn(`Detect 'unknown' type of token!`);
                }
                break;
        }
        index++;
    }
    return compiled;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, '-');
    if (messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale.indexOf('zh') === 0) {
        if (locale.indexOf('-hans') !== -1) {
            return 'zh-Hans';
        }
        if (locale.indexOf('-hant') !== -1) {
            return 'zh-Hant';
        }
        if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
            return 'zh-Hant';
        }
        return 'zh-Hans';
    }
    const lang = startsWith(locale, ['en', 'fr', 'es']);
    if (lang) {
        return lang;
    }
}
class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
        this.locale = 'en';
        this.fallbackLocale = 'en';
        this.message = {};
        this.messages = {};
        this.watchers = [];
        if (fallbackLocale) {
            this.fallbackLocale = fallbackLocale;
        }
        this.formater = formater || defaultFormatter;
        this.messages = messages;
        this.setLocale(locale);
        if (watcher) {
            this.watchLocale(watcher);
        }
    }
    setLocale(locale) {
        const oldLocale = this.locale;
        this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
        this.message = this.messages[this.locale];
        this.watchers.forEach((watcher) => {
            watcher(this.locale, oldLocale);
        });
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(fn) {
        const index = this.watchers.push(fn) - 1;
        return () => {
            this.watchers.splice(index, 1);
        };
    }
    t(key, locale, values) {
        let message = this.message;
        if (typeof locale === 'string') {
            locale = normalizeLocale(locale, this.messages);
            locale && (message = this.messages[locale]);
        }
        else {
            values = locale;
        }
        if (!hasOwn(message, key)) {
            console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
            return key;
        }
        return this.formater.interpolate(message[key], values).join('');
    }
}

function initLocaleWatcher(appVm, i18n) {
    appVm.$i18n &&
        appVm.$i18n.vm.$watch('locale', (newLocale) => {
            i18n.setLocale(newLocale);
        }, {
            immediate: true,
        });
}
function getDefaultLocale() {
    if (typeof navigator !== 'undefined') {
        return navigator.userLanguage || navigator.language;
    }
    if (typeof plus !== 'undefined') {
        // TODO 待调整为最新的获取语言代码
        return plus.os.language;
    }
    return uni.getSystemInfoSync().language;
}
function initVueI18n(messages, fallbackLocale = 'en', locale) {
    const i18n = new I18n({
        locale: locale || fallbackLocale,
        fallbackLocale,
        messages,
    });
    let t = (key, values) => {
        if (typeof getApp !== 'function') {
            // app-plus view
            /* eslint-disable no-func-assign */
            t = function (key, values) {
                return i18n.t(key, values);
            };
        }
        else {
            const appVm = getApp().$vm;
            if (!appVm.$t || !appVm.$i18n) {
                if (!locale) {
                    i18n.setLocale(getDefaultLocale());
                }
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    return i18n.t(key, values);
                };
            }
            else {
                initLocaleWatcher(appVm, i18n);
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    const $i18n = appVm.$i18n;
                    const silentTranslationWarn = $i18n.silentTranslationWarn;
                    $i18n.silentTranslationWarn = true;
                    const msg = appVm.$t(key, values);
                    $i18n.silentTranslationWarn = silentTranslationWarn;
                    if (msg !== key) {
                        return msg;
                    }
                    return i18n.t(key, $i18n.locale, values);
                };
            }
        }
        return t(key, values);
    };
    return {
        t(key, values) {
            return t(key, values);
        },
        getLocale() {
            return i18n.getLocale();
        },
        setLocale(newLocale) {
            return i18n.setLocale(newLocale);
        },
        mixin: {
            beforeCreate() {
                const unwatch = i18n.watchLocale(() => {
                    this.$forceUpdate();
                });
                this.$once('hook:beforeDestroy', function () {
                    unwatch();
                });
            },
            methods: {
                $$t(key, values) {
                    return t(key, values);
                },
            },
        },
    };
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 99:
/*!********************************************************************************!*\
  !*** C:/Users/admin/Desktop/test-20210329/wzxd-app/pages.json?{"type":"stat"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__EBB9B1E" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map