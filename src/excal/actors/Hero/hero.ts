import * as ex from 'excalibur'
import heroAnimations, { animationMap } from './animations'

export class Hero extends ex.Actor {
    constructor(x: number, y: number) {
        super({
            x: x,
            y: y,
            width: 24,
            height: 24,
            collider: ex.Shape.Box(11, 22),
            scale: new ex.Vector(2, 2),
            collisionType: ex.CollisionType.Active,
        })
        this.graphics.use(heroAnimations.idleRight)
    }
}