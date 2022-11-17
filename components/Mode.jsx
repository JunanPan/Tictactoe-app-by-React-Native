import React from "react";
import {View,StyleSheet,Text, Pressable} from 'react-native'

const Mode=(props)=>{
const gameMode=props.gameMode;
const setGameMode = props.onPress;
return (
    <View style={styles.modes}> 

    <Pressable onPress={()=>setGameMode('Normal')} style={[styles.mode,{backgroundColor:gameMode==="Normal"? "#4f5686":"#191f24"}]}>
            <Text style={{color:'white'}}> Normal</Text>
    </Pressable> 
       
       
    <Pressable onPress={()=>setGameMode('Misere')} style={[styles.mode,{backgroundColor:gameMode==="Misere"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Misere</Text>
    </Pressable> 

    <Pressable onPress={()=>setGameMode('Reverse Misere')} style={[styles.mode,{backgroundColor:gameMode==="Reverse Misere"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Reverse Misere</Text>
    </Pressable> 
    
    </View>
);
};

const styles = StyleSheet.create({
    modes:{
        marginBottom:50,
        position:'absolute',
        bottom:110,
        flexDirection:'row',
        borderRadius:50
    },
    mode:{
        color:'white',
        // borderWidth:5,
        margin:5,
        fontSize:15,
        padding:10,
        backgroundColor:"#191f24",
        borderRadius:50
    }
})

export default Mode;