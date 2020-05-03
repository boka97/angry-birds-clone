import './index.css'
import Matter from 'matter-js'
import { makeMouseConstraint } from './sling-shot/mouse-constraint/mouse-constraint'
import { makeSling } from './sling-shot/sling/sling'
import { SlingShot } from './sling-shot/sling-shot'
import { makeWalls } from './walls/walls'
import { makeStack } from './stack/stack'

const { Engine, Render, Runner, World } = Matter

const engine = Engine.create()
const { world } = engine

const renderer = Render.create({
    canvas: document.querySelector('#world'),
    engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
    },
})

const runner = Runner.create()
Render.run(renderer)
Runner.run(runner, engine)

const { canvas } = renderer

// Create a sling shot
const mouseConstraint = makeMouseConstraint(engine, canvas)
const slingConstraint = makeSling()
const slingShot = new SlingShot(world, slingConstraint, mouseConstraint, engine)

World.add(world, slingShot.sling)
World.add(world, slingShot.bird)
World.add(world, mouseConstraint)
World.add(world, makeStack(canvas))
World.add(world, makeWalls(canvas))
