import * as ex from "excalibur"
import { Images } from "../resources"
import { staticJoystick } from "../main"

let selectedItemIndex = 0
let prevSelectedItemIndex = -1
let menuItems: ex.Actor[]

export class TitleScreen extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    // const title = new ex.Label({
    //   x: engine.halfDrawWidth,
    //   y: engine.halfDrawHeight - 100,
    //   text: "Ben Roth",
    //   color: ex.Color.White,
    //   font: new ex.Font({
    //     size: 48,
    //     family: "sans-serif",
    //     unit: ex.FontUnit.Px,
    //     textAlign: ex.TextAlign.Center,
    //     quality: 5,
    //   }),
    // });

    // const start = new ex.Label({
    //   x: engine.halfDrawWidth,
    //   y: engine.halfDrawHeight + 100,
    //   text: "Click to start",
    //   color: ex.Color.White,
    //   font: new ex.Font({
    //     size: 48,
    //     family: "sans-serif",
    //     unit: ex.FontUnit.Px,
    //     textAlign: ex.TextAlign.Center,
    //     quality: 5,
    //   }),
    // });

    const startButton = new ex.Actor({
      x: 280,
      y: 390,
      width: 250,
      height: 30,
      color: ex.Color.Transparent,
      z: 1,
      anchor: ex.vec(0, 0),
    })

    const passButton = new ex.Actor({
      x: 280,
      y: 450,
      width: 250,
      height: 30,
      color: ex.Color.Transparent,
      z: 1,
      anchor: ex.vec(0, 0),
    })

    const titleSelectorStart = new ex.Actor({
      x: 260,
      y: 410,
      width: 250,
      height: 30,
      color: ex.Color.Transparent,
      z: 1,
      scale: ex.vec(1.5, 1.5),
    })

    titleSelectorStart.graphics.use(Images.titleScreenArrow.toSprite())

    const titleSelectorPass = new ex.Actor({
      x: 260,
      y: 463,
      width: 250,
      height: 30,
      color: ex.Color.Red,
      z: 1,
      scale: ex.vec(1.5, 1.5),
    })

    titleSelectorPass.graphics.use(Images.titleScreenArrow.toSprite())

    startButton.on("pointerup", () => {
      engine.goToScene("mainMenu")
      ex.AudioContextFactory.create().resume()
    })

    startButton.on("pointerenter", () => {
      this.add(titleSelectorStart)
      this.remove(titleSelectorPass)
    })

    passButton.on("pointerenter", () => {
      this.add(titleSelectorPass)
      this.remove(titleSelectorStart)
    })

    this.add(new TitlePicture())

    menuItems = [startButton, passButton]

    for (const item of menuItems) {
      this.add(item)
      item.on("pointerenter", () => {
        selectedItemIndex = menuItems.indexOf(item)
      })
    }
  }

  update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta)

    if (selectedItemIndex !== prevSelectedItemIndex) {
      for (const item of menuItems) {
        if (menuItems.indexOf(item) === selectedItemIndex) {
          item.events.emit("pointerenter")
        }
      }
      prevSelectedItemIndex = selectedItemIndex
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Up)) {
      selectedItemIndex = Math.max(selectedItemIndex - 1, 0)
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Down)) {
      selectedItemIndex = Math.min(selectedItemIndex + 1, menuItems.length - 1)
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Enter)) {
      menuItems[selectedItemIndex].events.emit("pointerup")
    }

    // staticJoystick.on("move", (evt: any, data: any) => {
    //   if (data.direction) {
    //     if (data.direction.angle === "up") {
    //       selectedItemIndex = Math.max(selectedItemIndex - 1, 0)
    //     }
    //     if (data.direction.angle === "down") {
    //       selectedItemIndex = Math.min(
    //         selectedItemIndex + 1,
    //         menuItems.length - 1
    //       )
    //     }
    //   }
    // })
  }
}

class TitlePicture extends ex.Actor {
  constructor() {
    super({
      x: -75,
      y: 0,
      height: 1200,
      width: 850,
      anchor: ex.vec(0, 0),
      scale: ex.vec(0.75, 0.75),
    })
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(Images.titleScreenImg.toSprite())
  }
}
