import './index.css'
import Matter from 'matter-js'
import { makeMouseConstraint } from './sling-shot/mouse-constraint/mouse-constraint'
import { makeSling } from './sling-shot/sling/sling'
import { SlingShot } from './sling-shot/sling-shot'

const { Engine, Render, Runner, Events, World } = Matter

const engine = Engine.create()
const { world } = engine

const renderer = Render.create({
    canvas: document.querySelector('#world'),
    engine,
    options: {
        width: 800,
        height: 600,
    },
})

const runner = Runner.create()
Render.run(renderer)
Runner.run(runner, engine)

// Create a sling shot
const mouseConstraint = makeMouseConstraint(renderer.canvas, engine)
const slingShot = new SlingShot(world, makeSling(), mouseConstraint)
Events.on(engine, 'afterUpdate', slingShot.onAfterUpdate)

World.add(world, [slingShot.body, slingShot.constraint] as Matter.Body[])
World.add(world, mouseConstraint)
