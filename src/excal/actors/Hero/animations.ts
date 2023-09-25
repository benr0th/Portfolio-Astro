import * as ex from 'excalibur'
import { Images } from '../../resources.ts'

// #region Sprite sheets
const heroIdleSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroIdle,
    grid: {
        columns: 2,
        rows: 1,
        spriteWidth: 24,
        spriteHeight: 24,
    },
    spacing: {
        margin: {
            x: 1,
            y: 1
        }
    }
})

const heroRunSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroRun,
    grid: {
        columns: 3,
        rows: 1,
        spriteWidth: 24,
        spriteHeight: 24,
    },
    spacing: {
        margin: {
            x: 1,
            y: 1
        }
    }
})

const heroTeleportSpriteSheet = ex.SpriteSheet.fromImageSourceWithSourceViews({
    image: Images.heroTeleport,
    sourceViews: [
        {x: 0, y: 0, width: 8, height: 32},
        {x: 9, y: 6, width: 24, height: 24},
        {x: 34, y: 6, width: 24, height: 24},
    ]
})

export const eyeSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroEyes,
    grid: {
        columns: 3,
        rows: 3,
        spriteWidth: 32,
        spriteHeight: 32,
    },
    spacing: {
        margin: {
            x: 1,
            y: 1
        }
    }
})
// #endregion

// #region Animations
const idle = new ex.Animation({
    frames: [
        {
            graphic: heroIdleSpriteSheet.sprites[0],
            duration: 2000,
        },
        {
            graphic: heroIdleSpriteSheet.sprites[1],
            duration: 100,
        },
    ],
    strategy: ex.AnimationStrategy.Loop,
})

const idleRight = idle.clone()
idleRight.flipHorizontal = true

const jump = new ex.Animation({
    frames: [
        {
            graphic: Images.heroJump.toSprite(),
            duration: 200,
        },
    ],
})
const jumpRight = jump.clone()
jumpRight.flipHorizontal = true

// heroTeleportSpriteSheet.sprites[0].origin = ex.vec(0, 3)
const teleport = new ex.Animation({
    frames: [
        {
            graphic: heroTeleportSpriteSheet.sprites[0],
            duration: 100
        },
        {
            graphic: heroTeleportSpriteSheet.sprites[1],
            duration: 400
        },
        {
            graphic: heroTeleportSpriteSheet.sprites[0],
            duration: 300
        },
        {
            graphic: heroTeleportSpriteSheet.sprites[2],
            duration: 500
        },
    ],
    strategy: ex.AnimationStrategy.Freeze,
})

const teleportFalling = heroTeleportSpriteSheet.sprites[0]

// const run = ex.Animation.fromSpriteSheet(heroRunSpriteSheet, [0, 1, 2], 100)
const run1 = ex.Animation.fromSpriteSheet(heroRunSpriteSheet, [0], 200)
const run2 = ex.Animation.fromSpriteSheet(heroRunSpriteSheet, [1], 200)
const run3 = ex.Animation.fromSpriteSheet(heroRunSpriteSheet, [2], 200)

const runR1 = run1.clone()
runR1.flipHorizontal = true
const runR2 = run2.clone()
runR2.flipHorizontal = true
const runR3 = run3.clone()
runR3.flipHorizontal = true
// #endregion

const heroAnimations = {
    idle,
    idleRight,
    jump,
    jumpRight,
    teleport,
    teleportFalling,
    run1,
    run2,
    run3,
    runR1,
    runR2,
    runR3,
}

export const animationMap = {
    IDLE: [idle, idleRight],
    JUMP: [jump, jumpRight],
    RUN1: [run1, runR1],
    RUN2: [run2, runR2],
    RUN3: [run3, runR3],
}

export default heroAnimations