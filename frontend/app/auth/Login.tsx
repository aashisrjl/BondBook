import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });
      await AsyncStorage.setItem("token", res.data.token);
      Alert.alert("Login Successful");
      navigation.navigate("Index");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login Failed!";
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-gray-50`}
    >
      <ScrollView 
        contentContainerStyle={tw`flex-grow justify-center`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-1 justify-center items-center p-6 min-h-screen`}>
          <View style={tw`w-full max-w-md bg-white p-8 rounded-2xl shadow-xl`}>
            {/* Logo Section */}
            <View style={tw`items-center mb-8`}>
              <Image
                source={require('../assets/logo.png')}
                style={tw`w-32 h-32`}
                resizeMode="contain"
              />
            </View>

            {/* Welcome Text */}
            <Text style={tw`text-2xl font-bold text-center mb-8 text-gray-800`}>
              Welcome Back
            </Text>

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <TextInput
                style={tw`w-full bg-gray-100 p-4 rounded-xl text-base border border-gray-200 focus:border-blue-500`}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={tw`mb-6`}>
              <TextInput
                style={tw`w-full bg-gray-100 p-4 rounded-xl text-base border border-gray-200 focus:border-blue-500`}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 p-4 rounded-xl mb-4 shadow-md`}
              onPress={handleLogin}
            >
              <Text style={tw`text-white text-center font-semibold text-base`}>
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={tw`text-blue-600 text-center text-sm font-medium mb-6`}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={tw`flex-row items-center justify-center my-6`}>
              <View style={tw`flex-1 h-px bg-gray-200`}></View>
              <Text style={tw`mx-4 text-gray-400 text-sm`}>OR</Text>
              <View style={tw`flex-1 h-px bg-gray-200`}></View>
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={tw`flex-row items-center bg-white border border-gray-200 p-4 rounded-xl mb-4 justify-center shadow-sm`}
            >
              <FontAwesome name="google" size={20} color="#DB4437" style={tw`mr-3`} />
              <Text style={tw`text-gray-800 font-medium text-base`}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row items-center bg-white border border-gray-200 p-4 rounded-xl justify-center shadow-sm`}
            >
              <FontAwesome name="facebook" size={20} color="#4267B2" style={tw`mr-3`} />
              <Text style={tw`text-gray-800 font-medium text-base`}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={tw`mt-6 flex-row justify-center`}>
              <Text style={tw`text-gray-600 text-sm`}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={tw`text-blue-600 font-medium text-sm`}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}