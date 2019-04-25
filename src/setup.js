import * as animationsObj from './animations'

let context = null

export default (THREE) => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 100, 60)
    camera.lookAt(0, 70, 0)


    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight )
    renderer.setClearColor(0xfefefe, 1)

    document.body.appendChild(renderer.domElement )

    const setupObjects = () => {
        const geometry = new THREE.BoxGeometry(3000, 150, 1000)
        const mudTexture = new THREE.TextureLoader().load('textures/mud.jpg')
        mudTexture.wrapS = THREE.RepeatWrapping
        mudTexture.wrapT = THREE.RepeatWrapping
        mudTexture.repeat.set(20,20)
        mudTexture.needsUpdate = true
        const material = new THREE.MeshBasicMaterial( { map: mudTexture })
        const cube = new THREE.Mesh(geometry, material)
        context.cube = cube
        scene.add(cube)

        var loader = new THREE.OBJLoader()
        // load shrek
        loader.load(
            'objs/shrek/Shrek.obj',
            // called when resource is loaded
            function ( shrek ) {
                console.log(shrek)
                scene.add( shrek )

            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        )

    }

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

    setupObjects()
    setupLights()
}


const animations = Object.values(animationsObj)
export const animate = () => {
    const { renderer, camera, scene, cube } = context
    const animationLoop = () => {
        requestAnimationFrame(animationLoop)
        animations.forEach(a => a(context))
        renderer.render(scene, camera)
    }
    animationLoop()
}
