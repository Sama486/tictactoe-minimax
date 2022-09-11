import { useState } from 'react'
import Cell from './Cell'

const Board = ({ handleClick, showSign, winnerCell, }) => {

    const BOARD_SIZE = 3

    const [board, setBoard] = useState(createBoard(BOARD_SIZE))

    return (

        <div className='board'>
            {board.map((row, rowId) => (
                <div key={rowId} className='row'>
                    {row.map((cellValue, cellId) => (
                        <Cell key={cellId} cellValue={cellValue} handleClick={handleClick} showSign={showSign} winnerCell={winnerCell}/>
                    ))}
                </div>
            ))}
        </div>

    )
}

const createBoard = BOARD_SIZE => {
    let counter = 1
    const board = []
    for (let row = 0; row < BOARD_SIZE; row++) {
        const currentRow = []
        for (let col = 0; col < BOARD_SIZE; col++) {
            currentRow.push(counter++)
        }
        board.push(currentRow)
    }
    return board
}

export default Board
