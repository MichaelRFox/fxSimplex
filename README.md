# fxSimplex

fxSimplex is a small JavaScript library designed to perform linear optimization using the simplex method. 

## Installation

To install, issue the following command:

`npm install -l fxsimplex --save`

## Usage

Using ES6 syntax: `import {default as simplex} from 'fxsimplex';`

Or using node syntax: `var fxSimplex = require(fxsimplex.js);`

Note that source files are in two folders: *srcES6/* for the ES6 compatible source files, and *src/*, which contains transpiled ES modules. The *dist/* folder contains both minified and unminified versions in iife format.

fxSimplex exposes only one method: `simplex()` which takes two arguments, an objective and an array of constraints.

### simplex (objective, constraints)

* **objective** (string) - the objective function in the form of *'Maximize Z = 1x + 5y'*

* **constraints** (array) - an array of strings detailing the constraints in the form of *['x + y <= 4', '2x - y <= 7']*.

* **returns** (object) - an object containing the *solution* (an array of key value pairs for the basic variables and their coefficients in the form of *[["y", 10],["x", 10], ["Z", 20]]*), and the *result* - a string in the form of *['solved' | 'infeasible' | 'unbounded' | 'multiple solutions']*.

* **description** - variables may be any combination of letters and numbers or character strings (such as 'x0', 'y1', 'q', etc.) as long as they start with a letter and don't use the reserved variable syntax of 's0', 'e0', 'a0'. These are reserved for slack, extra, and alternate variables respectively. However, variables may start with the letters s, e, and a as long as they don't follow the reserved variable syntax (i.e., a number immediately following the first letter). The objective must start with the word *Maximize* or *Minimize* (case is irrelevant and *max* or *min* is fine too) and be followed by the variable name for the objective function, an equals sign, and a function to be optimized. Constraints must contain a function which uses either '<=', '>=', or '='. If the optimization is successful, the result will be either *solved* or *multiple solutions*, and the solution will contain optimal coefficients. If the result returns *infeasible* or *unbounded*, the optimization has failed and the coefficients returned in the solution will reflect the final tableau reached and not be optimal.

### Example

```javascript
import {default as simplex} from 'fxsimplex';

    let objective = 'Maximize Z = 3x + 2y';
    let constraints = ['2x + y <= 18',
                        '2x + 3y <= 42',
                        '3x + y <= 24'];

    console.log(simplex(objective, constraints));

...

output: {
        solution: [['y', 12], ['s2',3], ['x',3], ['Z', 33]],
        result: 'solved'};
```
## License

MIT


