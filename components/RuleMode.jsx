import React from "react";
import {View,StyleSheet,Text, Pressable,Alert} from 'react-native'

const RuleMode=(props)=>{
const ruleMode=props.ruleMode;
const setRuleMode = props.onPress;
return (
    <View style={styles.modes}> 

    <Pressable onPress={()=>{
        setRuleMode('Normal');
        Alert.alert("Normal Rule:","XXX or OOO win.",[{
            text:'Got it!',
          }]);
    }} style={[styles.mode,{backgroundColor:ruleMode==="Normal"? "#4f5686":"#191f24"}]}>
            <Text style={{color:'white'}}> Normal</Text>
    </Pressable> 
       
       
    <Pressable onPress={()=>{
        setRuleMode('Misere');
        Alert.alert("Misere Rule:","XXX or OOO lose.",[{
            text:'Got it!',
          }]);
        }} style={[styles.mode,{backgroundColor:ruleMode==="Misere"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Misere</Text>
    </Pressable> 

    {/* <Pressable onPress={()=>{
        setRuleMode('Reverse Misere');
        Alert.alert("Reverse Misere Rule:","XXX lose.",[{
            text:'Got it!',
          }]);
        }} style={[styles.mode,{backgroundColor:ruleMode==="Reverse Misere"? "#4f5686":"#191f24"}]}>
        <Text style={{color:'white'}}> Reverse Misere</Text>
    </Pressable>  */}
    
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

export default RuleMode;