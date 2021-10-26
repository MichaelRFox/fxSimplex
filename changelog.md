# fxSimplex Change Log

:boom: - Feature

:hammer_and_wrench: - Improvement

:bug: - Bug

:pencil: - Documentation

:warning: - Breaking Change

# v2.0.0
## 26 Oct, 2021
- :warning: src files are now in ES6 module format. The files in the *dist/* folder are still transpiled.
- :pencil: Added docs.
- :hammer_and_wrench: Added additional tests.
- :bug: Updated dependancies to resolve vulnerabilities.
- :boom:  Added additional error checking of objective and constraint inputs

## v1.1.3
# 25 Sept, 2020
- :hammer_and_wrench: Added module definition in index.js - support for node resolution algorithm

## v1.1.2
# 25 Sept, 2020
- :hammer_and_wrench: Changed export declaration in index.js

## v1.1.1
# 23 Sept, 2020
- :hammer_and_wrench: Cleaned up .npmignore
- :hammer_and_wrench: Changed output file names in dist folder to fxSimplex.js and fxSimplex.min.js
- 
## v1.1.0
# 20 Sept, 2020
- :hammer_and_wrench: Corrections to README.MD
- :hammer_and_wrench: Ensure simplex returns {solution: [], result: ''} when supplied objective is blank or constraints is empty
- :hammer_and_wrench: Corrections to build and test scripts - src directory now contains transpiled ES modules

## v1.0.0
# 9 Aug, 2020 
- :boom: Inital commit



