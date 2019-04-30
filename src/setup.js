import * as animationsObj from './animations'
import * as modelsObj from './models'

let context = null

const loadAll = _module => {
    const funcs = Object.values(_module)
    return () => funcs.forEach(func => func(context))
}

export default (THREE) => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 2)
    camera.lookAt(0, 1, 0)


    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight )
    renderer.setClearColor(0x7ec0ee, 1)

    document.body.appendChild(renderer.domElement )

    const setupLights = () => {
        const ambient = new THREE.AmbientLight(0x888888)
        const light = new THREE.DirectionalLight(0xffffff)
        light.position.set(3, 2, 1)
        light.lookAt(0, 0, 0)
        scene.add(light)
        scene.add(ambient)
    }

    context = {
        scene,
        camera,
        renderer,
        THREE
    }

    // render objects
    loadAll(modelsObj)()
    setupLights()
}


const renderAnimations = loadAll(animationsObj)
export const animate = () => {
    const { renderer, camera, scene, cube } = context
    const animationLoop = () => {
        requestAnimationFrame(animationLoop)
        renderAnimations()
        renderer.render(scene, camera)
    }
    animationLoop()
}
