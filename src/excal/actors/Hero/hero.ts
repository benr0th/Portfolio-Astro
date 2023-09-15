import * as ex from "excalibur"
import heroAnimations, { animationMap } from "./animations"

//MOVING SPEEDS
const WALKING_VELOCITY = 180
const JUMP_VELOCITY = -600
const LADDER_JUMP_VELOCITY = -200
const LADDER_CLIMB_VELOCITY = 100
const PAIN_PUSHBACK_VELOCITY = 50
const ROOM_TRANSITION_VELOCITY = 20
const MAX_FALLING_VELOCITY = 400

export class Hero extends ex.Actor {
  onGround: boolean
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
    this.onGround = false

    this.on("postcollision", (evt) => this.onPostCollision(evt))
  }

  onPostCollision(evt: ex.PostCollisionEvent<ex.Actor>) {
    //@ts-ignore
    if (evt.other.isFloor && evt.side === ex.Side.Bottom) {
      this.onGround = true
    }
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    // Do any physics things
    this.onPreUpdatePhysics(engine, delta)

    // Show correct frame for Mega Man's state
    this.onPreUpdateAnimationLoop(delta)
  }

  onPreUpdatePhysics(engine: ex.Engine, delta: number): void {
    const keyboard = engine.input.keyboard
    const keys = ex.Keys
    const JUMP_KEY = keys.X

    // Reset ground state
    if (this.vel.y !== 0) {
      this.onGround = false
    }

    // Jump handler
    const canJump = this.onGround
    if (keyboard.isHeld(JUMP_KEY) && canJump) {
      this.vel.y = JUMP_VELOCITY
    }
    // Variable jump
    if (keyboard.wasReleased(JUMP_KEY) && this.vel.y < 0) {
      this.vel.y = 0
    }
  }

  onPreUpdateAnimationLoop(delta: number) {
    let index = 1
    if (!this.onGround) {
      this.graphics.use(animationMap["JUMP"][index])
      return
    }
    this.graphics.use(animationMap["IDLE"][index])
  }
}
