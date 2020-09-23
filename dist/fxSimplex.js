var fxSimplex = function() {
    var commonjsGlobal = 'undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : {};
    function createCommonjsModule(fn, basedir, module) {
        return module = {
            path: basedir,
            exports: {},
            require: function(path, base) {
                return commonjsRequire(path, null == base ? module.path : base);
            }
        }, fn(module, module.exports), module.exports;
    }
    function commonjsRequire() {
        throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
    }
    var check = function(it) {
        return it && it.Math == Math && it;
    };
    var global_1 = check('object' == typeof globalThis && globalThis) || check('object' == typeof window && window) || check('object' == typeof self && self) || check('object' == typeof commonjsGlobal && commonjsGlobal) || Function('return this')();
    var fails = function(exec) {
        try {
            return !!exec();
        } catch (error) {
            return true;
        }
    };
    var descriptors = !fails((function() {
        return 7 != Object.defineProperty({}, 1, {
            get: function() {
                return 7;
            }
        })[1];
    }));
    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
        1: 2
    }, 1);
    var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;
    var objectPropertyIsEnumerable = {
        f: f
    };
    var createPropertyDescriptor = function(bitmap, value) {
        return {
            enumerable: !(1 & bitmap),
            configurable: !(2 & bitmap),
            writable: !(4 & bitmap),
            value: value
        };
    };
    var toString = {}.toString;
    var classofRaw = function(it) {
        return toString.call(it).slice(8, -1);
    };
    var split = ''.split;
    var indexedObject = fails((function() {
        return !Object('z').propertyIsEnumerable(0);
    })) ? function(it) {
        return 'String' == classofRaw(it) ? split.call(it, '') : Object(it);
    } : Object;
    var requireObjectCoercible = function(it) {
        if (null == it) {
            throw TypeError('Can\'t call method on ' + it);
        }
        return it;
    };
    var toIndexedObject = function(it) {
        return indexedObject(requireObjectCoercible(it));
    };
    var isObject = function(it) {
        return 'object' == typeof it ? null !== it : 'function' == typeof it;
    };
    var toPrimitive = function(input, PREFERRED_STRING) {
        if (!isObject(input)) {
            return input;
        }
        var fn, val;
        if (PREFERRED_STRING && 'function' == typeof (fn = input.toString) && !isObject(val = fn.call(input))) {
            return val;
        }
        if ('function' == typeof (fn = input.valueOf) && !isObject(val = fn.call(input))) {
            return val;
        }
        if (!PREFERRED_STRING && 'function' == typeof (fn = input.toString) && !isObject(val = fn.call(input))) {
            return val;
        }
        throw TypeError('Can\'t convert object to primitive value');
    };
    var hasOwnProperty = {}.hasOwnProperty;
    var has = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
    var document$1 = global_1.document;
    var EXISTS = isObject(document$1) && isObject(document$1.createElement);
    var documentCreateElement = function(it) {
        return EXISTS ? document$1.createElement(it) : {};
    };
    var ie8DomDefine = !descriptors && !fails((function() {
        return 7 != Object.defineProperty(documentCreateElement('div'), 'a', {
            get: function() {
                return 7;
            }
        }).a;
    }));
    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPrimitive(P, true);
        if (ie8DomDefine) {
            try {
                return nativeGetOwnPropertyDescriptor(O, P);
            } catch (error) {}
        }
        if (has(O, P)) {
            return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
        }
    };
    var objectGetOwnPropertyDescriptor = {
        f: f$1
    };
    var anObject = function(it) {
        if (!isObject(it)) {
            throw TypeError(String(it) + ' is not an object');
        }
        return it;
    };
    var nativeDefineProperty = Object.defineProperty;
    var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (ie8DomDefine) {
            try {
                return nativeDefineProperty(O, P, Attributes);
            } catch (error) {}
        }
        if ('get' in Attributes || 'set' in Attributes) {
            throw TypeError('Accessors not supported');
        }
        'value' in Attributes && (O[P] = Attributes.value);
        return O;
    };
    var objectDefineProperty = {
        f: f$2
    };
    var createNonEnumerableProperty = descriptors ? function(object, key, value) {
        return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
    var setGlobal = function(key, value) {
        try {
            createNonEnumerableProperty(global_1, key, value);
        } catch (error) {
            global_1[key] = value;
        }
        return value;
    };
    var SHARED = '__core-js_shared__';
    var store = global_1[SHARED] || setGlobal(SHARED, {});
    var sharedStore = store;
    var functionToString = Function.toString;
    'function' != typeof sharedStore.inspectSource && (sharedStore.inspectSource = function(it) {
        return functionToString.call(it);
    });
    var inspectSource = sharedStore.inspectSource;
    var WeakMap = global_1.WeakMap;
    var nativeWeakMap = 'function' == typeof WeakMap && /native code/.test(inspectSource(WeakMap));
    var isPure = false;
    var shared = createCommonjsModule((function(module) {
        (module.exports = function(key, value) {
            return sharedStore[key] || (sharedStore[key] = void 0 !== value ? value : {});
        })('versions', []).push({
            version: '3.6.5',
            mode: 'global',
            copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
        });
    }));
    var id = 0;
    var postfix = Math.random();
    var uid = function(key) {
        return 'Symbol(' + String(void 0 === key ? '' : key) + ')_' + (++id + postfix).toString(36);
    };
    var keys = shared('keys');
    var sharedKey = function(key) {
        return keys[key] || (keys[key] = uid(key));
    };
    var hiddenKeys = {};
    var WeakMap$1 = global_1.WeakMap;
    var set, get, has$1;
    var enforce = function(it) {
        return has$1(it) ? get(it) : set(it, {});
    };
    var getterFor = function(TYPE) {
        return function(it) {
            var state;
            if (!isObject(it) || (state = get(it)).type !== TYPE) {
                throw TypeError('Incompatible receiver, ' + TYPE + ' required');
            }
            return state;
        };
    };
    if (nativeWeakMap) {
        var store$1 = new WeakMap$1;
        var wmget = store$1.get;
        var wmhas = store$1.has;
        var wmset = store$1.set;
        set = function(it, metadata) {
            wmset.call(store$1, it, metadata);
            return metadata;
        };
        get = function(it) {
            return wmget.call(store$1, it) || {};
        };
        has$1 = function(it) {
            return wmhas.call(store$1, it);
        };
    } else {
        var STATE = sharedKey('state');
        hiddenKeys[STATE] = true;
        set = function(it, metadata) {
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
        };
        get = function(it) {
            return has(it, STATE) ? it[STATE] : {};
        };
        has$1 = function(it) {
            return has(it, STATE);
        };
    }
    var internalState = {
        set: set,
        get: get,
        has: has$1,
        enforce: enforce,
        getterFor: getterFor
    };
    var redefine = createCommonjsModule((function(module) {
        var getInternalState = internalState.get;
        var enforceInternalState = internalState.enforce;
        var TEMPLATE = String(String).split('String');
        (module.exports = function(O, key, value, options) {
            var unsafe = !!options && !!options.unsafe;
            var simple = !!options && !!options.enumerable;
            var noTargetGet = !!options && !!options.noTargetGet;
            if ('function' == typeof value) {
                'string' != typeof key || has(value, 'name') || createNonEnumerableProperty(value, 'name', key);
                enforceInternalState(value).source = TEMPLATE.join('string' == typeof key ? key : '');
            }
            if (O !== global_1) {
                unsafe ? !noTargetGet && O[key] && (simple = true) : delete O[key];
                simple ? O[key] = value : createNonEnumerableProperty(O, key, value);
            } else {
                simple ? O[key] = value : setGlobal(key, value);
            }
        })(Function.prototype, 'toString', (function toString() {
            return 'function' == typeof this && getInternalState(this).source || inspectSource(this);
        }));
    }));
    var path = global_1;
    var aFunction = function(variable) {
        return 'function' == typeof variable ? variable : void 0;
    };
    var getBuiltIn = function(namespace, method) {
        return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
    };
    var ceil = Math.ceil;
    var floor = Math.floor;
    var toInteger = function(argument) {
        return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };
    var min = Math.min;
    var toLength = function(argument) {
        return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
    };
    var max = Math.max;
    var min$1 = Math.min;
    var toAbsoluteIndex = function(index, length) {
        var integer = toInteger(index);
        return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
    };
    var createMethod = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = toLength(O.length);
            var index = toAbsoluteIndex(fromIndex, length);
            var value;
            if (IS_INCLUDES && el != el) {
                while (length > index) {
                    value = O[index++];
                    if (value != value) {
                        return true;
                    }
                }
            } else {
                for (;length > index; index++) {
                    if ((IS_INCLUDES || index in O) && O[index] === el) {
                        return IS_INCLUDES || index || 0;
                    }
                }
            }
            return !IS_INCLUDES && -1;
        };
    };
    var arrayIncludes = {
        includes: createMethod(true),
        indexOf: createMethod(false)
    };
    var indexOf = arrayIncludes.indexOf;
    var objectKeysInternal = function(object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) {
            !has(hiddenKeys, key) && has(O, key) && result.push(key);
        }
        while (names.length > i) {
            has(O, key = names[i++]) && (~indexOf(result, key) || result.push(key));
        }
        return result;
    };
    var enumBugKeys = [ 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf' ];
    var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');
    var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return objectKeysInternal(O, hiddenKeys$1);
    };
    var objectGetOwnPropertyNames = {
        f: f$3
    };
    var f$4 = Object.getOwnPropertySymbols;
    var objectGetOwnPropertySymbols = {
        f: f$4
    };
    var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
        var keys = objectGetOwnPropertyNames.f(anObject(it));
        var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
        return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };
    var copyConstructorProperties = function(target, source) {
        var keys = ownKeys(source);
        var defineProperty = objectDefineProperty.f;
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            has(target, key) || defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
    };
    var replacement = /#|\.prototype\./;
    var isForced = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL || value != NATIVE && ('function' == typeof detection ? fails(detection) : !!detection);
    };
    var normalize = isForced.normalize = function(string) {
        return String(string).replace(replacement, '.').toLowerCase();
    };
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';
    var isForced_1 = isForced;
    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var _export = function(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        target = GLOBAL ? global_1 : STATIC ? global_1[TARGET] || setGlobal(TARGET, {}) : (global_1[TARGET] || {}).prototype;
        if (target) {
            for (key in source) {
                sourceProperty = source[key];
                if (options.noTargetGet) {
                    descriptor = getOwnPropertyDescriptor$1(target, key);
                    targetProperty = descriptor && descriptor.value;
                } else {
                    targetProperty = target[key];
                }
                FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
                if (!FORCED && void 0 !== targetProperty) {
                    if (typeof sourceProperty == typeof targetProperty) {
                        continue;
                    }
                    copyConstructorProperties(sourceProperty, targetProperty);
                }
                (options.sham || targetProperty && targetProperty.sham) && createNonEnumerableProperty(sourceProperty, 'sham', true);
                redefine(target, key, sourceProperty, options);
            }
        }
    };
    var aFunction$1 = function(it) {
        if ('function' != typeof it) {
            throw TypeError(String(it) + ' is not a function');
        }
        return it;
    };
    var functionBindContext = function(fn, that, length) {
        aFunction$1(fn);
        if (void 0 === that) {
            return fn;
        }
        switch (length) {
          case 0:
            return function() {
                return fn.call(that);
            };

          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
    var toObject = function(argument) {
        return Object(requireObjectCoercible(argument));
    };
    var isArray = Array.isArray || function isArray(arg) {
        return 'Array' == classofRaw(arg);
    };
    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails((function() {
        return !String(Symbol());
    }));
    var useSymbolAsUid = nativeSymbol && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
    var WellKnownSymbolsStore = shared('wks');
    var Symbol$1 = global_1.Symbol;
    var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;
    var wellKnownSymbol = function(name) {
        has(WellKnownSymbolsStore, name) || (nativeSymbol && has(Symbol$1, name) ? WellKnownSymbolsStore[name] = Symbol$1[name] : WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name));
        return WellKnownSymbolsStore[name];
    };
    var SPECIES = wellKnownSymbol('species');
    var arraySpeciesCreate = function(originalArray, length) {
        var C;
        if (isArray(originalArray)) {
            C = originalArray.constructor;
            if ('function' != typeof C || C !== Array && !isArray(C.prototype)) {
                if (isObject(C)) {
                    C = C[SPECIES];
                    null === C && (C = void 0);
                }
            } else {
                C = void 0;
            }
        }
        return new (void 0 === C ? Array : C)(0 === length ? 0 : length);
    };
    var push = [].push;
    var createMethod$1 = function(TYPE) {
        var IS_MAP = 1 == TYPE;
        var IS_FILTER = 2 == TYPE;
        var IS_SOME = 3 == TYPE;
        var IS_EVERY = 4 == TYPE;
        var IS_FIND_INDEX = 6 == TYPE;
        var NO_HOLES = 5 == TYPE || IS_FIND_INDEX;
        return function($this, callbackfn, that, specificCreate) {
            var O = toObject($this);
            var self = indexedObject(O);
            var boundFunction = functionBindContext(callbackfn, that, 3);
            var length = toLength(self.length);
            var index = 0;
            var create = specificCreate || arraySpeciesCreate;
            var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
            var value, result;
            for (;length > index; index++) {
                if (NO_HOLES || index in self) {
                    value = self[index];
                    result = boundFunction(value, index, O);
                    if (TYPE) {
                        if (IS_MAP) {
                            target[index] = result;
                        } else if (result) {
                            switch (TYPE) {
                              case 3:
                                return true;

                              case 5:
                                return value;

                              case 6:
                                return index;

                              case 2:
                                push.call(target, value);
                            }
                        } else if (IS_EVERY) {
                            return false;
                        }
                    }
                }
            }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
    };
    var arrayIteration = {
        forEach: createMethod$1(0),
        map: createMethod$1(1),
        filter: createMethod$1(2),
        some: createMethod$1(3),
        every: createMethod$1(4),
        find: createMethod$1(5),
        findIndex: createMethod$1(6)
    };
    var arrayMethodIsStrict = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails((function() {
            method.call(null, argument || function() {
                throw 1;
            }, 1);
        }));
    };
    var defineProperty = Object.defineProperty;
    var cache = {};
    var thrower = function(it) {
        throw it;
    };
    var arrayMethodUsesToLength = function(METHOD_NAME, options) {
        if (has(cache, METHOD_NAME)) {
            return cache[METHOD_NAME];
        }
        options || (options = {});
        var method = [][METHOD_NAME];
        var ACCESSORS = !!has(options, 'ACCESSORS') && options.ACCESSORS;
        var argument0 = has(options, 0) ? options[0] : thrower;
        var argument1 = has(options, 1) ? options[1] : void 0;
        return cache[METHOD_NAME] = !!method && !fails((function() {
            if (ACCESSORS && !descriptors) {
                return true;
            }
            var O = {
                length: -1
            };
            ACCESSORS ? defineProperty(O, 1, {
                enumerable: true,
                get: thrower
            }) : O[1] = 1;
            method.call(O, argument0, argument1);
        }));
    };
    var $forEach = arrayIteration.forEach;
    var STRICT_METHOD = arrayMethodIsStrict('forEach');
    var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');
    var arrayForEach = STRICT_METHOD && USES_TO_LENGTH ? [].forEach : function forEach(callbackfn) {
        return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    };
    _export({
        target: 'Array',
        proto: true,
        forced: [].forEach != arrayForEach
    }, {
        forEach: arrayForEach
    });
    var $some = arrayIteration.some;
    var STRICT_METHOD$1 = arrayMethodIsStrict('some');
    var USES_TO_LENGTH$1 = arrayMethodUsesToLength('some');
    _export({
        target: 'Array',
        proto: true,
        forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$1
    }, {
        some: function some(callbackfn) {
            return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
    });
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
    for (var COLLECTION_NAME in domIterables) {
        var Collection = global_1[COLLECTION_NAME];
        var CollectionPrototype = Collection && Collection.prototype;
        if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) {
            try {
                createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
            } catch (error) {
                CollectionPrototype.forEach = arrayForEach;
            }
        }
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            return _arrayLikeToArray(arr);
        }
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) {
            return arr;
        }
    }
    function _iterableToArray(iter) {
        if ('undefined' != typeof Symbol && Symbol.iterator in Object(iter)) {
            return Array.from(iter);
        }
    }
    function _iterableToArrayLimit(arr, i) {
        if ('undefined' != typeof Symbol && Symbol.iterator in Object(arr)) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = void 0;
            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) {
                        break;
                    }
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    _n || null == _i['return'] || _i['return']();
                } finally {
                    if (_d) {
                        throw _e;
                    }
                }
            }
            return _arr;
        }
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (o) {
            if ('string' == typeof o) {
                return _arrayLikeToArray(o, minLen);
            }
            var n = Object.prototype.toString.call(o).slice(8, -1);
            'Object' === n && o.constructor && (n = o.constructor.name);
            return 'Map' === n || 'Set' === n ? Array.from(o) : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(o, minLen) : void 0;
        }
    }
    function _arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }
    function _nonIterableRest() {
        throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }
    var createProperty = function(object, key, value) {
        var propertyKey = toPrimitive(key);
        propertyKey in object ? objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value)) : object[propertyKey] = value;
    };
    var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';
    var process = global_1.process;
    var versions = process && process.versions;
    var v8 = versions && versions.v8;
    var match, version;
    if (v8) {
        match = v8.split('.');
        version = match[0] + match[1];
    } else if (engineUserAgent) {
        match = engineUserAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
            match = engineUserAgent.match(/Chrome\/(\d+)/);
            match && (version = match[1]);
        }
    }
    var engineV8Version = version && +version;
    var SPECIES$1 = wellKnownSymbol('species');
    var arrayMethodHasSpeciesSupport = function(METHOD_NAME) {
        return engineV8Version >= 51 || !fails((function() {
            var array = [];
            var constructor = array.constructor = {};
            constructor[SPECIES$1] = function() {
                return {
                    foo: 1
                };
            };
            return 1 !== array[METHOD_NAME](Boolean).foo;
        }));
    };
    var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
    var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails((function() {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
    }));
    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
    var isConcatSpreadable = function(O) {
        if (!isObject(O)) {
            return false;
        }
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return void 0 !== spreadable ? !!spreadable : isArray(O);
    };
    var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
    _export({
        target: 'Array',
        proto: true,
        forced: FORCED
    }, {
        concat: function concat(arg) {
            var O = toObject(this);
            var A = arraySpeciesCreate(O, 0);
            var n = 0;
            var i, k, length, len, E;
            for (i = -1, length = arguments.length; i < length; i++) {
                E = -1 === i ? O : arguments[i];
                if (isConcatSpreadable(E)) {
                    len = toLength(E.length);
                    if (n + len > MAX_SAFE_INTEGER) {
                        throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                    }
                    for (k = 0; k < len; k++, n++) {
                        k in E && createProperty(A, n, E[k]);
                    }
                } else {
                    if (n >= MAX_SAFE_INTEGER) {
                        throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                    }
                    createProperty(A, n++, E);
                }
            }
            A.length = n;
            return A;
        }
    });
    var $indexOf = arrayIncludes.indexOf;
    var nativeIndexOf = [].indexOf;
    var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [ 1 ].indexOf(1, -0) < 0;
    var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
    var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', {
        ACCESSORS: true,
        1: 0
    });
    _export({
        target: 'Array',
        proto: true,
        forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$2
    }, {
        indexOf: function indexOf(searchElement) {
            return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
        }
    });
    var nativeJoin = [].join;
    var ES3_STRINGS = indexedObject != Object;
    var STRICT_METHOD$3 = arrayMethodIsStrict('join', ',');
    _export({
        target: 'Array',
        proto: true,
        forced: ES3_STRINGS || !STRICT_METHOD$3
    }, {
        join: function join(separator) {
            return nativeJoin.call(toIndexedObject(this), void 0 === separator ? ',' : separator);
        }
    });
    var createMethod$2 = function(IS_RIGHT) {
        return function(that, callbackfn, argumentsLength, memo) {
            aFunction$1(callbackfn);
            var O = toObject(that);
            var self = indexedObject(O);
            var length = toLength(O.length);
            var index = IS_RIGHT ? length - 1 : 0;
            var i = IS_RIGHT ? -1 : 1;
            if (argumentsLength < 2) {
                while (true) {
                    if (index in self) {
                        memo = self[index];
                        index += i;
                        break;
                    }
                    index += i;
                    if (IS_RIGHT ? index < 0 : length <= index) {
                        throw TypeError('Reduce of empty array with no initial value');
                    }
                }
            }
            for (;IS_RIGHT ? index >= 0 : length > index; index += i) {
                index in self && (memo = callbackfn(memo, self[index], index, O));
            }
            return memo;
        };
    };
    var arrayReduce = {
        left: createMethod$2(false),
        right: createMethod$2(true)
    };
    var $reduce = arrayReduce.left;
    var STRICT_METHOD$4 = arrayMethodIsStrict('reduce');
    var USES_TO_LENGTH$3 = arrayMethodUsesToLength('reduce', {
        1: 0
    });
    _export({
        target: 'Array',
        proto: true,
        forced: !STRICT_METHOD$4 || !USES_TO_LENGTH$3
    }, {
        reduce: function reduce(callbackfn) {
            return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
        }
    });
    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
    var USES_TO_LENGTH$4 = arrayMethodUsesToLength('slice', {
        ACCESSORS: true,
        0: 0,
        1: 2
    });
    var SPECIES$2 = wellKnownSymbol('species');
    var nativeSlice = [].slice;
    var max$1 = Math.max;
    _export({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$4
    }, {
        slice: function slice(start, end) {
            var O = toIndexedObject(this);
            var length = toLength(O.length);
            var k = toAbsoluteIndex(start, length);
            var fin = toAbsoluteIndex(void 0 === end ? length : end, length);
            var Constructor, result, n;
            if (isArray(O)) {
                Constructor = O.constructor;
                if ('function' != typeof Constructor || Constructor !== Array && !isArray(Constructor.prototype)) {
                    if (isObject(Constructor)) {
                        Constructor = Constructor[SPECIES$2];
                        null === Constructor && (Constructor = void 0);
                    }
                } else {
                    Constructor = void 0;
                }
                if (Constructor === Array || void 0 === Constructor) {
                    return nativeSlice.call(O, k, fin);
                }
            }
            result = new (void 0 === Constructor ? Array : Constructor)(max$1(fin - k, 0));
            for (n = 0; k < fin; k++, n++) {
                k in O && createProperty(result, n, O[k]);
            }
            result.length = n;
            return result;
        }
    });
    var thisNumberValue = function(value) {
        if ('number' != typeof value && 'Number' != classofRaw(value)) {
            throw TypeError('Incorrect invocation');
        }
        return +value;
    };
    var stringRepeat = ''.repeat || function repeat(count) {
        var str = String(requireObjectCoercible(this));
        var result = '';
        var n = toInteger(count);
        if (n < 0 || n == 1 / 0) {
            throw RangeError('Wrong number of repetitions');
        }
        for (;n > 0; (n >>>= 1) && (str += str)) {
            1 & n && (result += str);
        }
        return result;
    };
    var nativeToFixed = 1.0.toFixed;
    var floor$1 = Math.floor;
    var pow = function(x, n, acc) {
        return 0 === n ? acc : n % 2 == 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    };
    var log = function(x) {
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
    var FORCED$1 = nativeToFixed && ('0.000' !== 0.00008.toFixed(3) || '1' !== 0.9.toFixed(0) || '1.25' !== 1.255.toFixed(2) || '1000000000000000128' !== (1000000000000000128.0).toFixed(0)) || !fails((function() {
        nativeToFixed.call({});
    }));
    _export({
        target: 'Number',
        proto: true,
        forced: FORCED$1
    }, {
        toFixed: function toFixed(fractionDigits) {
            var number = thisNumberValue(this);
            var fractDigits = toInteger(fractionDigits);
            var data = [ 0, 0, 0, 0, 0, 0 ];
            var sign = '';
            var result = '0';
            var e, z, j, k;
            var multiply = function(n, c) {
                var index = -1;
                var c2 = c;
                while (++index < 6) {
                    c2 += n * data[index];
                    data[index] = c2 % 1e7;
                    c2 = floor$1(c2 / 1e7);
                }
            };
            var divide = function(n) {
                var index = 6;
                var c = 0;
                while (--index >= 0) {
                    c += data[index];
                    data[index] = floor$1(c / n);
                    c = c % n * 1e7;
                }
            };
            var dataToString = function() {
                var index = 6;
                var s = '';
                while (--index >= 0) {
                    if ('' !== s || 0 === index || 0 !== data[index]) {
                        var t = String(data[index]);
                        s = '' === s ? t : s + stringRepeat.call('0', 7 - t.length) + t;
                    }
                }
                return s;
            };
            if (fractDigits < 0 || fractDigits > 20) {
                throw RangeError('Incorrect fraction digits');
            }
            if (number != number) {
                return 'NaN';
            }
            if (number <= -1e21 || number >= 1e21) {
                return String(number);
            }
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
                    multiply(0, z);
                    j = fractDigits;
                    while (j >= 7) {
                        multiply(1e7, 0);
                        j -= 7;
                    }
                    multiply(pow(10, j, 1), 0);
                    j = e - 1;
                    while (j >= 23) {
                        divide(1 << 23);
                        j -= 23;
                    }
                    divide(1 << j);
                    multiply(1, 1);
                    divide(2);
                    result = dataToString();
                } else {
                    multiply(0, z);
                    multiply(1 << -e, 0);
                    result = dataToString() + stringRepeat.call('0', fractDigits);
                }
            }
            if (fractDigits > 0) {
                k = result.length;
                result = sign + (k <= fractDigits ? '0.' + stringRepeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
            } else {
                result = sign + result;
            }
            return result;
        }
    });
    var aPossiblePrototype = function(it) {
        if (!isObject(it) && null !== it) {
            throw TypeError('Can\'t set ' + String(it) + ' as a prototype');
        }
        return it;
    };
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function() {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
            setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
        } catch (error) {}
        return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            CORRECT_SETTER ? setter.call(O, proto) : O.__proto__ = proto;
            return O;
        };
    }() : void 0);
    var inheritIfRequired = function($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        objectSetPrototypeOf && 'function' == typeof (NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype && objectSetPrototypeOf($this, NewTargetPrototype);
        return $this;
    };
    var MATCH = wellKnownSymbol('match');
    var isRegexp = function(it) {
        var isRegExp;
        return isObject(it) && (void 0 !== (isRegExp = it[MATCH]) ? !!isRegExp : 'RegExp' == classofRaw(it));
    };
    var regexpFlags = function() {
        var that = anObject(this);
        var result = '';
        that.global && (result += 'g');
        that.ignoreCase && (result += 'i');
        that.multiline && (result += 'm');
        that.dotAll && (result += 's');
        that.unicode && (result += 'u');
        that.sticky && (result += 'y');
        return result;
    };
    function RE(s, f) {
        return RegExp(s, f);
    }
    var UNSUPPORTED_Y = fails((function() {
        var re = RE('a', 'y');
        re.lastIndex = 2;
        return null != re.exec('abcd');
    }));
    var BROKEN_CARET = fails((function() {
        var re = RE('^r', 'gy');
        re.lastIndex = 2;
        return null != re.exec('str');
    }));
    var regexpStickyHelpers = {
        UNSUPPORTED_Y: UNSUPPORTED_Y,
        BROKEN_CARET: BROKEN_CARET
    };
    var SPECIES$3 = wellKnownSymbol('species');
    var setSpecies = function(CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
        var defineProperty = objectDefineProperty.f;
        descriptors && Constructor && !Constructor[SPECIES$3] && defineProperty(Constructor, SPECIES$3, {
            configurable: true,
            get: function() {
                return this;
            }
        });
    };
    var defineProperty$1 = objectDefineProperty.f;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;
    var setInternalState = internalState.set;
    var MATCH$1 = wellKnownSymbol('match');
    var NativeRegExp = global_1.RegExp;
    var RegExpPrototype = NativeRegExp.prototype;
    var re1 = /a/g;
    var re2 = /a/g;
    var CORRECT_NEW = new NativeRegExp(re1) !== re1;
    var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
    var FORCED$2 = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y$1 || fails((function() {
        re2[MATCH$1] = false;
        return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || '/a/i' != NativeRegExp(re1, 'i');
    })));
    if (FORCED$2) {
        var RegExpWrapper = function RegExp(pattern, flags) {
            var thisIsRegExp = this instanceof RegExpWrapper;
            var patternIsRegExp = isRegexp(pattern);
            var flagsAreUndefined = void 0 === flags;
            var sticky;
            if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
                return pattern;
            }
            if (CORRECT_NEW) {
                patternIsRegExp && !flagsAreUndefined && (pattern = pattern.source);
            } else if (pattern instanceof RegExpWrapper) {
                flagsAreUndefined && (flags = regexpFlags.call(pattern));
                pattern = pattern.source;
            }
            if (UNSUPPORTED_Y$1) {
                sticky = !!flags && flags.indexOf('y') > -1;
                sticky && (flags = flags.replace(/y/g, ''));
            }
            var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
            UNSUPPORTED_Y$1 && sticky && setInternalState(result, {
                sticky: sticky
            });
            return result;
        };
        var proxy = function(key) {
            key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
                configurable: true,
                get: function() {
                    return NativeRegExp[key];
                },
                set: function(it) {
                    NativeRegExp[key] = it;
                }
            });
        };
        var keys$1 = getOwnPropertyNames(NativeRegExp);
        var index = 0;
        while (keys$1.length > index) {
            proxy(keys$1[index++]);
        }
        RegExpPrototype.constructor = RegExpWrapper;
        RegExpWrapper.prototype = RegExpPrototype;
        redefine(global_1, 'RegExp', RegExpWrapper);
    }
    setSpecies('RegExp');
    var nativeExec = RegExp.prototype.exec;
    var nativeReplace = String.prototype.replace;
    var patchedExec = nativeExec;
    var UPDATES_LAST_INDEX_WRONG = function() {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, 'a');
        nativeExec.call(re2, 'a');
        return 0 !== re1.lastIndex || 0 !== re2.lastIndex;
    }();
    var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;
    var NPCG_INCLUDED = void 0 !== /()??/.exec('')[1];
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;
    PATCH && (patchedExec = function exec(str) {
        var re = this;
        var lastIndex, reCopy, match, i;
        var sticky = UNSUPPORTED_Y$2 && re.sticky;
        var flags = regexpFlags.call(re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;
        if (sticky) {
            flags = flags.replace('y', '');
            -1 === flags.indexOf('g') && (flags += 'g');
            strCopy = String(str).slice(re.lastIndex);
            if (re.lastIndex > 0 && (!re.multiline || re.multiline && '\n' !== str[re.lastIndex - 1])) {
                source = '(?: ' + source + ')';
                strCopy = ' ' + strCopy;
                charsAdded++;
            }
            reCopy = new RegExp('^(?:' + source + ')', flags);
        }
        NPCG_INCLUDED && (reCopy = new RegExp('^' + source + '$(?!\\s)', flags));
        UPDATES_LAST_INDEX_WRONG && (lastIndex = re.lastIndex);
        match = nativeExec.call(sticky ? reCopy : re, strCopy);
        if (sticky) {
            if (match) {
                match.input = match.input.slice(charsAdded);
                match[0] = match[0].slice(charsAdded);
                match.index = re.lastIndex;
                re.lastIndex += match[0].length;
            } else {
                re.lastIndex = 0;
            }
        } else {
            UPDATES_LAST_INDEX_WRONG && match && (re.lastIndex = re.global ? match.index + match[0].length : lastIndex);
        }
        NPCG_INCLUDED && match && match.length > 1 && nativeReplace.call(match[0], reCopy, (function() {
            for (i = 1; i < arguments.length - 2; i++) {
                void 0 === arguments[i] && (match[i] = void 0);
            }
        }));
        return match;
    });
    var regexpExec = patchedExec;
    _export({
        target: 'RegExp',
        proto: true,
        forced: /./.exec !== regexpExec
    }, {
        exec: regexpExec
    });
    var TO_STRING = 'toString';
    var RegExpPrototype$1 = RegExp.prototype;
    var nativeToString = RegExpPrototype$1[TO_STRING];
    var NOT_GENERIC = fails((function() {
        return '/a/b' != nativeToString.call({
            source: 'a',
            flags: 'b'
        });
    }));
    var INCORRECT_NAME = nativeToString.name != TO_STRING;
    (NOT_GENERIC || INCORRECT_NAME) && redefine(RegExp.prototype, TO_STRING, (function toString() {
        var R = anObject(this);
        var p = String(R.source);
        var rf = R.flags;
        var f = String(void 0 === rf && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
        return '/' + p + '/' + f;
    }), {
        unsafe: true
    });
    var SPECIES$4 = wellKnownSymbol('species');
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails((function() {
        var re = /./;
        re.exec = function() {
            var result = [];
            result.groups = {
                a: '7'
            };
            return result;
        };
        return '7' !== ''.replace(re, '$<a>');
    }));
    var REPLACE_KEEPS_$0 = function() {
        return '$0' === 'a'.replace(/./, '$0');
    }();
    var REPLACE = wellKnownSymbol('replace');
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
        return !!/./[REPLACE] && '' === /./[REPLACE]('a', '$0');
    }();
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails((function() {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function() {
            return originalExec.apply(this, arguments);
        };
        var result = 'ab'.split(re);
        return 2 !== result.length || 'a' !== result[0] || 'b' !== result[1];
    }));
    var fixRegexpWellKnownSymbolLogic = function(KEY, length, exec, sham) {
        var SYMBOL = wellKnownSymbol(KEY);
        var DELEGATES_TO_SYMBOL = !fails((function() {
            var O = {};
            O[SYMBOL] = function() {
                return 7;
            };
            return 7 != ''[KEY](O);
        }));
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails((function() {
            var execCalled = false;
            var re = /a/;
            if ('split' === KEY) {
                re = {};
                re.constructor = {};
                re.constructor[SPECIES$4] = function() {
                    return re;
                };
                re.flags = '';
                re[SYMBOL] = /./[SYMBOL];
            }
            re.exec = function() {
                execCalled = true;
                return null;
            };
            re[SYMBOL]('');
            return !execCalled;
        }));
        if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || 'replace' === KEY && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || 'split' === KEY && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
            var nativeRegExpMethod = /./[SYMBOL];
            var methods = exec(SYMBOL, ''[KEY], (function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                return regexp.exec === regexpExec ? DELEGATES_TO_SYMBOL && !forceStringMethod ? {
                    done: true,
                    value: nativeRegExpMethod.call(regexp, str, arg2)
                } : {
                    done: true,
                    value: nativeMethod.call(str, regexp, arg2)
                } : {
                    done: false
                };
            }), {
                REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
                REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
            });
            var stringMethod = methods[0];
            var regexMethod = methods[1];
            redefine(String.prototype, KEY, stringMethod);
            redefine(RegExp.prototype, SYMBOL, 2 == length ? function(string, arg) {
                return regexMethod.call(string, this, arg);
            } : function(string) {
                return regexMethod.call(string, this);
            });
        }
        sham && createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
    };
    var createMethod$3 = function(CONVERT_TO_STRING) {
        return function($this, pos) {
            var S = String(requireObjectCoercible($this));
            var position = toInteger(pos);
            var size = S.length;
            var first, second;
            if (position < 0 || position >= size) {
                return CONVERT_TO_STRING ? '' : void 0;
            }
            first = S.charCodeAt(position);
            return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : second - 0xDC00 + (first - 0xD800 << 10) + 0x10000;
        };
    };
    var stringMultibyte = {
        codeAt: createMethod$3(false),
        charAt: createMethod$3(true)
    };
    var charAt = stringMultibyte.charAt;
    var advanceStringIndex = function(S, index, unicode) {
        return index + (unicode ? charAt(S, index).length : 1);
    };
    var regexpExecAbstract = function(R, S) {
        var exec = R.exec;
        if ('function' == typeof exec) {
            var result = exec.call(R, S);
            if ('object' != typeof result) {
                throw TypeError('RegExp exec method returned something other than an Object or null');
            }
            return result;
        }
        if ('RegExp' !== classofRaw(R)) {
            throw TypeError('RegExp#exec called on incompatible receiver');
        }
        return regexpExec.call(R, S);
    };
    fixRegexpWellKnownSymbolLogic('match', 1, (function(MATCH, nativeMatch, maybeCallNative) {
        return [ function match(regexp) {
            var O = requireObjectCoercible(this);
            var matcher = null == regexp ? void 0 : regexp[MATCH];
            return void 0 !== matcher ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
        }, function(regexp) {
            var res = maybeCallNative(nativeMatch, regexp, this);
            if (res.done) {
                return res.value;
            }
            var rx = anObject(regexp);
            var S = String(this);
            if (!rx.global) {
                return regexpExecAbstract(rx, S);
            }
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
            var A = [];
            var n = 0;
            var result;
            while (null !== (result = regexpExecAbstract(rx, S))) {
                var matchStr = String(result[0]);
                A[n] = matchStr;
                '' === matchStr && (rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode));
                n++;
            }
            return 0 === n ? null : A;
        } ];
    }));
    function getColumn(matrix, column) {
        column = 'first' == column ? 0 : 'last' == column ? matrix[0].length - 1 : column;
        return matrix.reduce((function(a, b) {
            return a.concat(b[column]);
        }), []);
    }
    function trim(x) {
        var precision = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 7;
        return parseFloat(x.toFixed(precision));
    }
    function testVariable(variable, prefixes) {
        var regex = new RegExp('['.concat(prefixes.join(''), ']\\d+'), 'i');
        return null != variable.match(regex);
    }
    function multipleSolutionTest(model, variables, basicVariables, nonBasicVariables) {
        var primaryNonBasicVariables = nonBasicVariables.reduce((function(a, b) {
            return false == testVariable(b, [ 's', 'e', 'a' ]) ? a.concat(variables.indexOf(b)) : a;
        }), []);
        if (0 == primaryNonBasicVariables.length) {
            return null;
        }
        var pivotColumns = [];
        primaryNonBasicVariables.forEach((function(index) {
            var column = getColumn(model, index);
            0 == trim(column.slice(-1)[0]) & column.some((function(d) {
                return trim(d) > 0;
            })) && pivotColumns.push(index);
        }));
        return pivotColumns.length > 0 ? pivotColumns[0] : null;
    }
    var objectKeys = Object.keys || function keys(O) {
        return objectKeysInternal(O, enumBugKeys);
    };
    var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index) {
            objectDefineProperty.f(O, key = keys[index++], Properties[key]);
        }
        return O;
    };
    var html = getBuiltIn('document', 'documentElement');
    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO = sharedKey('IE_PROTO');
    var EmptyConstructor = function() {};
    var scriptTag = function(content) {
        return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };
    var NullProtoObjectViaActiveX = function(activeXDocument) {
        activeXDocument.write(scriptTag(''));
        activeXDocument.close();
        var temp = activeXDocument.parentWindow.Object;
        activeXDocument = null;
        return temp;
    };
    var NullProtoObjectViaIFrame = function() {
        var iframe = documentCreateElement('iframe');
        var JS = 'java' + SCRIPT + ':';
        var iframeDocument;
        iframe.style.display = 'none';
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag('document.F=Object'));
        iframeDocument.close();
        return iframeDocument.F;
    };
    var activeXDocument;
    var NullProtoObject = function() {
        try {
            activeXDocument = document.domain && new ActiveXObject('htmlfile');
        } catch (error) {}
        NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
        var length = enumBugKeys.length;
        while (length--) {
            delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        }
        return NullProtoObject();
    };
    hiddenKeys[IE_PROTO] = true;
    var objectCreate = Object.create || function create(O, Properties) {
        var result;
        if (null !== O) {
            EmptyConstructor[PROTOTYPE] = anObject(O);
            result = new EmptyConstructor;
            EmptyConstructor[PROTOTYPE] = null;
            result[IE_PROTO] = O;
        } else {
            result = NullProtoObject();
        }
        return void 0 === Properties ? result : objectDefineProperties(result, Properties);
    };
    var UNSCOPABLES = wellKnownSymbol('unscopables');
    var ArrayPrototype = Array.prototype;
    null == ArrayPrototype[UNSCOPABLES] && objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: objectCreate(null)
    });
    var addToUnscopables = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
    };
    var iterators = {};
    var correctPrototypeGetter = !fails((function() {
        function F() {}
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F) !== F.prototype;
    }));
    var IE_PROTO$1 = sharedKey('IE_PROTO');
    var ObjectPrototype = Object.prototype;
    var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function(O) {
        O = toObject(O);
        return has(O, IE_PROTO$1) ? O[IE_PROTO$1] : 'function' == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectPrototype : null;
    };
    var ITERATOR = wellKnownSymbol('iterator');
    var BUGGY_SAFARI_ITERATORS = false;
    var returnThis = function() {
        return this;
    };
    var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
    if ([].keys) {
        arrayIterator = [].keys();
        if ('next' in arrayIterator) {
            PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
            PrototypeOfArrayIteratorPrototype !== Object.prototype && (IteratorPrototype = PrototypeOfArrayIteratorPrototype);
        } else {
            BUGGY_SAFARI_ITERATORS = true;
        }
    }
    null == IteratorPrototype && (IteratorPrototype = {});
    has(IteratorPrototype, ITERATOR) || createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
    var iteratorsCore = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    };
    var defineProperty$2 = objectDefineProperty.f;
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var setToStringTag = function(it, TAG, STATIC) {
        it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG) && defineProperty$2(it, TO_STRING_TAG, {
            configurable: true,
            value: TAG
        });
    };
    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
    var returnThis$1 = function() {
        return this;
    };
    var createIteratorConstructor = function(IteratorConstructor, NAME, next) {
        var TO_STRING_TAG = NAME + ' Iterator';
        IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
            next: createPropertyDescriptor(1, next)
        });
        setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
        iterators[TO_STRING_TAG] = returnThis$1;
        return IteratorConstructor;
    };
    var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';
    var returnThis$2 = function() {
        return this;
    };
    var defineIterator = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
        createIteratorConstructor(IteratorConstructor, NAME, next);
        var getIterationMethod = function(KIND) {
            if (KIND === DEFAULT && defaultIterator) {
                return defaultIterator;
            }
            if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) {
                return IterablePrototype[KIND];
            }
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
            return function() {
                return new IteratorConstructor(this);
            };
        };
        var TO_STRING_TAG = NAME + ' Iterator';
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = 'Array' == NAME && IterablePrototype.entries || nativeIterator;
        var CurrentIteratorPrototype, methods, KEY;
        if (anyNativeIterator) {
            CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable));
            if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
                objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2 && (objectSetPrototypeOf ? objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2) : 'function' != typeof CurrentIteratorPrototype[ITERATOR$1] && createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2));
                setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
            }
        }
        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
                return nativeIterator.call(this);
            };
        }
        IterablePrototype[ITERATOR$1] !== defaultIterator && createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
        iterators[NAME] = defaultIterator;
        if (DEFAULT) {
            methods = {
                values: getIterationMethod(VALUES),
                keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                entries: getIterationMethod(ENTRIES)
            };
            if (FORCED) {
                for (KEY in methods) {
                    (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) && redefine(IterablePrototype, KEY, methods[KEY]);
                }
            } else {
                _export({
                    target: NAME,
                    proto: true,
                    forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
                }, methods);
            }
        }
        return methods;
    };
    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$1 = internalState.set;
    var getInternalState = internalState.getterFor(ARRAY_ITERATOR);
    var es_array_iterator = defineIterator(Array, 'Array', (function(iterated, kind) {
        setInternalState$1(this, {
            type: ARRAY_ITERATOR,
            target: toIndexedObject(iterated),
            index: 0,
            kind: kind
        });
    }), (function() {
        var state = getInternalState(this);
        var target = state.target;
        var kind = state.kind;
        var index = state.index++;
        if (!target || index >= target.length) {
            state.target = void 0;
            return {
                value: void 0,
                done: true
            };
        }
        return 'keys' == kind ? {
            value: index,
            done: false
        } : 'values' == kind ? {
            value: target[index],
            done: false
        } : {
            value: [ index, target[index] ],
            done: false
        };
    }), 'values');
    iterators.Arguments = iterators.Array;
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
    var $map = arrayIteration.map;
    var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
    var USES_TO_LENGTH$5 = arrayMethodUsesToLength('map');
    _export({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$5
    }, {
        map: function map(callbackfn) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
    });
    var whitespaces = '\t\n\v\f\r                　\u2028\u2029\ufeff';
    var whitespace = '[' + whitespaces + ']';
    var ltrim = RegExp('^' + whitespace + whitespace + '*');
    var rtrim = RegExp(whitespace + whitespace + '*$');
    var createMethod$4 = function(TYPE) {
        return function($this) {
            var string = String(requireObjectCoercible($this));
            1 & TYPE && (string = string.replace(ltrim, ''));
            2 & TYPE && (string = string.replace(rtrim, ''));
            return string;
        };
    };
    var stringTrim = {
        start: createMethod$4(1),
        end: createMethod$4(2),
        trim: createMethod$4(3)
    };
    var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
    var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
    var defineProperty$3 = objectDefineProperty.f;
    var trim$1 = stringTrim.trim;
    var NUMBER = 'Number';
    var NativeNumber = global_1[NUMBER];
    var NumberPrototype = NativeNumber.prototype;
    var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;
    var toNumber = function(argument) {
        var it = toPrimitive(argument, false);
        var first, third, radix, maxCode, digits, length, index, code;
        if ('string' == typeof it && it.length > 2) {
            it = trim$1(it);
            first = it.charCodeAt(0);
            if (43 === first || 45 === first) {
                third = it.charCodeAt(2);
                if (88 === third || 120 === third) {
                    return NaN;
                }
            } else if (48 === first) {
                switch (it.charCodeAt(1)) {
                  case 66:
                  case 98:
                    radix = 2;
                    maxCode = 49;
                    break;

                  case 79:
                  case 111:
                    radix = 8;
                    maxCode = 55;
                    break;

                  default:
                    return +it;
                }
                digits = it.slice(2);
                length = digits.length;
                for (index = 0; index < length; index++) {
                    code = digits.charCodeAt(index);
                    if (code < 48 || code > maxCode) {
                        return NaN;
                    }
                }
                return parseInt(digits, radix);
            }
        }
        return +it;
    };
    if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
        var NumberWrapper = function Number(value) {
            var it = arguments.length < 1 ? 0 : value;
            var dummy = this;
            return dummy instanceof NumberWrapper && (BROKEN_CLASSOF ? fails((function() {
                NumberPrototype.valueOf.call(dummy);
            })) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
        };
        for (var keys$2 = descriptors ? getOwnPropertyNames$1(NativeNumber) : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'.split(','), j = 0, key; keys$2.length > j; j++) {
            has(NativeNumber, key = keys$2[j]) && !has(NumberWrapper, key) && defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
        }
        NumberWrapper.prototype = NumberPrototype;
        NumberPrototype.constructor = NumberWrapper;
        redefine(global_1, NUMBER, NumberWrapper);
    }
    var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
    var test = {};
    test[TO_STRING_TAG$1] = 'z';
    var toStringTagSupport = '[object z]' === String(test);
    var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
    var CORRECT_ARGUMENTS = 'Arguments' == classofRaw(function() {
        return arguments;
    }());
    var tryGet = function(it, key) {
        try {
            return it[key];
        } catch (error) {}
    };
    var classof = toStringTagSupport ? classofRaw : function(it) {
        var O, tag, result;
        return void 0 === it ? 'Undefined' : null === it ? 'Null' : 'string' == typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : 'Object' == (result = classofRaw(O)) && 'function' == typeof O.callee ? 'Arguments' : result;
    };
    var objectToString = toStringTagSupport ? {}.toString : function toString() {
        return '[object ' + classof(this) + ']';
    };
    toStringTagSupport || redefine(Object.prototype, 'toString', objectToString, {
        unsafe: true
    });
    var freezing = !fails((function() {
        return Object.isExtensible(Object.preventExtensions({}));
    }));
    var internalMetadata = createCommonjsModule((function(module) {
        var defineProperty = objectDefineProperty.f;
        var METADATA = uid('meta');
        var id = 0;
        var isExtensible = Object.isExtensible || function() {
            return true;
        };
        var setMetadata = function(it) {
            defineProperty(it, METADATA, {
                value: {
                    objectID: 'O' + ++id,
                    weakData: {}
                }
            });
        };
        var fastKey = function(it, create) {
            if (!isObject(it)) {
                return 'symbol' == typeof it ? it : ('string' == typeof it ? 'S' : 'P') + it;
            }
            if (!has(it, METADATA)) {
                if (!isExtensible(it)) {
                    return 'F';
                }
                if (!create) {
                    return 'E';
                }
                setMetadata(it);
            }
            return it[METADATA].objectID;
        };
        var getWeakData = function(it, create) {
            if (!has(it, METADATA)) {
                if (!isExtensible(it)) {
                    return true;
                }
                if (!create) {
                    return false;
                }
                setMetadata(it);
            }
            return it[METADATA].weakData;
        };
        var onFreeze = function(it) {
            freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA) && setMetadata(it);
            return it;
        };
        var meta = module.exports = {
            REQUIRED: false,
            fastKey: fastKey,
            getWeakData: getWeakData,
            onFreeze: onFreeze
        };
        hiddenKeys[METADATA] = true;
    }));
    var ITERATOR$2 = wellKnownSymbol('iterator');
    var ArrayPrototype$1 = Array.prototype;
    var isArrayIteratorMethod = function(it) {
        return void 0 !== it && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
    };
    var ITERATOR$3 = wellKnownSymbol('iterator');
    var getIteratorMethod = function(it) {
        if (null != it) {
            return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
        }
    };
    var callWithSafeIterationClosing = function(iterator, fn, value, ENTRIES) {
        try {
            return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
        } catch (error) {
            var returnMethod = iterator['return'];
            void 0 !== returnMethod && anObject(returnMethod.call(iterator));
            throw error;
        }
    };
    var iterate_1 = createCommonjsModule((function(module) {
        var Result = function(stopped, result) {
            this.stopped = stopped;
            this.result = result;
        };
        var iterate = module.exports = function(iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
            var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
            var iterator, iterFn, index, length, result, next, step;
            if (IS_ITERATOR) {
                iterator = iterable;
            } else {
                iterFn = getIteratorMethod(iterable);
                if ('function' != typeof iterFn) {
                    throw TypeError('Target is not iterable');
                }
                if (isArrayIteratorMethod(iterFn)) {
                    for (index = 0, length = toLength(iterable.length); length > index; index++) {
                        result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
                        if (result && result instanceof Result) {
                            return result;
                        }
                    }
                    return new Result(false);
                }
                iterator = iterFn.call(iterable);
            }
            next = iterator.next;
            while (!(step = next.call(iterator)).done) {
                result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
                if ('object' == typeof result && result && result instanceof Result) {
                    return result;
                }
            }
            return new Result(false);
        };
        iterate.stop = function(result) {
            return new Result(true, result);
        };
    }));
    var anInstance = function(it, Constructor, name) {
        if (!(it instanceof Constructor)) {
            throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
        }
        return it;
    };
    var ITERATOR$4 = wellKnownSymbol('iterator');
    var SAFE_CLOSING = false;
    try {
        var called = 0;
        var iteratorWithReturn = {
            next: function() {
                return {
                    done: !!called++
                };
            },
            'return': function() {
                SAFE_CLOSING = true;
            }
        };
        iteratorWithReturn[ITERATOR$4] = function() {
            return this;
        };
        Array.from(iteratorWithReturn, (function() {
            throw 2;
        }));
    } catch (error) {}
    var checkCorrectnessOfIteration = function(exec, SKIP_CLOSING) {
        if (!SKIP_CLOSING && !SAFE_CLOSING) {
            return false;
        }
        var ITERATION_SUPPORT = false;
        try {
            var object = {};
            object[ITERATOR$4] = function() {
                return {
                    next: function() {
                        return {
                            done: ITERATION_SUPPORT = true
                        };
                    }
                };
            };
            exec(object);
        } catch (error) {}
        return ITERATION_SUPPORT;
    };
    var collection = function(CONSTRUCTOR_NAME, wrapper, common) {
        var IS_MAP = -1 !== CONSTRUCTOR_NAME.indexOf('Map');
        var IS_WEAK = -1 !== CONSTRUCTOR_NAME.indexOf('Weak');
        var ADDER = IS_MAP ? 'set' : 'add';
        var NativeConstructor = global_1[CONSTRUCTOR_NAME];
        var NativePrototype = NativeConstructor && NativeConstructor.prototype;
        var Constructor = NativeConstructor;
        var exported = {};
        var fixMethod = function(KEY) {
            var nativeMethod = NativePrototype[KEY];
            redefine(NativePrototype, KEY, 'add' == KEY ? function add(value) {
                nativeMethod.call(this, 0 === value ? 0 : value);
                return this;
            } : 'delete' == KEY ? function(key) {
                return !(IS_WEAK && !isObject(key)) && nativeMethod.call(this, 0 === key ? 0 : key);
            } : 'get' == KEY ? function get(key) {
                return IS_WEAK && !isObject(key) ? void 0 : nativeMethod.call(this, 0 === key ? 0 : key);
            } : 'has' == KEY ? function has(key) {
                return !(IS_WEAK && !isObject(key)) && nativeMethod.call(this, 0 === key ? 0 : key);
            } : function set(key, value) {
                nativeMethod.call(this, 0 === key ? 0 : key, value);
                return this;
            });
        };
        if (isForced_1(CONSTRUCTOR_NAME, 'function' != typeof NativeConstructor || !(IS_WEAK || NativePrototype.forEach && !fails((function() {
            (new NativeConstructor).entries().next();
        }))))) {
            Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
            internalMetadata.REQUIRED = true;
        } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
            var instance = new Constructor;
            var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
            var THROWS_ON_PRIMITIVES = fails((function() {
                instance.has(1);
            }));
            var ACCEPT_ITERABLES = checkCorrectnessOfIteration((function(iterable) {
                new NativeConstructor(iterable);
            }));
            var BUGGY_ZERO = !IS_WEAK && fails((function() {
                var $instance = new NativeConstructor;
                var index = 5;
                while (index--) {
                    $instance[ADDER](index, index);
                }
                return !$instance.has(-0);
            }));
            if (!ACCEPT_ITERABLES) {
                Constructor = wrapper((function(dummy, iterable) {
                    anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
                    var that = inheritIfRequired(new NativeConstructor, dummy, Constructor);
                    null != iterable && iterate_1(iterable, that[ADDER], that, IS_MAP);
                    return that;
                }));
                Constructor.prototype = NativePrototype;
                NativePrototype.constructor = Constructor;
            }
            if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                fixMethod('delete');
                fixMethod('has');
                IS_MAP && fixMethod('get');
            }
            (BUGGY_ZERO || HASNT_CHAINING) && fixMethod(ADDER);
            IS_WEAK && NativePrototype.clear && delete NativePrototype.clear;
        }
        exported[CONSTRUCTOR_NAME] = Constructor;
        _export({
            global: true,
            forced: Constructor != NativeConstructor
        }, exported);
        setToStringTag(Constructor, CONSTRUCTOR_NAME);
        IS_WEAK || common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
        return Constructor;
    };
    var redefineAll = function(target, src, options) {
        for (var key in src) {
            redefine(target, key, src[key], options);
        }
        return target;
    };
    var defineProperty$4 = objectDefineProperty.f;
    var fastKey = internalMetadata.fastKey;
    var setInternalState$2 = internalState.set;
    var internalStateGetterFor = internalState.getterFor;
    var collectionStrong = {
        getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
            var C = wrapper((function(that, iterable) {
                anInstance(that, C, CONSTRUCTOR_NAME);
                setInternalState$2(that, {
                    type: CONSTRUCTOR_NAME,
                    index: objectCreate(null),
                    first: void 0,
                    last: void 0,
                    size: 0
                });
                descriptors || (that.size = 0);
                null != iterable && iterate_1(iterable, that[ADDER], that, IS_MAP);
            }));
            var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
            var define = function(that, key, value) {
                var state = getInternalState(that);
                var entry = getEntry(that, key);
                var previous, index;
                if (entry) {
                    entry.value = value;
                } else {
                    state.last = entry = {
                        index: index = fastKey(key, true),
                        key: key,
                        value: value,
                        previous: previous = state.last,
                        next: void 0,
                        removed: false
                    };
                    state.first || (state.first = entry);
                    previous && (previous.next = entry);
                    descriptors ? state.size++ : that.size++;
                    'F' !== index && (state.index[index] = entry);
                }
                return that;
            };
            var getEntry = function(that, key) {
                var state = getInternalState(that);
                var index = fastKey(key);
                var entry;
                if ('F' !== index) {
                    return state.index[index];
                }
                for (entry = state.first; entry; entry = entry.next) {
                    if (entry.key == key) {
                        return entry;
                    }
                }
            };
            redefineAll(C.prototype, {
                clear: function clear() {
                    var that = this;
                    var state = getInternalState(that);
                    var data = state.index;
                    var entry = state.first;
                    while (entry) {
                        entry.removed = true;
                        entry.previous && (entry.previous = entry.previous.next = void 0);
                        delete data[entry.index];
                        entry = entry.next;
                    }
                    state.first = state.last = void 0;
                    descriptors ? state.size = 0 : that.size = 0;
                },
                'delete': function(key) {
                    var that = this;
                    var state = getInternalState(that);
                    var entry = getEntry(that, key);
                    if (entry) {
                        var next = entry.next;
                        var prev = entry.previous;
                        delete state.index[entry.index];
                        entry.removed = true;
                        prev && (prev.next = next);
                        next && (next.previous = prev);
                        state.first == entry && (state.first = next);
                        state.last == entry && (state.last = prev);
                        descriptors ? state.size-- : that.size--;
                    }
                    return !!entry;
                },
                forEach: function forEach(callbackfn) {
                    var state = getInternalState(this);
                    var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                    var entry;
                    while (entry = entry ? entry.next : state.first) {
                        boundFunction(entry.value, entry.key, this);
                        while (entry && entry.removed) {
                            entry = entry.previous;
                        }
                    }
                },
                has: function has(key) {
                    return !!getEntry(this, key);
                }
            });
            redefineAll(C.prototype, IS_MAP ? {
                get: function get(key) {
                    var entry = getEntry(this, key);
                    return entry && entry.value;
                },
                set: function set(key, value) {
                    return define(this, 0 === key ? 0 : key, value);
                }
            } : {
                add: function add(value) {
                    return define(this, value = 0 === value ? 0 : value, value);
                }
            });
            descriptors && defineProperty$4(C.prototype, 'size', {
                get: function() {
                    return getInternalState(this).size;
                }
            });
            return C;
        },
        setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
            var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
            var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
            var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
            defineIterator(C, CONSTRUCTOR_NAME, (function(iterated, kind) {
                setInternalState$2(this, {
                    type: ITERATOR_NAME,
                    target: iterated,
                    state: getInternalCollectionState(iterated),
                    kind: kind,
                    last: void 0
                });
            }), (function() {
                var state = getInternalIteratorState(this);
                var kind = state.kind;
                var entry = state.last;
                while (entry && entry.removed) {
                    entry = entry.previous;
                }
                if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                    state.target = void 0;
                    return {
                        value: void 0,
                        done: true
                    };
                }
                return 'keys' == kind ? {
                    value: entry.key,
                    done: false
                } : 'values' == kind ? {
                    value: entry.value,
                    done: false
                } : {
                    value: [ entry.key, entry.value ],
                    done: false
                };
            }), IS_MAP ? 'entries' : 'values', !IS_MAP, true);
            setSpecies(CONSTRUCTOR_NAME);
        }
    };
    var es_set = collection('Set', (function(init) {
        return function Set() {
            return init(this, arguments.length ? arguments[0] : void 0);
        };
    }), collectionStrong);
    var charAt$1 = stringMultibyte.charAt;
    var STRING_ITERATOR = 'String Iterator';
    var setInternalState$3 = internalState.set;
    var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);
    defineIterator(String, 'String', (function(iterated) {
        setInternalState$3(this, {
            type: STRING_ITERATOR,
            string: String(iterated),
            index: 0
        });
    }), (function next() {
        var state = getInternalState$1(this);
        var string = state.string;
        var index = state.index;
        var point;
        if (index >= string.length) {
            return {
                value: void 0,
                done: true
            };
        }
        point = charAt$1(string, index);
        state.index += point.length;
        return {
            value: point,
            done: false
        };
    }));
    var SPECIES$5 = wellKnownSymbol('species');
    var speciesConstructor = function(O, defaultConstructor) {
        var C = anObject(O).constructor;
        var S;
        return void 0 === C || null == (S = anObject(C)[SPECIES$5]) ? defaultConstructor : aFunction$1(S);
    };
    var MATCH_ALL = wellKnownSymbol('matchAll');
    var REGEXP_STRING = 'RegExp String';
    var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
    var setInternalState$4 = internalState.set;
    var getInternalState$2 = internalState.getterFor(REGEXP_STRING_ITERATOR);
    var RegExpPrototype$2 = RegExp.prototype;
    var regExpBuiltinExec = RegExpPrototype$2.exec;
    var nativeMatchAll = ''.matchAll;
    var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails((function() {
        'a'.matchAll(/./);
    }));
    var regExpExec = function(R, S) {
        var exec = R.exec;
        var result;
        if ('function' == typeof exec) {
            result = exec.call(R, S);
            if ('object' != typeof result) {
                throw TypeError('Incorrect exec result');
            }
            return result;
        }
        return regExpBuiltinExec.call(R, S);
    };
    var $RegExpStringIterator = createIteratorConstructor((function RegExpStringIterator(regexp, string, global, fullUnicode) {
        setInternalState$4(this, {
            type: REGEXP_STRING_ITERATOR,
            regexp: regexp,
            string: string,
            global: global,
            unicode: fullUnicode,
            done: false
        });
    }), REGEXP_STRING, (function next() {
        var state = getInternalState$2(this);
        if (state.done) {
            return {
                value: void 0,
                done: true
            };
        }
        var R = state.regexp;
        var S = state.string;
        var match = regExpExec(R, S);
        if (null === match) {
            return {
                value: void 0,
                done: state.done = true
            };
        }
        if (state.global) {
            '' == String(match[0]) && (R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode));
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
    }));
    var $matchAll = function(string) {
        var R = anObject(this);
        var S = String(string);
        var C, flagsValue, flags, matcher, global, fullUnicode;
        C = speciesConstructor(R, RegExp);
        flagsValue = R.flags;
        void 0 === flagsValue && R instanceof RegExp && !('flags' in RegExpPrototype$2) && (flagsValue = regexpFlags.call(R));
        flags = void 0 === flagsValue ? '' : String(flagsValue);
        matcher = new C(C === RegExp ? R.source : R, flags);
        global = !!~flags.indexOf('g');
        fullUnicode = !!~flags.indexOf('u');
        matcher.lastIndex = toLength(R.lastIndex);
        return new $RegExpStringIterator(matcher, S, global, fullUnicode);
    };
    _export({
        target: 'String',
        proto: true,
        forced: WORKS_WITH_NON_GLOBAL_REGEX
    }, {
        matchAll: function matchAll(regexp) {
            var O = requireObjectCoercible(this);
            var flags, S, matcher, rx;
            if (null != regexp) {
                if (isRegexp(regexp)) {
                    flags = String(requireObjectCoercible('flags' in RegExpPrototype$2 ? regexp.flags : regexpFlags.call(regexp)));
                    if (!~flags.indexOf('g')) {
                        throw TypeError('`.matchAll` does not allow non-global regexes');
                    }
                }
                if (WORKS_WITH_NON_GLOBAL_REGEX) {
                    return nativeMatchAll.apply(O, arguments);
                }
                matcher = regexp[MATCH_ALL];
                void 0 === matcher && isPure && 'RegExp' == classofRaw(regexp) && (matcher = $matchAll);
                if (null != matcher) {
                    return aFunction$1(matcher).call(regexp, O);
                }
            } else if (WORKS_WITH_NON_GLOBAL_REGEX) {
                return nativeMatchAll.apply(O, arguments);
            }
            S = String(O);
            rx = new RegExp(regexp, 'g');
            return rx[MATCH_ALL](S);
        }
    });
    MATCH_ALL in RegExpPrototype$2 || createNonEnumerableProperty(RegExpPrototype$2, MATCH_ALL, $matchAll);
    var ITERATOR$5 = wellKnownSymbol('iterator');
    var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
    var ArrayValues = es_array_iterator.values;
    for (var COLLECTION_NAME$1 in domIterables) {
        var Collection$1 = global_1[COLLECTION_NAME$1];
        var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
        if (CollectionPrototype$1) {
            if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) {
                try {
                    createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
                } catch (error) {
                    CollectionPrototype$1[ITERATOR$5] = ArrayValues;
                }
            }
            CollectionPrototype$1[TO_STRING_TAG$3] || createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
            if (domIterables[COLLECTION_NAME$1]) {
                for (var METHOD_NAME in es_array_iterator) {
                    if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) {
                        try {
                            createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
                        } catch (error) {
                            CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
                        }
                    }
                }
            }
        }
    }
    function parseModel(objective, constraints) {
        if ('' == objective | 0 == constraints.length) {
            return [ [], '', '' ];
        }
        var modelVariables = [];
        var modelCoeficients = [];
        var modelConstraints = [];
        var modelEqualities = [];
        var objectiveRegex = /(max|min)(?:.*\s*)(\w)(?:\s*=) ((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)/i;
        var constraintRegex = /((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)\s*(=|<=|>=)\s*(\d+)/i;
        var _objective$match = objective.match(objectiveRegex), _objective$match2 = _slicedToArray(_objective$match, 4), regexResult = _objective$match2[0], type = _objective$match2[1], objectiveVariable = _objective$match2[2], objectiveEquation = _objective$match2[3];
        type = type.toLowerCase();
        var _parseEquation = parseEquation(objectiveEquation), _parseEquation2 = _slicedToArray(_parseEquation, 2), objectiveCoeficients = _parseEquation2[0], objectiveVariables = _parseEquation2[1];
        constraints.forEach((function(d) {
            var _d$match = d.match(constraintRegex), _d$match2 = _slicedToArray(_d$match, 4), regexResult = _d$match2[0], equation = _d$match2[1], equality = _d$match2[2], constraint = _d$match2[3];
            modelConstraints.push(parseFloat(constraint));
            modelEqualities.push(equality);
            var _parseEquation3 = parseEquation(equation), _parseEquation4 = _slicedToArray(_parseEquation3, 2), constraintCoeficients = _parseEquation4[0], constraintVariables = _parseEquation4[1];
            modelVariables.push(constraintVariables);
            modelCoeficients.push(constraintCoeficients);
        }));
        modelVariables.push(objectiveVariables);
        modelCoeficients.push(objectiveCoeficients);
        modelConstraints.push(0);
        var _buildTableau = buildTableau(modelVariables, modelCoeficients, modelConstraints, modelEqualities, objectiveVariable), _buildTableau2 = _slicedToArray(_buildTableau, 2), model = _buildTableau2[0], variables = _buildTableau2[1];
        return [ model, variables, type ];
    }
    function parseEquation(equation) {
        var elementRegex = /\s*[+-]?\s*\d*\.*\d*\w\d*/g;
        var coeficentRegex = /\s*([+-]?)\s*(\d*\.*\d*)(\w\d*)/;
        var coeficients = [];
        var variables = [];
        var elements = _toConsumableArray(equation.matchAll(elementRegex));
        elements.forEach((function(element) {
            var _element$0$match = element[0].match(coeficentRegex), _element$0$match2 = _slicedToArray(_element$0$match, 4), regexResult = _element$0$match2[0], sign = _element$0$match2[1], coeficient = _element$0$match2[2], variable = _element$0$match2[3];
            coeficient = '' == coeficient ? 1 : coeficient;
            coeficients.push(parseFloat(sign + coeficient));
            variables.push(variable);
        }));
        return [ coeficients, variables ];
    }
    function buildTableau(variables, coeficients, constraints, equalities, objectiveVariable, type) {
        var model = [];
        var uniqueVariables = _toConsumableArray(new Set(variables.reduce((function(a, b) {
            return a.concat(b);
        }), [])));
        coeficients.forEach((function(coeficient, row) {
            var tmp = Array.apply(null, Array(uniqueVariables.length)).map(Number.prototype.valueOf, 0);
            coeficient.forEach((function(item, index) {
                var pos = uniqueVariables.indexOf(variables[row][index]);
                tmp[pos] = row == coeficients.length - 1 ? -item : item;
            }));
            model.push(tmp);
        }));
        var slackVariableCount = equalities.reduce((function(a, b) {
            return '<=' == b ? ++a : a;
        }), 0);
        var extraVariableCount = equalities.reduce((function(a, b) {
            return '>=' == b ? ++a : a;
        }), 0);
        var alternateVariableCount = equalities.reduce((function(a, b) {
            return '>=' == b || '=' == b ? ++a : a;
        }), 0);
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
        model.forEach((function(row) {
            row.push.apply(row, _toConsumableArray(tmp));
        }));
        var lePositions = equalities.reduce((function(a, b, i) {
            return '<=' == b ? a.concat(i) : a;
        }), []);
        lePositions.forEach((function(row, index) {
            var column = uniqueVariables.indexOf('s' + index);
            model[row][column] = 1;
        }));
        var aPositions = equalities.reduce((function(a, b, i) {
            return '>=' == b || '=' == b ? a.concat(i) : a;
        }), []);
        aPositions.forEach((function(row, index) {
            var column = uniqueVariables.indexOf('a' + index);
            model[row][column] = 1;
        }));
        var gePositions = equalities.reduce((function(a, b, i) {
            return '>=' == b ? a.concat(i) : a;
        }), []);
        gePositions.forEach((function(row, index) {
            var column = uniqueVariables.indexOf('e' + index);
            model[row][column] = -1;
        }));
        model.forEach((function(row, index) {
            row[row.length - 1] = constraints[index];
        }));
        return [ model, uniqueVariables ];
    }
    var $filter = arrayIteration.filter;
    var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');
    var USES_TO_LENGTH$6 = arrayMethodUsesToLength('filter');
    _export({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$6
    }, {
        filter: function filter(callbackfn) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        }
    });
    function getPivot(model, variables, basicVariables, nonBasicVariables, type) {
        var pivotColumn;
        var pivotRow = null;
        var minRatio = Number.MAX_VALUE;
        var rowCount = model.length;
        var columnCount = model[0].length;
        var pivotRows = [];
        var objectiveValues = model[rowCount - 1].slice(0, -1).reduce((function(a, b, i) {
            return -1 != nonBasicVariables.indexOf(variables[i]) ? a.concat(b) : a;
        }), []);
        objectiveValues = 'max' == type ? objectiveValues.filter((function(d) {
            return trim(d) < 0;
        })) : objectiveValues.filter((function(d) {
            return trim(d) > 0;
        }));
        if (0 == objectiveValues.length) {
            var test = multipleSolutionTest(model, variables, basicVariables, nonBasicVariables);
            return null == test ? 'solved' : 'multiple solutions';
        }
        var objectiveValue = objectiveValues[0];
        pivotColumn = model[rowCount - 1].indexOf(objectiveValue);
        minRatio = model.reduce((function(a, b, i) {
            if (trim(b[pivotColumn]) > 0 & i != rowCount - 1) {
                var ratio = b[columnCount - 1] / b[pivotColumn];
                return ratio < a ? ratio : a;
            }
            return a;
        }), minRatio);
        pivotRows = model.reduce((function(a, b, i) {
            return trim(b[pivotColumn]) > 0 & i != rowCount - 1 && b[b.length - 1] / b[pivotColumn] == minRatio ? a.concat(i) : a;
        }), []);
        switch (pivotRows.length) {
          case 0:
            return 'unbounded';

          case 1:
            pivotRow = pivotRows[0];
            break;

          default:
            pivotRows.forEach((function(row) {
                testVariable(basicVariables[row], [ 'a' ]) && (pivotRow = row);
            }));
        }
        pivotRow = null == pivotRow ? pivotRows[0] : pivotRow;
        return {
            row: pivotRow,
            column: pivotColumn
        };
    }
    function pivotModel(model, pivot) {
        var multiplier;
        var pivotValue = model[pivot.row][pivot.column];
        1 != pivotValue && model[pivot.row].forEach((function(value, index) {
            model[pivot.row][index] = value / pivotValue;
        }));
        model.forEach((function(row, rowIndex) {
            if (rowIndex !== pivot.row && 0 !== row[pivot.column]) {
                multiplier = -row[pivot.column];
                row.forEach((function(value, columnIndex) {
                    model[rowIndex][columnIndex] = multiplier * model[pivot.row][columnIndex] + model[rowIndex][columnIndex];
                }));
            }
        }));
        return model;
    }
    var nativeReverse = [].reverse;
    var test$1 = [ 1, 2 ];
    _export({
        target: 'Array',
        proto: true,
        forced: String(test$1) === String(test$1.reverse())
    }, {
        reverse: function reverse() {
            isArray(this) && (this.length = this.length);
            return nativeReverse.call(this);
        }
    });
    var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
    var USES_TO_LENGTH$7 = arrayMethodUsesToLength('splice', {
        ACCESSORS: true,
        0: 0,
        1: 2
    });
    var max$2 = Math.max;
    var min$2 = Math.min;
    var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';
    _export({
        target: 'Array',
        proto: true,
        forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$7
    }, {
        splice: function splice(start, deleteCount) {
            var O = toObject(this);
            var len = toLength(O.length);
            var actualStart = toAbsoluteIndex(start, len);
            var argumentsLength = arguments.length;
            var insertCount, actualDeleteCount, A, k, from, to;
            if (0 === argumentsLength) {
                insertCount = actualDeleteCount = 0;
            } else if (1 === argumentsLength) {
                insertCount = 0;
                actualDeleteCount = len - actualStart;
            } else {
                insertCount = argumentsLength - 2;
                actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
            }
            if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
                throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
            }
            A = arraySpeciesCreate(O, actualDeleteCount);
            for (k = 0; k < actualDeleteCount; k++) {
                from = actualStart + k;
                from in O && createProperty(A, k, O[from]);
            }
            A.length = actualDeleteCount;
            if (insertCount < actualDeleteCount) {
                for (k = actualStart; k < len - actualDeleteCount; k++) {
                    from = k + actualDeleteCount;
                    to = k + insertCount;
                    from in O ? O[to] = O[from] : delete O[to];
                }
                for (k = len; k > len - actualDeleteCount + insertCount; k--) {
                    delete O[k - 1];
                }
            } else if (insertCount > actualDeleteCount) {
                for (k = len - actualDeleteCount; k > actualStart; k--) {
                    from = k + actualDeleteCount - 1;
                    to = k + insertCount - 1;
                    from in O ? O[to] = O[from] : delete O[to];
                }
            }
            for (k = 0; k < insertCount; k++) {
                O[k + actualStart] = arguments[k + 2];
            }
            O.length = len - actualDeleteCount + insertCount;
            return A;
        }
    });
    function buildPhaseOneTableau(model, variables) {
        var objectiveRow = [];
        var alternativeRows = [];
        var phaseOneTableau = [];
        model.forEach((function(row) {
            phaseOneTableau.push(row);
        }));
        variables.forEach((function(variable) {
            objectiveRow.push(testVariable(variable, [ 'a' ]) ? -1 : 0);
        }));
        phaseOneTableau.forEach((function(row) {
            for (var index = 0; index < row.length; index++) {
                if (testVariable(variables[index], [ 'a' ]) && 1 == row[index]) {
                    alternativeRows.push(row);
                    break;
                }
            }
        }));
        alternativeRows.forEach((function(row) {
            row.forEach((function(item, index) {
                objectiveRow[index] += item;
            }));
        }));
        phaseOneTableau.push(objectiveRow);
        return phaseOneTableau;
    }
    function reBaseModel(model, variables, basicVariables) {
        var objectiveRow = model[model.length - 1];
        var changedRows = [];
        variables.forEach((function(variable, index) {
            var row = basicVariables.indexOf(variable);
            -1 != row && 0 != trim(objectiveRow[index]) && changedRows.push(model[row].map((function(item) {
                return item * -objectiveRow[index];
            })));
        }));
        changedRows.forEach((function(row) {
            row.forEach((function(item, index) {
                model[model.length - 1][index] += item;
            }));
        }));
        return model;
    }
    function cleanPhaseOneTableau(model, objective, variables, basicVariables, nonBasicVariables) {
        var lastRow = model.length - 1;
        var lastColumn = model[0].length - 1;
        if (trim(model[lastRow][lastColumn]) > 0) {
            return [ model, 'infeasible' ];
        }
        model.push(objective);
        var columnsToRemove = variables.reduce((function(a, b, i) {
            return testVariable(b, [ 'a' ]) && -1 == basicVariables.indexOf(b) ? a.concat(i) : a;
        }), []).reverse();
        model.forEach((function(row) {
            columnsToRemove.forEach((function(column) {
                row.splice(column, 1);
            }));
        }));
        var basicVariableCount = basicVariables.reduce((function(a, b) {
            return testVariable(b, [ 'a' ]) ? ++a : a;
        }), 0);
        var phaseOneObjective = model.splice(lastRow, 1)[0];
        columnsToRemove.forEach((function(column) {
            variables.splice(column, 1);
        }));
        var indexes = nonBasicVariables.reduce((function(a, b, i) {
            return testVariable(b, [ 'a' ]) ? a.concat(i) : a;
        }), []).reverse();
        indexes.forEach((function(index) {
            nonBasicVariables.splice(index, 1);
        }));
        model = reBaseModel(model, variables, basicVariables);
        return [ model, '' ];
    }
    function getVariables(model, variables) {
        var prefixCodes = [ 's', 'a' ];
        var basicVariableCount = variables.reduce((function(a, b) {
            return -1 != prefixCodes.indexOf(b.charAt(0)) ? ++a : a;
        }), 0);
        var lastRow = model.length - 1;
        var zPrefix = variables[variables.length - 1];
        var basicVariables = new Array(basicVariableCount);
        var nonBasicVariables = [];
        model.forEach((function(row, index) {
            row.forEach((function(item, column) {
                var isValidColumn = testVariable(variables[column], prefixCodes);
                var isZcolumn = variables[column] == zPrefix && index == lastRow;
                (1 == item && isValidColumn || isZcolumn) && (basicVariables[index] = variables[column]);
            }));
        }));
        variables.forEach((function(variable) {
            -1 == basicVariables.indexOf(variable) && nonBasicVariables.push(variable);
        }));
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
            solution.push([ basicVariables[i], trim(model[i][lastColumn]) ]);
        }
        return {
            solution: solution,
            result: result
        };
    }
    function phaseTwo(model, variables, basicVariables, nonBasicVariables, type) {
        var pivot;
        while (true) {
            pivot = getPivot(model, variables, basicVariables, nonBasicVariables, type);
            switch (pivot) {
              case 'solved':
              case 'multiple solutions':
              case 'unbounded':
                return [ model, pivot ];
            }
            model = pivotModel(model, pivot);
            swapVariables(pivot, variables, basicVariables, nonBasicVariables);
        }
    }
    function simplex(objective, constraints) {
        var _parseModel = parseModel(objective, constraints), _parseModel2 = _slicedToArray(_parseModel, 3), model = _parseModel2[0], variables = _parseModel2[1], type = _parseModel2[2];
        if (0 == model.length) {
            return {
                solution: [],
                result: ''
            };
        }
        var tableau;
        var result;
        model.forEach((function(row) {
            row[row.length - 1] < 0 && row.forEach((function(item) {}));
        }));
        var _getVariables = getVariables(model, variables), basicVariables = _getVariables.basicVariables, nonBasicVariables = _getVariables.nonBasicVariables;
        var isTwoPhase = variables.some((function(variable) {
            return 'a' == variable.charAt(0);
        }));
        if (isTwoPhase) {
            var originalObjective = model.pop();
            tableau = buildPhaseOneTableau(model, variables);
            var _phaseTwo = phaseTwo(tableau, variables, basicVariables, nonBasicVariables, 'min');
            var _phaseTwo2 = _slicedToArray(_phaseTwo, 2);
            tableau = _phaseTwo2[0];
            result = _phaseTwo2[1];
            if ('unbounded' == result) {
                return buildSolution(tableau, basicVariables, nonBasicVariables, result);
            }
            var _cleanPhaseOneTableau = cleanPhaseOneTableau(tableau, originalObjective, variables, basicVariables, nonBasicVariables);
            var _cleanPhaseOneTableau2 = _slicedToArray(_cleanPhaseOneTableau, 2);
            tableau = _cleanPhaseOneTableau2[0];
            result = _cleanPhaseOneTableau2[1];
            if ('infeasible' == result) {
                return buildSolution(tableau, basicVariables, nonBasicVariables, result);
            }
            var _phaseTwo3 = phaseTwo(tableau, variables, basicVariables, nonBasicVariables, type);
            var _phaseTwo4 = _slicedToArray(_phaseTwo3, 2);
            tableau = _phaseTwo4[0];
            result = _phaseTwo4[1];
        } else {
            var _phaseTwo5 = phaseTwo(model, variables, basicVariables, nonBasicVariables, type);
            var _phaseTwo6 = _slicedToArray(_phaseTwo5, 2);
            tableau = _phaseTwo6[0];
            result = _phaseTwo6[1];
        }
        return buildSolution(tableau, basicVariables, nonBasicVariables, result);
    }
    return simplex;
}();