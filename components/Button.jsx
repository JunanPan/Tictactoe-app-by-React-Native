import React from "react";
import {View,StyleSheet,Text, Pressable} from 'react-native'

const Button=(props)=>{
const reset=props.onPress;
const Logout=props.Logout;
return (
    <View style={styles.buttons} >
        <Pressable style={styles.button} onPress={()=>reset()}><Text style={{color:'white'}}>Rest</Text></Pressable>
        <Pressable style={styles.button}><Text style={{color:'white'}}>Start</Text></Pressable>
        <Text onPress={()=>Logout()} style={styles.logout}>Logout</Text>
    </View>
);
};

const styles = StyleSheet.create({
    buttons:{
        width:'100%',
        marginBottom:50,
        position:'absolute',
        bottom:50,
        flexDirection:'row',
        // backgroundColor:'yellow',
        alignContent:'center',
        justifyContent:'center'
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
    },
    logout:{
        bottom:-20,
        margin:5,
        color:'white',
        textDecorationLine:'underline',
        
      }
})

export default Button;