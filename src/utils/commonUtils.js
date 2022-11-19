export const emptyBoard=[
  ['','',''],
  ['','',''],
  ['','','']
];

export const fullOccupied=(board)=>{
    return board.every(row=>(
      row.every(cell=>cell!=="")
    ))
  }