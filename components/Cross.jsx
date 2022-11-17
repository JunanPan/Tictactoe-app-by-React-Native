import React from "react";
import {View,StyleSheet} from 'react-native'

const Cross=()=>{
return (
    <View style={styles.cross}>
    <View style={[styles.crossline]}/>
    <View style={[styles.crossline,styles.crosslineReversed]}/>
    </View>
);

};

const styles = StyleSheet.create({
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
})

export default Cross;