import { defineArchetypes } from 'sonolus.js'
import { scripts } from './scripts/index.mjs'

export const archetypes = defineArchetypes({
    initialization: {
        script: scripts.initializationIndex,
    },
    stage: {
        script: scripts.stageIndex,
    },
    note: {
        script: scripts.noteIndex,
    },
})
