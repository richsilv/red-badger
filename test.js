const Assert = require('assert')
const processInput = require('./process-input')

const input = `
5 3 
1 1 E 
RFRFRFRF 
 
3 2 N 
FRRFLLFFRRFLL 
 
0 3 W 
LLFFFLFLFL
`

const expectedOutput = `1 1 E
3 3 N LOST
2 3 S
`

Assert.equal(processInput(input), expectedOutput)

console.log('All tests passed!')
