import * as ex from 'excalibur'

const Images = {
    heroIdle: new ex.ImageSource('sprites/mmIdle.png'),

    stageSelectImg: new ex.ImageSource('maps/stage_select.png'),
    heroEyes: new ex.ImageSource('sprites/mmEyes.png'),
}

const Sounds = {
    // Add sounds here
}

const loader = new ex.Loader()
const allResources = {...Images, ...Sounds}
for (const [name, resource] of Object.entries(allResources)) {
    loader.addResource(resource)
}

export {Images, Sounds, loader}