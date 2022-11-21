
export const Normal_checkWinState = (board)=>{
    //rows
    for (let i=0;i<3;i++){
      if (board[i][0]==='x' &&board[i][1]==='x'&&board[i][2]==='x'){
        return 1 //first player win
      }
      if (board[i][0]==='o' &&board[i][1]==='o'&&board[i][2]==='o'){
        return 2 //second player win
      }
    }
    //cols
    for (let i=0;i<3;i++){
      if (board[0][i]==='o' &&board[1][i]==='o'&&board[2][i]==='o'){
        return 2
      }
      if (board[0][i]==='x' &&board[1][i]==='x'&&board[2][i]==='x'){
        return 1
      }
    }
    //1st diagonal
    if (board[0][0]==='o' &&board[1][1]==='o'&&board[2][2]==='o'){
        return 2
    }
    if (board[0][0]==='x' &&board[1][1]==='x'&&board[2][2]==='x'){
        return 1
    }
    //2nd diagonal
    if (board[0][2]==='o' &&board[1][1]==='o'&&board[2][0]==='o'){
        return 2
    }
    if (board[0][2]==='x' &&board[1][1]==='x'&&board[2][0]==='x'){
        return 1
    }
    return 3//no result yet
  }

  export const Misere_checkWinState = (board)=>{
    //rows
    for (let i=0;i<3;i++){
      if (board[i][0]==='x' &&board[i][1]==='x'&&board[i][2]==='x'){
        return 2 //o win
      }
      if (board[i][0]==='o' &&board[i][1]==='o'&&board[i][2]==='o'){
        return 1 //x win
      }
    }
    //cols
    for (let i=0;i<3;i++){
      if (board[0][i]==='o' &&board[1][i]==='o'&&board[2][i]==='o'){
        return 1
      }
      if (board[0][i]==='x' &&board[1][i]==='x'&&board[2][i]==='x'){
        return 2
      }
    }
    //1st diagonal
    if (board[0][0]==='o' &&board[1][1]==='o'&&board[2][2]==='o'){
        return 1
    }
    if (board[0][0]==='x' &&board[1][1]==='x'&&board[2][2]==='x'){
        return 2
    }
    //2nd diagonal
    if (board[0][2]==='o' &&board[1][1]==='o'&&board[2][0]==='o'){
        return 1
    }
    if (board[0][2]==='x' &&board[1][1]==='x'&&board[2][0]==='x'){
        return 2
    }
    return 3//no result yet
  }

export  const Normal_RobotTurn=(board)=>{
    const possiblePositions=[];
    board.forEach((row,rowIndex)=>{
      row.forEach((cell,colIndex)=>{
        if (cell===""){
          possiblePositions.push({row:rowIndex,col:colIndex})
        }
      })
    })
    if (possiblePositions.length===0){
      return false;
    }
    const chosenOption = possiblePositions[Math.floor(Math.random()*possiblePositions.length)]
    return chosenOption;
  }

  export  const Misere_RobotTurn=(board)=>{
    //first step
    if (board===[
      ['','',''],
      ['','',''],
      ['','','']
    ]){
      return {row:1,col:1};
      }

    const possiblePositions=[];
    board.forEach((row,rowIndex)=>{
      row.forEach((cell,colIndex)=>{
        if (cell===""){
          possiblePositions.push({row:rowIndex,col:colIndex})
        }
      })
    })
    if (possiblePositions.length===0){
      return false;
    }
    const chosenOption = possiblePositions[Math.floor(Math.random()*possiblePositions.length)]
    return chosenOption;
  }