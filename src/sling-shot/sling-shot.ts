import {
    World,
    Constraint,
    MouseConstraint,
    Events,
    Bodies,
    Body,
    Engine,
} from 'matter-js'

// TODO: Extract bird functionality into a separate Bird class

export class SlingShot {
    private shotCount = 0
    private releasedBird = null

    constructor(
        private world: World,
        private slingConstraint: Constraint,
        private mouseConstraint: MouseConstraint,
        private engine: Engine,
        private maxNumOfShots = 3
    ) {
        Events.on(engine, 'afterUpdate', this.mainHandler)
    }

    get sling(): Constraint {
        return this.slingConstraint
    }

    get bird(): Body {
        return this.sling.bodyB
    }

    set bird(value: Body) {
        this.sling.bodyB = value
    }

    private mainHandler = (): void => {
        this.shouldReleaseBird() && this.handleBirdRelease()
    }

    private handleBirdRelease() {
        console.log('1) releaseBird()')

        this.releaseBird()
        World.remove(this.world, this.sling)
        setTimeout(() => {
            Events.on(this.engine, 'afterUpdate', this.handleBirdRemoval)
        }, 1000)
    }

    private handleBirdRemoval = () => {
        if (this.isReleasedBirdStopped()) {
            console.log('2) isReleasedBirdStopped(): true')
            console.log('3) handleBirdRemoval()')
            console.log('4) addNewBird()')
            console.log('================================')

            Events.off(this.engine, 'afterUpdate', this.handleBirdRemoval)
            World.remove(this.world, this.releasedBird)
            this.addNewBird(Bodies.circle(170, 450, 20))
            World.add(this.world, this.sling)
        }
    }

    private shouldReleaseBird(): boolean {
        if (!this.bird) return false

        const { button } = this.mouseConstraint.mouse
        const { circleRadius } = this.bird
        const { x, y } = this.bird.position

        return (
            button === -1 && (x > 170 + circleRadius || y < 450 - circleRadius)
        )
    }

    private isReleasedBirdStopped() {
        return this.releasedBird.speed < 0.28
    }

    private releaseBird(): Body {
        this.shotCount += 1
        this.releasedBird = this.bird
        this.bird = null
        return this.releasedBird
    }

    /**
     * Adds a new bird to the world
     */
    private addNewBird(bird: Body): void {
        this.bird = bird
        if (this.shotCount < this.maxNumOfShots) {
            World.add(this.world, this.bird)
        }
    }
}
