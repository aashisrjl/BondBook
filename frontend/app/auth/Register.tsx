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
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import tw from 'twrnc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {BASE_URL} from '@env';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(""); // Added gender state

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile pic
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !image || !gender) {
      Alert.alert("Error", "Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("photoUrl", {
      uri: image,
      type: "image/jpeg",
      name: "profile.jpg",
    });

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Registration Successful");
      navigation.navigate("Login");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Registration Failed!";
      Alert.alert("Error", errorMessage);
      console.error(error);
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
              Create Account
            </Text>

            {/* Name Input */}
            <View style={tw`mb-4`}>
              <TextInput
                style={tw`w-full bg-gray-100 p-4 rounded-xl text-base border border-gray-200 focus:border-blue-500`}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

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
            <View style={tw`mb-4`}>
              <TextInput
                style={tw`w-full bg-gray-100 p-4 rounded-xl text-base border border-gray-200 focus:border-blue-500`}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Gender Selection */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Gender</Text>
              <View style={tw`flex-row justify-between`}>
                {["Male", "Female", "Other"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={tw`flex-1 mx-1 p-3 rounded-xl border ${
                      gender === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onPress={() => setGender(option)}
                  >
                    <Text style={tw`text-center ${
                      gender === option ? 'text-blue-600' : 'text-gray-600'
                    }`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Image Picker */}
            <TouchableOpacity
              style={tw`bg-gray-100 p-4 rounded-xl mb-6 border border-gray-200`}
              onPress={pickImage}
            >
              <Text style={tw`text-center text-gray-700 font-medium`}>
                {image ? "Change Profile Picture" : "Select Profile Picture"}
              </Text>
            </TouchableOpacity>

            {/* Show Selected Image */}
            {image && (
              <View style={tw`items-center mb-6`}>
                <Image
                  source={{ uri: image }}
                  style={tw`w-24 h-24 rounded-full border border-gray-200`}
                />
              </View>
            )}

            {/* Register Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 p-4 rounded-xl mb-4 shadow-md`}
              onPress={handleRegister}
            >
              <Text style={tw`text-white text-center font-semibold text-base`}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Social Login Section */}
            <View style={tw`mt-6`}>
              <View style={tw`flex-row items-center justify-center mb-6`}>
                <View style={tw`flex-1 h-px bg-gray-200`}></View>
                <Text style={tw`mx-4 text-gray-400 text-sm`}>OR</Text>
                <View style={tw`flex-1 h-px bg-gray-200`}></View>
              </View>

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
            </View>

            {/* Login Link */}
            <View style={tw`mt-6 flex-row justify-center`}>
              <Text style={tw`text-gray-600 text-sm`}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={tw`text-blue-600 font-medium text-sm`}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}