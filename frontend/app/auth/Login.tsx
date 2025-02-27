import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'; // Import tw from twrnc
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";


const BASE_URL = "http://192.168.1.81:3000"; // Replace with your actual backend URL


export default function LoginScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password,
      }, {
        withCredentials: true,
      });
      await AsyncStorage.setItem("token", res.data.token); // Save token
      Alert.alert("Login Successful");
      navigation.navigate("Index");
    } catch (error) {
      const errorMessage = (error?.response?.data?.message || "Login Failed!");
      Alert.alert('Error', errorMessage);
    }
  };

 

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-8`}> 
      <View style={tw`w-[90%] h-[60%] bg-white p-8 rounded-2xl shadow-lg`}>
        {/* Logo Section */}
        <Image
          source={require('../assets/logo.png')}
          style={tw`w-35 h-30 mx-auto mb-10`}
        />

        <Text style={tw`text-3xl font-bold text-center mb-6 text-blue-600`}>Welcome Back</Text>

        {/* Email Input */}
        <TextInput
          style={tw`w-full bg-gray-200 p-3 rounded-lg mb-3`}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-lg mb-3`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-center font-bold`}>Login</Text>
        </TouchableOpacity>

        {/* forgot Password button Button */}
        <TouchableOpacity
          style={tw`flex-row items-center p-3 rounded-lg text-sm`}
          onPress={()=>{router.navigate('ForgotPassword')}}
        >
          <Text style={tw`text-white text-center font-bold flex-1`}>Forgot Password ?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={tw`flex-row items-center justify-center my-10`}>
          <View style={tw`flex-1 h-0.5 bg-gray-300`}></View>
          <Text style={tw`mx-3 text-gray-500`}>OR </Text>
          <View style={tw`flex-1 h-0.5 bg-gray-300`}></View>
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          style={tw`flex-row items-center bg-red-500 p-3 rounded-lg mb-3`}
          // onPress={googleSignInFunction}
        >
          <FontAwesome name="google" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-center font-bold flex-1`}>Login with Google</Text>
        </TouchableOpacity>

        {/* Facebook Login Button */}
        <TouchableOpacity
          style={tw`flex-row items-center bg-blue-700 p-3 rounded-lg`}
          // onPress={facebookSignInFunction}
        >
          <FontAwesome name="facebook" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-center font-bold flex-1`}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}