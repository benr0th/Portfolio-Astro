import * as ex from 'excalibur'
import { Hero } from '../actors/Hero/hero'
import { Floor } from '../actors/Floor'

export class portalRoom extends ex.Scene {
    onInitialize(engine: ex.Engine) {

        const hero = new Hero(200, 200)
        this.add(hero)

        const floor = new Floor(1, 440, 20, 1)
        this.add(floor)
    }
}

