import * as ex from "excalibur"
import { Hero } from "../actors/Hero/hero"
import { Room } from "../actors/Room"
import { Images } from "../resources"
import { Teleporter } from "../actors/Teleporter"

const ui = document.getElementById("ui");

const room = new Room({
    image: Images.mm3PortalBossRoom1,
    x: 0,
    y: -50,
    scaleX: 3.15,
    scaleY: 2.7,
    floors: [
        // Floor
        {x: 0, y: 17.5, widthCells: 25, heightCells: 1},
        // Left wall
        {x: 0.5, y: 0, widthCells: 1, heightCells: 20},
        // Right wall
        {x: 23.8, y: 0, widthCells: 1, heightCells: 20},
        // Ceiling
        {x: 0, y: 1.6, widthCells: 25, heightCells: 1},
    ],
    objects: [],
    limits: [{ x: 0, y: 0, widthCells: 20, heightCells: 12 }],
})

export class Gravibowl extends ex.Scene {
    onInitialize(engine: ex.Engine) {
        const hero = new Hero(400, 100)
        engine.add(hero)
        hero.z = 10

        engine.add(new Teleporter(100, 470, '', '', 'gameDev', [150, 470]))
        engine.add(new Teleporter(710, 470, 'Play', 'https://broth-studios.itch.io/gravibowl', null))
        engine.add(room)

        const description = new ex.Label({
            text: 'A mobile game created with Unity. \nUse the power of gravity \nto fling your spaceship \ntoward the pins.',
            x: 50,
            y: 200,
            color: ex.Color.White,
            font: new ex.Font({
                size: 20,
                family: 'MMRock9',
            }),
            z: 2,
        })

        ui?.classList.add('gravibowl-gif')
        // add the Images.gravibowlGif to the DOM
        const gif = document.createElement('img')
        gif.src = Images.gravibowlGif.data.src
        gif.classList.add('absolute', 'top-[15%]', 'right-[25%]')
        // ui?.appendChild(gif)


        engine.add(description)
    }

    onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
        ui?.classList.remove('gravibowl-gif')
        ui?.querySelector('img')?.remove()
    }
}

