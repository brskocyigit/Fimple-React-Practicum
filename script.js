const playerOne = "X";
const playerTwo = "O";
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.getElementById('winningMessageText')
let isPlayerTwoTurn = false;

startGame();

restartButton.addEventListener('click', startGame)

function startGame(){
    isPlayerTwoTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(playerOne);
        cell.classList.remove(playerTwo);
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true});
    });

    setBoardHoverClass();
    winningMessage.classList.remove('show');
}

function handleCellClick(e){
    const cell = e.target;
    const currentClass = isPlayerTwoTurn ? playerTwo : playerOne;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText = "Berabere!"; 
    }else{
        winningMessageText.innerText = `${isPlayerTwoTurn ? "O's" : "X's"} kazandı`;
    }

    winningMessage.classList.add('show');
}

function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(playerOne) || cell.classList.contains(playerTwo);
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    isPlayerTwoTurn = !isPlayerTwoTurn;
}

function setBoardHoverClass(){
    board.classList.remove(playerOne);
    board.classList.remove(playerTwo);
    if(isPlayerTwoTurn){
        board.classList.add(playerTwo)
    }else{
        board.classList.add(playerOne)
    }
}

function checkWin(currentClass){
    return combinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}