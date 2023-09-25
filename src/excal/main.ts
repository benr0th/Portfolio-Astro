import * as ex from "excalibur";
import { loader } from "./resources.ts";
import { StageSelect } from "./stages/stageSelect.ts";
import { TitleScreen } from "./stages/titleScreen.ts";
import nipplejs from "nipplejs";
import { Gravibowl } from "./levels/Gravibowl.ts";
import { GameDev } from "./stages/gameDev.ts";
import { Coding } from "./stages/coding.ts";

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
});

ex.Physics.acc = new ex.Vector(0, 2000);

game.add("titleScreen", new TitleScreen());
game.add("stageSelect", new StageSelect());
game.add('gameDev', new GameDev)
game.add('coding', new Coding)
game.goToScene("titleScreen");

// DEBUG ONLY
// game.goToScene('stageSelect')
// game.add('Gravibowl', new Gravibowl)
// game.goToScene('Gravibowl')

// Wait for font to load
// Load font directly in this file, using CSS causes network error
// TODO: Find out why loading from CSS causes network error
let font_file = new FontFace("MMRock9", "url(/fonts/MMRock9.woff)");

async function waitForFontLoad(timeout = 2000, interval = 100) {
  return new Promise((resolve, reject) => {
    // repeatedly poll check
    const poller = setInterval(async () => {
      try {
        await font_file.load();
      } catch (err) {
        reject(err);
      }
      if (font_file.status === "loaded") {
        clearInterval(poller);
        resolve(true);
      }
    }, interval);
    setTimeout(() => clearInterval(poller), timeout);
  });
}

await waitForFontLoad();

// #region Mobile check
let isMobile = false;

function checkMobile(event: MediaQueryListEvent) {
  event.matches ? (isMobile = true) : (isMobile = false);
}
// Call checkMobile function once to handle the initial state
const isMobileMediaQuery = window.matchMedia("(max-width: 640px)");
//@ts-ignore
checkMobile(isMobileMediaQuery);

// Add event listener to track changes in the media query
isMobileMediaQuery.addEventListener("change", checkMobile);

if (isMobile) {
  document.getElementById("joystick-zone")?.classList.remove("hidden");
  document.getElementById("button-zone")?.classList.remove("hidden");
  document.getElementById("a-button")?.classList.remove("hidden");
  // document.getElementById("b-button")?.classList.remove("hidden");
} else {
  document.getElementById("joystick-zone")?.classList.add("hidden");
  document.getElementById("button-zone")?.classList.add("hidden");
  document.getElementById("a-button")?.classList.add("hidden");
  // document.getElementById("b-button")?.classList.add("hidden");
}
//#endregion

// #region Virtual Joystick
export let staticJoystick = nipplejs.create({
  zone: document.getElementById("joystick-zone") as HTMLElement,
  mode: "dynamic",
  // position: { left: "25%", top: "75%" },
  color: "white",
  shape: "circle",
  size: 100,
});

const arrowKeys = [
  ex.Keys.ArrowUp,
  ex.Keys.ArrowDown,
  ex.Keys.ArrowLeft,
  ex.Keys.ArrowRight,
];

function resetKeyOnJoystickMove(direction: ex.Keys) {
  for (const key of arrowKeys) {
    if (key !== direction) {
      game.input.keyboard.triggerEvent("up", key);
    }
  }
}

staticJoystick.on("move" as any, (evt: any, data: any) => {
  if (data.direction) {
    switch (data.direction.angle) {
      case "up":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowUp);
        resetKeyOnJoystickMove(ex.Keys.ArrowUp);
        break;
      case "down":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowDown);
        resetKeyOnJoystickMove(ex.Keys.ArrowDown);
        break;
      case "left":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowLeft);
        resetKeyOnJoystickMove(ex.Keys.ArrowLeft);
        break;
      case "right":
        game.input.keyboard.triggerEvent("down", ex.Keys.ArrowRight);
        resetKeyOnJoystickMove(ex.Keys.ArrowRight);
        break;
    }
  }
});

staticJoystick.on("end" as any, () => {
  for (const key of arrowKeys) {
    game.input.keyboard.triggerEvent("up", key);
  }
});
// #endregion

// #region Virtual Buttons
const jumpButton = document.getElementById("a-button") as HTMLElement;
// const attackButton = document.getElementById("b-button") as HTMLElement

jumpButton.addEventListener("touchstart", () => {
  game.input.keyboard.triggerEvent("down", ex.Keys.Z);
  game.input.keyboard.triggerEvent("down", ex.Keys.Enter);
});

jumpButton.addEventListener("touchend", () => {
  game.input.keyboard.triggerEvent("up", ex.Keys.Z);
  game.input.keyboard.triggerEvent("up", ex.Keys.Enter);
});

// attackButton.addEventListener("touchstart", () => {
//   game.input.keyboard.triggerEvent("down", ex.Keys.X)
// })

// attackButton.addEventListener("touchend", () => {
//   game.input.keyboard.triggerEvent("up", ex.Keys.X)
// })
// game.input.keyboard.triggerEvent("down", ex.Keys.Enter)
// #endregion

game.start(loader).then(() => {
  // Start the game
  ex.AudioContextFactory.create();
});
