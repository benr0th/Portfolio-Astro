import * as ex from "excalibur"
import { Hero } from "../actors/Hero/hero"
import { Room } from "../actors/Room"
import { Images } from "../resources"
import { Teleporter } from "../actors/Teleporter"

const room = new Room({
    image: Images.mm6PortalRoom,
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

export class Coding extends ex.Scene {
    onInitialize(engine: ex.Engine): void {
        engine.add(room)
    }
}