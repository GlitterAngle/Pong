

// cached
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
const msg = document.getElementById('msg')
const reset = document.querySelector('button')

//window 

canvas.width = 1400
canvas.height = 1000

canvas.style.width = (canvas.width / 2) + 'px'
canvas.style.height = (canvas.height / 2) + 'px'


canvas.style.background = 'black'

//paddles and ball

class Paddle{
    constructor(xpos,ypos,wpos,hpos, color, isPaddleOne){
        this.xpos = isPaddleOne ? xpos/ 2 - 700 : xpos /2 + 650
        this.ypos = isPaddleOne ? ypos/2 - 500 : ypos/2 + 300
        this.wpos = wpos
        this.hpos = hpos
        this.color = color
        this.inputDirection = {x:0, y:0}
        
    }
    create(context) {
        context.fillStyle = this.color
        context.fillRect(this.xpos,this.ypos,this.wpos,this.hpos)
    }
    updateDirection(){
        this.ypos += this.inputDirection.y
    }
}

class Circle{
    constructor(xpos, ypos, radius, color){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
    }
    draw(context) {
        context.beginPath()
        context.lineWidth = 5
        context.arc(this.xpos, this.ypos, this.radius, 0 , Math.PI*2, false)
        context.fillStyle = this.color
        context.fill()
        context.stroke()
        context.closePath()   
    }
}

let pong = new Circle(200, 300, 30, 'white')
let paddleOne = new Paddle(canvas.width, canvas.height, 50, 200,'white', true)
let paddleTwo = new Paddle(this.canvas.width, this.canvas.height,50,200, 'white', false)



//event handlers
let inputDirection = {x: 0, y:0}
document.addEventListener('keydown', e =>{
    switch (e.key){
        case 'ArrowUp':
            paddleOne.inputDirection = {x: 0, y: -1} 
            break
        case 'ArrowDown':
            paddleOne.inputDirection = {x: 0, y: 1} 
            break
        case 'w':
            paddleTwo.inputDirection = {x: 0, y: -1} 
            break
        case 's':
            paddleTwo.inputDirection = {x: 0, y: 1}
            break
    }

})

reset.addEventListener('click', function(event)
{

})

pong.draw(context)
paddleOne.create(context)
paddleTwo.create(context)

function updateBoard(){
    paddleOne.updateDirection()
    paddleTwo.updateDirection()
    console.log(paddleOne.updateDirection)
}

//Game Logic

function render(){
    updateBoard()
    // updateMessgae()
}

render()