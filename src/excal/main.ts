import * as ex from "excalibur"
import { loader } from "./resources.ts"
import { Hero } from "./actors/Hero/hero.ts"
import { MainMenu, StageSelect } from "./stages/mainMenu.ts"
import { TitleScreen } from "./stages/titleScreen.ts"
import nipplejs from "nipplejs"

const game = new ex.Engine({
  canvasElementId: "game",
  width: 800,
  height: 600,
  displayMode: ex.DisplayMode.FitContainer,
  fixedUpdateFps: 60,
  antialiasing: false,
  pointerScope: ex.PointerScope.Canvas,
  suppressPlayButton: true,
  backgroundColor: ex.Color.fromHex("#2131ef"),
})

ex.Physics.acc = new ex.Vector(0, 1600)

game.add("titleScreen", new TitleScreen())
game.add("mainMenu", new MainMenu())
game.goToScene("titleScreen")
// game.goToScene('mainMenu')

let font_file = new FontFace("MMRock9", "url(/fonts/MMRock9.woff)")

async function waitForFontLoad(timeout = 2000, interval = 100) {
  return new Promise((resolve, reject) => {
    // repeatedly poll check
    const poller = setInterval(async () => {
      try {
        await font_file.load()
      } catch (err) {
        reject(err)
      }
      if (font_file.status === "loaded") {
        clearInterval(poller)
        resolve(true)
      }
    }, interval)
    setTimeout(() => clearInterval(poller), timeout)
  })
}

// Load font before game start
await waitForFontLoad()

export let staticJoystick = nipplejs.create({
  zone: document.getElementById("joystick-zone") as HTMLElement,
  mode: "dynamic",
  // position: { left: "25%", top: "75%" },
  color: "white",
  shape: "circle",
  size: 100,
})

// #region Virtual Joystick
const arrowKeys = [ex.Keys.ArrowUp, ex.Keys.ArrowDown, ex.Keys.ArrowLeft, ex.Keys.ArrowRight]

function resetKeyOnJoystickMove(direction: ex.Keys) {
  for (const key of arrowKeys) {
    if (key !== direction) {
      game.input.keyboard.triggerEvent("up", key)
    }
  }
}

staticJoystick.on("move" as any, (evt: any, data: any) => {
  if (data.direction) {
    switch (data.direction.angle) {
      case "up":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowUp)
        resetKeyOnJoystickMove(ex.Keys.ArrowUp)
        break
      case "down":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowDown)
        resetKeyOnJoystickMove(ex.Keys.ArrowDown)
        break
      case "left":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowLeft)
        resetKeyOnJoystickMove(ex.Keys.ArrowLeft)
        break
      case "right":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowRight)
        resetKeyOnJoystickMove(ex.Keys.ArrowRight)
        break
    }
  }
})

staticJoystick.on("end" as any, () => {
  for (const key of arrowKeys) {
    game.input.keyboard.triggerEvent("up", key)
  }
})
// #endregion

// #region Virtual Buttons
const jumpButton = document.getElementById("a-button") as HTMLElement
// const attackButton = document.getElementById("b-button") as HTMLElement

jumpButton.addEventListener("click", () => {
  game.input.keyboard.triggerEvent("down", ex.Keys.Z)
  game.input.keyboard.triggerEvent("up", ex.Keys.Z)
  game.input.keyboard.triggerEvent("down", ex.Keys.Enter)
  game.input.keyboard.triggerEvent("up", ex.Keys.Enter)
})

// attackButton.addEventListener("touchstart", () => {
//   game.input.keyboard.triggerEvent("down", ex.Keys.X)
// })

// attackButton.addEventListener("touchend", () => {
//   game.input.keyboard.triggerEvent("up", ex.Keys.X)
// })
// game.input.keyboard.triggerEvent("down", ex.Keys.Enter)

game.start(loader).then(() => {
  // Start the game
  ex.AudioContextFactory.create()
})
