import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import tw from 'twrnc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const BASE_URL = "http://192.168.1.81:3000"; // Replace with your actual backend URL

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Function to pick an image
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "Please select an image to upload.");
    }
  };

  const handleRegister = async () => {
    const navigation = useNavigation();
    if (!image) {
      Alert.alert("Error", "Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photoUrl", {
      uri: image,
      type: "image/jpeg,image/png",
      name: "profile.jpg",
    });

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await AsyncStorage.setItem("token", res.data.token);
      Alert.alert("Registration Successful");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Error while Registration");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={tw`flex-1`}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 justify-center items-center bg-gray-100 p-6`}>
          <View style={tw`w-[90%]  bg-white p-6 rounded-2xl shadow-lg`}>
          <Image
          source={require('../assets/logo.png')}
          style={tw`w-35 h-30 mx-auto mb-6`}
        />
            <Text style={tw`text-2xl font-bold text-center mb-4`}>Register</Text>

            {/* Name Input */}
            <TextInput
              style={tw`w-full bg-gray-200 p-3 rounded-lg mb-3`}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            {/* Email Input */}
            <TextInput
              style={tw`w-full bg-gray-200 p-3 rounded-lg mb-3`}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              style={tw`w-full bg-gray-200 p-3 rounded-lg mb-4`}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Show Selected Image */}
            {image && (
              <Image
                source={{ uri: image }}
                style={tw`w-32 h-32 rounded-full mx-auto mb-4`}
              />
            )}

            {/* Image Picker Button */}
            <TouchableOpacity
              style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
              onPress={pickImage}
            >
              <Text style={tw`text-center`}>Pick an Image</Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              style={tw`bg-blue-500 p-3 rounded-lg mb-4`}
              onPress={handleRegister}
            >
              <Text style={tw`text-white text-center font-bold`}>Register</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={tw`flex-row items-center justify-center mb-4`}>
              <View style={tw`flex-1 h-0.5 bg-gray-300`} />
              <Text style={tw`mx-2 text-gray-500`}>OR</Text>
              <View style={tw`flex-1 h-0.5 bg-gray-300`} />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity
              style={tw`flex-row items-center bg-red-500 p-3 rounded-lg mb-3`}
              onPress={() => Alert.alert("Google Login")}
            >
              <FontAwesome name="google" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white text-center font-bold`}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Facebook Login Button */}
            <TouchableOpacity
              style={tw`flex-row items-center bg-blue-700 p-3 rounded-lg`}
              onPress={() => Alert.alert("Facebook Login")}
            >
              <FontAwesome name="facebook" size={20} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white text-center font-bold`}>Sign in with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
