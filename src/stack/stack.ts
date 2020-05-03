import { Composites, Bodies } from 'matter-js'

export function makeStack(canvas: HTMLCanvasElement) {
    const { width, height } = canvas

    const elHeight = 30
    const elWidth = 30

    const cols = 3
    const rows = 6

    const colGap = 80
    const rowGap = 0

    const xPos = 2 * (width / 3)
    const yPos = height - 2 * cols * elHeight

    return Composites.stack(xPos, yPos, cols, rows, colGap, rowGap, (x, y) => {
        return Bodies.rectangle(x, y, elWidth, elHeight, { isStatic: true })
    })
}
