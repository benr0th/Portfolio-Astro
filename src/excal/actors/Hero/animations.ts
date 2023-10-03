import * as ex from 'excalibur'
import { Images } from '../../resources.ts'

// #region Sprite sheets
const heroSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroSheet,
    grid: {
      columns: 10,
      rows: 10,
      spriteWidth: 48,
      spriteHeight: 48,
    },
});

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

const heroShootSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroShoot,
    grid: {
        columns: 4,
        rows: 1,
        spriteWidth: 31,
        spriteHeight: 24,
    },
    spacing: {
        margin: {
            x: 4,
        }
    }
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
            graphic: heroSpriteSheet.sprites[0],
            duration: 2000,
        },
        {
            graphic: heroSpriteSheet.sprites[1],
            duration: 100,
        },
    ],
    strategy: ex.AnimationStrategy.Loop,
})

const idleRight = idle.clone()
idleRight.flipHorizontal = true

const idleShoot = ex.Animation.fromSpriteSheet(heroSpriteSheet, [10], 200)
const idleShootRight = idleShoot.clone()
idleShootRight.flipHorizontal = true

const jump = ex.Animation.fromSpriteSheet(heroSpriteSheet, [6], 200)
const jumpRight = jump.clone()
jumpRight.flipHorizontal = true

const jumpShoot = ex.Animation.fromSpriteSheet(heroSpriteSheet, [16], 200)
const jumpShootRight = jumpShoot.clone()
jumpShootRight.flipHorizontal = true

// heroTeleportSpriteSheet.sprites[0].origin = ex.vec(0, 3)
const teleport = new ex.Animation({
    frames: [
        {
            graphic: heroSpriteSheet.sprites[40],
            duration: 100
        },
        {
            graphic: heroSpriteSheet.sprites[41],
            duration: 400
        },
        {
            graphic: heroSpriteSheet.sprites[40],
            duration: 300
        },
        {
            graphic: heroSpriteSheet.sprites[42],
            duration: 500
        },
    ],
    strategy: ex.AnimationStrategy.Freeze,
})

const teleportFalling = heroSpriteSheet.sprites[40]

// const run = ex.Animation.fromSpriteSheet(heroRunSpriteSheet, [0, 1, 2], 100)
const run1 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [3], 200)
const run2 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [4], 200)
const run3 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [5], 200)

const runR1 = run1.clone()
runR1.flipHorizontal = true
const runR2 = run2.clone()
runR2.flipHorizontal = true
const runR3 = run3.clone()
runR3.flipHorizontal = true

const runS1 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [13], 200)
const runS2 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [14], 200)
const runS3 = ex.Animation.fromSpriteSheet(heroSpriteSheet, [15], 200)

const runSR1 = runS1.clone()
runSR1.flipHorizontal = true
const runSR2 = runS2.clone()
runSR2.flipHorizontal = true
const runSR3 = runS3.clone()
runSR3.flipHorizontal = true
// #endregion

const heroAnimations = {
    idle,
    idleRight,
    idleShoot,
    idleShootRight,
    jump,
    jumpRight,
    jumpShoot,
    jumpShootRight,
    teleport,
    teleportFalling,
    run1,
    run2,
    run3,
    runR1,
    runR2,
    runR3,
    runS1,
    runS2,
    runS3,
    runSR1,
    runSR2,
    runSR3,
}

export const animationMap = {
    IDLE: [idle, idleRight, idleShoot, idleShootRight],
    JUMP: [jump, jumpRight, jumpShoot, jumpShootRight],
    RUN1: [run1, runR1, runS1, runSR1],
    RUN2: [run2, runR2, runS2, runSR2],
    RUN3: [run3, runR3, runS3, runSR3],
}

export default heroAnimations