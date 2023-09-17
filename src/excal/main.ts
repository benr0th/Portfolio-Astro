import * as ex from 'excalibur'
import { loader } from './resources.ts'
import { Hero } from './actors/Hero/hero.ts'
import { MainMenu, StageSelect } from './stages/mainMenu.ts'
import { TitleScreen } from './stages/titleScreen.ts'

const game = new ex.Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    displayMode: ex.DisplayMode.FitContainer,
    fixedUpdateFps: 60,
    antialiasing: false,
    pointerScope: ex.PointerScope.Canvas,
    suppressPlayButton: true,
    backgroundColor: ex.Color.fromHex('#2131ef'),
})

ex.Physics.acc = new ex.Vector(0, 1600)

game.add('titleScreen', new TitleScreen)
game.add('mainMenu', new MainMenu)
game.goToScene('titleScreen')
// game.goToScene('mainMenu')

let font_file = new FontFace('MMRock9', 'url(/fonts/MMRock9.woff)');

async function waitForFontLoad(font: string, timeout = 2000, interval = 100) {
    return new Promise((resolve, reject) => {
      // repeatedly poll check
      const poller = setInterval(async () => {
        try {
          await font_file.load();
        } catch (err) {
          reject(err);
        }
        if (font_file.status === 'loaded') {
          clearInterval(poller);
          resolve(true);
        }
      }, interval);
      setTimeout(() => clearInterval(poller), timeout);
    });
  }
  
// Load font before game start
await waitForFontLoad('18px MMRock9');

game.start(loader).then(() => {
    // Start the game
    ex.AudioContextFactory.create()
})
