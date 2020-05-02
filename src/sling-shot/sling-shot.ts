import { Bodies, Constraint, MouseConstraint, World } from 'matter-js'

export class SlingShot {
    constructor(
        private world: World,
        private slingConstraint: Constraint,
        private mouseConstraint: MouseConstraint,
        private numOfShots: number = 3
    ) {}

    get constraint() {
        return this.slingConstraint
    }

    get body() {
        return this.slingConstraint.bodyB
    }

    onAfterUpdate = () => {
        this.shouldRelease() && this.release()
    }

    private shouldRelease() {
        const { button } = this.mouseConstraint.mouse
        const { circleRadius } = this.slingConstraint.bodyB
        const { x, y } = this.slingConstraint.bodyB.position

        return (
            button === -1 && (x > 170 + circleRadius || y < 450 - circleRadius)
        )
    }

    private release() {
        this.slingConstraint.bodyB = Bodies.circle(170, 450, 20)
        // Add another bird after 1 second
        setTimeout(() => {
            World.add(this.world, this.body)
        }, 1000)
    }
}
