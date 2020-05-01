import { Body } from 'matter-js'

export function jump(keyCode: number, body: Body) {
    const {
        velocity: { x, y },
    } = body

    switch (keyCode) {
        // LEFT
        case 37:
            Body.setVelocity(body, { x: -5, y })
            break

        // UP
        case 38:
            Body.setVelocity(body, {
                x,
                y: y - 10,
            })
            break

        // RIGHT
        case 39:
            Body.setVelocity(body, { x: 5, y })
            break

        // DOWN
        case 40:
            Body.setVelocity(body, { x, y: y + 10 })
            break
    }
}
