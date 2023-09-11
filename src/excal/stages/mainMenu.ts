import * as ex from "excalibur";
import { Images } from "../resources";
import { eyeSpriteSheet } from "../actors/Hero/animations";

const ui = document.getElementById("ui");
let selectedMenuItem: stageSelector;
let menuItems: stageSelector[][];
// Initial selected menu item index
let selectedMenuItemIndex = [1, 1];
let effect: selectEffect | null = null;
// Initialize with invalid indices
let prevSelectedItemIndex = [-1, -1];

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
  constructor(x: number, y: number, selectedScene: string) {
    super({
      x,
      y,
      width: 147,
      height: 147,
      color: ex.Color.Transparent,
      scale: new ex.Vector(0.75, 0.75),
    });

    this.selectedScene = selectedScene;
  }

  onInitialize(engine: ex.Engine): void {
    this.on("pointerup", () => {
      // engine.goToScene(this.selectedScene)
      console.log(`go to ${this.selectedScene}`);
    });

    this.on("pointerenter", () => {
      // this.color = ex.Color.Yellow;
    });

    this.on("pointerleave", () => {
      this.color = ex.Color.Transparent;
    });
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
    const blankGraphic = new ex.Line({
      start: ex.vec(0, 0),
      end: ex.vec(0, 0),
      color: ex.Color.Transparent,
      thickness: 0,
    });
    const selectAnim = new ex.Animation({
      frames: [
        { graphic: lineGraphic, duration: 133 },
        { graphic: blankGraphic, duration: 133 },
      ],
      strategy: ex.AnimationStrategy.Loop,
    });
    this.graphics.use(selectAnim);
  }
}

class movingEyes extends ex.Actor {
  constructor() {
    super({
      x: 520,
      y: 360,
      width: 31,
      height: 31,
      scale: ex.vec(3, 3),
      anchor: ex.vec(0, 0),
    });
  }

  update(engine: ex.Engine, delta: number): void {
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

export class MainMenu extends ex.Scene {
  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    ui?.classList.add("mainMenu");

    const startButton = document.createElement("button");
    startButton.className = "button button--webdev";
    // startButton.innerText = 'WEB DEV'
    startButton.onclick = () => {
      // this.engine.goToScene('webDev')
      console.log("go to web dev");
    };
    ui?.appendChild(startButton);
  }

  onInitialize(_engine: ex.Engine): void {
    const codingLabel = new stageLabel(570, 310, "CODING");
    const gameDevLabel = new stageLabel(320, 510, "GAME DEV");
    const bioLabel = new stageLabel(570, 510, "ABOUT ME");
    const editingLabel = new stageLabel(817, 510, "EDITING");

    const labelItems = [codingLabel, gameDevLabel, bioLabel, editingLabel];

    for (const item of labelItems) {
      this.engine.add(item);
    }

    const codingStage = new stageSelector(568, 210, "webDev");
    const gameDevStage = new stageSelector(320, 405, "gameDev");
    const bioStage = new stageSelector(568, 405, "bio");
    const editingStage = new stageSelector(816, 405, "editing");
    const placeHolder1 = new stageSelector(320, 210, "placeHolder1");
    const placeHolder2 = new stageSelector(816, 210, "placeHolder2");
    const placeHolder3 = new stageSelector(320, 610, "placeHolder3");
    const placeHolder4 = new stageSelector(568, 610, "placeHolder4");
    const placeHolder5 = new stageSelector(816, 610, "placeHolder5");

    selectedMenuItem = bioStage;
    // Default hover index
    let hoverIndex = [-1, -1];

    menuItems = [
      [placeHolder1, codingStage, placeHolder2],
      [gameDevStage, bioStage, editingStage],
      [placeHolder3, placeHolder4, placeHolder5]
    ];

    // Function to handle menu item selection
    function handleMenuItemSelection() {
      console.log(`Selected: ${selectedMenuItem.selectedScene}`);
      // Perform the action associated with the selected menu item here
    }

    for (let i = 0; i < menuItems.length; i++) {
      const row = menuItems[i];

      for (let j = 0; j < row.length; j++) {
        const item = row[j];

        item.on("pointerenter", () => {
          selectedMenuItemIndex = [i, j];
          hoverIndex = [i, j];
          console.log(`Selected: ${item.selectedScene}`);
        });

        item.on("pointerleave", () => {
          hoverIndex = [-1, -1];
        });

        this.engine.add(item);
      }
    }

    this.engine.add(new movingEyes);
  }

  update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta);
    selectedMenuItem =
      menuItems[selectedMenuItemIndex[0]][selectedMenuItemIndex[1]];

    // In your update method, check if the selected item has changed
    if (
      selectedMenuItemIndex[0] !== prevSelectedItemIndex[0] ||
      selectedMenuItemIndex[1] !== prevSelectedItemIndex[1]
    ) {
      // Remove the previous effect if it exists
      if (effect) {
        engine.remove(effect);
        effect = null;
      }
      // Update colors based on the new selected item
      for (let i = 0; i < menuItems.length; i++) {
        const row = menuItems[i];

        for (let j = 0; j < row.length; j++) {
          const item = row[j];
          if (selectedMenuItem === item) {
            if (!effect) {
              effect = new selectEffect(item.pos.x - 60, item.pos.y - 30);
              engine.add(effect);
            }
          }
        }
      }

      // Update the previous selected item indices
      //@ts-ignore
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
      console.log(`Selected: ${selectedMenuItem.selectedScene}`);
    }
  }

  onDeactivate(): void {
    ui?.classList.remove("mainMenu");
    ui!.innerHTML = "";
  }
}

export class StageSelect extends ex.Actor {
  constructor() {
    super({
      anchor: ex.Vector.Zero,
      x: 173,
      y: 105,
      width: 800,
      height: 600,
      scale: new ex.Vector(0.8, 0.8),
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(Images.stageSelectImg.toSprite());
  }
}
