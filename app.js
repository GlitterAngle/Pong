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
    constructor(xpos, ypos, radius, color, speed){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
        this.speed = speed
        this.dx = 1 
        this.dy = 1 
    }
    randomStart(){
        if(Math.floor(Math.random()* 2) == 1){
            this.dx = 1
        } else {
            this.dx = -1
        }
        if(Math.floor(Math.random()* 2) == 1){
            this.dy = 1
        } else {
            this.dy = -1
        }
        this.xpos = canvas.width/2
        this.ypos = canvas.height/2
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
    bounce(){
        this.draw(context) 
        
        if (this.ypos <= 0 + this.radius){
            this.dy *= -1
        }
        if(this.ypos >= canvas.height - this.radius){
            this.dy *= -1
        }
        //bounce off paddle
        if(this.xpos <= (paddleOne.xpos + paddleOne.wpos +this.radius)){
            if(this.ypos > paddleOne.ypos && this.ypos < paddleOne.ypos + paddleOne.hpos){
                this.dx *= -1
            }
        } 
        if(this.xpos >= (paddleTwo.xpos - this.radius)){
            if(this.ypos > paddleTwo.ypos && this.ypos < paddleTwo.ypos + paddleTwo.hpos){
                this.dx *= -1
            }
        } 


        this.xpos += (this.speed*this.dx)
        this.ypos += (this.speed*this.dy)
    }
   
}

let pong = new Circle(canvas.width/2, canvas.height/2, 20, 'white', 10)
pong.randomStart()
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
            pong.speed = 10 

            
        }
    }
    if(e.keyCode === 40){
        if(currentTwo + paddleTwo.hpos < canvas.height){
            currentTwo += speed
            paddleTwo.ypos = currentTwo
            pong.speed = 10
        }
    }
    if(e.keyCode === 87){
        if(currentOne > 0){
            currentOne -= speed
            paddleOne.ypos = currentOne
            pong.speed = 10
        }
    }
    if(e.keyCode === 83){
        if(currentOne + paddleOne.hpos < canvas.height){
            currentOne += speed
            paddleOne.ypos = currentOne
            pong.speed = 10
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
    paddleOne.create(context);
    paddleTwo.create(context);
    requestAnimationFrame(updateBoard)
    pong.bounce()
    pong.collision()
    pong.draw(context)
}



function init(){
    render()
}

init()