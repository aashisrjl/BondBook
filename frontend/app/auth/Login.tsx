import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'; // Import tw from twrnc

const BASE_URL = "http://192.168.254.13:3000" || "http://.168.1.74:3000 "; // Replace with your actual backend URL

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password,
      }, {
        withCredentials: true,
      });

      await AsyncStorage.setItem("token", res.data.token); // Save token
      Alert.alert("Login Successful");
    } catch (error) {
      const errorMessage = (error as any)?.response?.data?.message || "Login Failed!";
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 p-6`}>
      <View style={tw`w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>Login</Text>

        <TextInput
          style={tw`w-full bg-gray-200 p-3 rounded-lg mb-3`}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-lg`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-center font-bold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
