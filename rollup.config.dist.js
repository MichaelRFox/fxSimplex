import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'srcES6/index.js',
  output: {
    name: 'fxSimplex',
    file: './dist/fxSimplex.js',
    strict: true,
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({'babelHelpers': 'bundled'})
	]
};