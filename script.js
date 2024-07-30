var groundSprites
var ground_sprite_width = 50
var ground_sprite_height = 50
var numGroundSprites
var gravity = 0.3

var player

function setup() {
    createCanvas(400, 300)
    background(150, 200, 250)
    groundSprites = new Group()
    numGroundSprites = width / ground_sprite_width + 1

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n * 50, height - 25, ground_sprite_width, ground_sprite_height)
        groundSprites.add(groundSprite)
    }
    player = createSprite(100, height - 75, 50, 50)
}

function draw() {
    background(150, 200, 250)
    player.position.x += 5
    camera.position.x = player.position.x + width / 4
    var firstGroundSprite = groundSprites[0]
    if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
        groundSprites.remove(firstGroundSprite)
        firstGroundSprite.position.x += numGroundSprites * firstGroundSprite.width
        groundSprites.add(firstGroundSprite)
    }
    drawSprites()
}