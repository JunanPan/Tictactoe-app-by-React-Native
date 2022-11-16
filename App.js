import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ImageBackground,Pressable, Alert} from 'react-native';
import bg from './assets/bg.jpeg'
import React,{useState} from 'react';

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
    console.warn("hello",rowIndex,colIndex)
    console.log(rowIndex,colIndex)
    if (board[rowIndex][colIndex]!==""){
      Alert.alert("already taken")
      return
    }
    setBoard(board=>{
      console.log(board)
      // board[rowIndex,colIndex]="x";// doesn't work can‘t change existing array
      const boardcopy=[...board];
      boardcopy[rowIndex][colIndex]=currentLabel;
      currentLabel==='x'?setCurrentLabel('o'):setCurrentLabel('x')
      return boardcopy
    });
  }


  return (
    <View style={styles.container}>

      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
      
      <View style={styles.map}>
        {board.map((row,rowIndex) => (
          <View style={styles.row}>
            {row.map((cell,colIndex)=>(
              <Pressable onPress={()=>onPress(rowIndex,colIndex)} style={styles.cell}>
                {cell==="o" && <View style={styles.circle}/>}
                {cell==="x" && <View style={styles.cross}>
                <View style={[styles.crossline]}/>
                  <View style={[styles.crossline,styles.crosslineReversed]}/>
                </View>}
                </Pressable>
               

              
            ))
            }
          </View>))}

      </View>

      {/* <View style={styles.circle}/>
      <View style={styles.cross}>
        <View style={styles.crossline} />
        <View style={[styles.crossline,styles.crosslineReversed]} />
        
      </View> */}


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
  circle:{
    position:'absolute',
    left:10,
    top:5,
    height:75,
    width:75,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#242D34',
    borderRadius:50,
    margin:10,
    borderWidth:10,
    borderColor:'#BB445C'
  },
  cross:{
    position:'absolute',
    // left:2*135,
    // top:1*135,
    width:75,
    height:75,
    // backgroundColor:'red'
  },
  crossline:{
    left:50,
    top:18,
    position:'absolute',
    width:10,
    height:75,
    borderRadius:5,
    backgroundColor:'#4474BB',
    
    transform:[
      {
      "rotate":"45deg"
    },
  ]
  },
  crosslineReversed:{
    transform: [{ rotate: "-45deg" } 
]
  },
  map:{
    // borderWidth:1,
    marginTop:15,
    height:360,
    // borderColor:"white",
    width:"90%",
    aspectRatio:1,
  },
  row:{
    flex:1,
    flexDirection:'row',
    // borderColor:'yellow',
    // borderWidth:2,
    padding:3
  },
  cell:{
    // flex:1,
    margin:0,
    left:-7,
    // borderColor:"green",
    // borderWidth:1,
    height:110,
    width:127,
    // backgroundColor:'yellow'
  }
})