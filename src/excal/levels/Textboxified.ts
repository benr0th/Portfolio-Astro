import * as ex from "excalibur"
import { Hero } from "../actors/Hero/hero"
import { Room } from "../actors/Room"
import { Images } from "../resources"
import { Teleporter } from "../actors/Teleporter"

const ui = document.getElementById("ui");

const room = new Room({
    image: Images.mm6PortalBossRoom1,
    x: 0,
    y: 0,
    scaleX: 3.15,
    scaleY: 2.7,
    floors: [
        // Floor
        {x: 0, y: 16.3, widthCells: 25, heightCells: 1},
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

export class Textboxified extends ex.Scene {
    onInitialize(engine: ex.Engine) {
        engine.add(new Teleporter(100, 470, '', '', 'coding', [350, 450]))
        // engine.add(new Teleporter(710, 470, 'Play', 'https://broth-studios.itch.io/gravibowl', null))
        engine.add(room)

        const description = new ex.Label({
            text: 'Cool text thingy.',
            x: 50,
            y: 200,
            color: ex.Color.White,
            font: new ex.Font({
                size: 20,
                family: 'MMRock9',
            }),
            z: 2,
        })

        engine.add(description)
    }
}