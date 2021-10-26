/**
 * # fxSimplex
 * 
 * @author Michael.R.Fox, Ph.D. <fox.michael.r@gmail.com>
 * @copyright Michael R. Fox, Ph.D., 2020, 2021
 * @license MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the 'Software'), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sub-license, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software:
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. * 
 * @overview 
 * [![npm version](https://badge.fury.io/js/fxsimplex.svg)](https://badge.fury.io/js/fxsimplex)
 * ![npm bundle size](https://img.shields.io/bundlephobia/min/fxsimplex)
 * ![npm](https://img.shields.io/npm/dw/fxsimplex)
 * ![GitHub last commit](https://img.shields.io/github/last-commit/MichaelRFox/fxSimplex)
 * ![GitHub top language](https://img.shields.io/github/languages/top/MichaelRFox/fxSimplex)
 * ![NPM](https://img.shields.io/npm/l/fxsimplex)
 * 
 * fxSimplex is a small JavaScript library designed to perform linear optimization using either the
 * one-phase or two-phase simplex methods as appropriate.
 * 
 * ## Installation
 * 
 * To install, issue the following command:
 * 
 * ```bash
 * npm install -l fxsimplex --save
 * ```
 * 
 * ## Usage
 *
 * Include fxSimplex in your project in one of two ways:
 *
 * You can include a reference to the built version of the library:
 * 
 * ```html
 * <!DOCTYPE Html>
 *   <html>
 *       <head>
 *           <body>
 *               <script type = 'text/javascript' src = 'fxSimplex.min.js'></script>
 *               .
 *               <!--   or   -->
 *               .
 *               <script type = 'text/javascript' src = 'https://cdn.jsdelivr.net/npm/fxsimplex@latest/dist/fxSimplex.min.js'></script>
 *               .
 *           </body>
 *       </head>
 *   </html>
 * ````
 *
 * Or you may use ES6 syntax:
 * 
 * ```javascript
 * import {simplex} from 'node_modules/fxsimplex';
 * ```
 * 
 * if you use this option note that the source files are ES6 modules (unlike the distribution files which have been transpiled).
 * In this case, if you need to support older browsers you may want to edit your *.babelrc* file to specifically transpile fxSimplex:
 * 
 * ```json
 * {
 *      "exclude": "/node_modules\/(?!fxsimplex)/"
 * }
 * ```
 * 
 * fxSimplex exposes only one method: [simplex()]{@link module:simplex~simplex} which takes two arguments,
 * an objective and an array of constraints. The objective must be a string in the form of `Maximize Z = 1x + 5y`.
 * The objective must start with the word *Maximize* or *Minimize* (case is irrelevant and *max* or *min* is
 * fine too) and be followed by the variable name for the objective function, an equals sign, and a function
 * to be optimized.
 * 
 * The constraints are an array of strings in the in the form of `['x + y <= 4', '2x - y <= 7', ...]`.
 * Variables may be any combination of letters and numbers or character strings (such as 'x0', 'y1', 'q', etc.)
 * as long as they start with a letter and don't use the reserved variable syntax of 's0', 'e0', 'a0'.
 * These are reserved for slack, extra, and alternate variables respectively. However, variables may start with
 * the letters s, e, and a as long as they don't follow the reserved variable syntax (i.e., a number immediately
 * following the first letter). Constraints must contain a function which uses either '<=', '>=', or '='. 
 * 
 * fxSimplex returns an object with the solution (an array of key value pairs for the basic variables and their
 * coefficients in the form of `[['y', 10],['x', 10], ['Z', 20]], ...`) and a result: a string in the form of
 * `['solved' | 'infeasible' | 'unbounded' | 'multiple solutions']`. If the optimization is successful, the result
 * will be either *solved* or *multiple solutions*, and the solution will contain optimal coefficients. If the
 * result returns *infeasible* or *unbounded*, the optimization has failed and the coefficients returned in the
 * solution will reflect the final tableau reached and not be optimal.
 * 
 * If the constraints or objective are in the incorrect format, an error to the console will be
 * logged and fxSimplex will return an empty object {solution: [], result: ''}`.
 * 
 * ## Example
 * 
 * ```javascript
 * import {simplex} from 'fxsimplex';
 * 
 *      let objective = 'Maximize Z = 3x + 2y';
 *      let constraints = ['2x + y <= 18',
 *                         '2x + 3y <= 42',
 *                         '3x + y <= 24'];
 * 
 *     console.log(simplex(objective, constraints));
 * 
 * ...
 * 
 * output: {
 *         solution: [['y', 12], ['s2',3], ['x',3], ['Z', 33]],
 *         result: 'solved'};
 * ```
 */

export {simplex}  from './simplex';