/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (board[position] === ' ') {
        board[position] = mark;
    }
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    UpdatedBoard ={
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' '
    };

    for (let i in UpdatedBoard){
        
        if(board[i] == ' '){
            UpdatedBoard[i] = i;
        }else{
            UpdatedBoard[i] = board[i];
        }
    }

    console.log(
        `${UpdatedBoard[1]} | ${UpdatedBoard[2]} | ${UpdatedBoard[3]} \n` +
        '---------\n' +
        `${UpdatedBoard[4]} | ${UpdatedBoard[5]} | ${UpdatedBoard[6]} \n` +
        '---------\n' +
        `${UpdatedBoard[7]} | ${UpdatedBoard[8]} | ${UpdatedBoard[9]} \n`
    );

}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let pos = parseInt(position);
    if(pos >= 1 && pos <= 9 && board[pos] == ' '){
        return true
    }
    return false;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
for (let win of winCombinations){
    if(board[win[0]] == player && board[win[1]] == player && board[win[2]] == player){
        return true;
        }
    }
    return false;
}


// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    return Object.values(board).every(position => position !== ' ');
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position;
    do {
        position = prompt(`Player ${player}'s turn. Please select your position using 1-9: `);
    } while (!validateMove(position));
    markBoard(position, player);
    printBoard();
    return checkWin(player);
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    winnerIdentified = playTurn(currentTurnPlayer);

    if (winnerIdentified) {
        console.log(`Player ${currentTurnPlayer} wins the game. Congrats!`);
    } else if (checkFull()) {
        console.log("It's a tie! No winner.");
        break;
    } else {
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }
    // feel free to add logic here if needed, e.g. announcing winner or tie
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function startNewGame() {
    while (true) { 
        let newGame = prompt('Do you like to start a new game? (Y/N): ');
        if (newGame.toUpperCase() === 'Y') { 
            board = {
                1: ' ', 2: ' ', 3: ' ',
                4: ' ', 5: ' ', 6: ' ',
                7: ' ', 8: ' ', 9: ' '
            };
            winnerIdentified = false;
            currentTurnPlayer = 'X';
        
            console.log(
                'Game started: \n\n' +
                ' 1 | 2 | 3 \n' +
                '---------\n' +
                ' 4 | 5 | 6 \n' +
                '---------\n' +
                ' 7 | 8 | 9 \n'
            );

            while (!winnerIdentified) {
                winnerIdentified = playTurn(currentTurnPlayer);
                if (winnerIdentified) {
                    console.log(`Player ${currentTurnPlayer} wins the game. Congrats!`);
                } else if (checkFull()) {
                    console.log("It's a tie! No winner.");
                    break;
                } else {
                    currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
                }
            }
        } else if (newGame.toUpperCase() === 'N') { 
            console.log('Thanks for playing!');
            break; // Exit the loop if user chooses not to play another game
        }
    }
}

startNewGame();