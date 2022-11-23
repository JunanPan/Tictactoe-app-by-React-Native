# Tictactoe-by-React-Native
A tic-tac-toe game build by React Native. Implemented two rules of tic-tac-toe (Normal and Misère). Set 3 play modes including offline, online, and robot-challenge.

## Normal and Misère Rules

Normal rule is very common to us, the player who makes a 3-connection wins the game. On contrary, Misère means who finishes the game (contributes to a 3-connection) loses.

## Offline Mode

Player can play by himself in this mode, the label will automatically alternative when player occupies an empty place. The same with Misère rule.


<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/1.png" width="200px"><img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/2.png" width="200px">


## Online Mode
This project use AWS Amplify including Authentication, Datastore to enable two players play online. 

<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/8.png" width="400px">

To upload and record the information like user Id of current user, every user should sign in after opening the app.

<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/3.png" width="200px"><img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/4.png" width="200px">

When user switch to “Online” from other play mode, it will query available games from datastore, if there is available game, two player matches and they can play with each other.

<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/5.png" width="400px">
<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/6.png" width="400px">
<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/7.png" width="400px">

If there is not an available game, it will create a new game in Datastore and wait for another player.

<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/9.png" width="500px">

Two player can also create an Online game of Misère version, which is similar to above.

## Robot Challenge

The Play Mode “Robot Challenge” set the corresponding algorithm of two different rules (Normal and Misère).  Just click “Robot Challenge” and try to beat my strategy!

Reference my [related report](https://arxiv.org/pdf/2208.06795.pdf) to learn about the different rules introductions and the strategies that robot uses, including “Reverse Misère rule” which is not included in this project.

<img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/10.png" width="200px"><img src="https://github.com/JunanPan/Tictactoe-by-React-Native/blob/main/imgs/11.png" width="200px">
