

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


export const isEmpty=(board)=>{
return board.every(row=>(
  row.every(cell=>cell==="")
))
}

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

const Normal_defend =(board)=>{
  //rows
  for (let i=0;i<3;i++){
    if ((board[i][0]===''&&board[i][1]==='x'&&board[i][2]==='x')||
        (board[i][0]==='x'&&board[i][1]===''&&board[i][2]==='x')||
       (board[i][0]==='x'&&board[i][1]==='x'&&board[i][2]==='')
      )
    {
      return board[i][0]===''?[i,0]:(board[i][1]===''?[i,1]:[i,2]);
    }
  }
  //cols
  for (let i=0;i<3;i++){
    if ((board[0][i]===''&&board[1][i]==='x'&&board[2][i]==='x')||
    (board[0][i]==='x'&&board[1][i]===''&&board[2][i]==='x')||
   (board[0][i]==='x'&&board[1][i]==='x'&&board[2][i]==='')
  )
  {
    return board[0][i]===''?[0,i]:(board[1][i]===''?[1,i]:[2,i]);
  }
  }
  //1st diagonal
  if ((board[0][0]===''&&board[1][1]==='x'&&board[2][2]==='x')||
  (board[0][0]==='x'&&board[1][1]===''&&board[2][2]==='x')||
 (board[0][0]==='x'&&board[1][1]==='x'&&board[2][2]==='')
  )
  {
    return board[0][0]===''?[0,0]:(board[1][1]===''?[1,1]:[2,2]);
  }
  //2nd diagonal
  if ((board[2][0]===''&&board[1][1]==='x'&&board[0][2]==='x')||
  (board[2][0]==='x'&&board[1][1]===''&&board[0][2]==='x')||
 (board[2][0]==='x'&&board[1][1]==='x'&&board[0][2]==='')
  )
  {
    return board[2][0]===''?[2,0]:(board[1][1]===''?[1,1]:[0,2]);
  }
  return false //don't need to defend
}

export  const Normal_RobotTurn=(board,playerLastStep)=>{

  if(fullOccupied(board)){
    return false;
  }
  else if(isEmpty(board)){
    return {row:1,col:1};
  }

  let boardCopy = board.map(board => {
    return [...board];
});

  let count=0;
  for(let i=0;i<boardCopy.length;i++){
    for(let j=0;j<boardCopy[0].length;j++){
      if(boardCopy[i][j]===''){
        boardCopy[i][j]='o';
        if (Normal_checkWinState(boardCopy)===2){
            return {row:i,col:j};
        }
        else{
          boardCopy[i][j]=''; //trace back
        }
      }
      else{
        count+=1;
      }
    }
  }


  if(count===2){
    if(playerLastStep[0]===1||playerLastStep[1]===1){//first situation :player occupied an edge first
      if(playerLastStep[0]===1){
            return {row:playerLastStep[0]-1,col:playerLastStep[1]};
          }
          else if(playerLastStep[1]===1){
            return {row:playerLastStep[0],col:playerLastStep[1]-1};
          }
    }
  else //second situation: player occupied a corner first
  {
    //if it is at the 1st diagonal
   if((playerLastStep[0]===0 && playerLastStep[1]===0) || (playerLastStep[0]===2 && playerLastStep[1]===2)){
    return {row:0,col:2};
   }
   else{// at the 2nd diagonal
    return {row:0,col:0}
   }
  }
  }
  if(count===4){
    //check how many corners are occupied to see which situation it is
    let corners = 0;
    if (board[0][0]!==''){corners+=1;}
    if (board[0][2]!==''){corners+=1;}
    if (board[2][0]!==''){corners+=1;}
    if (board[2][2]!==''){corners+=1;}
    if(corners===2){ //first situation
      //find which corner is o
    if (board[0][0]==='o'){
      return  board[0][1]===''?{row:0,col:1}:{row:1,col:0}
    }
    else if(board[0][2]==='o'){
      return  board[0][1]===''?{row:0,col:1}:{row:1,col:2}
    }
    else if(board[2][0]==='o'){
      return  board[1][0]===''?{row:1,col:0}:{row:2,col:1}
    }
    else{
      return  board[1][2]===''?{row:1,col:2}:{row:2,col:1}
    }
    }
  }
  const result = Normal_defend(board);
  if(result){
    return {row:result[0],col:result[1]}
  }
  else{
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[0].length;j++){
        if(board[i][j]===''){
          return {row:i,col:j}
        }
      }
    }
  }


    // const possiblePositions=[];
    // board.forEach((row,rowIndex)=>{
    //   row.forEach((cell,colIndex)=>{
    //     if (cell===""){
    //       possiblePositions.push({row:rowIndex,col:colIndex})
    //     }
    //   })
    // })
    // if (possiblePositions.length===0){
    //   return false;
    // }
    // const chosenOption = possiblePositions[Math.floor(Math.random()*possiblePositions.length)]
    // return chosenOption;
  }

  export  const Misere_RobotTurn=(board,playerLastStep)=>{
    if(fullOccupied(board)){
      return false;
    }
    else if(isEmpty(board)){
      return {row:1,col:1};
    }
    else{
      return {row:1*2-playerLastStep[0],col:1*2-playerLastStep[1]};
    } 
    }
    
    // const possiblePositions=[];
    // board.forEach((row,rowIndex)=>{
    //   row.forEach((cell,colIndex)=>{
    //     if (cell===""){
    //       possiblePositions.push({row:rowIndex,col:colIndex})
    //     }
    //   })
    // })
    // if (possiblePositions.length===0){
    //   return false;
    // }
    // const chosenOption = possiblePositions[Math.floor(Math.random()*possiblePositions.length)]
    // return chosenOption;
  