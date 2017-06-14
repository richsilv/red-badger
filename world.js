function World ([width, height]) {
  this.width = width
  this.height = height
  this.scents = []
}

World.prototype.lookupScent = function ([posX, posY]) {
  return this.scents.some(([scentX, scentY]) => (scentX === posX && scentY === posY))
}

module.exports = World
