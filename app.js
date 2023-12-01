

// cached
let coanvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

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


