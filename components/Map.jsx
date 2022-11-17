import React from "react";
import {View,StyleSheet,Pressable} from 'react-native'
import Cell from "./Cell";
const Map=(props)=>{
const {board,onPress}= props;
return (
    <View style={styles.map}>
    {board.map((row,rowIndex) => (
      <View style={styles.row}>
        {row.map((cell,colIndex)=>(
          <Cell cell={cell} onPress={()=>onPress(rowIndex,colIndex)}/>
        ))
        }
      </View>
      ))}
  </View>
);
};

const styles = StyleSheet.create({
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
})

export default Map;