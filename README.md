# Project Proposal : Pong

## Project Description
My app is called Pong. It's the recreation of the classic game from the 70s. This is a game for players who want to play a very mini version of table tennis. Two players can play online, there is no score kept, however, whoever is the first to miss the "ball" loses. Users will have the option to play again. In the future, I would like to add a feature where there is an automated player and a shrinking paddle as the game progresses.

## Technologies Used
I will be using HTML CSS and JavaScript to complete my game!

## Wire Frames 
Initial landing view
<img width="989" alt="Screenshot 2023-11-30 at 8 33 26 PM" src="https://github.com/GlitterAngle/Pong/assets/138747127/3af39682-b966-4dfa-9694-d99650aef481">

Results 
<img width="985" alt="Screenshot 2023-11-30 at 8 31 07 PM" src="https://github.com/GlitterAngle/Pong/assets/138747127/44e71e32-991e-48cb-81da-5d120be217a2">

##User Stories

#### MVP Goals 

- As a player I want my game to recognize when the ball is off screen so a winner is declared.
- As a player, I would like to be informed when the game is over.
- As a player who requires assistive technologies, I would like accessibility features so that I'm not left out of enjoying the game.
- As a player, I would like to be able to restart the game after a round is done.
- As a player, I would like the UI to be engaging and easy on the eyes

#### Stretch Goals

- As a player, I would like to hear a little chime when the ball hits a paddle.
- As a player, I would like the game to increase in difficulty with a smaller paddle after every 5 strikes.
- As a player, I would like to have the option to play against the computer.

## Pseudocode 

- Define the required variables used to track the state of the game(ball position, paddle positions, scores)
- Store cached element references (Reset Buttone, Winner Message, Game Board, Paddle 1, Paddle 2, Ball)
- Event Handlers (Key clicks for player 1, Key clicks for player 2)
- Game Logic (Update Board and Update Message)
- Function to render game (Call functions to update the board, update the message)
- Function to edge (keep game elements within the board boundaries)
- Function to bounce the ball off paddles and walls (only top and bottom walls)
- Function to determin a winner 
- Function to update the board (Upon load the page will have a set position and not being until a key click)
 


