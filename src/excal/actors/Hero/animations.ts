import * as ex from 'excalibur'
import { Images } from '../../resources.ts'

const heroSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Images.heroIdle,
    grid: {
        columns: 2,
        rows: 1,
        spriteWidth: 24,
        spriteHeight: 24,
    },
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

const idle = ex.Animation.fromSpriteSheet(heroSpriteSheet, [0, 1], 500)
const idleRight = idle.clone()
idleRight.flipHorizontal = true

const heroAnimations = {
    idle,
    idleRight,
}

export const animationMap = {
    IDLE: [idle, idleRight],
}

export default heroAnimations