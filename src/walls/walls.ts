import { Bodies } from 'matter-js'

export function makeWalls(canvas: HTMLCanvasElement) {
    const { height, width } = canvas
    const fullWidth = width * 2
    const fullHeight = height * 2

    return [
        Bodies.rectangle(0, 0, 15, fullHeight, { isStatic: true }), // left
        Bodies.rectangle(width, 0, 15, fullHeight, { isStatic: true }), // right
        Bodies.rectangle(0, 0, fullWidth * 2, 30, { isStatic: true }), // top
        Bodies.rectangle(0, height, fullWidth, 30, { isStatic: true }), // bottom
    ]
}
