import * as ex from "excalibur"
import heroAnimations, { animationMap } from "./animations"
import { Sounds } from "@/excal/resources"
import { DirectionQueue } from "@/excal/classes/DirectionQueue"
import { staticJoystick } from "@/excal/main"

//MOVING SPEEDS
const WALKING_VELOCITY = 180
const JUMP_VELOCITY = -680
const LADDER_JUMP_VELOCITY = -200
const LADDER_CLIMB_VELOCITY = 100
const PAIN_PUSHBACK_VELOCITY = 50
const ROOM_TRANSITION_VELOCITY = 20
const MAX_FALLING_VELOCITY = 400

let isJumping = false
let canJump = false
let coyoteTime = 200
let coyoteTimer: number

let jumpBufferTime = 200
let jumpBufferTimer: number

let directionAdded = false

export class Hero extends ex.Actor {
  onGround: boolean
  directionQueue: DirectionQueue
  spriteDirection: string
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 24,
      height: 24,
      collider: ex.Shape.Box(11, 22),
      scale: new ex.Vector(2.5, 2.5),
      collisionType: ex.CollisionType.Active,
    })
    this.graphics.use(heroAnimations.idleRight)
    this.onGround = false
    this.directionQueue = new DirectionQueue()
    this.spriteDirection = "RIGHT"

    this.on("postcollision", (evt) => this.onPostCollision(evt))
  }

  onPostCollision(evt: ex.PostCollisionEvent<ex.Actor>) {
    //@ts-ignore
    if (evt.other.isFloor && evt.side === ex.Side.Bottom) {
      if (!this.onGround) {
        Sounds.LANDING.volume = 0.4
        Sounds.LANDING.play()
      }

      coyoteTimer = coyoteTime
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
    const JUMP_KEY = keys.Z

    // Left/Right key mapping
    const keyMappings: { key: ex.Keys; dir: string }[] = [
      { key: keys.Left, dir: "LEFT" },
      { key: keys.Right, dir: "RIGHT" },
    ]

    keyMappings.forEach((group) => {
      if (engine.input.keyboard.wasPressed(group.key)) {
        this.directionQueue.add(group.dir)
      }
      if (engine.input.keyboard.wasReleased(group.key)) {
        this.directionQueue.remove(group.dir)
      }
    })

    staticJoystick.on("move" as any, (evt: any, data: any) => {
      if (data.direction) {
        if (data.direction.angle === "left") {
          this.directionQueue.add(data.direction.angle.toUpperCase())
          this.directionQueue.remove("RIGHT")
        }
        if (data.direction.angle === "right") {
          this.directionQueue.add(data.direction.angle.toUpperCase())
          this.directionQueue.remove("LEFT")
        }
      }
    })

    staticJoystick.on("end" as any, () => {
      this.directionQueue.clear()
    })

    // Sync direction to keyboard input
    this.spriteDirection =
      this.directionQueue.getDirection() ?? this.spriteDirection

    // Reset ground state
    if (this.vel.y !== 0) {
      this.onGround = false
      coyoteTimer -= delta
    }

    // Horizontal movement
    this.vel.x = 0
    const dir = this.directionQueue.getDirection()
    if (dir) {
      this.vel.x = dir === "LEFT" ? -WALKING_VELOCITY : WALKING_VELOCITY
    }

    // Jump handler
    canJump = this.onGround
    if (keyboard.wasPressed(JUMP_KEY)) {
      coyoteTimer = 0
      jumpBufferTimer = jumpBufferTime
    }

    jumpBufferTimer -= delta

    if (jumpBufferTimer > 0 && coyoteTimer > 0) {
      this.vel.y = JUMP_VELOCITY
      isJumping = true
      jumpBufferTimer = 0
    }

    // Variable jump
    if (keyboard.wasReleased(JUMP_KEY) && this.vel.y < 0) {
      this.vel.y = 0
    }

    if (keyboard.wasReleased(JUMP_KEY)) {
      coyoteTimer = 0
    }
  }

  onPreUpdateAnimationLoop(delta: number) {
    // Facing direction
    let index = this.spriteDirection === "LEFT" ? 0 : 1

    if (!this.onGround) {
      this.graphics.use(animationMap["JUMP"][index])
      return
    }

    if (this.vel.x !== 0) {
      this.graphics.use(animationMap["RUN"][index])
      return
    }

    this.graphics.use(animationMap["IDLE"][index])
  }
}
