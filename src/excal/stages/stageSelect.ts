import * as ex from "excalibur";
import { Images, Sounds } from "../resources";
import { eyeSpriteSheet } from "../actors/Hero/animations";
import { GameDev } from "./gameDev";
import { staticJoystick } from "../main";
import { Hero } from "../actors/Hero/hero";

const ui = document.getElementById("ui");
let selectedMenuItem: stageSelector;
let menuItems: stageSelector[][];
// Initial selected menu item index
let selectedMenuItemIndex = [1, 1];
let effect: selectEffect | null = null;
// Initialize with invalid indices
let prevSelectedItemIndex = [-1, -1];
let joystickSelected = false;

class stageLabel extends ex.Label {
  constructor(x: number, y: number, text: string) {
    super({
      x,
      y,
      text,
      color: ex.Color.White,
      font: new ex.Font({
        size: 18,
        family: "MMRock9",
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center,
        quality: 5,
      }),
    });
  }
}

class stageSelector extends ex.Actor {
  selectedScene: string;
  spriteToUse: ex.ImageSource | null;
  spriteScale: ex.Vector | null;
  constructor(
    x: number,
    y: number,
    selectedScene: string,
    spriteToUse: ex.ImageSource | null,
    spriteScale: ex.Vector | null
  ) {
    super({
      x,
      y,
      width: 147,
      height: 147,
      color: ex.Color.Transparent,
      scale: new ex.Vector(0.75, 0.75),
      z: -1
    });

    this.selectedScene = selectedScene;
    this.spriteToUse = spriteToUse;
    this.spriteScale = spriteScale;
  }

  resetHero() {
    this.scene.engine.currentScene.actors
      .find((a) => a instanceof Hero)
      ?.kill();
    const hero = new Hero(400, 100);
    if (this.scene !== this.scene.engine.currentScene)
      this.scene.engine.add(hero);
    hero.pos = ex.vec(400, 100);
    hero.vel = ex.vec(0, 0);
  }

  onInitialize(engine: ex.Engine): void {
    this.on("pointerup", () => {
      if (Sounds.CHOOSE.isPlaying()) return;
      Sounds.CHOOSE.play(0.2).then(() => {
        engine.goToScene(this.selectedScene);
        this.resetHero();
      });
    });

    const sprite = this.spriteToUse?.toSprite();
    if (sprite)
      sprite.scale = this.spriteScale ? this.spriteScale : ex.vec(1, 1);
    this.graphics.use(sprite ? sprite : "default");
  }
}

class selectEffect extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      x,
      y,
      anchor: ex.vec(0, 0),
    });
  }

  onInitialize(engine: ex.Engine): void {
    const lineGraphic = new ex.GraphicsGroup({
      members: [
        {
          graphic: new ex.Line({
            start: ex.vec(0, 0),
            end: ex.vec(0, 60),
            color: ex.Color.White,
            thickness: 9,
          }),
          pos: ex.vec(0, 0),
        },
        {
          graphic: new ex.Line({
            start: ex.vec(0, 0),
            end: ex.vec(60, 0),
            color: ex.Color.White,
            thickness: 9,
          }),
          pos: ex.vec(30, -30),
        },
        {
          graphic: new ex.Line({
            start: ex.vec(0, 0),
            end: ex.vec(0, 60),
            color: ex.Color.White,
            thickness: 9,
          }),
          pos: ex.vec(120, 0),
        },
        {
          graphic: new ex.Line({
            start: ex.vec(0, 0),
            end: ex.vec(60, 0),
            color: ex.Color.White,
            thickness: 9,
          }),
          pos: ex.vec(30, 90),
        },
      ],
    });

    this.graphics.use(lineGraphic);
    this.actions.blink(133, 133, Infinity);
  }
}

