import * as ex from "excalibur"
import { Hero } from "../actors/Hero/hero"
import { Room } from "../actors/Room"
import { Images } from "../resources"
import { Teleporter } from "../actors/Teleporter"

const room = new Room({
    // insert coords here
    image: Images.editingImg,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    floors: [
        // floors
    ],
    objects: [],
    limits: [{ x: 0, y: 0, widthCells: 20, heightCells: 12 }],
})