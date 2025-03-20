import React, { useState } from 'react'
import { View,Text,Image } from 'react-native';
import Animated,{ useSharedValue, withSpring } from 'react-native-reanimated';
import tw from "../../../tw"; 
import { StyleSheet, TouchableOpacity } from 'react-native';


const Gift = () => {
    const [isOpened,setIsOpened]= useState(false);
    const [reward, setReward]= useState("");
    const scale = useSharedValue(1);

    const handleOpenBox =()=>{
        
        setIsOpened(true);
        setReward(reward[Math.floor(Math.random())])

        scale.value= withSpring(1.2, {damping:3, stiffness:100});

        setTimeout(()=>{
            scale.value= withSpring(1);
        },500)
    }

  return (


    <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenBox} disabled={isOpened}>
          <Animated.Image
             source={
                isOpened
                ? require("../../assets/logo.png")
                : require("../../assets/logo.png")
             }

             style={[styles.boxImage, {transform:[{scale}]}]}
          />
        </TouchableOpacity>
        {isOpened && <Text style={styles.rewardText}>{reward}</Text>}
      
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#282c34",
      },
      boxImage: {
        width: 200,
        height: 200,
      },
      rewardText: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
      },
})

export default Gift
