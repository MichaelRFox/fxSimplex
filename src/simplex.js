function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
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

function _iterableToArrayLimit(arr, i) {
    if ('undefined' != typeof Symbol && Symbol.iterator in Object(arr)) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
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

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr;
    }
}

import { trim } from './utilities.js';

import { parseModel } from './model.js';

import { getPivot, pivotModel } from './pivot.js';

import { buildPhaseOneTableau, cleanPhaseOneTableau } from './phaseOne.js';

import { getVariables, swapVariables } from './variables.js';

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
        model = pivotModel(model, pivot, type);
        swapVariables(pivot, variables, basicVariables, nonBasicVariables);
    }
}

export function simplex(objective, constraints) {
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
        row[row.length - 1] < 0 && row.forEach((function(item) {
            -1;
        }));
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