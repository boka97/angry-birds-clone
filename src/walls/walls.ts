import { Bodies } from 'matter-js'

const options = { isStatic: true }

export function makeWalls(canvas: HTMLCanvasElement) {
    const { height, width } = canvas
    const fullWidth = width * 2
    const fullHeight = height * 2

    return [
        Bodies.rectangle(0, 0, 15, fullHeight, options), // left
        Bodies.rectangle(width, 0, 15, fullHeight, options), // right
        Bodies.rectangle(0, 0, fullWidth * 2, 30, options), // top
        Bodies.rectangle(0, height, fullWidth, 30, options), // bottom
    ]
}
