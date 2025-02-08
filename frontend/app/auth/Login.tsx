import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://localhost:4000"; // Replace with your machine's IP or deployed backend URL

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
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <View className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <Text className="text-2xl font-bold text-center mb-4">Login</Text>

        <TextInput
          className="w-full bg-gray-200 p-3 rounded-lg mb-3"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="w-full bg-gray-200 p-3 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-lg"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}