import * as ex from 'excalibur'

const Images = {
    heroIdle: new ex.ImageSource('sprites/mmIdle.png'),
    heroJump: new ex.ImageSource('sprites/jump.png'),
    heroRun: new ex.ImageSource('sprites/mmRun.png'),

    stageSelectImg: new ex.ImageSource('maps/stage_select.png'),
    titleScreenImg: new ex.ImageSource('maps/title_screen.png'),
    titleScreenArrow: new ex.ImageSource('sprites/titleScreenArrow.png'),
    heroEyes: new ex.ImageSource('sprites/mmEyes.png'),
    controllerImg: new ex.ImageSource('sprites/controller.png'),
    mm3PortalRoom: new ex.ImageSource('maps/mm3_portal_room.png'),
}

const Sounds = {
    LANDING: new ex.Sound('sounds/land.wav'),
    SHOOT: new ex.Sound('sounds/mm-bullet.wav'),
    PAIN: new ex.Sound('sounds/mm-pain.wav'),
}

const loader = new ex.Loader()
const allResources = {...Images, ...Sounds}
for (const [name, resource] of Object.entries(allResources)) {
    loader.addResource(resource)
}

export {Images, Sounds, loader}