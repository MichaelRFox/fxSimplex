function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
}

function _iterableToArray(iter) {
    if ('undefined' != typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter);
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr);
    }
}

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

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr;
    }
}

export function parseModel(objective, constraints) {
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
    var _buildTableau = buildTableau(modelVariables, modelCoeficients, modelConstraints, modelEqualities, objectiveVariable, type), _buildTableau2 = _slicedToArray(_buildTableau, 2), model = _buildTableau2[0], variables = _buildTableau2[1];
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
    for (var _i2 = 0; _i2 < extraVariableCount; _i2++) {
        uniqueVariables.push('e' + _i2);
    }
    for (var _i3 = 0; _i3 < alternateVariableCount; _i3++) {
        uniqueVariables.push('a' + _i3);
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