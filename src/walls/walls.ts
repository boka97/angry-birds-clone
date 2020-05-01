import Matter from 'matter-js'

export function buildWalls(Bodies: typeof Matter.Bodies, c: HTMLCanvasElement) {
    return [
        Bodies.rectangle(0, 0, c.width * 2, 20, { isStatic: true }),
        Bodies.rectangle(0, c.height, c.width * 2, 20, { isStatic: true }),
        Bodies.rectangle(0, 0, 10, c.height * 2, { isStatic: true }),
        Bodies.rectangle(c.width, 0, 10, c.height * 2, { isStatic: true }),
    ]
}
