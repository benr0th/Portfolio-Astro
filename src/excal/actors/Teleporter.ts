import * as ex from "excalibur";
import { Hero } from "./Hero/hero";
import heroAnimations, { animationMap } from "./Hero/animations";
import { HeroBullet } from "./Hero/heroBullet";

function removeOldHeroAddNew(
  engine: ex.Engine,
  sceneName: string,
  xy: [number, number]
) {
  // remove hero actor from scene and add to new one
  //@ts-ignore
  // prettier-ignore
  engine.currentScene.remove(engine.currentScene.actors.find((a) => a instanceof Hero));
  // remove all bullets from the scene
  //@ts-ignore
  // prettier-ignore
  engine.currentScene.actors.filter((a) => a instanceof HeroBullet).forEach((b) => b.kill());
  engine.goToScene(sceneName);
  //@ts-ignore
  // prettier-ignore
  // I should probably figure out why I need to do this twice but it works for now.
  engine.currentScene.remove(engine.currentScene.actors.find((a) => a instanceof Hero));

  const scenes = engine.scenes;
  const hero = new Hero(xy[0], xy[1]);
  if (sceneName !== "stageSelect") scenes[sceneName].add(hero);
  hero.vel = ex.vec(0, 0);
}

export class Teleporter extends ex.Actor {
  heroTouching: boolean = false;
  projectName: string;
  projectURL: string;
  sceneName: string | null;
  // pointerTouching: boolean;
  xy: [number, number] = [400, 100];
  constructor(
    x: number,
    y: number,
    projectName: string,
    projectURL: string,
    sceneName: string | null,
    xy: [number, number] = [400, 100]
  ) {
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
    this.sceneName = sceneName;
    this.graphics.opacity = 0;
    this.xy = xy;

    const projectLabel = new ProjectLabel(
      this.pos.x,
      this.pos.y - 80,
      projectName
    );

    this.on("collisionstart", (ev) => {
      if (ev.other instanceof Hero) {
        this.heroTouching = true;
        this.scene.add(projectLabel);
      }
    });

    this.on("collisionend", (ev) => {
      if (ev.other instanceof Hero) {
        projectLabel?.kill();
        this.heroTouching = false;
      }
    });

    this.update = (engine, delta) => {
      if (this.heroTouching && engine.input.keyboard.wasPressed(ex.Keys.Up)) {
        if (sceneName) {
          // this.scene.actors
          //   .find((a) => a instanceof Hero)
          //   ?.graphics.use(heroAnimations.teleport);
          // if (
          //   this.scene.actors
          //     .find((a) => a instanceof Hero)
          //     ?.graphics.use(heroAnimations.teleport).isPlaying
          // )

          removeOldHeroAddNew(engine, sceneName, xy);
        } else window.open(projectURL, "_blank");
      }
    };

    this.on("pointerenter", () => {
      if (this.heroTouching) return;

      this.emit("collisionstart", {
        other: this.scene.actors.find((a) => a instanceof Hero),
      });
      this.heroTouching = false;
    });

    this.on("pointerleave", () => {
      if (this.heroTouching) return;

      this.emit("collisionend", {
        other: this.scene.actors.find((a) => a instanceof Hero),
      });
      this.heroTouching = false;
    });

    this.on("pointerup", () => {
      if (sceneName) {
        removeOldHeroAddNew(this.scene.engine, sceneName, xy);
      } else window.open(projectURL, "_blank");
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
          offset: ex.vec(4, 4),
          color: ex.Color.Black,
        },
        textAlign: ex.TextAlign.Center,
      }),
      z: 3,
    });

    const background = new ex.Actor({
      pos: ex.vec(x, y),
      width: 200,
      height: 30,
      color: ex.Color.Black,
      z: 1,
    });

    this.text = text;
  }
}
