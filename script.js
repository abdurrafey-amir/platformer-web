var groundSprites
var ground_sprite_width = 50
var ground_sprite_height = 50
var numGroundSprites
var gravity = 0.3
var player
var jump = -5
var obstacleSprites
var gameOver
var score

function setup() {
    gameOver = false
    score = 0

    createCanvas(screen.width, screen.height - 190)
    background(150, 200, 250)
    groundSprites = new Group()
    numGroundSprites = width / ground_sprite_width + 1

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n * 50, height - 25, ground_sprite_width, ground_sprite_height)
        groundSprites.add(groundSprite)
    }
    player = createSprite(100, height - 75, 50, 50)

    obstacleSprites = new Group()
}

function draw() {
    if (gameOver) {
        background('#142F44')
        fill('#F6683B')
        textAlign(CENTER)
        text('Your score was: ' + score, camera.position.x, camera.position.y - 20)
        text('Game Over! Click anywhere to restart', camera.position.x, camera.position.y)
    } else {
    
        player.velocity.y = player.velocity.y + gravity
        
        if (groundSprites.overlap(player)) {
            player.velocity.y = 0
            player.position.y = height - 50 - player.height / 2
        }

        if (keyDown(UP_ARROW)) {
            player.velocity.y = jump
        }

        background(150, 200, 250)

        player.position.x += 5
        camera.position.x = player.position.x + width / 4
        var firstGroundSprite = groundSprites[0]

        if (firstGroundSprite.position.x <= camera.position.x - (width / 2 + firstGroundSprite.width / 2)) {
            groundSprites.remove(firstGroundSprite)
            firstGroundSprite.position.x += numGroundSprites * firstGroundSprite.width
            groundSprites.add(firstGroundSprite)
        }

        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, height - 50 - 15), 30, 30)

            obstacleSprites.add(obstacle)
        }

        var firstObstacle = obstacleSprites[0]
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width / 2 + firstObstacle.width / 2)) {
            removeSprite(firstObstacle)
        }

        obstacleSprites.overlap(player, endGame)

        drawSprites()
        score += 1
        textAlign(CENTER)
        text(score, camera.position.x, 20)
    }
}

function endGame() {
    gameOver = true
}

function mouseClicked() {
    if (gameOver) {
        for (var n = 0; n < numGroundSprites; n++) {
            var groundSprite = groundSprites[n]
            groundSprite.position.x = n * 50
        }
        
        player.position.x = 100
        player.position.y = height - 75
        
        obstacleSprites.removeSprites()

        score = 0
        gameOver = false
    }
}