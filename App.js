import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ImageBackground,Pressable, Alert} from 'react-native';
import bg from './assets/bg.jpeg'
import React,{useState} from 'react';
import Cell from './components/Cell';
import Map from './components/Map';
export default function App() {
  const [board,setBoard] = useState(
    [
      ['','',''],
      ['','',''],
      ['','','']
    ]
  )


  const [currentLabel,setCurrentLabel]=useState('x')

  const onPress=(rowIndex,colIndex)=>{
    if (board[rowIndex][colIndex]!==""){
      Alert.alert("already taken")
      return
    }
    setBoard(board=>{
      // board[rowIndex,colIndex]="x";// doesn't work can‘t change existing array
      const boardcopy=[...board];
      boardcopy[rowIndex][colIndex]=currentLabel;
      currentLabel==='x'?setCurrentLabel('o'):setCurrentLabel('x')
      return boardcopy
    });
    const end = checkWinState();
    if (!end && fullOccupied()){
      Alert.alert("Tie")
      reset()
    }
  }

  const fullOccupied=()=>{
    return board.every(row=>(
      row.every(cell=>cell!=="")
    ))
  }
  

  const checkWinState = ()=>{
    //rows
    for (let i=0;i<3;i++){
      if (board[i][0]==='x' &&board[i][1]==='x'&&board[i][2]==='x'){
        Alert.alert("X win")
        reset()
        return true
      }
      if (board[i][0]==='o' &&board[i][1]==='o'&&board[i][2]==='o'){
        Alert.alert("O win")
        reset()
        return true
      }
    }
    //cols
    for (let i=0;i<3;i++){
      if (board[0][i]==='o' &&board[1][i]==='o'&&board[2][i]==='o'){
        Alert.alert("O win")
        reset()
        return true
      }
      if (board[0][i]==='x' &&board[1][i]==='x'&&board[2][i]==='x'){
        Alert.alert("X win")
        reset()
        return true
      }
    }
    //1st diagonal
    if (board[0][0]==='o' &&board[1][1]==='o'&&board[2][2]==='o'){
      Alert.alert("O win")
      reset()
      return true
    }
    if (board[0][0]==='x' &&board[1][1]==='x'&&board[2][2]==='x'){
      Alert.alert("X win")
      reset()
      return true
    }
    //2nd diagonal
    if (board[0][2]==='o' &&board[1][1]==='o'&&board[2][0]==='o'){
      Alert.alert("O win")
      reset()
      return true
    }
    if (board[0][2]==='x' &&board[1][1]==='x'&&board[2][0]==='x'){
      Alert.alert("X win")
      reset()
      return true
    }
    return false
  }

  const reset=()=>{
    setBoard([
      ['','',''],
      ['','',''],
      ['','','']
    ]),
    setCurrentLabel('x')
  }

  return (
    <View style={styles.container}>

      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
      <Text style={{fontSize:25,color:'white'}}>Current Turn:{' '}
      {currentLabel==='x'?
      <Text style={{color:'#4474BB'}}>{currentLabel.toUpperCase()}</Text>:
      <Text style={{color:'#BB445C'}}>{currentLabel.toUpperCase()}</Text>}
        
        </Text>
      <Map board={board} onPress={onPress}/>

      </ImageBackground>
      
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#242D34'
  },
  bg:{
    paddingTop:15,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  



})

