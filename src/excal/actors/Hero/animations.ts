import * as ex from 'excalibur'
import { Images } from '../../resources.ts'

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

const heroAnimations = {
    idle,
    idleRight,
    jump,
    jumpRight,
}

export const animationMap = {
    IDLE: [idle, idleRight],
    JUMP: [jump, jumpRight],
}

export default heroAnimations