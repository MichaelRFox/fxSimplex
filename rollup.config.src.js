import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'srcES6/index.js',
  output: {
    dir: 'src',
    name: 'index',
    strict: true,
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({'babelHelpers': 'bundled'})
	]
};