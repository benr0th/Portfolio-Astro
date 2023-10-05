import * as ex from "excalibur";

const Images = {
  // Hero sprites
  heroSheet: new ex.ImageSource("sprites/MM/mm-48-drew-blue-sheet.png"),
  heroIdle: new ex.ImageSource("sprites/MM/mmIdle.png"),
  heroJump: new ex.ImageSource("sprites/MM/jump.png"),
  heroRun: new ex.ImageSource("sprites/MM/mmRun.png"),
  heroTeleport: new ex.ImageSource("sprites/MM/mmTeleport.png"),
  heroShoot: new ex.ImageSource("sprites/MM/mmShootGround.png"),
  heroBullet: new ex.ImageSource("sprites/MM/mm-lemon.png"),

  // Backgrounds
  stageSelectImg: new ex.ImageSource("maps/stage_select.png"),
  titleScreenImg: new ex.ImageSource("maps/title_screen.png"),
  mm3PortalRoom: new ex.ImageSource("maps/mm3PortalRoom.png"),
  mm3PortalBossRoom1: new ex.ImageSource("maps/mm3PortalBossRoom1.png"),
  mm6PortalRoom: new ex.ImageSource("maps/mm6PortalRoom.png"),
  mm6PortalBossRoom1: new ex.ImageSource("maps/mm6PortalBossRoom1.png"),

  // Misc sprites
  titleScreenArrow: new ex.ImageSource("sprites/titleScreenArrow.png"),
  heroEyes: new ex.ImageSource("sprites/MM/mmEyes.png"),
  mm3PortalGlass: new ex.ImageSource("sprites/mm3PortalGlass.png"),
  mm6PortalGlass: new ex.ImageSource("sprites/mm6PortalGlass.png"),
  controllerImg: new ex.ImageSource("sprites/XOne.png"),
  codingImg: new ex.ImageSource("sprites/codingIcon.png"),
  editingImg: new ex.ImageSource("sprites/clapperOpen.png"),

  // Boss sprites
  geminiMan: new ex.ImageSource("sprites/GeminiMan.png"),
  geminiManPose: new ex.ImageSource("sprites/GeminiManPose.png"),
  geminiManShoot: new ex.ImageSource("sprites/GeminiManShoot.png"),

  // Gifs
  gravibowlGif: new ex.ImageSource("sprites/GravibowlClip.gif"),
};

const Sounds = {
  LANDING: new ex.Sound("sounds/land.wav"),
  SHOOT: new ex.Sound("sounds/BulletShoot.wav"),
  PAIN: new ex.Sound("sounds/mm-pain.wav"),
  SELECT: new ex.Sound("sounds/StageSelect.wav"),
  CHOOSE: new ex.Sound("sounds/StageChoose.wav"),
};

const loader = new ex.Loader();
const allResources = { ...Images, ...Sounds };
for (const [name, resource] of Object.entries(allResources)) {
  loader.addResource(resource);
}

export { Images, Sounds, loader };
