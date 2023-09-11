import * as ex from "excalibur";
import { Images } from "../resources";

const ui = document.getElementById("ui");
let selectedMenuItem: stageSelector;
let menuItems: stageSelector[][];
// Initial selected menu item index
let selectedMenuItemIndex = [1, 1];

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
      this.color = ex.Color.Yellow;
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
    this.graphics.use(
      new ex.Line({
        start: ex.vec(0, 0),
        end: ex.vec(0, 60),
        color: ex.Color.White,
        thickness: 9,
      })
    );
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

    selectedMenuItem = codingStage;
    // Default hover index
    let hoverIndex = [-1, -1];

    menuItems = [[placeHolder1, codingStage, placeHolder2], [gameDevStage, bioStage, editingStage]];

    // Function to handle menu item selection
    function handleMenuItemSelection() {
      console.log(`Selected: ${selectedMenuItem.selectedScene}`);
      // Perform the action associated with the selected menu item here
    }

    //   const effect = new selectEffect(item.pos.x - 60, item.pos.y - 30)
    //   if (item.selectedScene === 'gameDev') {
    //     this.engine.add(effect)
    //   } else {
    //     this.engine.remove(effect)
    //   }

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
  }

  update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta);
    selectedMenuItem =
      menuItems[selectedMenuItemIndex[0]][selectedMenuItemIndex[1]];

      let prevSelectedItemIndex: [number, number] = [-1, -1]; // Initialize with invalid indices

      // In your update method, check if the selected item has changed
      if (
        selectedMenuItemIndex[0] !== prevSelectedItemIndex[0] ||
        selectedMenuItemIndex[1] !== prevSelectedItemIndex[1]
      ) {
        // Update colors based on the new selected item
        for (let i = 0; i < menuItems.length; i++) {
          const row = menuItems[i];
      
          for (let j = 0; j < row.length; j++) {
            const item = row[j];
      
            // const effect = new selectEffect(item.pos.x - 60, item.pos.y - 30);
            if (selectedMenuItem === item) {
              item.color = ex.Color.Yellow;
              // engine.add(effect);
              
            } else {
              item.color = ex.Color.Transparent;
              // engine.remove(effect)
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
