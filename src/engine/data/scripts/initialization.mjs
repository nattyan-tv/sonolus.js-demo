import {
    ArchetypeLife,
    ConsecutiveGreatScore,
    ConsecutivePerfectLife,
    GoodMultiplier,
    GreatMultiplier,
    HorizontalAlign,
    LevelBucket,
    Multiply,
    PerfectMultiplier,
    ScreenAspectRatio,
    Subtract,
    UIComboConfiguration,
    UIComboText,
    UIComboValue,
    UIJudgment,
    UIJudgmentConfiguration,
    UIMenu,
    UIMenuConfiguration,
    UIPrimaryMetricBar,
    UIPrimaryMetricConfiguration,
    UIPrimaryMetricValue,
    UISecondaryMetricBar,
    UISecondaryMetricConfiguration,
    UISecondaryMetricValue,
} from 'sonolus.js'
import { archetypes } from '../archetypes.mjs'
import { buckets } from '../buckets.mjs'

export function initialization() {
    const noteLife = ArchetypeLife.of(archetypes.noteIndex)

    const preprocess = [
        UIMenu.set(
            Subtract(0.05, ScreenAspectRatio),
            0.95,
            0,
            1,
            Multiply(UIMenuConfiguration.scale, 0.15),
            Multiply(UIMenuConfiguration.scale, 0.15),
            0,
            UIMenuConfiguration.alpha,
            HorizontalAlign.Center,
            true
        ),
        UIJudgment.set(
            0,
            -0.4,
            0.5,
            0,
            Multiply(UIJudgmentConfiguration.scale, 0.8),
            Multiply(UIJudgmentConfiguration.scale, 0.2),
            0,
            UIJudgmentConfiguration.alpha,
            HorizontalAlign.Center,
            false
        ),
        UIComboValue.set(
            Multiply(ScreenAspectRatio, 0.7),
            0,
            0.5,
            0,
            Multiply(UIComboConfiguration.scale, 0.5),
            Multiply(UIComboConfiguration.scale, 0.25),
            0,
            UIComboConfiguration.alpha,
            HorizontalAlign.Center,
            false
        ),
        UIComboText.set(
            Multiply(ScreenAspectRatio, 0.7),
            0,
            0.5,
            1,
            Multiply(UIComboConfiguration.scale, 0.5),
            Multiply(UIComboConfiguration.scale, 0.15),
            0,
            UIComboConfiguration.alpha,
            HorizontalAlign.Center,
            false
        ),
        UIPrimaryMetricBar.set(
            Subtract(ScreenAspectRatio, 0.05),
            0.95,
            1,
            1,
            Multiply(UIPrimaryMetricConfiguration.scale, 0.6),
            Multiply(UIPrimaryMetricConfiguration.scale, 0.15),
            0,
            UIPrimaryMetricConfiguration.alpha,
            HorizontalAlign.Left,
            true
        ),
        UIPrimaryMetricValue.set(
            Subtract(ScreenAspectRatio, 0.05),
            0.95,
            1,
            1,
            Multiply(UIPrimaryMetricConfiguration.scale, 0.6),
            Multiply(UIPrimaryMetricConfiguration.scale, 0.15),
            0,
            UIPrimaryMetricConfiguration.alpha,
            HorizontalAlign.Right,
            false
        ),
        UISecondaryMetricBar.set(
            Subtract(ScreenAspectRatio, 0.05),
            Subtract(0.9, Multiply(UIPrimaryMetricConfiguration.scale, 0.15)),
            1,
            1,
            Multiply(UISecondaryMetricConfiguration.scale, 0.6),
            Multiply(UISecondaryMetricConfiguration.scale, 0.15),
            0,
            UISecondaryMetricConfiguration.alpha,
            HorizontalAlign.Left,
            true
        ),
        UISecondaryMetricValue.set(
            Subtract(ScreenAspectRatio, 0.05),
            Subtract(0.9, Multiply(UIPrimaryMetricConfiguration.scale, 0.15)),
            1,
            1,
            Multiply(UISecondaryMetricConfiguration.scale, 0.6),
            Multiply(UISecondaryMetricConfiguration.scale, 0.15),
            0,
            UISecondaryMetricConfiguration.alpha,
            HorizontalAlign.Right,
            false
        ),

        LevelBucket.of(buckets.noteIndex).setBucket(50, 100, 200),

        PerfectMultiplier.set(1),
        GreatMultiplier.set(0.75),
        GoodMultiplier.set(0.5),

        ConsecutiveGreatScore.set(0.01, 10, 50),

        noteLife.perfectLifeIncrement.set(10),
        noteLife.missLifeIncrement.set(-100),

        ConsecutivePerfectLife.set(50, 10),
    ]
    const spawnOrder = 0

    const updateSequential = true

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        updateSequential: {
            code: updateSequential,
        },
    }
}
