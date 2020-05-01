import './index.css'
import Matter from 'matter-js'
import { buildWalls } from './walls/walls'
import { jump } from './events/keyboard'

const { Engine, Render, World, Bodies } = Matter

const engine = Engine.create()

const render = Render.create({
    engine,
    canvas: document.querySelector('#world'),
    options: {
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight,
    },
})

const ball = Bodies.circle(420, 15, 20, {
    render: {
        fillStyle: '#ff0000',
    },
})

const boxA = Bodies.rectangle(400, 200, 80, 80)
const boxB = Bodies.rectangle(450, 50, 80, 80)

const { world } = engine
const { canvas } = render

World.add(world, buildWalls(Bodies, canvas))
World.add(world, [ball, boxA, boxB])

Engine.run(engine)
Render.run(render)

document.body.onkeydown = function ({ keyCode }: KeyboardEvent) {
    jump(keyCode, boxA)
}
