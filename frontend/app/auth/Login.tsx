import { useState } from "react";
import { View, Text, TextInput } from "react-native";

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
    <View className="flex items-center justify-center h-screen bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Login</Text>

      <View className="w-80 space-y-4">
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

        {/* Login Button */}
      </View>
    </View>
  );
}
