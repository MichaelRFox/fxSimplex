var fxSimplex = (function (exports) {
  'use strict';
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$N = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$i = function (argument) {
    return typeof argument == 'function';
  };
  var isCallable$h = isCallable$i;
  var isObject$c = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$h(it);
  };
  var global$M = global$N;
  var isObject$b = isObject$c;
  var document$1 = global$M.document; // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$b(document$1) && isObject$b(document$1.createElement);
  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };
  var documentCreateElement$1 = documentCreateElement$2;
  var classList = documentCreateElement$1('span').classList;
  var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;
  var FunctionPrototype$1 = Function.prototype;
  var bind$5 = FunctionPrototype$1.bind;
  var call$d = FunctionPrototype$1.call;
  var callBind = bind$5 && bind$5.bind(call$d);
  var functionUncurryThis = bind$5 ? function (fn) {
    return fn && callBind(call$d, fn);
  } : function (fn) {
    return fn && function () {
      return call$d.apply(fn, arguments);
    };
  };
  var global$L = global$N;
  var String$5 = global$L.String;
  var tryToString$4 = function (argument) {
    try {
      return String$5(argument);
    } catch (error) {
      return 'Object';
    }
  };
  var global$K = global$N;
  var isCallable$g = isCallable$i;
  var tryToString$3 = tryToString$4;
  var TypeError$i = global$K.TypeError; // `Assert: IsCallable(argument) is true`
  var aCallable$4 = function (argument) {
    if (isCallable$g(argument)) return argument;
    throw TypeError$i(tryToString$3(argument) + ' is not a function');
  };
  var uncurryThis$t = functionUncurryThis;
  var aCallable$3 = aCallable$4;
  var bind$4 = uncurryThis$t(uncurryThis$t.bind); // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : bind$4 ? bind$4(fn, that) : function () {
      return fn.apply(that, arguments);
    };
  };
  var fails$n = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };
  var uncurryThis$s = functionUncurryThis;
  var toString$c = uncurryThis$s({}.toString);
  var stringSlice$4 = uncurryThis$s(''.slice);
  var classofRaw$1 = function (it) {
    return stringSlice$4(toString$c(it), 8, -1);
  };
  var global$J = global$N;
  var uncurryThis$r = functionUncurryThis;
  var fails$m = fails$n;
  var classof$b = classofRaw$1;
  var Object$5 = global$J.Object;
  var split = uncurryThis$r(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$m(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$b(it) == 'String' ? split(it, '') : Object$5(it);
  } : Object$5;
  var global$I = global$N;
  var TypeError$h = global$I.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$7 = function (it) {
    if (it == undefined) throw TypeError$h("Can't call method on " + it);
    return it;
  };
  var global$H = global$N;
  var requireObjectCoercible$6 = requireObjectCoercible$7;
  var Object$4 = global$H.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$7 = function (argument) {
    return Object$4(requireObjectCoercible$6(argument));
  };
  var ceil = Math.ceil;
  var floor$1 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$6 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil)(number);
  };
  var toIntegerOrInfinity$5 = toIntegerOrInfinity$6;
  var min$2 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$3 = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity$5(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };
  var toLength$2 = toLength$3; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$8 = function (obj) {
    return toLength$2(obj.length);
  };
  var classof$a = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$4 = Array.isArray || function isArray(argument) {
    return classof$a(argument) == 'Array';
  };
  var shared$4 = {exports: {}};
  var isPure = false;
  var global$G = global$N; // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$5 = Object.defineProperty;
  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$5(global$G, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$G[key] = value;
    }
    return value;
  };
  var global$F = global$N;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$F[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;
  var store$2 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.19.0',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  var uncurryThis$q = functionUncurryThis;
  var toObject$6 = toObject$7;
  var hasOwnProperty = uncurryThis$q({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$6(it), key);
  };
  var uncurryThis$p = functionUncurryThis;
  var id$1 = 0;
  var postfix = Math.random();
  var toString$b = uncurryThis$p(1.0.toString);
  var uid$3 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id$1 + postfix, 36);
  };
  var global$E = global$N;
  var isCallable$f = isCallable$i;
  var aFunction = function (argument) {
    return isCallable$f(argument) ? argument : undefined;
  };
  var getBuiltIn$6 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$E[namespace]) : global$E[namespace] && global$E[namespace][method];
  };
  var getBuiltIn$5 = getBuiltIn$6;
  var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';
  var global$D = global$N;
  var userAgent = engineUserAgent;
  var process = global$D.process;
  var Deno = global$D.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;
  if (v8) {
    match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }
  var engineV8Version = version;
  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$l = fails$n; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$l(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });
  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';
  var global$C = global$N;
  var shared$3 = shared$4.exports;
  var hasOwn$b = hasOwnProperty_1;
  var uid$2 = uid$3;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$3('wks');
  var Symbol$2 = global$C.Symbol;
  var symbolFor = Symbol$2 && Symbol$2['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$2;
  var wellKnownSymbol$l = function (name) {
    if (!hasOwn$b(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL && hasOwn$b(Symbol$2, name)) {
        WellKnownSymbolsStore[name] = Symbol$2[name];
      } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    }
    return WellKnownSymbolsStore[name];
  };
  var wellKnownSymbol$k = wellKnownSymbol$l;
  var TO_STRING_TAG$3 = wellKnownSymbol$k('toStringTag');
  var test$1 = {};
  test$1[TO_STRING_TAG$3] = 'z';
  var toStringTagSupport = String(test$1) === '[object z]';
  var global$B = global$N;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$e = isCallable$i;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$j = wellKnownSymbol$l;
  var TO_STRING_TAG$2 = wellKnownSymbol$j('toStringTag');
  var Object$3 = global$B.Object; // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`
  var classof$9 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$3(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
  };
  var uncurryThis$o = functionUncurryThis;
  var isCallable$d = isCallable$i;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$o(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$d(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }
  var inspectSource$3 = store$1.inspectSource;
  var uncurryThis$n = functionUncurryThis;
  var fails$k = fails$n;
  var isCallable$c = isCallable$i;
  var classof$8 = classof$9;
  var getBuiltIn$4 = getBuiltIn$6;
  var inspectSource$2 = inspectSource$3;
  var noop = function () {
    /* empty */
  };
  var empty = [];
  var construct = getBuiltIn$4('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$2 = uncurryThis$n(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
  var isConstructorModern = function (argument) {
    if (!isCallable$c(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };
  var isConstructorLegacy = function (argument) {
    if (!isCallable$c(argument)) return false;
    switch (classof$8(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    }
    return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$2(argument));
  }; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$k(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;
  var global$A = global$N;
  var isArray$3 = isArray$4;
  var isConstructor$3 = isConstructor$4;
  var isObject$a = isObject$c;
  var wellKnownSymbol$i = wellKnownSymbol$l;
  var SPECIES$5 = wellKnownSymbol$i('species');
  var Array$3 = global$A.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$3(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback
      if (isConstructor$3(C) && (C === Array$3 || isArray$3(C.prototype))) C = undefined;else if (isObject$a(C)) {
        C = C[SPECIES$5];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array$3 : C;
  };
  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$3 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };
  var bind$3 = functionBindContext;
  var uncurryThis$m = functionUncurryThis;
  var IndexedObject$3 = indexedObject;
  var toObject$5 = toObject$7;
  var lengthOfArrayLike$7 = lengthOfArrayLike$8;
  var arraySpeciesCreate$2 = arraySpeciesCreate$3;
  var push$1 = uncurryThis$m([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$4 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$5($this);
      var self = IndexedObject$3(O);
      var boundFunction = bind$3(callbackfn, that);
      var length = lengthOfArrayLike$7(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (; length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3:
              return true;
            // some
            case 5:
              return value;
            // find
            case 6:
              return index;
            // findIndex
            case 2:
              push$1(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every
            case 7:
              push$1(target, value);
            // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };
  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$4(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$4(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$4(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$4(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$4(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$4(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$4(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$4(7)
  };
  var fails$j = fails$n;
  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$j(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () {
        throw 1;
      }, 1);
    });
  };
  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;
  var STRICT_METHOD$3 = arrayMethodIsStrict$3('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;
  var fails$i = fails$n; // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$i(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });
  var objectDefineProperty = {};
  var DESCRIPTORS$9 = descriptors;
  var fails$h = fails$n;
  var createElement = documentCreateElement$2; // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$9 && !fails$h(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });
  var global$z = global$N;
  var isObject$9 = isObject$c;
  var String$4 = global$z.String;
  var TypeError$g = global$z.TypeError; // `Assert: Type(argument) is Object`
  var anObject$f = function (argument) {
    if (isObject$9(argument)) return argument;
    throw TypeError$g(String$4(argument) + ' is not an object');
  };
  var call$c = Function.prototype.call;
  var functionCall = call$c.bind ? call$c.bind(call$c) : function () {
    return call$c.apply(call$c, arguments);
  };
  var uncurryThis$l = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$l({}.isPrototypeOf);
  var global$y = global$N;
  var getBuiltIn$3 = getBuiltIn$6;
  var isCallable$b = isCallable$i;
  var isPrototypeOf$6 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var Object$2 = global$y.Object;
  var isSymbol$3 = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$3('Symbol');
    return isCallable$b($Symbol) && isPrototypeOf$6($Symbol.prototype, Object$2(it));
  };
  var aCallable$2 = aCallable$4; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$5 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$2(func);
  };
  var global$x = global$N;
  var call$b = functionCall;
  var isCallable$a = isCallable$i;
  var isObject$8 = isObject$c;
  var TypeError$f = global$x.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$b(fn, input))) return val;
    if (isCallable$a(fn = input.valueOf) && !isObject$8(val = call$b(fn, input))) return val;
    if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$b(fn, input))) return val;
    throw TypeError$f("Can't convert object to primitive value");
  };
  var global$w = global$N;
  var call$a = functionCall;
  var isObject$7 = isObject$c;
  var isSymbol$2 = isSymbol$3;
  var getMethod$4 = getMethod$5;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$h = wellKnownSymbol$l;
  var TypeError$e = global$w.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$2 = function (input, pref) {
    if (!isObject$7(input) || isSymbol$2(input)) return input;
    var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$a(exoticToPrim, input, pref);
      if (!isObject$7(result) || isSymbol$2(result)) return result;
      throw TypeError$e("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };
  var toPrimitive$1 = toPrimitive$2;
  var isSymbol$1 = isSymbol$3; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive$1(argument, 'string');
    return isSymbol$1(key) ? key : key + '';
  };
  var global$v = global$N;
  var DESCRIPTORS$8 = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$e = anObject$f;
  var toPropertyKey$2 = toPropertyKey$3;
  var TypeError$d = global$v.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$2(P);
    anObject$e(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$d('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  var DESCRIPTORS$7 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var createNonEnumerableProperty$8 = DESCRIPTORS$7 ? function (object, key, value) {
    return definePropertyModule$5.f(object, key, createPropertyDescriptor$3(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
  var global$u = global$N;
  var DOMIterables$1 = domIterables;
  var DOMTokenListPrototype$1 = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
  var handlePrototype$1 = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$7(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };
  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    if (DOMIterables$1[COLLECTION_NAME$1]) {
      handlePrototype$1(global$u[COLLECTION_NAME$1] && global$u[COLLECTION_NAME$1].prototype);
    }
  }
  handlePrototype$1(DOMTokenListPrototype$1);
  var objectGetOwnPropertyDescriptor = {};
  var objectPropertyIsEnumerable = {};
  var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;
  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$7;
  var toIndexedObject$8 = function (it) {
    return IndexedObject$2(requireObjectCoercible$5(it));
  };
  var DESCRIPTORS$6 = descriptors;
  var call$9 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;
  var toIndexedObject$7 = toIndexedObject$8;
  var toPropertyKey$1 = toPropertyKey$3;
  var hasOwn$a = hasOwnProperty_1;
  var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$7(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$a(O, P)) return createPropertyDescriptor$2(!call$9(propertyIsEnumerableModule.f, O, P), O[P]);
  };
  var redefine$b = {exports: {}};
  var global$t = global$N;
  var isCallable$9 = isCallable$i;
  var inspectSource$1 = inspectSource$3;
  var WeakMap$1 = global$t.WeakMap;
  var nativeWeakMap = isCallable$9(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));
  var shared$2 = shared$4.exports;
  var uid$1 = uid$3;
  var keys$2 = shared$2('keys');
  var sharedKey$3 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$1(key));
  };
  var hiddenKeys$5 = {};
  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$s = global$N;
  var uncurryThis$k = functionUncurryThis;
  var isObject$6 = isObject$c;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
  var hasOwn$9 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$c = global$s.TypeError;
  var WeakMap = global$s.WeakMap;
  var set, get, has;
  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };
  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$6(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$c('Incompatible receiver, ' + TYPE + ' required');
      }
      return state;
    };
  };
  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = uncurryThis$k(store.get);
    var wmhas = uncurryThis$k(store.has);
    var wmset = uncurryThis$k(store.set);
    set = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$c(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn$9(it, STATE)) throw new TypeError$c(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$6(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$9(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$9(it, STATE);
    };
  }
  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };
  var DESCRIPTORS$5 = descriptors;
  var hasOwn$8 = hasOwnProperty_1;
  var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$8(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || DESCRIPTORS$5 && getDescriptor(FunctionPrototype, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };
  var global$r = global$N;
  var isCallable$8 = isCallable$i;
  var hasOwn$7 = hasOwnProperty_1;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$3;
  var InternalStateModule$4 = internalState;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
  var getInternalState$4 = InternalStateModule$4.get;
  var enforceInternalState$1 = InternalStateModule$4.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$b.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$8(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$7(value, 'name') || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
        createNonEnumerableProperty$5(value, 'name', name);
      }
      state = enforceInternalState$1(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$r) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;else createNonEnumerableProperty$5(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$8(this) && getInternalState$4(this).source || inspectSource(this);
  });
  var objectGetOwnPropertyNames = {};
  var toIntegerOrInfinity$4 = toIntegerOrInfinity$6;
  var max$2 = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toIntegerOrInfinity$4(index);
    return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
  };
  var toIndexedObject$6 = toIndexedObject$8;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;
  var lengthOfArrayLike$6 = lengthOfArrayLike$8; // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$6($this);
      var length = lengthOfArrayLike$6(O);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };
  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };
  var uncurryThis$j = functionUncurryThis;
  var hasOwn$6 = hasOwnProperty_1;
  var toIndexedObject$5 = toIndexedObject$8;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;
  var push = uncurryThis$j([].push);
  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$5(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$6(hiddenKeys$3, key) && hasOwn$6(O, key) && push(result, key); // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
      ~indexOf$1(result, key) || push(result, key);
    }
    return result;
  };
  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };
  var objectGetOwnPropertySymbols = {};
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  var getBuiltIn$2 = getBuiltIn$6;
  var uncurryThis$i = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$d = anObject$f;
  var concat = uncurryThis$i([].concat); // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };
  var hasOwn$5 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$4 = objectDefineProperty;
  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$5(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };
  var fails$g = fails$n;
  var isCallable$7 = isCallable$i;
  var replacement = /#|\.prototype\./;
  var isForced$4 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$7(detection) ? fails$g(detection) : !!detection;
  };
  var normalize = isForced$4.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };
  var data = isForced$4.data = {};
  var NATIVE = isForced$4.NATIVE = 'N';
  var POLYFILL = isForced$4.POLYFILL = 'P';
  var isForced_1 = isForced$4;
  var global$q = global$N;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
  var redefine$a = redefine$b.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$3 = isForced_1;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$q;
    } else if (STATIC) {
      target = global$q[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$q[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      } // extend global
      redefine$a(target, key, sourceProperty, options);
    }
  };
  var global$p = global$N;
  var classof$7 = classof$9;
  var String$3 = global$p.String;
  var toString$a = function (argument) {
    if (classof$7(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$3(argument);
  };
  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  var uncurryThis$h = functionUncurryThis;
  var requireObjectCoercible$4 = requireObjectCoercible$7;
  var toString$9 = toString$a;
  var whitespaces$1 = whitespaces$2;
  var replace$2 = uncurryThis$h(''.replace);
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
    return function ($this) {
      var string = toString$9(requireObjectCoercible$4($this));
      if (TYPE & 1) string = replace$2(string, ltrim, '');
      if (TYPE & 2) string = replace$2(string, rtrim, '');
      return string;
    };
  };
  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
  };
  var global$o = global$N;
  var fails$f = fails$n;
  var uncurryThis$g = functionUncurryThis;
  var toString$8 = toString$a;
  var trim$2 = stringTrim.trim;
  var whitespaces = whitespaces$2;
  var charAt$5 = uncurryThis$g(''.charAt);
  var n$ParseFloat = global$o.parseFloat;
  var Symbol$1 = global$o.Symbol;
  var ITERATOR$6 = Symbol$1 && Symbol$1.iterator;
  var FORCED$2 = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity // MS Edge 18- broken with boxed symbols
  || ITERATOR$6 && !fails$f(function () {
    n$ParseFloat(Object(ITERATOR$6));
  }); // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$2 ? function parseFloat(string) {
    var trimmedString = trim$2(toString$8(string));
    var result = n$ParseFloat(trimmedString);
    return result === 0 && charAt$5(trimmedString, 0) == '-' ? -0 : result;
  } : n$ParseFloat;
  var $$g = _export;
  var $parseFloat = numberParseFloat; // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  $$g({
    global: true,
    forced: parseFloat != $parseFloat
  }, {
    parseFloat: $parseFloat
  });
  var uncurryThis$f = functionUncurryThis; // `thisNumberValue` abstract operation
  // https://tc39.es/ecma262/#sec-thisnumbervalue
  var thisNumberValue$2 = uncurryThis$f(1.0.valueOf);
  var global$n = global$N;
  var toIntegerOrInfinity$3 = toIntegerOrInfinity$6;
  var toString$7 = toString$a;
  var requireObjectCoercible$3 = requireObjectCoercible$7;
  var RangeError$1 = global$n.RangeError; // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat
  var stringRepeat = function repeat(count) {
    var str = toString$7(requireObjectCoercible$3(this));
    var result = '';
    var n = toIntegerOrInfinity$3(count);
    if (n < 0 || n == Infinity) throw RangeError$1('Wrong number of repetitions');
    for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
    return result;
  };
  var $$f = _export;
  var global$m = global$N;
  var uncurryThis$e = functionUncurryThis;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$6;
  var thisNumberValue$1 = thisNumberValue$2;
  var $repeat = stringRepeat;
  var fails$e = fails$n;
  var RangeError = global$m.RangeError;
  var String$2 = global$m.String;
  var floor = Math.floor;
  var repeat = uncurryThis$e($repeat);
  var stringSlice$3 = uncurryThis$e(''.slice);
  var un$ToFixed = uncurryThis$e(1.0.toFixed);
  var pow = function (x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };
  var log = function (x) {
    var n = 0;
    var x2 = x;
    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }
    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    }
    return n;
  };
  var multiply = function (data, n, c) {
    var index = -1;
    var c2 = c;
    while (++index < 6) {
      c2 += n * data[index];
      data[index] = c2 % 1e7;
      c2 = floor(c2 / 1e7);
    }
  };
  var divide = function (data, n) {
    var index = 6;
    var c = 0;
    while (--index >= 0) {
      c += data[index];
      data[index] = floor(c / n);
      c = c % n * 1e7;
    }
  };
  var dataToString = function (data) {
    var index = 6;
    var s = '';
    while (--index >= 0) {
      if (s !== '' || index === 0 || data[index] !== 0) {
        var t = String$2(data[index]);
        s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
      }
    }
    return s;
  };
  var FORCED$1 = fails$e(function () {
    return un$ToFixed(0.00008, 3) !== '0.000' || un$ToFixed(0.9, 0) !== '1' || un$ToFixed(1.255, 2) !== '1.25' || un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
  }) || !fails$e(function () {
    // V8 ~ Android 4.3-
    un$ToFixed({});
  }); // `Number.prototype.toFixed` method
  // https://tc39.es/ecma262/#sec-number.prototype.tofixed
  $$f({
    target: 'Number',
    proto: true,
    forced: FORCED$1
  }, {
    toFixed: function toFixed(fractionDigits) {
      var number = thisNumberValue$1(this);
      var fractDigits = toIntegerOrInfinity$2(fractionDigits);
      var data = [0, 0, 0, 0, 0, 0];
      var sign = '';
      var result = '0';
      var e, z, j, k;
      if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare -- NaN check
      if (number != number) return 'NaN';
      if (number <= -1e21 || number >= 1e21) return String$2(number);
      if (number < 0) {
        sign = '-';
        number = -number;
      }
      if (number > 1e-21) {
        e = log(number * pow(2, 69, 1)) - 69;
        z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;
        if (e > 0) {
          multiply(data, 0, z);
          j = fractDigits;
          while (j >= 7) {
            multiply(data, 1e7, 0);
            j -= 7;
          }
          multiply(data, pow(10, j, 1), 0);
          j = e - 1;
          while (j >= 23) {
            divide(data, 1 << 23);
            j -= 23;
          }
          divide(data, 1 << j);
          multiply(data, 1, 1);
          divide(data, 2);
          result = dataToString(data);
        } else {
          multiply(data, 0, z);
          multiply(data, 1 << -e, 0);
          result = dataToString(data) + repeat('0', fractDigits);
        }
      }
      if (fractDigits > 0) {
        k = result.length;
        result = sign + (k <= fractDigits ? '0.' + repeat('0', fractDigits - k) + result : stringSlice$3(result, 0, k - fractDigits) + '.' + stringSlice$3(result, k - fractDigits));
      } else {
        result = sign + result;
      }
      return result;
    }
  });
  var global$l = global$N;
  var isCallable$6 = isCallable$i;
  var String$1 = global$l.String;
  var TypeError$b = global$l.TypeError;
  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$6(argument)) return argument;
    throw TypeError$b("Can't set " + String$1(argument) + ' as a prototype');
  };
  /* eslint-disable no-proto -- safe */
  var uncurryThis$d = functionUncurryThis;
  var anObject$c = anObject$f;
  var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$d(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }
    return function setPrototypeOf(O, proto) {
      anObject$c(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);
  var isCallable$5 = isCallable$i;
  var isObject$5 = isObject$c;
  var setPrototypeOf$1 = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if ( // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$5(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$5(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };
  var isObject$4 = isObject$c;
  var classof$6 = classofRaw$1;
  var wellKnownSymbol$g = wellKnownSymbol$l;
  var MATCH$1 = wellKnownSymbol$g('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject$4(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$6(it) == 'RegExp');
  };
  var anObject$b = anObject$f; // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$b(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };
  var regexpStickyHelpers = {};
  var fails$d = fails$n;
  var global$k = global$N; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$k.RegExp;
  regexpStickyHelpers.UNSUPPORTED_Y = fails$d(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });
  regexpStickyHelpers.BROKEN_CARET = fails$d(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });
  var getBuiltIn$1 = getBuiltIn$6;
  var definePropertyModule$3 = objectDefineProperty;
  var wellKnownSymbol$f = wellKnownSymbol$l;
  var DESCRIPTORS$4 = descriptors;
  var SPECIES$4 = wellKnownSymbol$f('species');
  var setSpecies$2 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$3.f;
    if (DESCRIPTORS$4 && Constructor && !Constructor[SPECIES$4]) {
      defineProperty(Constructor, SPECIES$4, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };
  var fails$c = fails$n;
  var global$j = global$N; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$j.RegExp;
  var regexpUnsupportedDotAll = fails$c(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });
  var fails$b = fails$n;
  var global$i = global$N; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$i.RegExp;
  var regexpUnsupportedNcg = fails$b(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });
  var DESCRIPTORS$3 = descriptors;
  var global$h = global$N;
  var uncurryThis$c = functionUncurryThis;
  var isForced$2 = isForced_1;
  var inheritIfRequired$2 = inheritIfRequired$3;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;
  var defineProperty$4 = objectDefineProperty.f;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var isPrototypeOf$5 = objectIsPrototypeOf;
  var isRegExp$1 = isRegexp;
  var toString$6 = toString$a;
  var regExpFlags$2 = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var redefine$9 = redefine$b.exports;
  var fails$a = fails$n;
  var hasOwn$4 = hasOwnProperty_1;
  var enforceInternalState = internalState.enforce;
  var setSpecies$1 = setSpecies$2;
  var wellKnownSymbol$e = wellKnownSymbol$l;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
  var MATCH = wellKnownSymbol$e('match');
  var NativeRegExp = global$h.RegExp;
  var RegExpPrototype$3 = NativeRegExp.prototype;
  var SyntaxError = global$h.SyntaxError;
  var getFlags$2 = uncurryThis$c(regExpFlags$2);
  var exec$1 = uncurryThis$c(RegExpPrototype$3.exec);
  var charAt$4 = uncurryThis$c(''.charAt);
  var replace$1 = uncurryThis$c(''.replace);
  var stringIndexOf$1 = uncurryThis$c(''.indexOf);
  var stringSlice$2 = uncurryThis$c(''.slice); // TODO: Use only propper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g; // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;
  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
  var BASE_FORCED = DESCRIPTORS$3 && (!CORRECT_NEW || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1 || fails$a(function () {
    re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));
  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt$4(string, index);
      if (chr === '\\') {
        result += chr + charAt$4(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        }
        result += chr;
      }
    }
    return result;
  };
  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt$4(string, index);
      if (chr === '\\') {
        chr = chr + charAt$4(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (exec$1(IS_NCG, stringSlice$2(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwn$4(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;else result += chr;
    }
    return [result, named];
  }; // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced$2('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = isPrototypeOf$5(RegExpPrototype$3, this);
      var patternIsRegExp = isRegExp$1(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;
      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }
      if (patternIsRegExp || isPrototypeOf$5(RegExpPrototype$3, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags$2(rawPattern);
      }
      pattern = pattern === undefined ? '' : toString$6(pattern);
      flags = flags === undefined ? '' : toString$6(flags);
      rawPattern = pattern;
      if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
        if (dotAll) flags = replace$1(flags, /s/g, '');
      }
      rawFlags = flags;
      if (UNSUPPORTED_Y$1 && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
        if (sticky) flags = replace$1(flags, /y/g, '');
      }
      if (UNSUPPORTED_NCG$1) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }
      result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);
      if (dotAll || sticky || groups.length) {
        state = enforceInternalState(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }
      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty$3(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) {
        /* empty */
      }
      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper || defineProperty$4(RegExpWrapper, key, {
        configurable: true,
        get: function () {
          return NativeRegExp[key];
        },
        set: function (it) {
          NativeRegExp[key] = it;
        }
      });
    };
    for (var keys$1 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$1.length > index;) {
      proxy(keys$1[index++]);
    }
    RegExpPrototype$3.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$3;
    redefine$9(global$h, 'RegExp', RegExpWrapper);
  } // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies$1('RegExp');
  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };
  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var anObject$a = anObject$f;
  var toIndexedObject$4 = toIndexedObject$8;
  var objectKeys = objectKeys$1; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$2 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$a(O);
    var props = toIndexedObject$4(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
    return O;
  };
  var getBuiltIn = getBuiltIn$6;
  var html$1 = getBuiltIn('document', 'documentElement');
  /* global ActiveXObject -- old IE, WSH */
  var anObject$9 = anObject$f;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html = html$1;
  var documentCreateElement = documentCreateElement$2;
  var sharedKey$1 = sharedKey$3;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');
  var EmptyConstructor = function () {
    /* empty */
  };
  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }
    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };
  hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$9(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };
  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$8 = functionCall;
  var uncurryThis$b = functionUncurryThis;
  var toString$5 = toString$a;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = shared$4.exports;
  var create$3 = objectCreate;
  var getInternalState$3 = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$3 = uncurryThis$b(''.charAt);
  var indexOf = uncurryThis$b(''.indexOf);
  var replace = uncurryThis$b(''.replace);
  var stringSlice$1 = uncurryThis$b(''.slice);
  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$8(nativeExec, re1, 'a');
    call$8(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();
  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$3(re);
      var str = toString$5(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;
      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$8(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }
      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$8(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;
      if (sticky) {
        flags = replace(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }
        strCopy = stringSlice$1(str, re.lastIndex); // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        } // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }
      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
      match = call$8(nativeExec, sticky ? reCopy : re, strCopy);
      if (sticky) {
        if (match) {
          match.input = stringSlice$1(match.input, charsAdded);
          match[0] = stringSlice$1(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$8(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }
      if (match && groups) {
        match.groups = object = create$3(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }
      return match;
    };
  }
  var regexpExec$2 = patchedExec;
  var $$e = _export;
  var exec = regexpExec$2; // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$e({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec
  }, {
    exec: exec
  });
  var uncurryThis$a = functionUncurryThis;
  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
  var redefine$8 = redefine$b.exports;
  var anObject$8 = anObject$f;
  var isPrototypeOf$4 = objectIsPrototypeOf;
  var $toString = toString$a;
  var fails$9 = fails$n;
  var regExpFlags$1 = regexpFlags$1;
  var TO_STRING = 'toString';
  var RegExpPrototype$2 = RegExp.prototype;
  var n$ToString = RegExpPrototype$2[TO_STRING];
  var getFlags$1 = uncurryThis$a(regExpFlags$1);
  var NOT_GENERIC = fails$9(function () {
    return n$ToString.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  }); // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && n$ToString.name != TO_STRING; // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$8(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$8(this);
      var p = $toString(R.source);
      var rf = R.flags;
      var f = $toString(rf === undefined && isPrototypeOf$4(RegExpPrototype$2, R) && !('flags' in RegExpPrototype$2) ? getFlags$1(R) : rf);
      return '/' + p + '/' + f;
    }, {
      unsafe: true
    });
  }
  var $$d = _export;
  var uncurryThis$9 = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toIndexedObject$3 = toIndexedObject$8;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;
  var un$Join = uncurryThis$9([].join);
  var ES3_STRINGS = IndexedObject$1 != Object;
  var STRICT_METHOD$2 = arrayMethodIsStrict$2('join', ','); // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $$d({
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$2
  }, {
    join: function join(separator) {
      return un$Join(toIndexedObject$3(this), separator === undefined ? ',' : separator);
    }
  });
  var uncurryThis$8 = functionUncurryThis;
  var redefine$7 = redefine$b.exports;
  var regexpExec$1 = regexpExec$2;
  var fails$8 = fails$n;
  var wellKnownSymbol$d = wellKnownSymbol$l;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
  var SPECIES$3 = wellKnownSymbol$d('species');
  var RegExpPrototype$1 = RegExp.prototype;
  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$d(KEY);
    var DELEGATES_TO_SYMBOL = !fails$8(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$8(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$3] = function () {
          return re;
        };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }
      re.exec = function () {
        execCalled = true;
        return null;
      };
      re[SYMBOL]('');
      return !execCalled;
    });
    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
      var uncurriedNativeRegExpMethod = uncurryThis$8(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$8(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype$1.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2)
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2)
          };
        }
        return {
          done: false
        };
      });
      redefine$7(String.prototype, KEY, methods[0]);
      redefine$7(RegExpPrototype$1, SYMBOL, methods[1]);
    }
    if (SHAM) createNonEnumerableProperty$2(RegExpPrototype$1[SYMBOL], 'sham', true);
  };
  var uncurryThis$7 = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$6;
  var toString$4 = toString$a;
  var requireObjectCoercible$2 = requireObjectCoercible$7;
  var charAt$2 = uncurryThis$7(''.charAt);
  var charCodeAt$1 = uncurryThis$7(''.charCodeAt);
  var stringSlice = uncurryThis$7(''.slice);
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$4(requireObjectCoercible$2($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };
  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };
  var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };
  var global$g = global$N;
  var call$7 = functionCall;
  var anObject$7 = anObject$f;
  var isCallable$4 = isCallable$i;
  var classof$5 = classofRaw$1;
  var regexpExec = regexpExec$2;
  var TypeError$a = global$g.TypeError; // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$4(exec)) {
      var result = call$7(exec, R, S);
      if (result !== null) anObject$7(result);
      return result;
    }
    if (classof$5(R) === 'RegExp') return call$7(regexpExec, R, S);
    throw TypeError$a('RegExp#exec called on incompatible receiver');
  };
  var call$6 = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$6 = anObject$f;
  var toLength$1 = toLength$3;
  var toString$3 = toString$a;
  var requireObjectCoercible$1 = requireObjectCoercible$7;
  var getMethod$3 = getMethod$5;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var regExpExec$1 = regexpExecAbstract; // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$1(this);
      var matcher = regexp == undefined ? undefined : getMethod$3(regexp, MATCH);
      return matcher ? call$6(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$3(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$6(this);
      var S = toString$3(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done) return res.value;
      if (!rx.global) return regExpExec$1(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$1(rx, S)) !== null) {
        var matchStr = toString$3(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }];
  });
  var call$5 = functionCall;
  var anObject$5 = anObject$f;
  var getMethod$2 = getMethod$5;
  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$5(iterator);
    try {
      innerResult = getMethod$2(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$5(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$5(innerResult);
    return value;
  };
  var anObject$4 = anObject$f;
  var iteratorClose$1 = iteratorClose$2; // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$4(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
  };
  var iterators = {};
  var wellKnownSymbol$c = wellKnownSymbol$l;
  var Iterators$4 = iterators;
  var ITERATOR$5 = wellKnownSymbol$c('iterator');
  var ArrayPrototype$1 = Array.prototype; // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
  };
  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;
  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
  };
  var classof$4 = classof$9;
  var getMethod$1 = getMethod$5;
  var Iterators$3 = iterators;
  var wellKnownSymbol$b = wellKnownSymbol$l;
  var ITERATOR$4 = wellKnownSymbol$b('iterator');
  var getIteratorMethod$3 = function (it) {
    if (it != undefined) return getMethod$1(it, ITERATOR$4) || getMethod$1(it, '@@iterator') || Iterators$3[classof$4(it)];
  };
  var global$f = global$N;
  var call$4 = functionCall;
  var aCallable$1 = aCallable$4;
  var anObject$3 = anObject$f;
  var tryToString$2 = tryToString$4;
  var getIteratorMethod$2 = getIteratorMethod$3;
  var TypeError$9 = global$f.TypeError;
  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$1(iteratorMethod)) return anObject$3(call$4(iteratorMethod, argument));
    throw TypeError$9(tryToString$2(argument) + ' is not iterable');
  };
  var global$e = global$N;
  var bind$2 = functionBindContext;
  var call$3 = functionCall;
  var toObject$4 = toObject$7;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var isConstructor$2 = isConstructor$4;
  var lengthOfArrayLike$5 = lengthOfArrayLike$8;
  var createProperty$3 = createProperty$4;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var Array$2 = global$e.Array; // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject$4(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$2(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value; // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array$2 && isArrayIteratorMethod$1(iteratorMethod))) {
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (; !(step = call$3(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$3(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$5(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$2(length);
      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$3(result, index, value);
      }
    }
    result.length = index;
    return result;
  };
  var wellKnownSymbol$a = wellKnownSymbol$l;
  var ITERATOR$3 = wellKnownSymbol$a('iterator');
  var SAFE_CLOSING = false;
  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return {
          done: !!called++
        };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$3] = function () {
      return this;
    }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }
  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$3] = function () {
        return {
          next: function () {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };
  var $$c = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration$1(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  }); // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$c({
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    from: from
  });
  var fails$7 = fails$n;
  var correctPrototypeGetter = !fails$7(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });
  var global$d = global$N;
  var hasOwn$3 = hasOwnProperty_1;
  var isCallable$3 = isCallable$i;
  var toObject$3 = toObject$7;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$1 = global$d.Object;
  var ObjectPrototype = Object$1.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
    var object = toObject$3(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$3(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }
    return object instanceof Object$1 ? ObjectPrototype : null;
  };
  var fails$6 = fails$n;
  var isCallable$2 = isCallable$i;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var redefine$6 = redefine$b.exports;
  var wellKnownSymbol$9 = wellKnownSymbol$l;
  var ITERATOR$2 = wellKnownSymbol$9('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }
  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$6(function () {
    var test = {}; // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$2(IteratorPrototype$2[ITERATOR$2])) {
    redefine$6(IteratorPrototype$2, ITERATOR$2, function () {
      return this;
    });
  }
  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };
  var defineProperty$3 = objectDefineProperty.f;
  var hasOwn$2 = hasOwnProperty_1;
  var wellKnownSymbol$8 = wellKnownSymbol$l;
  var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');
  var setToStringTag$3 = function (it, TAG, STATIC) {
    if (it && !hasOwn$2(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
      defineProperty$3(it, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG
      });
    }
  };
  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$2 = setToStringTag$3;
  var Iterators$2 = iterators;
  var returnThis$1 = function () {
    return this;
  };
  var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next)
    });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };
  var $$b = _export;
  var call$2 = functionCall;
  var FunctionName = functionName;
  var isCallable$1 = isCallable$i;
  var createIteratorConstructor$1 = createIteratorConstructor$2;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$3;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
  var redefine$5 = redefine$b.exports;
  var wellKnownSymbol$7 = wellKnownSymbol$l;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;
  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$7('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';
  var returnThis = function () {
    return this;
  };
  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next);
    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };
    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$1(CurrentIteratorPrototype[ITERATOR$1])) {
            redefine$5(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        } // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() {
          return call$2(nativeIterator, this);
        };
      }
    } // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$5(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$b({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    } // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      redefine$5(IterablePrototype, ITERATOR$1, defaultIterator, {
        name: DEFAULT
      });
    }
    Iterators$1[NAME] = defaultIterator;
    return methods;
  };
  var charAt = stringMultibyte.charAt;
  var toString$2 = toString$a;
  var InternalStateModule$3 = internalState;
  var defineIterator$2 = defineIterator$3;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$2 = InternalStateModule$3.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$2(String, 'String', function (iterated) {
    setInternalState$3(this, {
      type: STRING_ITERATOR,
      string: toString$2(iterated),
      index: 0
    }); // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  });
  var global$c = global$N;
  var isConstructor$1 = isConstructor$4;
  var tryToString$1 = tryToString$4;
  var TypeError$8 = global$c.TypeError; // `Assert: IsConstructor(argument) is true`
  var aConstructor$1 = function (argument) {
    if (isConstructor$1(argument)) return argument;
    throw TypeError$8(tryToString$1(argument) + ' is not a constructor');
  };
  var anObject$2 = anObject$f;
  var aConstructor = aConstructor$1;
  var wellKnownSymbol$6 = wellKnownSymbol$l;
  var SPECIES$2 = wellKnownSymbol$6('species'); // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$2(O).constructor;
    var S;
    return C === undefined || (S = anObject$2(C)[SPECIES$2]) == undefined ? defaultConstructor : aConstructor(S);
  };
  /* eslint-disable es/no-string-prototype-matchall -- safe */
  var $$a = _export;
  var global$b = global$N;
  var call$1 = functionCall;
  var uncurryThis$6 = functionUncurryThis;
  var createIteratorConstructor = createIteratorConstructor$2;
  var requireObjectCoercible = requireObjectCoercible$7;
  var toLength = toLength$3;
  var toString$1 = toString$a;
  var anObject$1 = anObject$f;
  var classof$3 = classofRaw$1;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var isRegExp = isRegexp;
  var regExpFlags = regexpFlags$1;
  var getMethod = getMethod$5;
  var redefine$4 = redefine$b.exports;
  var fails$5 = fails$n;
  var wellKnownSymbol$5 = wellKnownSymbol$l;
  var speciesConstructor = speciesConstructor$1;
  var advanceStringIndex = advanceStringIndex$2;
  var regExpExec = regexpExecAbstract;
  var InternalStateModule$2 = internalState;
  var IS_PURE = isPure;
  var MATCH_ALL = wellKnownSymbol$5('matchAll');
  var REGEXP_STRING = 'RegExp String';
  var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$1 = InternalStateModule$2.getterFor(REGEXP_STRING_ITERATOR);
  var RegExpPrototype = RegExp.prototype;
  var TypeError$7 = global$b.TypeError;
  var getFlags = uncurryThis$6(regExpFlags);
  var stringIndexOf = uncurryThis$6(''.indexOf);
  var un$MatchAll = uncurryThis$6(''.matchAll);
  var WORKS_WITH_NON_GLOBAL_REGEX = !!un$MatchAll && !fails$5(function () {
    un$MatchAll('a', /./);
  });
  var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
    setInternalState$2(this, {
      type: REGEXP_STRING_ITERATOR,
      regexp: regexp,
      string: string,
      global: $global,
      unicode: fullUnicode,
      done: false
    });
  }, REGEXP_STRING, function next() {
    var state = getInternalState$1(this);
    if (state.done) return {
      value: undefined,
      done: true
    };
    var R = state.regexp;
    var S = state.string;
    var match = regExpExec(R, S);
    if (match === null) return {
      value: undefined,
      done: state.done = true
    };
    if (state.global) {
      if (toString$1(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
      return {
        value: match,
        done: false
      };
    }
    state.done = true;
    return {
      value: match,
      done: false
    };
  });
  var $matchAll = function (string) {
    var R = anObject$1(this);
    var S = toString$1(string);
    var C, flagsValue, flags, matcher, $global, fullUnicode;
    C = speciesConstructor(R, RegExp);
    flagsValue = R.flags;
    if (flagsValue === undefined && isPrototypeOf$3(RegExpPrototype, R) && !('flags' in RegExpPrototype)) {
      flagsValue = getFlags(R);
    }
    flags = flagsValue === undefined ? '' : toString$1(flagsValue);
    matcher = new C(C === RegExp ? R.source : R, flags);
    $global = !!~stringIndexOf(flags, 'g');
    fullUnicode = !!~stringIndexOf(flags, 'u');
    matcher.lastIndex = toLength(R.lastIndex);
    return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
  }; // `String.prototype.matchAll` method
  // https://tc39.es/ecma262/#sec-string.prototype.matchall
  $$a({
    target: 'String',
    proto: true,
    forced: WORKS_WITH_NON_GLOBAL_REGEX
  }, {
    matchAll: function matchAll(regexp) {
      var O = requireObjectCoercible(this);
      var flags, S, matcher, rx;
      if (regexp != null) {
        if (isRegExp(regexp)) {
          flags = toString$1(requireObjectCoercible('flags' in RegExpPrototype ? regexp.flags : getFlags(regexp)));
          if (!~stringIndexOf(flags, 'g')) throw TypeError$7('`.matchAll` does not allow non-global regexes');
        }
        if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
        matcher = getMethod(regexp, MATCH_ALL);
        if (matcher === undefined && IS_PURE && classof$3(regexp) == 'RegExp') matcher = $matchAll;
        if (matcher) return call$1(matcher, regexp, O);
      } else if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
      S = toString$1(O);
      rx = new RegExp(regexp, 'g');
      return rx[MATCH_ALL](S);
    }
  });
  MATCH_ALL in RegExpPrototype || redefine$4(RegExpPrototype, MATCH_ALL, $matchAll);
  var fails$4 = fails$n;
  var wellKnownSymbol$4 = wellKnownSymbol$l;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$4('species');
  var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$4(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return {
          foo: 1
        };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };
  var $$9 = _export;
  var global$a = global$N;
  var fails$3 = fails$n;
  var isArray$2 = isArray$4;
  var isObject$3 = isObject$c;
  var toObject$2 = toObject$7;
  var lengthOfArrayLike$4 = lengthOfArrayLike$8;
  var createProperty$2 = createProperty$4;
  var arraySpeciesCreate$1 = arraySpeciesCreate$3;
  var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
  var wellKnownSymbol$3 = wellKnownSymbol$l;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$3('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$6 = global$a.TypeError; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$3(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$4('concat');
  var isConcatSpreadable = function (O) {
    if (!isObject$3(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$2(O);
  };
  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$9({
    target: 'Array',
    proto: true,
    forced: FORCED
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$2(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$4(E);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$2(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });
  var global$9 = global$N;
  var aCallable = aCallable$4;
  var toObject$1 = toObject$7;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$3 = lengthOfArrayLike$8;
  var TypeError$5 = global$9.TypeError; // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable(callbackfn);
      var O = toObject$1(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$3(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError$5('Reduce of empty array with no initial value');
        }
      }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };
  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod(true)
  };
  var classof$2 = classofRaw$1;
  var global$8 = global$N;
  var engineIsNode = classof$2(global$8.process) == 'process';
  var $$8 = _export;
  var $reduce = arrayReduce.left;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
  var CHROME_VERSION = engineV8Version;
  var IS_NODE = engineIsNode;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce'); // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83; // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  $$8({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$1 || CHROME_BUG
  }, {
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      var length = arguments.length;
      return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
  });
  /* eslint-disable es/no-array-prototype-indexof -- required for testing */
  var $$7 = _export;
  var uncurryThis$5 = functionUncurryThis;
  var $IndexOf = arrayIncludes.indexOf;
  var arrayMethodIsStrict = arrayMethodIsStrict$4;
  var un$IndexOf = uncurryThis$5([].indexOf);
  var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict('indexOf'); // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  $$7({
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || !STRICT_METHOD
  }, {
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0 : $IndexOf(this, searchElement, fromIndex);
    }
  });
  var uncurryThis$4 = functionUncurryThis;
  var arraySlice$2 = uncurryThis$4([].slice);
  var $$6 = _export;
  var global$7 = global$N;
  var isArray$1 = isArray$4;
  var isConstructor = isConstructor$4;
  var isObject$2 = isObject$c;
  var toAbsoluteIndex$1 = toAbsoluteIndex$3;
  var lengthOfArrayLike$2 = lengthOfArrayLike$8;
  var toIndexedObject$2 = toIndexedObject$8;
  var createProperty$1 = createProperty$4;
  var wellKnownSymbol$2 = wellKnownSymbol$l;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
  var un$Slice = arraySlice$2;
  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('slice');
  var SPECIES = wellKnownSymbol$2('species');
  var Array$1 = global$7.Array;
  var max$1 = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$6({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$3
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$2(this);
      var length = lengthOfArrayLike$2(O);
      var k = toAbsoluteIndex$1(start, length);
      var fin = toAbsoluteIndex$1(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$1(O)) {
        Constructor = O.constructor; // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$1(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$2(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
      result.length = n;
      return result;
    }
  });
  function getColumn(matrix, column) {
    column = column == 'first' ? 0 : column == 'last' ? matrix[0].length - 1 : column;
    return matrix.reduce(function (a, b) {
      return a.concat(b[column]);
    }, []);
  }
  function trim$1(x) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;
    return parseFloat(x.toFixed(precision));
  }
  function testVariable(variable, prefixes) {
    var regex = new RegExp("[".concat(prefixes.join(''), "]\\d+"), 'i');
    return variable.match(regex) != null;
  }
  function testRegex(input, testRegex, type) {
    var regex = /\b(?:\d*\.*\d*)([a|e|s]{1}\d*)\b/g;
    var badVariables = Array.from(input.matchAll(regex), function (d) {
      return d[1];
    }).join(', ');
    var match = input.match(testRegex);
    if (match != null && badVariables == '') return true;
    if (match == null) console.error("The ".concat(type, " ").concat(input, " is not in the proper format for an ").concat(type, " statement."));
    if (badVariables != '') console.error("The following variable(s) are reserved: ".concat(badVariables, "."));
    return false;
  }
  function multipleSolutionTest(model, variables, basicVariables, nonBasicVariables) {
    var primaryNonBasicVariables = nonBasicVariables.reduce(function (a, b) {
      return testVariable(b, ['s', 'e', 'a']) == false ? a.concat(variables.indexOf(b)) : a;
    }, []);
    if (primaryNonBasicVariables.length == 0) return false;
    var pivotColumns = [];
    primaryNonBasicVariables.forEach(function (index) {
      var column = getColumn(model, index);
      if (trim$1(column.slice(-1)[0]) == 0 & column.some(function (d) {
        return trim$1(d) > 0;
      })) {
        pivotColumns.push(index);
      }
    });
    return pivotColumns.length > 0 ? true : false;
  }
  var wellKnownSymbol$1 = wellKnownSymbol$l;
  var create$1 = objectCreate;
  var definePropertyModule = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$1('unscopables');
  var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  } // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };
  var toIndexedObject$1 = toIndexedObject$8;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
  var InternalStateModule$1 = internalState;
  var defineIterator$1 = defineIterator$3;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState = InternalStateModule$1.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$1(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind
    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }
    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators.Arguments = Iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$1 = classof$9; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$1(this) + ']';
  };
  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$3 = redefine$b.exports;
  var toString = objectToString; // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$3(Object.prototype, 'toString', toString, {
      unsafe: true
    });
  }
  var internalMetadata = {exports: {}};
  var objectGetOwnPropertyNamesExternal = {};
  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof = classofRaw$1;
  var toIndexedObject = toIndexedObject$8;
  var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var arraySlice$1 = arraySlice$2;
  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames(it);
    } catch (error) {
      return arraySlice$1(windowNames);
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject(it));
  };
  var fails$2 = fails$n;
  var freezing = !fails$2(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });
  var $$5 = _export;
  var uncurryThis$3 = functionUncurryThis;
  var hiddenKeys = hiddenKeys$5;
  var isObject$1 = isObject$c;
  var hasOwn$1 = hasOwnProperty_1;
  var defineProperty$2 = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var uid = uid$3;
  var FREEZING = freezing;
  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0; // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var setMetadata = function (it) {
    defineProperty$2(it, METADATA, {
      value: {
        objectID: 'O' + id++,
        // object ID
        weakData: {} // weak collections IDs
      }
    });
  };
  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!hasOwn$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata
      if (!create) return 'E'; // add missing metadata
      setMetadata(it); // return object ID
    }
    return it[METADATA].objectID;
  };
  var getWeakData = function (it, create) {
    if (!hasOwn$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata
      if (!create) return false; // add missing metadata
      setMetadata(it); // return the store of weak collections IDs
    }
    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$1(it, METADATA)) setMetadata(it);
    return it;
  };
  var enable = function () {
    meta.enable = function () {
      /* empty */
    };
    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$3([].splice);
    var test = {};
    test[METADATA] = 1; // prevent exposing of metadata key
    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);
        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        }
        return result;
      };
      $$5({
        target: 'Object',
        stat: true,
        forced: true
      }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };
  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
  var global$6 = global$N;
  var bind$1 = functionBindContext;
  var call = functionCall;
  var anObject = anObject$f;
  var tryToString = tryToString$4;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var lengthOfArrayLike$1 = lengthOfArrayLike$8;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;
  var iteratorClose = iteratorClose$2;
  var TypeError$4 = global$6.TypeError;
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };
  var ResultPrototype = Result.prototype;
  var iterate$2 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$1(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;
    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };
    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };
    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw TypeError$4(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$2(ResultPrototype, result)) return result;
        }
        return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }
    next = iterator.next;
    while (!(step = call(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf$2(ResultPrototype, result)) return result;
    }
    return new Result(false);
  };
  var global$5 = global$N;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var TypeError$3 = global$5.TypeError;
  var anInstance$2 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw TypeError$3('Incorrect invocation');
  };
  var $$4 = _export;
  var global$4 = global$N;
  var uncurryThis$2 = functionUncurryThis;
  var isForced$1 = isForced_1;
  var redefine$2 = redefine$b.exports;
  var InternalMetadataModule = internalMetadata.exports;
  var iterate$1 = iterate$2;
  var anInstance$1 = anInstance$2;
  var isCallable = isCallable$i;
  var isObject = isObject$c;
  var fails$1 = fails$n;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var setToStringTag = setToStringTag$3;
  var inheritIfRequired$1 = inheritIfRequired$3;
  var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$4[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};
    var fixMethod = function (KEY) {
      var uncurriedNativeMethod = uncurryThis$2(NativePrototype[KEY]);
      redefine$2(NativePrototype, KEY, KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      });
    };
    var REPLACE = isForced$1(CONSTRUCTOR_NAME, !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$1(function () {
      new NativeConstructor().entries().next();
    })));
    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else if (isForced$1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor(); // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$1(function () {
        instance.has(1);
      }); // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      }); // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$1(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });
      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$1(dummy, NativePrototype);
          var that = inheritIfRequired$1(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate$1(iterable, that[ADDER], {
            that: that,
            AS_ENTRIES: IS_MAP
          });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }
      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }
    exported[CONSTRUCTOR_NAME] = Constructor;
    $$4({
      global: true,
      forced: Constructor != NativeConstructor
    }, exported);
    setToStringTag(Constructor, CONSTRUCTOR_NAME);
    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };
  var redefine$1 = redefine$b.exports;
  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$1(target, key, src[key], options);
    return target;
  };
  var defineProperty$1 = objectDefineProperty.f;
  var create = objectCreate;
  var redefineAll = redefineAll$1;
  var bind = functionBindContext;
  var anInstance = anInstance$2;
  var iterate = iterate$2;
  var defineIterator = defineIterator$3;
  var setSpecies = setSpecies$2;
  var DESCRIPTORS$1 = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule = internalState;
  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;
  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS$1) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
      });
      var Prototype = Constructor.prototype;
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index; // change existing entry
        if (entry) {
          entry.value = value; // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS$1) state.size++;else that.size++; // add to index
          if (index !== 'F') state.index[index] = entry;
        }
        return that;
      };
      var getEntry = function (that, key) {
        var state = getInternalState(that); // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index]; // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };
      redefineAll(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS$1) state.size = 0;else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS$1) state.size--;else that.size--;
          }
          return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this); // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      redefineAll(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS$1) defineProperty$1(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous; // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind
        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };
  var collection = collection$1;
  var collectionStrong = collectionStrong$1; // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection('Set', function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong);
  var global$3 = global$N;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty = createNonEnumerableProperty$8;
  var wellKnownSymbol = wellKnownSymbol$l;
  var ITERATOR = wellKnownSymbol('iterator');
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;
  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };
  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(global$3[COLLECTION_NAME] && global$3[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }
  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
  var $$3 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map'); // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$3({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$2
  }, {
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  var DESCRIPTORS = descriptors;
  var global$2 = global$N;
  var uncurryThis$1 = functionUncurryThis;
  var isForced = isForced_1;
  var redefine = redefine$b.exports;
  var hasOwn = hasOwnProperty_1;
  var inheritIfRequired = inheritIfRequired$3;
  var isPrototypeOf = objectIsPrototypeOf;
  var isSymbol = isSymbol$3;
  var toPrimitive = toPrimitive$2;
  var fails = fails$n;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var defineProperty = objectDefineProperty.f;
  var thisNumberValue = thisNumberValue$2;
  var trim = stringTrim.trim;
  var NUMBER = 'Number';
  var NativeNumber = global$2[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError$2 = global$2.TypeError;
  var arraySlice = uncurryThis$1(''.slice);
  var charCodeAt = uncurryThis$1(''.charCodeAt); // `ToNumeric` abstract operation
  // https://tc39.es/ecma262/#sec-tonumeric
  var toNumeric = function (value) {
    var primValue = toPrimitive(value, 'number');
    return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
  }; // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, 'number');
    var first, third, radix, maxCode, digits, length, index, code;
    if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = charCodeAt(it, 0);
      if (first === 43 || first === 45) {
        third = charCodeAt(it, 2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (charCodeAt(it, 1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal of /^0b[01]+$/i
          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          // fast equal of /^0o[0-7]+$/i
          default:
            return +it;
        }
        digits = arraySlice(it, 2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = charCodeAt(digits, index); // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        }
        return parseInt(digits, radix);
      }
    }
    return +it;
  }; // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
      var dummy = this; // check on 1..constructor(foo) case
      return isPrototypeOf(NumberPrototype, dummy) && fails(function () {
        thisNumberValue(dummy);
      }) ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
    };
    for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : ( // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' + // ESNext
    'fromString,range').split(','), j = 0, key; keys.length > j; j++) {
      if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
        defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global$2, NUMBER, NumberWrapper);
  }
  function parseModel(objective, constraints) {
    if (objective == '' | constraints.length == 0) return [[], '', ''];
    var modelVariables = [];
    var modelCoeficients = [];
    var modelConstraints = [];
    var modelEqualities = [];
    var objectiveRegex = /(max|min)(?:.*\s*)(\w)(?:\s*=) ((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)/i;
    var constraintRegex = /((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)\s*(=|<=|>=)\s*(\d+)/i;
    if (testRegex(objective, objectiveRegex, 'objective') == false) return [[], '', ''];
    var constraintTest = constraints.every(function (x) {
      return testRegex(x, constraintRegex, 'constraint');
    });
    if (constraintTest == false) {
      return [[], '', ''];
    }
    var _objective$match = objective.match(objectiveRegex),
        _objective$match2 = _slicedToArray(_objective$match, 4);
        _objective$match2[0];
        var type = _objective$match2[1],
        objectiveVariable = _objective$match2[2],
        objectiveEquation = _objective$match2[3];
    type = type.toLowerCase();
    var _parseEquation = parseEquation(objectiveEquation),
        _parseEquation2 = _slicedToArray(_parseEquation, 2),
        objectiveCoeficients = _parseEquation2[0],
        objectiveVariables = _parseEquation2[1];
    constraints.forEach(function (d) {
      var _d$match = d.match(constraintRegex),
          _d$match2 = _slicedToArray(_d$match, 4);
          _d$match2[0];
          var equation = _d$match2[1],
          equality = _d$match2[2],
          constraint = _d$match2[3];
      modelConstraints.push(parseFloat(constraint));
      modelEqualities.push(equality);
      var _parseEquation3 = parseEquation(equation),
          _parseEquation4 = _slicedToArray(_parseEquation3, 2),
          constraintCoeficients = _parseEquation4[0],
          constraintVariables = _parseEquation4[1];
      modelVariables.push(constraintVariables);
      modelCoeficients.push(constraintCoeficients);
    });
    modelVariables.push(objectiveVariables);
    modelCoeficients.push(objectiveCoeficients);
    modelConstraints.push(0);
    var _buildTableau = buildTableau(modelVariables, modelCoeficients, modelConstraints, modelEqualities, objectiveVariable),
        _buildTableau2 = _slicedToArray(_buildTableau, 2),
        model = _buildTableau2[0],
        variables = _buildTableau2[1];
    return [model, variables, type];
  }
  function parseEquation(equation) {
    var elementRegex = /\s*[+-]?\s*\d*\.*\d*\w\d*/g;
    /* group 1 = sign; group 2 = coefficient; group 3 = variable */
    var coeficentRegex = /\s*([+-]?)\s*(\d*\.*\d*)(\w\d*)/;
    var coeficients = [];
    var variables = [];
    var elements = _toConsumableArray(equation.matchAll(elementRegex));
    elements.forEach(function (element) {
      var _element$0$match = element[0].match(coeficentRegex),
          _element$0$match2 = _slicedToArray(_element$0$match, 4);
          _element$0$match2[0];
          var sign = _element$0$match2[1],
          coeficient = _element$0$match2[2],
          variable = _element$0$match2[3];
      coeficient = coeficient == '' ? 1 : coeficient;
      coeficients.push(parseFloat(sign + coeficient));
      variables.push(variable);
    });
    return [coeficients, variables];
  }
  function buildTableau(variables, coeficients, constraints, equalities, objectiveVariable, type) {
    var model = [];
    var uniqueVariables = _toConsumableArray(new Set(variables.reduce(function (a, b) {
      return a.concat(b);
    }, [])));
    coeficients.forEach(function (coeficient, row) {
      var tmp = Array.apply(null, Array(uniqueVariables.length)).map(Number.prototype.valueOf, 0);
      coeficient.forEach(function (item, index) {
        var pos = uniqueVariables.indexOf(variables[row][index]);
        tmp[pos] = row == coeficients.length - 1 ? -item : item;
      });
      model.push(tmp);
    });
    var slackVariableCount = equalities.reduce(function (a, b) {
      return b == '<=' ? ++a : a;
    }, 0);
    var extraVariableCount = equalities.reduce(function (a, b) {
      return b == '>=' ? ++a : a;
    }, 0);
    var alternateVariableCount = equalities.reduce(function (a, b) {
      return b == '>=' || b == '=' ? ++a : a;
    }, 0);
    for (var i = 0; i < slackVariableCount; i++) {
      uniqueVariables.push('s' + i);
    }
    for (var _i = 0; _i < extraVariableCount; _i++) {
      uniqueVariables.push('e' + _i);
    }
    for (var _i2 = 0; _i2 < alternateVariableCount; _i2++) {
      uniqueVariables.push('a' + _i2);
    }
    uniqueVariables.push(objectiveVariable);
    var totalNewVariableCount = uniqueVariables.length - model[0].length;
    var tmp = Array.apply(null, Array(totalNewVariableCount)).map(Number.prototype.valueOf, 0);
    model.forEach(function (row) {
      row.push.apply(row, _toConsumableArray(tmp));
    });
    var lePositions = equalities.reduce(function (a, b, i) {
      return b == '<=' ? a.concat(i) : a;
    }, []);
    lePositions.forEach(function (row, index) {
      var column = uniqueVariables.indexOf('s' + index);
      model[row][column] = 1;
    });
    var aPositions = equalities.reduce(function (a, b, i) {
      return b == '>=' || b == '=' ? a.concat(i) : a;
    }, []);
    aPositions.forEach(function (row, index) {
      var column = uniqueVariables.indexOf('a' + index);
      model[row][column] = 1;
    });
    var gePositions = equalities.reduce(function (a, b, i) {
      return b == '>=' ? a.concat(i) : a;
    }, []);
    gePositions.forEach(function (row, index) {
      var column = uniqueVariables.indexOf('e' + index);
      model[row][column] = -1;
    });
    model.forEach(function (row, index) {
      row[row.length - 1] = constraints[index];
    });
    return [model, uniqueVariables];
  }
  var $$2 = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter'); // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$2({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1
  }, {
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  function getPivot(model, variables, basicVariables, nonBasicVariables, type) {
    var pivotColumn;
    var pivotRow = null;
    var minRatio = Number.MAX_VALUE;
    var rowCount = model.length;
    var columnCount = model[0].length;
    var pivotRows = [];
    var objectiveValues = model[rowCount - 1].slice(0, -1).reduce(function (a, b, i) {
      return nonBasicVariables.indexOf(variables[i]) != -1 ? a.concat(b) : a;
    }, []);
    objectiveValues = type == 'max' ? objectiveValues.filter(function (d) {
      return trim$1(d) < 0;
    }) : objectiveValues.filter(function (d) {
      return trim$1(d) > 0;
    });
    if (objectiveValues.length == 0) {
      var test = multipleSolutionTest(model, variables, basicVariables, nonBasicVariables);
      return test == false ? 'solved' : 'multiple solutions';
    } else {
      var objectiveValue = objectiveValues[0];
      /* Bland's rule to avoid cycling */
      pivotColumn = model[rowCount - 1].indexOf(objectiveValue);
    }
    minRatio = model.reduce(function (a, b, i) {
      if (trim$1(b[pivotColumn]) > 0 & i != rowCount - 1) {
        var ratio = b[columnCount - 1] / b[pivotColumn];
        return ratio < a ? ratio : a;
      }
      return a;
    }, minRatio);
    pivotRows = model.reduce(function (a, b, i) {
      if (trim$1(b[pivotColumn]) > 0 & i != rowCount - 1) {
        return b[b.length - 1] / b[pivotColumn] == minRatio ? a.concat(i) : a;
      }
      return a;
    }, []);
    switch (pivotRows.length) {
      case 0:
        return 'unbounded';
      case 1:
        pivotRow = pivotRows[0];
        break;
      default:
        pivotRows.forEach(function (row) {
          if (testVariable(basicVariables[row], ['a'])) pivotRow = row;
        });
    }
    pivotRow = pivotRow == null ? pivotRows[0] : pivotRow;
    return {
      row: pivotRow,
      column: pivotColumn
    };
  }
  function pivotModel(model, pivot) {
    var multiplier;
    var pivotValue = model[pivot.row][pivot.column];
    if (pivotValue != 1) {
      model[pivot.row].forEach(function (value, index) {
        model[pivot.row][index] = value / pivotValue;
      });
    }
    model.forEach(function (row, rowIndex) {
      if (rowIndex !== pivot.row && row[pivot.column] !== 0) {
        multiplier = -row[pivot.column];
        row.forEach(function (value, columnIndex) {
          model[rowIndex][columnIndex] = multiplier * model[pivot.row][columnIndex] + model[rowIndex][columnIndex];
        });
      }
    });
    return model;
  }
  var $$1 = _export;
  var uncurryThis = functionUncurryThis;
  var isArray = isArray$4;
  var un$Reverse = uncurryThis([].reverse);
  var test = [1, 2]; // `Array.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-array.prototype.reverse
  // fix for Safari 12.0 bug
  // https://bugs.webkit.org/show_bug.cgi?id=188794
  $$1({
    target: 'Array',
    proto: true,
    forced: String(test) === String(test.reverse())
  }, {
    reverse: function reverse() {
      // eslint-disable-next-line no-self-assign -- dirty hack
      if (isArray(this)) this.length = this.length;
      return un$Reverse(this);
    }
  });
  var $ = _export;
  var global$1 = global$N;
  var toAbsoluteIndex = toAbsoluteIndex$3;
  var toIntegerOrInfinity = toIntegerOrInfinity$6;
  var lengthOfArrayLike = lengthOfArrayLike$8;
  var toObject = toObject$7;
  var arraySpeciesCreate = arraySpeciesCreate$3;
  var createProperty = createProperty$4;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
  var TypeError$1 = global$1.TypeError;
  var max = Math.max;
  var min = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    splice: function splice(start, deleteCount
    /* , ...items */
    ) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError$1(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });
  function buildPhaseTwoTableau(model, variables) {
    var objectiveRow = [];
    var alternativeRows = [];
    var phaseTwoTableau = [];
    model.forEach(function (row) {
      phaseTwoTableau.push(row);
    });
    variables.forEach(function (variable) {
      objectiveRow.push(testVariable(variable, ['a']) ? -1 : 0);
    });
    phaseTwoTableau.forEach(function (row) {
      for (var index = 0; index < row.length; index++) {
        if (testVariable(variables[index], ['a']) && row[index] == 1) {
          alternativeRows.push(row);
          break;
        }
      }
    });
    alternativeRows.forEach(function (row) {
      row.forEach(function (item, index) {
        objectiveRow[index] += item;
      });
    });
    phaseTwoTableau.push(objectiveRow);
    return phaseTwoTableau;
  }
  function reBaseModel(model, variables, basicVariables) {
    var objectiveRow = model[model.length - 1];
    var changedRows = [];
    variables.forEach(function (variable, index) {
      var row = basicVariables.indexOf(variable);
      if (row != -1 && trim$1(objectiveRow[index]) != 0) {
        changedRows.push(model[row].map(function (item) {
          return item * -objectiveRow[index];
        }));
      }
    });
    changedRows.forEach(function (row) {
      row.forEach(function (item, index) {
        model[model.length - 1][index] += item;
      });
    });
    return model;
  }
  function cleanPhaseTwoTableau(model, objective, variables, basicVariables, nonBasicVariables) {
    var lastRow = model.length - 1;
    var lastColumn = model[0].length - 1;
    if (trim$1(model[lastRow][lastColumn]) > 0) {
      return [model, 'infeasible'];
    }
    model.push(objective);
    var columnsToRemove = variables.reduce(function (a, b, i) {
      return testVariable(b, ['a']) && basicVariables.indexOf(b) == -1 ? a.concat(i) : a;
    }, []).reverse();
    model.forEach(function (row) {
      columnsToRemove.forEach(function (column) {
        row.splice(column, 1);
      });
    });
    basicVariables.reduce(function (a, b) {
      return testVariable(b, ['a']) ? ++a : a;
    }, 0);
    model.splice(lastRow, 1)[0];
    columnsToRemove.forEach(function (column) {
      variables.splice(column, 1);
    });
    var indexes = nonBasicVariables.reduce(function (a, b, i) {
      return testVariable(b, ['a']) ? a.concat(i) : a;
    }, []).reverse();
    indexes.forEach(function (index) {
      nonBasicVariables.splice(index, 1);
    });
    model = reBaseModel(model, variables, basicVariables);
    return [model, ''];
  }
  function getVariables(model, variables) {
    var prefixCodes = ['s', 'a'];
    var basicVariableCount = variables.reduce(function (a, b) {
      return testVariable(b, prefixCodes) ? ++a : a;
    }, 0);
    var lastRow = model.length - 1;
    var zPrefix = variables[variables.length - 1];
    var basicVariables = new Array(basicVariableCount);
    var nonBasicVariables = [];
    model.forEach(function (row, index) {
      row.forEach(function (item, column) {
        var isValidColumn = testVariable(variables[column], prefixCodes);
        var isZcolumn = variables[column] == zPrefix && index == lastRow;
        if (item == 1 && isValidColumn || isZcolumn) {
          basicVariables[index] = variables[column];
        }
      });
    });
    variables.forEach(function (variable) {
      if (basicVariables.indexOf(variable) == -1) nonBasicVariables.push(variable);
    });
    return {
      basicVariables: basicVariables,
      nonBasicVariables: nonBasicVariables
    };
  }
  function swapVariables(pivot, variables, basicVariables, nonBasicVariables) {
    var tmpVariable = basicVariables[pivot.row];
    basicVariables[pivot.row] = variables[pivot.column];
    nonBasicVariables[nonBasicVariables.indexOf(variables[pivot.column])] = tmpVariable;
    return {
      basicVariables: basicVariables,
      nonBasicVariables: nonBasicVariables
    };
  }
  function buildSolution(model, basicVariables, nonBasicVariables, result) {
    var solution = [];
    var lastColumn = model[0].length - 1;
    for (var i = 0; i < basicVariables.length; i++) {
      solution.push([basicVariables[i], trim$1(model[i][lastColumn])]);
    }
    return {
      solution: solution,
      result: result
    };
  }
  function executeSimplex(model, variables, basicVariables, nonBasicVariables, type) {
    var pivot;
    while (true) {
      pivot = getPivot(model, variables, basicVariables, nonBasicVariables, type);
      switch (pivot) {
        case 'solved':
        case 'multiple solutions':
        case 'unbounded':
          return [model, pivot];
      }
      model = pivotModel(model, pivot);
      var _swapVariables = swapVariables(pivot, variables, basicVariables, nonBasicVariables);
      basicVariables = _swapVariables.basicVariables;
      nonBasicVariables = _swapVariables.nonBasicVariables;
    }
  }
  function simplex(objective, constraints) {
    var _parseModel = parseModel(objective, constraints),
        _parseModel2 = _slicedToArray(_parseModel, 3),
        model = _parseModel2[0],
        variables = _parseModel2[1],
        type = _parseModel2[2];
    if (model.length == 0) return {
      solution: [],
      result: ''
    };
    var tableau;
    var result;
    model.forEach(function (row) {
      /* ensure rhs is positive */
      if (row[row.length - 1] < 0) {
        row.forEach(function (item) {
        });
      }
    });
    var _getVariables = getVariables(model, variables),
        basicVariables = _getVariables.basicVariables,
        nonBasicVariables = _getVariables.nonBasicVariables;
    var isTwoPhase = variables.some(function (variable) {
      return testVariable(variable, ['a']);
    });
    if (isTwoPhase) {
      var originalObjective = model.pop();
      /* ignore the original objective function for now */
      tableau = buildPhaseTwoTableau(model, variables);
      var _executeSimplex = executeSimplex(tableau, variables, basicVariables, nonBasicVariables, 'min');
      var _executeSimplex2 = _slicedToArray(_executeSimplex, 2);
      tableau = _executeSimplex2[0];
      result = _executeSimplex2[1];
      if (result == 'unbounded') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
      var _cleanPhaseTwoTableau = cleanPhaseTwoTableau(tableau, originalObjective, variables, basicVariables, nonBasicVariables);
      var _cleanPhaseTwoTableau2 = _slicedToArray(_cleanPhaseTwoTableau, 2);
      tableau = _cleanPhaseTwoTableau2[0];
      result = _cleanPhaseTwoTableau2[1];
      if (result == 'infeasible') return buildSolution(tableau, basicVariables, nonBasicVariables, result);
      var _executeSimplex3 = executeSimplex(tableau, variables, basicVariables, nonBasicVariables, type);
      var _executeSimplex4 = _slicedToArray(_executeSimplex3, 2);
      tableau = _executeSimplex4[0];
      result = _executeSimplex4[1];
    } else {
      var _executeSimplex5 = executeSimplex(model, variables, basicVariables, nonBasicVariables, type);
      var _executeSimplex6 = _slicedToArray(_executeSimplex5, 2);
      tableau = _executeSimplex6[0];
      result = _executeSimplex6[1];
    }
    return buildSolution(tableau, basicVariables, nonBasicVariables, result);
  }
  exports.simplex = simplex;
  Object.defineProperty(exports, '__esModule', { value: true });
  return exports;
})({});
