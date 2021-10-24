import { EffectClip } from 'sonolus-core'
import {
    Add,
    And,
    createEntityData,
    Divide,
    Draw,
    EntityMemory,
    Greater,
    GreaterOr,
    If,
    InputAccuracy,
    InputBucket,
    InputBucketValue,
    InputJudgment,
    InputOffset,
    Judge,
    Multiply,
    Not,
    Or,
    ParticleEffect,
    Play,
    Pointer,
    Random,
    Remap,
    SkinSprite,
    SpawnParticleEffect,
    Subtract,
    TemporaryMemory,
    Time,
    TouchST,
    TouchStarted,
} from 'sonolus.js'
import { options } from '../../configuration/options.mjs'
import { buckets } from '../buckets.mjs'

class EntityDataPointer extends Pointer {
    get time() {
        return this.to(0)
    }
}

const EntityData = createEntityData(EntityDataPointer)

export function note() {
    const spawnTime = EntityMemory.to(0)
    const z = EntityMemory.to(1)
    const minInputTime = EntityMemory.to(2)
    const maxInputTime = EntityMemory.to(3)

    const yCurrent = EntityMemory.to(32)
    const inputState = EntityMemory.to(33)

    const preprocess = [
        EntityData.time.set(Divide(EntityData.time, options.speed)),

        spawnTime.set(
            Subtract(EntityData.time, If(options.random, Random(0.5, 1.5), 1))
        ),
        z.set(Subtract(1000, EntityData.time)),
        minInputTime.set(Add(EntityData.time, -0.2, InputOffset)),
        maxInputTime.set(Add(EntityData.time, 0.2, InputOffset)),
    ]

    const spawnOrder = Add(spawnTime, 1000)

    const shouldSpawn = GreaterOr(Time, spawnTime)

    const isTouchOccupied = TemporaryMemory.to(0)

    const touch = And(
        TouchStarted,
        GreaterOr(TouchST, minInputTime),
        Not(isTouchOccupied),
        [
            inputState.set(true),
            isTouchOccupied.set(true),

            InputJudgment.set(
                Judge(
                    Subtract(TouchST, InputOffset),
                    EntityData.time,
                    0.05,
                    0.1,
                    0.2
                )
            ),
            InputAccuracy.set(Subtract(TouchST, InputOffset, EntityData.time)),

            InputBucket.set(buckets.noteIndex),
            InputBucketValue.set(Multiply(1000, InputAccuracy)),

            Play(Add(EffectClip.Miss, InputJudgment), 0.02),
            SpawnParticleEffect(
                ParticleEffect.NoteCircularTapCyan,
                -0.4,
                -1,
                -0.4,
                -0.2,
                0.4,
                -0.2,
                0.4,
                -1,
                0.3,
                false
            ),
        ]
    )

    const radius = 0.2
    const yFrom = 1 + radius
    const yTo = -0.6

    const left = -radius
    const right = radius
    const top = Add(yCurrent, radius)
    const bottom = Subtract(yCurrent, radius)

    const updateParallel = Or(inputState, Greater(Time, maxInputTime), [
        yCurrent.set(Remap(spawnTime, EntityData.time, yFrom, yTo, Time)),
        Draw(
            SkinSprite.NoteHeadCyan,
            left,
            bottom,
            left,
            top,
            right,
            top,
            right,
            bottom,
            z,
            1
        ),
    ])

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        touch: {
            code: touch,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
