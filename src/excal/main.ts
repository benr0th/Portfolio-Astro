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
  mode: "static",
  position: { left: "10%", top: "95%" },
  color: "white",
  shape: "circle",
  size: 50,
})

// #region Virtual Joystick
// document.addEventListener("keydown", (e) => {
//   if (e.key === "ArrowUp") {
//     // game.input.keyboard.triggerEvent("down", ex.Keys.ArrowUp)
//     console.log("up")
//   }
//   if (e.key === "ArrowDown") {
//     // game.input.keyboard.triggerEvent("down", ex.Keys.ArrowDown)
//     console.log("down")
//   }
// })

staticJoystick.on("move" as any, (evt: any, data: any) => {
  if (data.direction) {
    if (data.direction.angle === "left") {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }))
      game.input.keyboard.triggerEvent("up", ex.Keys.ArrowLeft)
    }
    if (data.direction.angle === "right") {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      )
      game.input.keyboard.triggerEvent("up", ex.Keys.ArrowRight)
    }
    if (data.direction.angle === "up") {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }))
      game.input.keyboard.triggerEvent("up", ex.Keys.ArrowUp)
    }
    if (data.direction.angle === "down") {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))
      game.input.keyboard.triggerEvent("up", ex.Keys.ArrowDown)
    }
  }
})
// #endregion

const button = new ex.Actor({
  x: 600,
  y: 450,
  width: 50,
  height: 50,
  color: ex.Color.Blue,
  z: 10,
})

button.graphics.use(
  new ex.Circle({ radius: 50, color: ex.Color.Green, lineWidth: 5 })
)
button.on("pointerup", () => {
  game.input.keyboard.triggerEvent("up", ex.Keys.Enter)
})
game.add(button)

game.start(loader).then(() => {
  // Start the game
  ex.AudioContextFactory.create()
})
