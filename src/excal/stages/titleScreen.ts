import * as ex from "excalibur";

export class TitleScreen extends ex.Scene {
  onInitialize(engine: ex.Engine): void {
    const title = new ex.Label({
      x: engine.halfDrawWidth,
      y: engine.halfDrawHeight - 100,
      text: "Ben Roth",
      color: ex.Color.White,
      font: new ex.Font({
        size: 48,
        family: "sans-serif",
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center,
        quality: 5,
      }),
    });

    const start = new ex.Label({
      x: engine.halfDrawWidth,
      y: engine.halfDrawHeight + 100,
      text: "Click to start",
      color: ex.Color.White,
      font: new ex.Font({
        size: 48,
        family: "sans-serif",
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center,
        quality: 5,
      }),
    });

    const startButton = new ex.Actor({
        x: engine.halfDrawWidth - 150,
        y: engine.halfDrawHeight + 65,
        width: 300,
        height: 50,
        color: ex.Color.Transparent,
        anchor: ex.vec(0, 0),
    })
    
    this.add(title);
    this.add(start);
    this.add(startButton)

    startButton.on("pointerup", () => {
      engine.goToScene("mainMenu");
      ex.AudioContextFactory.create().resume();
    });
  }
}
