import * as ex from "excalibur";
import { Images, Sounds } from "../resources";
import { staticJoystick } from "../main";

let selectedItemIndex = 0;
let prevSelectedItemIndex = -1;
let menuItems: ex.Actor[];

export class TitleScreen extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const startButton = new ex.Actor({
      x: 280,
      y: 390,
      width: 250,
      height: 30,
      z: 1,
      anchor: ex.vec(0, 0),
    });

    const passButton = new ex.Actor({
      x: 280,
      y: 450,
      width: 250,
      height: 30,
      color: ex.Color.Transparent,
      z: 1,
      anchor: ex.vec(0, 0),
    });

    const titleSelectorStart = new ex.Actor({
      x: 260,
      y: 410,
      width: 250,
      height: 30,
      color: ex.Color.Transparent,
      z: 1,
      scale: ex.vec(1.5, 1.5),
    });

    titleSelectorStart.graphics.use(Images.titleScreenArrow.toSprite());

    const titleSelectorPass = new ex.Actor({
      x: 260,
      y: 463,
      width: 250,
      height: 30,
      color: ex.Color.Red,
      z: 1,
      scale: ex.vec(1.5, 1.5),
    });

    titleSelectorPass.graphics.use(Images.titleScreenArrow.toSprite());

    const blackout = new ex.Actor({
      x: 400,
      y: 220,
      width: 500,
      height: 100,
      color: ex.Color.Black,
      z: 1,
    });

    // this.add(blackout);

    startButton.on("pointerup", () => {
      ex.AudioContextFactory.create().resume();
      Sounds.CHOOSE.play(0.2).then(() => {
        engine.goToScene("stageSelect");
      });
    });

    const selectConditions = () => {
      return (
        selectedItemIndex !== prevSelectedItemIndex &&
        prevSelectedItemIndex !== -1 &&
        !Sounds.CHOOSE.isPlaying()
      );
    };

    startButton.on("pointerenter", () => {
      if (selectConditions()) Sounds.SELECT.play(0.1);
      this.add(titleSelectorStart);
      if (titleSelectorPass) this.remove(titleSelectorPass);
    });

    passButton.on("pointerenter", () => {
      if (selectConditions()) Sounds.SELECT.play(0.1);
      this.add(titleSelectorPass);
      if (titleSelectorStart) this.remove(titleSelectorStart);
    });

    this.add(new TitlePicture());

    menuItems = [startButton, passButton];

    for (const item of menuItems) {
      this.add(item);
      item.on("pointerenter", () => {
        selectedItemIndex = menuItems.indexOf(item);
      });
    }
  }

  update(engine: ex.Engine, delta: number): void {
    if (Sounds.CHOOSE.isPlaying()) return;
    
    super.update(engine, delta);
    if (selectedItemIndex !== prevSelectedItemIndex) {
      for (const item of menuItems) {
        if (menuItems.indexOf(item) === selectedItemIndex) {
          item.events.emit("pointerenter");
        }
      }
      prevSelectedItemIndex = selectedItemIndex;
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Up)) {
      selectedItemIndex = Math.max(selectedItemIndex - 1, 0);
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Down)) {
      selectedItemIndex = Math.min(selectedItemIndex + 1, menuItems.length - 1);
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Enter)) {
      menuItems[selectedItemIndex].events.emit("pointerup");
    }
  }
}

class TitlePicture extends ex.Actor {
  constructor() {
    super({
      x: -75,
      y: 0,
      height: 1200,
      width: 850,
      anchor: ex.vec(0, 0),
      scale: ex.vec(0.75, 0.75),
      // color: ex.Color.Black,
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(Images.titleScreenImg.toSprite());
  }
}
