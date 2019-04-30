import setup, { animate } from './setup'

// scene construction flow
import('three')
    .then(setup)
    .then(animate)
