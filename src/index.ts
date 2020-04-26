import './index.css'
import Matter from 'matter-js'

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

const { canvas } = render
const ground = Bodies.rectangle(0, canvas.height, canvas.width * 2, 120, {
    isStatic: true,
})

World.add(engine.world, [ball, boxA, boxB, ground])

Engine.run(engine)
Render.run(render)
