import Matter from 'matter-js'

const { Engine, Render, World, Bodies } = Matter

const engine = Engine.create()

const render = Render.create({
    element: document.body,
    engine: engine,
})

const ball = Bodies.circle(420, 15, 20)

const boxA = Bodies.rectangle(400, 200, 80, 80)
const boxB = Bodies.rectangle(450, 50, 80, 80)
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

World.add(engine.world, [ball, boxA, boxB, ground])

Engine.run(engine)
Render.run(render)
