
import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!name) setNameError("Name is required");
    if (!email) setEmailError("Email is required");
    if (!password) setPasswordError("Password is required");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (name && email && password === confirmPassword) {
      Alert.alert("Success", "Account created successfully!");
    }
  };

  return (
    <View className="flex items-center justify-center h-screen bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Register</Text>

      <View className="w-80 space-y-4">
        {/* Name Input */}
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          {nameError ? <Text className="text-red-500 text-sm mt-1">{nameError}</Text> : null}
        </View>

        {/* Email Input */}
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {emailError ? <Text className="text-red-500 text-sm mt-1">{emailError}</Text> : null}
        </View>

        {/* Password Input */}
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text className="text-red-500 text-sm mt-1">{passwordError}</Text> : null}
        </View>

        {/* Confirm Password Input */}
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {confirmPasswordError ? <Text className="text-red-500 text-sm mt-1">{confirmPasswordError}</Text> : null}
        </View>

        {/* Register Button */}
      </View>
    </View>
  );
}
