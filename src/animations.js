
let currentDirection = 'left'
const maxAngle = .01
const step = .00021
export const shrekPool = ({ cube }) => {
    const currentAngle = cube.rotation.z
    if (currentDirection === 'left') {
        if (currentAngle < maxAngle) {
            cube.rotation.z += step
            return
        }
        currentDirection = 'right'
        return
    }
    if (currentAngle > -maxAngle) {
        cube.rotation.z -= step
        return
    }
    currentDirection = 'left'
}

export const shrekRotation = ({ shrek }) => {
    if (!shrek) {
        return
    }
    shrek.rotation.y += .01
}
