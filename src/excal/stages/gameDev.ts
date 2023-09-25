import * as ex from "excalibur";
import { Hero } from "../actors/Hero/hero";
import { Room } from "../actors/Room";
import { Images } from "../resources";
import { Teleporter } from "../actors/Teleporter";
import { Gravibowl } from "../levels/Gravibowl";
import heroAnimations from "../actors/Hero/animations";

const room = new Room({
  image: Images.mm3PortalRoom,
  x: 0,
  y: 0,
  scaleX: 3.13,
  scaleY: 2.7,
  floors: [
    // Ceiling
    { x: -0.2, y: 0, widthCells: 11, heightCells: 1.3 },
    { x: 14.2, y: 0, widthCells: 11, heightCells: 1.3 },
    // Left wall
    { x: 1.5, y: 0, widthCells: 1.5, heightCells: 20 },
    // Right wall
    { x: 22, y: 0, widthCells: 1.5, heightCells: 20 },
    // Middle portals
    { x: 9.4, y: 12.25, widthCells: 6.2, heightCells: 1.4 },
    // Floor
    { x: 0, y: 16.3, widthCells: 30, heightCells: 1.5 },
    // Left block
    { x: 6.3, y: 5.4, widthCells: 1.4, heightCells: 1.4 },
    // Middle block 1
    { x: 11, y: 8.15, widthCells: 1.4, heightCells: 1.3 },
    // Middle block 2
    { x: 12.5, y: 8.15, widthCells: 1.4, heightCells: 1.3 },
    // Far-right block
    { x: 17.25, y: 5.4, widthCells: 1.4, heightCells: 1.4 },
    // Bottom-left portal
    { x: 3, y: 10.8, widthCells: 3.2, heightCells: 2.9 },
    // Left middle portal
    { x: 3, y: 5.4, widthCells: 3.2, heightCells: 2.8 },
    // Left top portal
    { x: 3, y: 1.3, widthCells: 3.2, heightCells: 1.5 },
    // Bottom-right portal
    { x: 18.8, y: 10.8, widthCells: 3.2, heightCells: 2.9 },
    // Right middle portal
    { x: 18.8, y: 5.4, widthCells: 3.2, heightCells: 2.8 },
    // Right top portal
    { x: 18.8, y: 1.3, widthCells: 3.2, heightCells: 1.5 },
  ],
  objects: [],
  limits: [{ x: 0, y: 0, widthCells: 20, heightCells: 12 }],
});

export class GameDev extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    engine.add("Gravibowl", new Gravibowl());
    engine.add(new Teleporter(140, 485, "Gravibowl", "", "Gravibowl"));
    engine.add(new Teleporter(400, 250, "", "", "stageSelect"))
    engine.add(new TeleporterLight(135, 419));
    engine.add(room);
  }
}

class TeleporterLight extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      anchor: ex.vec(0, 0),
      width: 31,
      height: 5,
      color: ex.Color.Rose,
      z: 1,
    });

    this.actions.blink(133, 133, Infinity);
  }
}
