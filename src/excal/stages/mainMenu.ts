import * as ex from 'excalibur'
import { Images } from '../resources'

const ui = document.getElementById('ui')

export class MainMenu extends ex.Scene {
    onActivate(_context: ex.SceneActivationContext<unknown>): void {
        ui?.classList.add('mainMenu')

        const startButton = document.createElement('button')
        startButton.className = 'button button--webdev'
        startButton.innerText = 'WEB DEV'
        startButton.onclick = () => {
            this.engine.goToScene('webDev')
        }
        ui?.appendChild(startButton)
    }

    onDeactivate(): void {
        ui?.classList.remove('mainMenu')
        ui!.innerHTML = ''
    }
}

export class StageSelect extends ex.Actor {
    constructor() {
        super({
            anchor: ex.Vector.Zero,
            x: 145,
            y: 105,
            width: 800,
            height: 600,
            scale: new ex.Vector(.85, .85),
        })
    }

    onInitialize(_engine: ex.Engine): void {
        this.graphics.use(Images.stageSelectImg.toSprite())
    }
}