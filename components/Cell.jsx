import React from "react";
import {View,StyleSheet,Pressable} from 'react-native'
import Cross from "./Cross";
const Cell=(props)=>{
const {cell,onPress}= props;
return (
    <Pressable onPress={()=>onPress()} style={styles.cell}>
    {cell==="o" && <View style={styles.circle}/>}
    {cell==="x" && <Cross />}
    </Pressable> 
);
};

const styles = StyleSheet.create({
    cell:{
        // flex:1,
        margin:0,
        left:-7,
        bottom:11,
        // borderColor:"green",
        // borderWidth:1,
        height:110,
        width:127,
        // backgroundColor:'yellow'
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
})

export default Cell;