import * as ex from "excalibur";
import { Hero } from "./Hero/hero";

let heroTouching = false;
let pointerTouching = false;

export class Teleporter extends ex.Actor {
  projectName: string;
  projectURL: string;
  constructor(x: number, y: number, projectName: string, projectURL: string) {
    super({
      pos: ex.vec(x, y),
      width: 100,
      height: 90,
      color: ex.Color.Red,
      z: 10,
      collisionType: ex.CollisionType.Passive,
    });

    this.projectName = projectName;
    this.projectURL = projectURL;
    this.graphics.opacity = 0;

    this.on("collisionstart", (ev) => {
      if (ev.other instanceof Hero) {
        heroTouching = true;
        this.scene.add(
          new ProjectLabel(this.pos.x - 80, this.pos.y - 80, projectName)
        );
      }
    });

    this.update = (engine, delta) => {
      if (heroTouching && engine.input.keyboard.wasPressed(ex.Keys.Up)) {
        window.open(projectURL, "_blank");
      }
    };

    this.on("collisionend", (ev) => {
      if (ev.other instanceof Hero) {
        this.scene.actors.find((a) => a instanceof ex.Label)?.kill();
        heroTouching = false;
      }
    });

    this.on("pointerenter", () => {
      if (heroTouching) return;
      this.scene.add(
        new ProjectLabel(this.pos.x - 80, this.pos.y - 80, projectName)
      );
      pointerTouching = true;
    });

    this.on("pointerleave", () => {
      if (heroTouching) return;
      this.scene.actors.find((a) => a instanceof ex.Label)?.kill();
      pointerTouching = false;
    });

    this.on("pointerup", () => {
      window.open(projectURL, "_blank");
    });
  }
}

class ProjectLabel extends ex.Label {
  constructor(x: number, y: number, text: string) {
    super({
      pos: ex.vec(x, y),
      color: ex.Color.White,
      font: new ex.Font({
        size: 20,
        family: "MMRock9",
        shadow: {
          blur: 0,
          offset: ex.vec(5, 5),
          color: ex.Color.Black,
        },
      }),
      z: 100,
    });

    this.text = text;
  }
}
