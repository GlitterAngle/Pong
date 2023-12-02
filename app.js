

// cached
let coanvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

//event handlers
window.addEventListener('keydown', e =>{
    switch (e.key){
        case 'ArrowUp':
            inputDirection = {x: 0, y: -1} 
            break
        case 'ArrowDown':
            inputDirection = {x: 0, y: 1} 
            break
        case 'ArrowUp':
            inputDirection = {x: 0, y: -1} 
            break
        case 'ArrowDown':
            inputDirection = {x: 0, y: 1}
            break
    }
})

//window 
const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

canvas.height = windowHeight
canvas.width = windowWidth
canvas.style.background = 'black'

//paddles and ball
context.fillStyle = 'white'
let paddleOne = context.fillRect(0, 0, 50, 200)
let paddleTwo = context.fillRect(685,550,50,215)

//might need to make a class out of this or function will come back
context.beginPath()
context.lineWidth = 5
context.arc(200, 300, 10, 0 , Math.PI*2, false)
context.strokeStyle = 'pink'
context.stroke()
context.closePath()


//