function create_sprite_fun () {
    Ball = game.createSprite(2, 2)
    Racket = game.createSprite(2, 4)
    Direction2 = BallDirTable[randint(0, 4)]
    Ball.set(LedSpriteProperty.Direction, Direction2)
}
function EndTableTennis () {
    Ball.delete()
    Racket.delete()
    Score = 0
}
input.onButtonPressed(Button.AB, function () {
    if (StartNow == OFF) {
        EndTableTennis()
        StartNow = ON
        StartTime = input.runningTime()
    } else {
        StartNow = OFF
        EndTableTennis()
    }
})
let EndTime = 0
let StartTime = 0
let Score = 0
let Direction2 = 0
let Racket: game.LedSprite = null
let Ball: game.LedSprite = null
let BallDirTable: number[] = []
let StartNow = 0
let ON = 0
let OFF = 0
led.setBrightness(80)
OFF = 0
ON = 1
StartNow = OFF
BallDirTable = [
0,
45,
90,
135,
180
]
while (StartNow == OFF) {
    basic.showLeds(`
        . # . # .
        # . # . #
        # . # . #
        . # . # .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (StartNow) {
            Racket.move(-1)
        }
        basic.pause(100)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        if (StartNow) {
            Racket.move(1)
        }
        basic.pause(100)
    }
})
basic.forever(function () {
    create_sprite_fun()
    while (StartNow) {
        Ball.move(1)
        if (Ball.isTouching(Racket)) {
            Direction2 = Direction2 + 180
            Ball.set(LedSpriteProperty.Direction, Direction2)
            Ball.set(LedSpriteProperty.Y, Ball.get(LedSpriteProperty.Y) - 1)
        } else {
            if (Ball.isTouchingEdge()) {
                Direction2 = Direction2 + BallDirTable[randint(0, 4)]
                Ball.set(LedSpriteProperty.Direction, Direction2)
            }
        }
        if (Ball.get(LedSpriteProperty.Y) == 4) {
            StartNow = OFF
            EndTime = input.runningTime()
            Score = Math.idiv(EndTime - StartTime, 1000)
            basic.showNumber(Score)
        }
        basic.pause(300)
    }
})
