import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()

export const Shrek = (context) => {
    const { scene } = context
    mtlLoader.load('objs/shrek/CHARACTER_Shrek.mtl', (materials) => {
        materials.preload()
        objLoader.setMaterials(materials)

         // load shrek
        objLoader.load(
            'objs/shrek/CHARACTER_Shrek.obj',
            (shrek) => {
                context.shrek = shrek
                shrek.scale.set(2, 2, 2)
                scene.add(shrek)
            }
        )
    })
}

export const Mud = (context) => {
    const { THREE, scene } = context

    const geometry = new THREE.BoxGeometry(50, 3, 50)
    const mudTexture = new THREE.TextureLoader().load('textures/mud.jpg')
    mudTexture.wrapS = THREE.RepeatWrapping
    mudTexture.wrapT = THREE.RepeatWrapping
    mudTexture.repeat.set(20,20)
    mudTexture.needsUpdate = true
    const material = new THREE.MeshBasicMaterial( { map: mudTexture })
    const cube = new THREE.Mesh(geometry, material)
    context.cube = cube
    scene.add(cube)
}
