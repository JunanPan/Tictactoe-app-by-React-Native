import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ImageBackground} from 'react-native';
import bg from './assets/bg.jpeg'

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMethod='contain'>
        <View style={styles.circle}>
        </View>

      <View>
        <View style={styles.crossline} />
        <View style={[styles.crossline,styles.crosslineReversed]} />
        
      </View>


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
  innerCircle:{
    height:50,
    width:50,
    marginLeft:12,
    // alignContent:'center',
    // justifyContent:'center',
    backgroundColor:'#242D34',
    borderRadius:50
  },
  crossline:{
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

  }
})