export function parseModel (objective, constraints) {

    if (objective == '' | constraints.length == 0) return [[], '', ''];
    let modelVariables = [];
    let modelCoeficients = [];
    let modelConstraints = [];
    let modelEqualities = [];

    //group 1 = max or min; group 2 = Z; group 3 = equation
    let objectiveRegex = /(max|min)(?:.*\s*)(\w)(?:\s*=) ((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)/i;

    //group 1 = elements; group2 = equality; group 3 = constraint
    let constraintRegex = /((?:\s*[+-]?\s*\d*\.*\d*\w\d*)+)\s*(=|<=|>=)\s*(\d+)/i;

    let [regexResult, type, objectiveVariable, objectiveEquation] = objective.match(objectiveRegex);
    type = type.toLowerCase();
    let [objectiveCoeficients, objectiveVariables] = parseEquation(objectiveEquation);

    constraints.forEach (d => {
//        let [regexResult, equation, equality, constraint] = d[0].match(constraintRegex);
        let [regexResult, equation, equality, constraint] = d.match(constraintRegex);
        modelConstraints.push(parseFloat(constraint));
        modelEqualities.push(equality);
        let [constraintCoeficients, constraintVariables] = parseEquation(equation);
        modelVariables.push(constraintVariables);
        modelCoeficients.push(constraintCoeficients);
    });
    modelVariables.push(objectiveVariables);
    modelCoeficients.push(objectiveCoeficients);
    modelConstraints.push(0); 

    let [model, variables] = buildTableau(modelVariables, modelCoeficients, modelConstraints, modelEqualities, objectiveVariable, type);

    return [model, variables, type];
};

function parseEquation (equation) {
    
    //matches single element
    let elementRegex = /\s*[+-]?\s*\d*\.*\d*\w\d*/g;

    //group 1 = sign; group 2 = coeficient; group 3 = variable
    let coeficentRegex = /\s*([+-]?)\s*(\d*\.*\d*)(\w\d*)/;

    let coeficients = [];
    let variables = [];

    let elements = [...equation.matchAll(elementRegex)];

    elements.forEach(element => {
        let [regexResult, sign, coeficient, variable] = element[0].match(coeficentRegex);
//        let [regexResult, sign, coeficient, variable] = element.match(coeficentRegex);
        coeficient = coeficient == '' ? 1 : coeficient;
        coeficients.push(parseFloat(sign + coeficient));
        variables.push(variable);
    });

    return [coeficients, variables];
}

function buildTableau(variables, coeficients, constraints, equalities, objectiveVariable, type) {

/*
    <= +s
    >=    -e  +a
    =         +a
*/  
    let model = [];

    let uniqueVariables = [... new Set(variables.reduce((a,b) => {return a.concat(b)}, []))];

    coeficients.forEach((coeficient, row) => {
        let tmp = Array.apply(null, Array(uniqueVariables.length)).map(Number.prototype.valueOf,0);;
        coeficient.forEach((item, index) => {
            let pos = uniqueVariables.indexOf(variables[row][index]);
//            tmp[pos] = row == coeficients.length - 1 && type == 'max' ? -item : item;
            tmp[pos] = row == coeficients.length - 1 ? -item : item;
        });
        model.push(tmp);
    });

    let slackVariableCount = equalities.reduce((a, b) => {return b == '<=' ? ++a : a}, 0);
    let extraVariableCount = equalities.reduce((a, b) => {return b == '>=' ? ++a : a}, 0);
    let alternateVariableCount = equalities.reduce((a, b) => {return b == '>=' || b == '=' ? ++a : a}, 0);
    
    for (let i = 0; i < slackVariableCount; i++) {uniqueVariables.push('s' + i)};
    for (let i = 0; i < extraVariableCount; i++) {uniqueVariables.push('e' + i)};
    for (let i = 0; i < alternateVariableCount; i++) {uniqueVariables.push('a' + i)};
    uniqueVariables.push(objectiveVariable);

    let totalNewVariableCount = uniqueVariables.length - model[0].length;
    let tmp = Array.apply(null, Array(totalNewVariableCount)).map(Number.prototype.valueOf,0);;
    model.forEach(row => {row.push(...tmp)});

    let lePositions = equalities.reduce((a,b,i) =>{return b == '<=' ? a.concat(i) : a},[]);
    lePositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('s' + index);
        model[row][column] = 1;
    });

    let aPositions = equalities.reduce((a,b,i) =>{return b == '>=' || b == '=' ? a.concat(i) : a},[]);
    aPositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('a' + index);
        model[row][column] = 1;
    });

    let gePositions = equalities.reduce((a,b,i) =>{return b == '>=' ? a.concat(i) : a},[]);
    gePositions.forEach((row, index) => {
        let column = uniqueVariables.indexOf('e' + index);
        model[row][column] = -1;
    });

    model.forEach ((row, index) => {
        row[row.length - 1] = constraints[index];
    });

    return [model, uniqueVariables];

}