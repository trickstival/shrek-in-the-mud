import OBJLoader from 'three-obj-loader'
import setup, { animate } from './setup'

// scene construction flow
import('three')
    .then((THREE) => {
        OBJLoader(THREE)
        return THREE
    })
    .then(setup)
    .then(animate)
