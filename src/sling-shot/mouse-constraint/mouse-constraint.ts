import { Mouse, MouseConstraint, Engine } from 'matter-js'

// Creates a mouse constraint for a sling shot
export function makeMouseConstraint(engine: Engine, canvas: HTMLCanvasElement) {
    return MouseConstraint.create(engine, {
        mouse: Mouse.create(canvas),
        // @ts-ignore
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false,
            },
        },
    })
}
