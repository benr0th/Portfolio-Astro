import * as ex from 'excalibur'
import { loader } from './resources'
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

ex.Physics.acc = new ex.Vector(0, 1500)

const mainMenu = new MainMenu()
mainMenu.add(new StageSelect)
game.add('titleScreen', new TitleScreen)
game.add('mainMenu', mainMenu)
game.goToScene('titleScreen')

const hero = new Hero(200, 200)
// game.add(hero)

game.start(loader).then(() => {
    // Start the game
    ex.AudioContextFactory.create()
})


