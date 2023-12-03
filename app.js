// cached
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
const msg = document.getElementById('msg')
const reset = document.querySelector('button')
let speed = 20

//window 

canvas.width = 1400
canvas.height = 1000

canvas.style.width = (canvas.width / 2) + 'px'
canvas.style.height = (canvas.height / 2) + 'px'


canvas.style.background = 'black'

//paddles and ball
// context.fillStyle = 'pink'
// let paddleOne = context.fillRect(canvas.width/2 -700 ,canvas.
// height/2 - 500,50,200)
// context.fillStyle = 'blue'
// let paddleTwo = context.fillRect(canvas.width/2 + 650, canvas.height/2 + 300, 50, 200)

class Paddle{
    constructor(xpos,ypos,wpos,hpos, color, isPaddleOne){
        this.xpos = isPaddleOne ? xpos/ 2 - 700 : xpos /2 + 650
        this.ypos = isPaddleOne ? ypos/2 - 500 : ypos/2 + 300
        this.wpos = wpos
        this.hpos = hpos
        this.color = color
    }
    create(context) {
        context.fillStyle = this.color
        context.fillRect(this.xpos,this.ypos,this.wpos,this.hpos)
    }
   getCurrentY(){
    return this.ypos
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
let paddleOne = new Paddle(canvas.width, canvas.height, 50, 200,'pink', true)
let paddleTwo = new Paddle(canvas.width, canvas.height,50,200, 'blue', false)


//event listeners
window.addEventListener('keydown',(e) =>{

let currentOne = paddleOne.getCurrentY()
let currentTwo = paddleTwo.getCurrentY()

    if(e.keyCode === 38){
        if(currentTwo > 0 ){
            currentTwo -= speed
            paddleTwo.ypos = currentTwo 

            
        }
    }
    if(e.keyCode === 40){
        if(currentTwo + paddleTwo.hpos < canvas.height){
            currentTwo += speed
            paddleTwo.ypos = currentTwo
        }
    }
    if(e.keyCode === 87){
        if(currentOne > 0){
            currentOne -= speed
            paddleOne.ypos = currentOne
        }
    }
    if(e.keyCode === 83){
        if(currentOne + paddleOne.hpos < canvas.height){
            currentOne += speed
            paddleOne.ypos = currentOne
        }
    }

    render()
})



reset.addEventListener('click', init)

//call what you need 
function render() {
    updateBoard()
   
}

function updateBoard(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    pong.draw(context);
    paddleOne.create(context);
    paddleTwo.create(context);
}

function init(){
    render()
}

init()