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
context.fillStyle = 'pink'
let paddleOne = context.fillRect(canvas.width/2 -700 ,canvas.
height/2 - 500,50,200)
context.fillStyle = 'blue'
let paddleTwo = context.fillRect(canvas.width/2 + 650, canvas.height/2 + 300, 50, 200)


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


//event listeners


document.addEventListener('keydown', function moveUpOrDown(event){
    if(event.keyCode === 38){
        paddleTwo.ypos -= 20
        console.log('Up arrow key pressed!');
    }
})



// reset.addEventListener('click', function(event)
// {

// })

//call what you need 
pong.draw(context)
paddleOne.create(context)
paddleTwo.create(context)

// function updateBoard(){
//     pong.draw(context)
//     paddleOne.create(context)
//     paddleTwo.create(context)
// }

// //Game Logic

// function render(){
//     updateBoard()
//     // updateMessgae()
// }

// render()