import React from "react";
import {View,StyleSheet,Text, Pressable} from 'react-native'

const Button=(props)=>{
const reset=props.onPress;
return (
    <View style={styles.buttons} >
        <Pressable style={styles.button} onPress={()=>reset()}><Text style={{color:'white'}}>Rest</Text></Pressable>
        <Pressable style={styles.button}><Text style={{color:'white'}}>Start</Text></Pressable>
    </View>
);
};

const styles = StyleSheet.create({
    buttons:{
        marginBottom:50,
        position:'absolute',
        bottom:50,
        flexDirection:'row',
        borderRadius:50
    },
    button:{
        borderWidth:5,
        width:80,
        height:50,
        margin:5,
        fontSize:15,
        padding:10,
        bottom:-5,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:"#BB445C",
        borderRadius:50
    }
})

export default Button;