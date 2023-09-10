import * as ex from 'excalibur'
import { loader } from './resources'
import { Hero } from './actors/Hero/hero.ts'
import { MainMenu, StageSelect } from './stages/mainMenu.ts'

const game = new ex.Engine({
    canvasElementId: 'game',
    width: 800,
    height: 600,
    displayMode: ex.DisplayMode.FitContainer,
    fixedUpdateFps: 60,
    antialiasing: false,
    pointerScope: ex.PointerScope.Canvas,
    suppressPlayButton: true,
})

//   // Handle window resize to maintain aspect ratio
//   window.addEventListener('resize', () => {
//     const container = document.querySelector('.game-container');
//     const canvas = document.querySelector('#game');
  
//     const targetWidth = window.innerWidth * 0.8; // Set the target width (80% of the screen width)
//     const aspectRatio = canvas.height / canvas.width;
  
//     // Calculate the height based on the aspect ratio
//     const targetHeight = targetWidth * aspectRatio;
  
//     // Apply the new dimensions to the container and canvas
//     container.style.width = `${targetWidth}px`;
//     container.style.height = `${targetHeight}px`;
//     canvas.width = targetWidth;
//     canvas.height = targetHeight;
  
//     // Center the canvas within the container using Flexbox
//     container.style.display = 'flex';
//     container.style.justifyContent = 'center';
//     container.style.alignItems = 'center';
//   });

//   // Initial setup for canvas size and centering
// window.dispatchEvent(new Event('resize'));

ex.Physics.acc = new ex.Vector(0, 1500)

const mainMenu = new MainMenu()
mainMenu.add(new StageSelect)
game.add('mainMenu', mainMenu)
game.goToScene('mainMenu')


const hero = new Hero(200, 200)
// game.add(hero)

game.start(loader).then(() => {
    // Start the game
})