class movingEyes extends ex.Actor {
  constructor() {
    super({
      x: 350,
      y: 239,
      width: 31,
      height: 31,
      scale: ex.vec(3.2, 3.2),
      anchor: ex.vec(0, 0),
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(eyeSpriteSheet.sprites[4]);
  }

  update(engine: ex.Engine, delta: number): void {
    if (Sounds.CHOOSE.isPlaying()) return;
    
    super.update(engine, delta);
    switch (selectedMenuItemIndex[0]) {
      case 0:
        switch (selectedMenuItemIndex[1]) {
          case 0:
            this.graphics.use(eyeSpriteSheet.sprites[0]);
            break;
          case 1:
            this.graphics.use(eyeSpriteSheet.sprites[1]);
            break;
          case 2:
            this.graphics.use(eyeSpriteSheet.sprites[2]);
            break;
        }
        break;
      case 1:
        switch (selectedMenuItemIndex[1]) {
          case 0:
            this.graphics.use(eyeSpriteSheet.sprites[6]);
            break;
          case 1:
            this.graphics.use(eyeSpriteSheet.sprites[4]);
            break;
          case 2:
            this.graphics.use(eyeSpriteSheet.sprites[8]);
            break;
        }
        break;
      case 2:
        switch (selectedMenuItemIndex[1]) {
          case 0:
            this.graphics.use(eyeSpriteSheet.sprites[3]);
            break;
          case 1:
            this.graphics.use(eyeSpriteSheet.sprites[7]);
            break;
          case 2:
            this.graphics.use(eyeSpriteSheet.sprites[5]);
            break;
        }
        break;
      default:
        this.graphics.use(eyeSpriteSheet.sprites[4]);
        break;
    }
  }
}

export class StageSelect extends ex.Scene {
  // onActivate(_context: ex.SceneActivationContext<unknown>): void {
  //   ui?.classList.add("StageSelect");

  //   const startButton = document.createElement("button");
  //   startButton.className = "button button--webdev";
  //   // startButton.innerText = 'WEB DEV'
  //   startButton.onclick = () => {
  //     // this.engine.goToScene('webDev')
  //     console.log("go to coding");
  //   };
  //   ui?.appendChild(startButton);
  // }

  onInitialize(_engine: ex.Engine): void {
    this.engine.add(new StageSelectBG());
    this.engine.add(new movingEyes());

    const codingLabel = new stageLabel(400, 195, "CODING");
    const gameDevLabel = new stageLabel(150, 395, "GAME DEV");
    const bioLabel = new stageLabel(400, 395, "ABOUT ME");
    const editingLabel = new stageLabel(650, 395, "EDITING");

    const labelItems = [codingLabel, gameDevLabel, bioLabel, editingLabel];

    for (const item of labelItems) {
      this.engine.add(item);
    }

    // #region Stages
    // _engine.add("gameDev", new GameDev);
    const codingStage = new stageSelector(
      401,
      88,
      "coding",
      Images.codingImg,
      ex.vec(2, 2)
    );
    const gameDevStage = new stageSelector(
      147,
      288,
      "gameDev",
      Images.controllerImg,
      null
    );
    const bioStage = new stageSelector(401, 288, "bio", null, null);
    const editingStage = new stageSelector(
      653,
      288,
      "editing",
      Images.editingImg,
      ex.vec(2, 2)
    );
    const placeHolder1 = new stageSelector(147, 88, "placeHolder1", null, null);
    const placeHolder2 = new stageSelector(653, 88, "placeHolder2", null, null);
    const placeHolder3 = new stageSelector(
      147,
      499,
      "placeHolder3",
      null,
      null
    );
    const placeHolder4 = new stageSelector(
      401,
      499,
      "placeHolder4",
      null,
      null
    );
    const placeHolder5 = new stageSelector(
      653,
      499,
      "placeHolder5",
      null,
      null
    );
    // #endregion

    selectedMenuItem = bioStage;
    // Default hover index
    let hoverIndex = [-1, -1];

    menuItems = [
      [placeHolder1, codingStage, placeHolder2],
      [gameDevStage, bioStage, editingStage],
      [placeHolder3, placeHolder4, placeHolder5],
    ];

    for (let i = 0; i < menuItems.length; i++) {
      const row = menuItems[i];

      for (let j = 0; j < row.length; j++) {
        const item = row[j];

        item.on("pointerenter", () => {
          selectedMenuItemIndex = [i, j];
          hoverIndex = [i, j];
        });

        item.on("pointerleave", () => {
          hoverIndex = [-1, -1];
        });

        this.engine.add(item);
      }
    }
  }

  resetHero() {
    this.engine.currentScene.actors.find((a) => a instanceof Hero)?.kill();
    const hero = new Hero(400, 100);
    if (this !== this.engine.currentScene) this.engine.add(hero);
    hero.pos = ex.vec(400, 100);
    hero.vel = ex.vec(0, 0);
  }

  update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta);

    if (Sounds.CHOOSE.isPlaying()) return;

    selectedMenuItem =
      menuItems[selectedMenuItemIndex[0]][selectedMenuItemIndex[1]];

    // Check if the selected item has changed
    if (
      selectedMenuItemIndex[0] !== prevSelectedItemIndex[0] ||
      selectedMenuItemIndex[1] !== prevSelectedItemIndex[1]
    ) {
      // Remove the previous effect if it exists
      if (effect) {
        engine.remove(effect);
        effect = null;
        Sounds.SELECT.stop();
      }

      for (let i = 0; i < menuItems.length; i++) {
        const row = menuItems[i];

        for (let j = 0; j < row.length; j++) {
          const item = row[j];
          if (selectedMenuItem === item) {
            if (!effect) {
              if (selectedMenuItemIndex[0] === 0) {
                effect = new selectEffect(item.pos.x - 60, item.pos.y - 30);
              } else if (selectedMenuItemIndex[0] === 1) {
                effect = new selectEffect(item.pos.x - 60, item.pos.y - 27);
              } else if (selectedMenuItemIndex[0] === 2) {
                effect = new selectEffect(item.pos.x - 60, item.pos.y - 35);
              }
              engine.add(effect!);

              // Prevents the sound from playing when the scene is first loaded
              if (prevSelectedItemIndex[0] !== -1) Sounds.SELECT.play(0.1);
            }
          }
        }
      }

      // Update the previous selected item indices
      prevSelectedItemIndex = selectedMenuItemIndex.slice();
    }

    const [row, column] = selectedMenuItemIndex;

    if (engine.input.keyboard.wasPressed(ex.Keys.Up)) {
      selectedMenuItemIndex = [Math.max(0, row - 1), column];
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Down)) {
      selectedMenuItemIndex = [Math.min(menuItems.length - 1, row + 1), column];
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Left)) {
      selectedMenuItemIndex = [row, Math.max(0, column - 1)];
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Right)) {
      selectedMenuItemIndex = [
        row,
        Math.min(menuItems[row].length - 1, column + 1),
      ];
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.Enter)) {
      // Handle action for the selected menu item
      Sounds.CHOOSE.play(0.2).then(() => {
        engine.goToScene(selectedMenuItem.selectedScene);
        this.resetHero();
      });
    }

    // TODO - only trigger one menu movement per joystick event
  }

  // onDeactivate(): void {
  //   ui?.classList.remove("StageSelect");
  //   ui!.innerHTML = "";
  // }
}

class StageSelectBG extends ex.Actor {
  constructor() {
    super({
      anchor: ex.Vector.Zero,
      x: -5,
      y: -20,
      width: 800,
      height: 600,
      scale: new ex.Vector(0.82, 0.82),
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(Images.stageSelectImg.toSprite());
  }
}
