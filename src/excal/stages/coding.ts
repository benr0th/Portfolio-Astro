import * as ex from "excalibur";
import { Hero } from "../actors/Hero/hero";
import { Room } from "../actors/Room";
import { Images } from "../resources";
import { Teleporter } from "../actors/Teleporter";
import { Textboxified } from "../levels/Textboxified";

const room = new Room({
  image: Images.mm6PortalRoom,
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
    { x: 23.6, y: 0, widthCells: 1, heightCells: 20 },
    // Ceiling
    { x: 0, y: 1.6, widthCells: 25, heightCells: 1 },
    // Left block
    { x: 4.7, y: 13.5, widthCells: 1.6, heightCells: 1.4 },
    // Middle block Left
    { x: 9.45, y: 9.45, widthCells: 1.6, heightCells: 1.4 },
    // Middle-top blocks
    { x: 11, y: 8.1, widthCells: 3.2, heightCells: 1.4 },
    // Middle block Right
    { x: 14.2, y: 9.45, widthCells: 1.6, heightCells: 1.4 },
    // Middle platform/portals
    { x: 9.45, y: 12.15, widthCells: 6.35, heightCells: 2.8 },
    // Right block
    { x: 18.9, y: 13.5, widthCells: 1.6, heightCells: 1.4 },
    // Bottom-left portal
    { x: 1.55, y: 12.2, widthCells: 3.2, heightCells: 2.8 },
    // Left middle portal
    { x: 1.55, y: 6.8, widthCells: 3.2, heightCells: 2.8 },
    // Left top portal
    { x: 1.55, y: 2.5, widthCells: 3.2, heightCells: 1.5 },
    // Bottom-right portal
    { x: 20.4, y: 12.2, widthCells: 3.2, heightCells: 2.8 },
    // Right middle portal
    { x: 20.4, y: 6.8, widthCells: 3.2, heightCells: 2.8 },
    // Right top portal
    { x: 20.4, y: 2.5, widthCells: 3.2, heightCells: 1.5 },
  ],
  objects: [],
  limits: [{ x: 0, y: 0, widthCells: 20, heightCells: 12 }],
});

export class Coding extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    // const hero = new Hero(400, 100)
    // hero.z = 1
    // engine.add(hero)
    engine.add("Textboxified", new Textboxified)

    this.addTeleporters();
    this.addTeleporterGlass();
    engine.add(room);
  }

  addTeleporters() {
    // Exit
    this.engine.add(new Teleporter(403, 180, "", "", "stageSelect"));

    // Levels
    this.engine.add(new Teleporter(100, 475, "Portfolio", "", "coding"));
    this.engine.add(new TeleporterLight(90, 400));

    this.engine.add(new Teleporter(350, 475, "Textboxified", "", "Textboxified"));
    this.engine.add(new TeleporterLight(342, 400));

    this.engine.add(new Teleporter(455, 475, "Playlist\nSearch", "", "coding"));
    this.engine.add(new TeleporterLight(444, 400));

    this.engine.add(new Teleporter(710, 475, "WinFixate", "", "coding"));
    this.engine.add(new TeleporterLight(695, 400));
    
    this.engine.add(new Teleporter(710, 300, "CoH\nRandomizer", "", "coding"));
    this.engine.add(new TeleporterLight(695, 227));
  }

  addTeleporterGlass() {
    const positions = [
      [53, 80],
      [53, 253],
      [53, 425],
      [306, 425],
      [406, 425],
      [658, 425],
      [658, 253],
      [658, 80],
    ];

    for (const [x, y] of positions) {
      this.engine.add(new TeleporterGlass(x, y));
    }
  }
}

class TeleporterLight extends ex.Actor {
    constructor(x: number, y: number) {
      super({
        pos: ex.vec(x, y),
        anchor: ex.vec(0, 0),
        width: 20,
        height: 9,
        color: ex.Color.White,
        z: 1,
      });
  
      this.actions.blink(133, 133, Infinity);
    }
  }

class TeleporterGlass extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      anchor: ex.vec(0, 0),
      width: 31,
      height: 32,
      scale: ex.vec(3.13, 2.7),
      z: 2,
    });

    this.graphics.use(Images.mm6PortalGlass.toSprite());
  }
}
