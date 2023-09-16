import * as ex from 'excalibur'
import { Hero } from '../actors/Hero/hero'
import { Room } from '../actors/Room'
import { Images } from '../resources'

const room = new Room({
    image: Images.mm3PortalRoom,
    x: 0,
    y: 0,
    floors: [
        // Ceiling
        {x: 0, y: 0, widthCells: 11, heightCells: 1.3},
        {x: 14.2, y: 0, widthCells: 11, heightCells: 1.3},
        // Left wall
        {x: 0, y: 0, widthCells: 1.5, heightCells: 20},
        // Right wall
        {x: 23.7, y: 0, widthCells: 1.5, heightCells: 20},
        // Middle portals
        {x: 9.4, y: 12, widthCells: 6.4, heightCells: 1.7},
        // Floor
        {x: 0, y: 16.1, widthCells: 30, heightCells: 1.5},
        // Far-left block
        {x: 4.75, y: 12.2, widthCells: 1.4, heightCells: 1.3},
        // Left block
        {x: 7.9, y: 8.1, widthCells: 1.4, heightCells: 1.3},
        // Right block
        {x: 15.8, y: 8.1, widthCells: 1.4, heightCells: 1.3},
        // Far-right block
        {x: 18.95, y: 12.2, widthCells: 1.4, heightCells: 1.3},
        // Bottom-left portal
        {x: 1.5, y: 10.8, widthCells: 3.2, heightCells: 2.9},
        // Left middle portal
        {x: 1.5, y: 5.4, widthCells: 3.2, heightCells: 2.8},
        // Left top portal
        {x: 1.5, y: 1.3, widthCells: 3.2, heightCells: 1.5},
        // Bottom-right portal
        {x: 20.5, y: 10.8, widthCells: 3.2, heightCells: 2.9},
        // Right middle portal
        {x: 20.4, y: 5.4, widthCells: 3.2, heightCells: 2.8},
        // Right top portal
        {x: 20.4, y: 1.3, widthCells: 3.2, heightCells: 1.5},
    ],
    objects: [],
    limits: [
        {x: 0, y: 0, widthCells: 20, heightCells: 12},
    ]
})

export class GameDev extends ex.Scene {
    onInitialize(engine: ex.Engine) {
        const hero = new Hero(400, 0)
        engine.add(hero)
        hero.z = 10

        engine.add(room)
    }
}

