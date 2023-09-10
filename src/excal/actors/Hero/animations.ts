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