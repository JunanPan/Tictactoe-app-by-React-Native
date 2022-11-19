import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

import { withAuthenticator } from 'aws-amplify-react-native';
import {Auth} from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { Text, View ,ImageBackground,Pressable, Alert} from 'react-native';
import bg from './assets/bg.jpeg'
import React,{useEffect, useState} from 'react';
import Map from './components/Map';
import RuleMode from './components/RuleMode';
import Button from './components/Button';
import {Normal_checkWinState,Normal_RobotTurn} from './src/utils/gameLogic';
import {emptyBoard,fullOccupied} from './src/utils/commonUtils';
import {styles} from './App.style.js';


// export default function App() {
function App() {
  const [board,setBoard] = useState(emptyBoard);
  
  const [gameMode,setGameMode]=useState("Normal")//Normal, Misere, Reverse Misere
  
  const [currentLabel,setCurrentLabel]=useState('x')

  const reset=()=>{
    setBoard([
      ['','',''],
      ['','',''],
      ['','','']
    ]),
    setCurrentLabel('x')
  }

  useEffect(()=>{
    if (currentLabel==='o'){
      const chosenOption = Normal_RobotTurn(board); //comment here to comment robot Turn
      if (chosenOption){//if robot has place to go
        Normal_occupyOneposition(chosenOption.row,chosenOption.col);
      }
      
    }
    let end = "";
    if (gameMode==="Normal"){
      end = Normal_checkWinState(board);
      if (end===1){//first player win
        Alert.alert("X win!","",[{
          text:'Restart',
          onPress:reset,
        }]);
        // reset()
      }
      else if (end===2){//second player win
        Alert.alert("O win!","",[{
          text:'Restart',
          onPress:reset,
        }]);
        //  reset()
      }
    }
    if (end===3 && fullOccupied(board)){
      Alert.alert("Tie!","",[{
        text:'Restart',
        onPress:reset,
      }]);
      // reset()
    }
  },[currentLabel])//should write below the definition of currentLabel


  const Logout=()=>{
    Auth.signOut();
  }

  const Normal_occupyOneposition=(rowIndex,colIndex)=>{
    console.warn(board[rowIndex][colIndex])
    if (board[rowIndex][colIndex]!==""){
      Alert.alert("already taken")
      return
    }
    setBoard(board=>{
      // board[rowIndex,colIndex]="x";// doesn't work can‘t change existing array
      const boardcopy=[...board];
      boardcopy[rowIndex][colIndex]=currentLabel;
      return boardcopy
    })
    currentLabel==='x'?setCurrentLabel('o'):setCurrentLabel('x');
  }

  // const Normal_RobotTurn=(board)=>{
  //   const possiblePositions=[];
  //   board.forEach((row,rowIndex)=>{
  //     row.forEach((cell,colIndex)=>{
  //       if (cell===""){
  //         possiblePositions.push({row:rowIndex,col:colIndex})
  //       }
  //     })
  //   })
  //   if (possiblePositions.length===0){
  //     return
  //   }
  //   const chosenOption = possiblePositions[Math.floor(Math.random()*possiblePositions.length)]
  //   console.warn(chosenOption.row,chosenOption.col)
  //   Normal_occupyOneposition(chosenOption.row,chosenOption.col);
  // }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
      <Text style={{fontSize:25,color:'white'}}>Current Turn:{' '}
      {currentLabel==='x'?
      <Text style={{color:'#4474BB'}}>{currentLabel.toUpperCase()}</Text>:
      <Text style={{color:'#BB445C'}}>{currentLabel.toUpperCase()}</Text>}
        
        </Text>
      <Map board={board} onPress={Normal_occupyOneposition}/>

      <RuleMode gameMode={gameMode} onPress={setGameMode}/>

      <Button onPress={reset} Logout={Logout}/>
      
      </ImageBackground>
      
      <StatusBar style="auto" />
    </View>
  );
  }


export default withAuthenticator(App);