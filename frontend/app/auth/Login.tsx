import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) setEmailError("Email is required");
    if (!password) setPasswordError("Password is required");

    if (email && password) {
      alert("Logged In!");
    }
  };

  return (
    <View class="flex items-center justify-center h-screen bg-gray-100">
      <Text class="text-2xl font-bold text-gray-800 mb-6">Login</Text>

      <View class="w-80 space-y-4">
        <View>
          <TextInput
            class="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {emailError ? <Text class="text-red-500 text-sm mt-1">{emailError}</Text> : null}
        </View>

        <View>
          <TextInput
            class="border border-gray-300 p-3 rounded-md bg-white text-gray-800"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text class="text-red-500 text-sm mt-1">{passwordError}</Text> : null}
        </View>

        <TouchableOpacity class="bg-blue-500 p-3 rounded-md" onPress={handleSubmit}>
          <Text class="text-white text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
