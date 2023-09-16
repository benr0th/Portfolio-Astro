import * as ex from 'excalibur'
import { Floor } from './Floor';

interface RoomProps {
    x: number;
    y: number;
    image: ex.ImageSource;
    floors: any;
    objects: any;
    limits: any;
}

export class Room extends ex.Actor {
    floors: any;
    objects: any;
    limits: any;
    constructor({x, y, image, floors, objects, limits}: RoomProps) {
        super({
            anchor: ex.vec(0,0),
            pos: ex.vec(x, y),
            scale: ex.vec(3.15, 2.7),
        })

        this.floors = floors;
        this.objects = objects;
        this.limits = limits || [];
        
        const mapSprite = image.toSprite();
        this.graphics.use(mapSprite);
    }

    onInitialize(engine: ex.Engine): void {
        this.floors.forEach((f: any) => {
            const x = this.pos.x + f.x * 32;
            const y = this.pos.y + f.y * 32;

            const floor = new Floor(x, y, f.widthCells, f.heightCells);
            engine.add(floor)
        })
    }
}