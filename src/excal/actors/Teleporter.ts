import * as ex from "excalibur"
import { Hero } from "./Hero/hero"

let heroTouching = false

export class Teleporter extends ex.Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: ex.vec(x, y),
      width: width,
      height: height,
      color: ex.Color.Orange,
      z: 10,
      collisionType: ex.CollisionType.Passive,
    })

    this.graphics.opacity = 0

    this.on("collisionstart", (ev) => {
      if (ev.other instanceof Hero) {
        const projectLabel = new ex.Label({
          text: "Gravibowl",
          pos: ex.vec(this.pos.x - 80, this.pos.y - 110),
          color: ex.Color.White,
          font: new ex.Font({
            size: 20,
            family: "MMRock9",
            shadow: {
              blur: 0,
              offset: ex.vec(5, 5),
              color: ex.Color.Black,
            },
          }),
          z: 100,
        })

        heroTouching = true
        this.scene.add(projectLabel)
      }
    })

    this.update = (engine, delta) => {
      if (heroTouching && engine.input.keyboard.wasPressed(ex.Keys.Up)) {
        window.open('https://play.google.com/store/apps/details?id=com.BRothStudios.Gravibowl&hl=en_US&gl=US', '_blank')
      }
    }

    this.on("collisionend", (ev) => {
      if (ev.other instanceof Hero) {
        this.scene.actors.find((a) => a instanceof ex.Label)?.kill()
        heroTouching = false
      }
    })
  }

}
