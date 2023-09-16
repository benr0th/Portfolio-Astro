import * as ex from 'excalibur';

export class Floor extends ex.Actor {
    isFloor: boolean;
    constructor(x: number, y: number, cols: number, rows: number) {
        const SIZE = 16;

        super({
            name: 'Floor',  
            x: SIZE * cols,
            y: SIZE * rows,
            pos: ex.vec(x, y),
            scale: ex.vec(2, 2),
            anchor: ex.vec(0, 0),
            collider: ex.Shape.Box(SIZE * cols, SIZE * rows, ex.vec(0, 0)),
            collisionType: ex.CollisionType.Fixed,
            color: ex.Color.Green,
            width: SIZE * cols,
            height: SIZE * rows,
        })

        this.graphics.opacity = 0;
        this.isFloor = true;
        this.z = 20
    }
}