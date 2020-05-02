import { Bodies, Constraint, MouseConstraint, World } from 'matter-js'

export class SlingShot {
    private numOfShots = 0

    constructor(
        private world: World,
        private slingConstraint: Constraint,
        private mouseConstraint: MouseConstraint,
        private maxNumOfShots = 3
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
        this.numOfShots += 1
        this.setNewBird()
    }

    private setNewBird() {
        if (this.numOfShots < this.maxNumOfShots) {
            setTimeout(() => {
                World.add(this.world, this.body)
            }, 1000)
        }
    }
}
