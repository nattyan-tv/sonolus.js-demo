import {
    HorizontalAlign,
    ScreenAspectRatio,
    Subtract,
    UIMenu,
} from 'sonolus.js'

export function initialization() {
    const preprocess = UIMenu.set(
        Subtract(0.05, ScreenAspectRatio),
        0.95,
        0,
        1,
        0.15,
        0.15,
        0,
        1,
        HorizontalAlign.Center,
        true
    )

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
