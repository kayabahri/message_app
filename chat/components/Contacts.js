import React from "react";
import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons'


const ContactRow=({name,subtitle,onPress})=>{

    return(
        <TouchableOpacity style={styles.row}onPress={onPress}>
        <View style={styles.avatar}>
           <Text style={styles.avatarLabel}> {name.split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')}</Text>
       </View>  
         <View style={styles.textsContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
         </View>
         <Ionicons name="chevron-forward-outline"size={20}/>
      </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:30
    },
    textsContainer:{
        flex:1,
        marginStart:16,
    },
    avatar:{
       width:56,
       height:56,
       backgroundColor:'#2196f3',
       borderRadius: 28,
       alignItems:'center',
       justifyContent:'center',   
    },
    avatarLabel:{
        fontSize:20,
        color:'white',
    },
    name: {
        fontSize:16,
    },
    subtitle:{
        marginTop: 2,
        color: '#565656'
    },
    serprator:{
        height:StyleSheet.hairlineWidth,
        backgroundColor:'gray'
    }
});

export default ContactRow;