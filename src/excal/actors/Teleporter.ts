import * as ex from "excalibur";
import { Hero } from "./Hero/hero";
import heroAnimations, { animationMap } from "./Hero/animations";

let pointerTouching = false;

export class Teleporter extends ex.Actor {
  projectName: string;
  projectURL: string;
  sceneName: string | null;
  heroTouching: boolean;
  constructor(
    x: number,
    y: number,
    projectName: string,
    projectURL: string,
    sceneName: string | null
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
    this.heroTouching = false;

    this.on("collisionstart", (ev) => {
      if (ev.other instanceof Hero) {
        this.heroTouching = true;
        this.scene.add(
          new ProjectLabel(this.pos.x, this.pos.y - 80, projectName)
        );
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
          engine.goToScene(sceneName);

          // remove hero actor from scene
          // add hero actor to new scene
          //@ts-ignore
          // prettier-ignore
          engine.currentScene.remove(engine.currentScene.actors.find((a) => a instanceof Hero));
          const scenes = engine.scenes;
          const hero = new Hero(400, 100);
          if (sceneName !== "stageSelect") scenes[sceneName].add(hero);

          hero.pos = ex.vec(400, 100);
          hero.vel = ex.vec(0, 0);
        } else window.open(projectURL, "_blank");
      }
    };

    this.on("collisionend", (ev) => {
      if (ev.other instanceof Hero) {
        this.scene.actors.find((a) => a instanceof ProjectLabel)?.kill();
        this.heroTouching = false;
      }
    });

    this.on("pointerenter", () => {
      if (this.heroTouching) return;
      this.scene.add(
        new ProjectLabel(this.pos.x, this.pos.y - 80, projectName)
      );
      pointerTouching = true;
    });

    this.on("pointerleave", () => {
      if (this.heroTouching) return;
      this.scene.actors.find((a) => a instanceof ProjectLabel)?.kill();
      pointerTouching = false;
    });

    this.on("pointerup", () => {
      if (sceneName) {
        this.scene.engine.goToScene(sceneName);
        // remove hero actor from scene
        // add hero actor to new scene
        //@ts-ignore
        // prettier-ignore
        this.scene.engine.currentScene.remove(this.scene.engine.currentScene.actors.find((a) => a instanceof Hero));
        const scenes = this.scene.engine.scenes;
        const hero = new Hero(400, 100);
        if (sceneName !== "stageSelect") scenes[sceneName].add(hero);

        hero.pos = ex.vec(400, 100);
        hero.vel = ex.vec(0, 0);
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
          offset: ex.vec(5, 5),
          color: ex.Color.Black,
        },
        textAlign: ex.TextAlign.Center,
      }),
      z: 100,
    });

    this.text = text;
  }
}
