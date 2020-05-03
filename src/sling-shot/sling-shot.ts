import {
    World,
    Constraint,
    MouseConstraint,
    Events,
    Bodies,
    Body,
} from 'matter-js'

// TODO: Extract bird functionality into a separate Bird class

export class SlingShot {
    private shotCount = 0

    constructor(
        private world: World,
        private slingConstraint: Constraint,
        private mouseConstraint: MouseConstraint,
        private maxNumOfShots = 3
    ) {}

    get sling(): Constraint {
        return this.slingConstraint
    }

    get bird(): Body {
        return this.sling.bodyB
    }

    set bird(value: Body) {
        this.sling.bodyB = value
    }

    onAfterUpdate = (): void => {
        if (this.shouldReleaseBird()) {
            const releasedBird = this.releaseBird()
            Events.on(
                this.mouseConstraint,
                'mousedown',
                this.removeReleasedBird.bind(this, releasedBird)
            )
        }
    }

    private removeReleasedBird(bird: Body): void {
        World.remove(this.world, bird)
        Events.off(this.mouseConstraint, 'mousedown', this.removeReleasedBird)
    }

    private shouldReleaseBird(): boolean {
        const { button } = this.mouseConstraint.mouse
        const { circleRadius } = this.slingConstraint.bodyB
        const { x, y } = this.slingConstraint.bodyB.position

        return (
            button === -1 && (x > 170 + circleRadius || y < 450 - circleRadius)
        )
    }

    private releaseBird(): Body {
        const tmp = this.bird
        this.shotCount += 1
        this.bird = Bodies.circle(170, 450, 20)
        this.addNewBird(this.bird)

        return tmp
    }

    /**
     * Adds a new bird to the world
     */
    private addNewBird(bird: Body): void {
        if (this.shotCount < this.maxNumOfShots) {
            setTimeout(() => {
                World.add(this.world, bird)
            }, 1500)
        }
    }
}
