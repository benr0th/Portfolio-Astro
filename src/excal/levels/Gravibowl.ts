import * as ex from "excalibur";
import { Hero } from "../actors/Hero/hero";
import { Room } from "../actors/Room";
import { Images } from "../resources";
import { Teleporter } from "../actors/Teleporter";
import { HeroBullet } from "../actors/Hero/heroBullet";

const ui = document.getElementById("ui");

const room = new Room({
  image: Images.mm3PortalBossRoom1,
  x: 0,
  y: -50,
  scaleX: 3.15,
  scaleY: 2.7,
  floors: [
    // Floor
    { x: 0, y: 17.6, widthCells: 25, heightCells: 1 },
    // Left wall
    { x: 0.5, y: 0, widthCells: 1, heightCells: 20 },
    // Right wall
    { x: 23.8, y: 0, widthCells: 1, heightCells: 20 },
    // Ceiling
    { x: 0, y: 1.6, widthCells: 25, heightCells: 1 },
  ],
  objects: [],
  limits: [{ x: 0, y: 0, widthCells: 20, heightCells: 12 }],
});

export class Gravibowl extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    engine.add(new Teleporter(100, 470, "", "", "gameDev", [150, 470]));
    // engine.add(new Teleporter(710, 470, 'Play', 'https://broth-studios.itch.io/gravibowl', null))
    engine.add(room);

    const description = new ex.Label({
      text: "A mobile game created with Unity. \nUse the power of gravity \nto fling your spaceship \ntoward the pins.",
      x: 50,
      y: 200,
      color: ex.Color.White,
      font: new ex.Font({
        size: 20,
        family: "MMRock9",
      }),
      z: 2,
    });

    engine.add(description);

    const boss = new ex.Actor({
      x: 680,
      y: 480,
      width: 29,
      height: 28,
      color: ex.Color.Red,
      z: 1,
      scale: new ex.Vector(2.5, 2.5),
    });

    const bossLabel = new ex.Label({
      text: "Go To Project",
      x: 580,
      y: 440,
      color: ex.Color.White,
      font: new ex.Font({
        size: 16,
        family: "MMRock9",
        shadow: {
            blur: 0,
            offset: ex.vec(4, 4),
            color: ex.Color.Black,
            },
      }),
      z: 2,
    });
    engine.add(bossLabel);

    const bossPoseSheet = ex.SpriteSheet.fromImageSource({
        image: Images.geminiManPose,
        grid: {
            rows: 1,
            columns: 3,
            spriteWidth: 29,
            spriteHeight: 28,
        },
        spacing: {
            margin: {
                x: 4,
                y: 0
            }
        }
    })

    const bossBeginAnim = new ex.Animation({
        frames: [
            {
                graphic: Images.geminiMan.toSprite(),
                duration: 700
            },
            {
                graphic: Images.geminiManShoot.toSprite(),
                duration: 1300
            },
            {
                graphic: bossPoseSheet.sprites[0],
                duration: 200
            },
            {
                graphic: bossPoseSheet.sprites[1],
                duration: 200
            },
            {
                graphic: bossPoseSheet.sprites[2],
                duration: 500
            },
            {
                graphic: Images.geminiMan.toSprite(),
                duration: 200
            }
        ],
        strategy: ex.AnimationStrategy.Freeze
    })
    boss.graphics.use(bossBeginAnim)

    boss.on("collisionstart", (e: ex.CollisionStartEvent) => {
      if (e.other.hasTag("HERO_BULLET")) {
        engine.currentScene.actors
          .filter((a) => a instanceof HeroBullet)
          .forEach((a) => a.kill());
        window.open("https://broth-studios.itch.io/gravibowl", "_blank");
      }
    });

    boss.on("pointerdown", () => {
        const hero = engine.currentScene.actors.find((a) => a instanceof Hero) as Hero;
        hero.shootBullet(engine);
    })

    engine.add(boss);

    ui?.classList.add("gravibowl-gif");
    // add the Images.gravibowlGif to the DOM
    const gif = document.createElement("img");
    gif.src = Images.gravibowlGif.data.src;
    gif.classList.add("absolute", "top-[15%]", "right-[25%]");
    // ui?.appendChild(gif)
  }

  onDeactivate(_context: ex.SceneActivationContext<undefined>): void {
    ui?.classList.remove("gravibowl-gif");
    ui?.querySelector("img")?.remove();
  }
}
