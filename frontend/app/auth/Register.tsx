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
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.254.13:3000"; // Replace with your actual backend URL

export default function RegisterScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  // Function to pick an image
  const pickImage = async () => {
    // Request permission to access the media library
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      // Show an alert if permission is denied
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      cameraType: ImagePicker.CameraType.front,  // Use MediaType.photo here
      allowsEditing: true,     // Allow user to edit image (crop)
      aspect: [4, 3],         // Aspect ratio of the crop box
      quality: 1,             // Quality of the selected image (1 = highest)
    });

    // Check if the user picked an image or canceled the selection
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "Please select an image to upload.");
    }
  };

  const handleRegister = async () => {
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
      type: "image/jpeg", 
      name: "profile.jpg",
    } as any);

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await AsyncStorage.setItem("token", res.data.token);
      Alert.alert("Registration Successful");
    } catch (error) {
      // const errorMessage = (error as any)?.response?.data?.message || "Registration Failed!";
      Alert.alert("Error", "Error while Registration");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined} // Adjust for iOS and Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
          <View className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
            <Text className="text-2xl font-bold text-center mb-4">Register</Text>

            {/* Name Input */}
            <TextInput
              className="w-full bg-gray-200 p-3 rounded-lg mb-3"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            {/* Email Input */}
            <TextInput
              className="w-full bg-gray-200 p-3 rounded-lg mb-3"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              className="w-full bg-gray-200 p-3 rounded-lg mb-4"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Show Selected Image */}
            {image && (
              <Image
                source={{ uri: image }}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            )}

            {/* Image Picker Button */}
            <TouchableOpacity
              className="bg-gray-300 p-3 rounded-lg mb-3"
              onPress={pickImage}
            >
              <Text className="text-center">Pick an Image</Text>
            </TouchableOpacity>

            

            {/* Register Button */}
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-lg"
              onPress={handleRegister}
            >
              <Text className="text-white text-center font-bold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
