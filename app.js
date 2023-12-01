

// cached
let coanvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

//event handlers
window.addEventListener('keydown', e =>{
    switch (e.key){
        case 'ArrowUp':
        inputDirection = {x: 0, y: -1}
        case 'ArrowDown'
        inputDirection = {x: 0, y: 1}
    }
})

//window 
const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

canvas.height = windowHeight
canvas.width = windowWidth
canvas.style.background = 'black'

//paddles
context.fillStyle = 'white'
let paddleOne = context.fillRect(0, 0, 50, 200)
let paddleTwo = context.fillRect(685,551,50,200)

