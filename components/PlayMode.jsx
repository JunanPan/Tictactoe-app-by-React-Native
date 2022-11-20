import React from "react";
import {View,StyleSheet,Text, Pressable,Alert} from 'react-native'

const PlayMode=(props)=>{
const playMode=props.playMode;
const setPlayMode = props.onPress;
return (
    <View style={styles.modes}> 
    <Pressable onPress={()=>setPlayMode('Offline')} style={[styles.mode,{backgroundColor:playMode==="Offline"? "#4f5686":"#191f24"}]}>
            <Text style={{color:'white'}}> Offline</Text>
    </Pressable> 
       
       
    <Pressable onPress={()=>setPlayMode('Online')} style={[styles.mode,{backgroundColor:playMode==="Online"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Online</Text>
    </Pressable> 

    <Pressable onPress={()=>{
        setPlayMode('Robot Challenge');
        Alert.alert("Challenge:","Can you beat a robot who moves first?",[{
            text:'Have a try!',
          }]);
        }} style={[styles.mode,{backgroundColor:playMode==="Robot Challenge"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Robot Challenge</Text>
    </Pressable> 
    
    </View>
);
};

const styles = StyleSheet.create({
    modes:{
        // zIndex:100,
        marginBottom:550,
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

export default PlayMode;