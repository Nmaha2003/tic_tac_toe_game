const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')
    // Initialize variables for the game

let player = 'X'
let isPauseGame = false
let isGameStart = false
    // /Array of win conditions

const inputCells = ['', '', '',
    '', '', '',
    '', '', '',
]

// Array of win conditions
const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], //Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], //columns
        [0, 4, 8],
        [2, 4, 6], //diagonals
    ]
    // add click event listeners to each columnRuleColor: 

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
    // ensure cell is empty and game isn't pause
    if (cell.textContent == '' &&
        !isPauseGame) {
        isGameStart = true
        updateCell(cell, index)
            // do a random pick if there are no 
        if (!checkWinner()) {
            changePlayer()
            randomPick()
        }


    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        //check each winning conditions
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player) {
            declareWinner([a, b, c])
            return true

        }
    }
    //check for a draw (if all cells are filled)
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
}

function choosePlayer(selectedPlayer) {
    //ensure the game hasn't started
    if (!isGameStart) {
        //override the selected player value
        player = selectedPlayer
        if (player == 'X') {
            //highlight x display: 
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            //highlight o display:
            oPlayerDisplay.classList.add('player-active')
            xPlayerDisplay.classList.remove('player-active')
        }
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`
    isPauseGame = true
        //highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    )
    restartBtn.style.visibility = 'visible'
}

function declareDraw() {
    titleHeader.textContent = 'Draw'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}
restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''

    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
})

function randomPick() {
    //pause the game to allow computer to pick 
    isPauseGame = true
    setTimeout(() => {
            let randomIndex
            do {
                //pick a random index
                randomIndex = Math.floor(Math.random() * inputCells.length)
            } while (
                //ensure the choose cell is emptyCells: 
                inputCells[randomIndex] != ''

            )
            //update the cell with computer move 
            updateCell(cells[randomIndex], randomIndex, player)
                //check if computer won
            if (!checkWinner()) {
                changePlayer()
                    //switch back to human player
                isPauseGame = false
                return
            }
            player = (player == 'X') ? 'O' : 'X'
        }, 1000) //delay computer move by 1 second
}