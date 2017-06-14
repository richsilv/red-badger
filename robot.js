function Robot ({ world, pos, dir }) {
  this.world = world
  this.pos = pos
  this.dir = dir
  this.lost = this.isOutOfBounds(this.pos)
}

Robot.prototype.isOutOfBounds = function (pos) {
  return pos[0] < 0 ||
    pos[0] > this.world.width ||
    pos[1] < 0 ||
    pos[1] > this.world.height
}

Robot.prototype.dirMap = {
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
  N: [0, 1]
}

Robot.prototype.dirOrder = Object.keys(Robot.prototype.dirMap)

Robot.prototype.forward = function () {
  if (this.lost) return

  const newPos = addVector(this.pos, this.dirMap[this.dir])
  if (this.isOutOfBounds(newPos)) {
    if (!this.world.lookupScent(this.pos)) {
      this.lost = true
      this.world.scents.push(Array.from(this.pos))
    }
  } else {
    this.pos = newPos
  }
}

Robot.prototype.turn = function (rotation) {
  if (this.lost) return

  const ind = this.dirOrder.indexOf(this.dir)

  let shift
  if (rotation === 'R') {
    shift = 1
  } else if (rotation === 'L') {
    shift = -1
  } else {
    throw new Error(`Unsupported rotation: "${rotation}"`)
  }

  const newInd = (ind + shift + 4) % 4
  this.dir = this.dirOrder[newInd]
}

Robot.prototype.processInstruction = function (instruction) {
  const action = this.methodMap[instruction]
  if (!action) throw new Error(`Unsupported instruction: ${instruction}`)

  const { method, args } = action
  this[method].apply(this, args)
}

// We can easily add new instructions by adding methods to the prototype (if necessary)
// and enumerating the related instructions here
Robot.prototype.methodMap = {
  'R': {
    method: 'turn',
    args: ['R']
  },
  'L': {
    method: 'turn',
    args: ['L']
  },
  'F': {
    method: 'forward'
  }
}

function addVector (vecA, vecB) {
  return vecA.map((val, ind) => val + vecB[ind])
}

module.exports = Robot
