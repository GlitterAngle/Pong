// cached
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
const msg = document.getElementById('msg')
const reset = document.querySelector('button')
const audioContext = new (window.AudioContext || window.AudioContext)();
const backgroundMusic = new Audio();

backgroundMusic.src = 'asset/bit-shift-kevin-macleod-main-version-24901-03-12.mp3';
backgroundMusic.loop = true;
backgroundMusic.autoplay = false;




let scoreSound = new Audio()
scoreSound.src = 'asset/notification-positive-bleep-joshua-chivers-1-00-01.mp3'
//window 

canvas.width = 1800
canvas.height = 1000

canvas.style.width = (canvas.width / 2) + 'px'
canvas.style.height = (canvas.height / 2) + 'px'

canvas.style.background = 'black'



//pieces 
class Score{
    constructor(num, xpos, ypos, color){
        this.num = num
        this.xpos = xpos
        this.ypos = ypos
        this.color = color
    }
    write(){
        context.fillStyle= this.color
        context.font = '50px Arial'
        context.fillText(this.num, this.xpos, this.ypos)
    }
}

class Paddle{
    constructor(xpos,ypos,wpos,hpos, color, speed, isPaddleOne){
        this.xpos = isPaddleOne ? xpos/ 2 - 900 : xpos /2 + 850
        this.ypos = isPaddleOne ? ypos/2 : ypos/2 
        this.wpos = wpos
        this.hpos = hpos
        this.color = color
        this.speed = speed
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
    constructor(xpos, ypos, radius, color, velocity){
        this.xpos = xpos
        this.ypos = ypos
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.dx = 1 
        this.dy = 1 
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
    
    enabledBounce = true

    bounce(){ // creates movement of the ball 
        this.draw(context) 

        let sound = new Audio()
        sound.src = 'asset/pongSound_01.wav'
        
        if (this.ypos <= 0 + this.radius || this.ypos >= canvas.height - this.radius){
            this.dy *= -1
            sound.play()
        }
        this.xpos += this.dx * this.velocity
        this.ypos += this.dy * this.velocity
        //bounce off paddle
        if(this.xpos <= (paddleOne.xpos + paddleOne.wpos +this.radius)){
            if (!this.enabledBounce){
                return}
            if(this.ypos > paddleOne.ypos - this.radius && this.ypos < paddleOne.ypos + paddleOne.hpos + this.radius){
                this.dx *= -1
                this.velocity ++
                paddleOne.speed ++
                paddleTwo.speed ++
                this.enabledBounce = false
                setTimeout(() => {
                    this.enabledBounce = true
                }, 250)
                sound.play();
            }
        } 
        if(this.xpos >= (paddleTwo.xpos - this.radius)){
            if (!this.enabledBounce){
                return}
            if(this.ypos > paddleTwo.ypos - this.radius && this.ypos < paddleTwo.ypos + paddleTwo.hpos + this.radius){
                this.dx *= -1
                this.velocity ++
                paddleOne.speed ++
                paddleTwo.speed ++
                this.enabledBounce = false
                setTimeout(() => {
                    this.enabledBounce = true
                }, 250)
                sound.play();
                
            }
        } 
    }
    randomStart(){ //makes the ball go in a random direction 
        
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
    checkOutOfBounds(){
        if(this.xpos < 0 || this.xpos > canvas.width){
            scoreSound.play()
            this.randomStart()
        }
    }
}

let pong = new Circle(canvas.width/2, canvas.height/2, 20, '#5ffbf1', 10)

let paddleOne = new Paddle(canvas.width, canvas.height, 60, 200,'#5ffbf1', 60, true)
let paddleTwo = new Paddle(canvas.width, canvas.height,60,200, '#5ffbf1', 60, false)

let scoreTwo = new Score( 0 , canvas.width - 250,canvas.height - 850, '#5ffbf1')
let scoreOne = new Score( 0, canvas.width - 1599, canvas.height - 850, '#5ffbf1')



//event listeners

window.addEventListener('keydown', (e) => {
    let currentOne = paddleOne.getCurrentY()
    let currentTwo = paddleTwo.getCurrentY()

    switch (e.keyCode) {
        case 38:  
            if (currentTwo > 0) {
                paddleTwo.ypos = Math.max(paddleTwo.ypos - paddleTwo.speed, 0)
            }
            break
        case 40:  
            if (currentTwo + paddleTwo.hpos < canvas.height) {
                paddleTwo.ypos += paddleTwo.speed
            }
            break
        case 87:  
            if (currentOne > 0) {
                paddleOne.ypos = Math.max(paddleOne.ypos - paddleOne.speed, 0)
            }
            break
        case 83:  
            if (currentOne + paddleOne.hpos < canvas.height) {
                paddleOne.ypos += paddleOne.speed
            }
            break
    }

    
})



reset.addEventListener('click', resetGame)



function updateScoreOne(value){
    let sum = value
    if (scoreOne && pong.xpos > canvas.width){
        sum++
        return scoreOne.num = sum
    }
}
function playerOneName(){
    context.fillStyle = '#5ffbf1'
    context.font = '50px Courier New'
    context.fillText('Player One', canvas.width/2 - 860 
    , canvas.height/2 - 450 )
}
function updateScoreTwo(value){
    let sum = value
    if(scoreTwo && pong.xpos < 0){
        sum++
        return scoreTwo.num = sum
    }
}

function playerTwoName(){
    context.fillStyle = '#5ffbf1'
    context.font = '50px Courier New'
    context.fillText('Player Two', canvas.width - 400 
    , canvas.height/2 - 450 )
}


//functions 

function resetGame() {
    scoreOne.num = 0
    scoreTwo.num = 0

    paddleOne.ypos = canvas.height / 2;
    paddleTwo.ypos = canvas.height / 2;

    pong.xpos = canvas.width / 2;
    pong.ypos = canvas.height / 2;
    pong.velocity = 10;

    pong.dx = 1;
    pong.dy = 1;
    paddleOne.speed = 60;
    paddleTwo.speed = 60;

    context.clearRect(0, 0, canvas.width, canvas.height);

     pong.randomStart() 
}



function stopGame(){
    pong.velocity= 0
    paddleOne.speed = 0
    paddleTwo.speed = 0
    backgroundMusic.pause()
    backgroundMusic.currentTime = 0
}

function checkForWinner(scoreOne,scoreTwo){
    if(scoreOne.num === 5){
        context.fillStyle= '#d16ba5'
        context.font = '100px Courier New'
        context.fillText ('Player One Wins!',canvas.width/2 - 450 , canvas.height/2 - 100)
        stopGame()
    }
    if(scoreTwo.num === 5){
        context.fillStyle= '#d16ba5'
        context.font = '100px Courier New'
        context.fillText ('Player Two Wins!', canvas.width/2 - 450, canvas.height/2 - 100)
        stopGame()
    }
    
}


function render() {
    pong.randomStart()
    updateBoard()
}


function updateBoard(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    paddleOne.create(context)
    paddleTwo.create(context)
    scoreOne.write()
    playerOneName()
    scoreTwo.write()
    playerTwoName()
    backgroundMusic.play()
    requestAnimationFrame(updateBoard)
    pong.bounce()
    checkForWinner(scoreOne,scoreTwo)
    updateScoreOne(scoreOne.num)
    updateScoreTwo(scoreTwo.num)
    pong.checkOutOfBounds()
    pong.draw(context)  
}

context.fillStyle = '#d16ba5'
    context.font = '100px Courier New'
    context.fillText('Press Space To Play !', canvas.width/2 - 600 , canvas.height/2 - 300 )
    context.font = '60px Courier New'
    context.fillText('Player One to move the right paddle', canvas.width/2 - 700, canvas.height/2 - 100 )
    context.fillText('press W to go up and S to go down', canvas.width/2 - 700, canvas.height/2)
    context.fillText('Player Two to move the left paddle press', canvas.width/2 - 700, canvas.height/2 + 200)
    context.fillText('Up Arrow to go up and Down Arrow to', canvas.width/2 - 700, canvas.height/2 + 300)
    context.fillText('go down', canvas.width/2 - 700, canvas.height/2 + 400)

window.addEventListener('keydown', function(e){
    if (e.keyCode === 32 ){
    render()}
})

start()