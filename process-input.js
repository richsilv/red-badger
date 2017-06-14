const Robot = require('./robot')
const World = require('./world')

function processInput (input) {
  const lines = input.replace('\r', '').split('\n').filter((line) => line.replace(' ', ''))
  const worldDetails = lines.shift().split(' ').map((num) => parseInt(num, 10))
  if (worldDetails.some((v) => v > 50)) throw new Error('Maximum coordinate value is 50')
  const world = new World(worldDetails)

  const robots = []

  while (lines.length) {
    const robotDetails = lines.shift().split(' ')
    const instructions = lines.shift().replace(' ', '').split('')
    const pos = robotDetails.slice(0, 2).map((num) => parseInt(num, 10))
    const dir = robotDetails[2]

    if (pos.some((v) => v > 50)) throw new Error('Maximum coordinate value is 50')
    if (Robot.prototype.dirOrder.indexOf(dir) === -1) throw new Error(`Unrecognised initial direction for robot: ${dir}`)
    if (instructions.length > 100) throw new Error('Instructions list is too long (> 100)')

    const robot = new Robot({ world, pos, dir })
    instructions.forEach((instruction) => robot.processInstruction(instruction))
    robots.push(robot)
  }

  return robots.reduce((output, robot) => {
    output += robot.pos.join(' ')
    output += ` ${robot.dir}`
    if (robot.lost) {
      output += ' LOST'
    }
    return output.concat('\n')
  }, '')
}

module.exports = processInput
