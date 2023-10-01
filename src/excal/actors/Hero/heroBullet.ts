import * as ex from "excalibur";
import { Images } from "@/excal/resources";

const BULLET_VEL = 600;

const lemonSprite = Images.heroBullet.toSprite();

export class HeroBullet extends ex.Actor {
  direction: string;
  constructor(x: number, y: number, direction: string) {
    super({
      x: x,
      y: y,
      width: 8,
      height: 4,
      scale: ex.vec(2, 2),
      color: ex.Color.DarkGray,
      collider: ex.Shape.Box(8, 4, ex.Vector.Zero),
      collisionType: ex.CollisionType.Passive,
    });

    this.graphics.use(lemonSprite);
    this.direction = direction
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    this.vel.x =
        this.direction === "LEFT" ? -BULLET_VEL : BULLET_VEL;
  }

  onPostUpdate() {
    if (this.isOffScreen) {
      this.kill();
    }
  }

  onInitialize(_engine: ex.Engine): void {
      this.addTag("HERO_BULLET")
  }
}