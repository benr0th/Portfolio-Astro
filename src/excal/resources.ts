import * as ex from 'excalibur'

const Images = {
    // Hero sprites
    heroIdle: new ex.ImageSource('sprites/mmIdle.png'),
    heroJump: new ex.ImageSource('sprites/jump.png'),
    heroRun: new ex.ImageSource('sprites/mmRun.png'),
    heroTeleport: new ex.ImageSource('sprites/mmTeleport.png'),
    heroShoot: new ex.ImageSource('sprites/mm-lemon.png'),

    // Backgrounds
    stageSelectImg: new ex.ImageSource('maps/stage_select.png'),
    titleScreenImg: new ex.ImageSource('maps/title_screen.png'),
    mm3PortalRoom: new ex.ImageSource('maps/mm3PortalRoom.png'),
    mm3PortalBossRoom1: new ex.ImageSource('maps/mm3PortalBossRoom1.png'),
    mm6PortalRoom: new ex.ImageSource('maps/mm6PortalRoom.png'),
    mm6PortalBossRoom1: new ex.ImageSource('maps/mm6PortalBossRoom1.png'),
    
    // Misc sprites
    titleScreenArrow: new ex.ImageSource('sprites/titleScreenArrow.png'),
    heroEyes: new ex.ImageSource('sprites/mmEyes.png'),
    mm3PortalGlass: new ex.ImageSource('sprites/mm3PortalGlass.png'),
    mm6PortalGlass: new ex.ImageSource('sprites/mm6PortalGlass.png'),
    controllerImg: new ex.ImageSource('sprites/XOne.png'),
    codingImg: new ex.ImageSource('sprites/codingIcon.png'),
    editingImg: new ex.ImageSource('sprites/clapperOpen.png'),

    // Gifs
    gravibowlGif: new ex.ImageSource('sprites/GravibowlClip.gif'),

}

const Sounds = {
    LANDING: new ex.Sound('sounds/land.wav'),
    SHOOT: new ex.Sound('sounds/mm-bullet.wav'),
    PAIN: new ex.Sound('sounds/mm-pain.wav'),
    SELECT: new ex.Sound('sounds/StageSelect.wav'),
    CHOOSE: new ex.Sound('sounds/StageChoose.wav'),
}

const loader = new ex.Loader()
const allResources = {...Images, ...Sounds}
for (const [name, resource] of Object.entries(allResources)) {
    loader.addResource(resource)
}

export {Images, Sounds, loader}