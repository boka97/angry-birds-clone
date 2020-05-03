import { Constraint, Bodies } from 'matter-js'

export function makeSling() {
    return Constraint.create({
        pointA: { x: 170, y: 450 },
        bodyB: Bodies.circle(170, 450, 20), // bird, TODO: new Bird(...)
        stiffness: 0.05,
        length: 20,
    })
}
