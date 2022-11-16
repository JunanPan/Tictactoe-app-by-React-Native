import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
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
  return (
    <View style={styles.container}>

      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
      
      <View style={styles.map}>
        {board.map((row) => (
          <View style={styles.row}>
            {row.map((cell)=>(
              <View style={styles.cell}></View>
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
    left:1*125,
    top:1*125,
    height:75,
    width:75,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#242D34',
    borderRadius:50,
    margin:10,
    borderWidth:10,
    borderColor:'white'
  },
  cross:{
    position:'absolute',
    left:2*135,
    top:1*135,
    width:75,
    height:75,
    // backgroundColor:'red'
  },
  crossline:{
    left:32.5,
    position:'absolute',
    width:10,
    height:75,
    borderRadius:5,
    backgroundColor:'white',
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
    borderWidth:1,
    marginTop:15,
    height:360,
    borderColor:"white",
    width:"90%",
    aspectRatio:1,
  },
  row:{
    flex:1,
    flexDirection:'row',
    borderColor:'yellow',
    borderWidth:2,
    padding:3
  },
  cell:{
    flex:1,
    borderColor:"red",
    borderWidth:1,
    width:50,
    height:110
  }
})