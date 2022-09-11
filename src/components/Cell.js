import { useState, useLayoutEffect } from 'react'


const Cell = ({ cellValue, handleClick, showSign, winnerCell}) => {

  useLayoutEffect(() => {
    
  },[handleClick])
  
  
  return (
    <div className={ winnerCell.includes(cellValue) ? 'cellWinner' : 'cell' }  onClick={() => handleClick(cellValue)} >
      <p className='sign '>{showSign[cellValue]} </p>
    </div>
  )
}

export default Cell
