import { defineScripts } from 'sonolus.js'
import { initialization } from './initialization.mjs'
import { stage } from './stage.mjs'

export const scripts = defineScripts({
    initialization,
    stage,
})
