import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import tw from "../../../../tw"; // Tailwind Styles
import axios from "axios"; // API calls
import { BASE_URL } from "@env";
import Footer from "../../../component/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(1); // 1: Email, 2: Token, 3: Password Reset
  const [loading, setLoading] = useState(false);


  // 🔹 Step 1: Request Forgot Password
  const handleForgotPassword = async () => {
    if (!email) return Alert.alert("Error", "Email is required");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/forgotPassword`, { email });
      Alert.alert("Success", res.data.message);
      setStep(2);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Verify Token
  const handleVerifyToken = async () => {
    if (!token) return Alert.alert("Error", "Token is required");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/verifyForgotPassword`, { email, token });
      Alert.alert("Success", res.data.message);
      setStep(3);
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Invalid token");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 3: Change Password
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Fill all fields");
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/changeForgotPassword`, { email, newPassword, confirmPassword });
      Alert.alert("Success", res.data.message);
      setStep(1); // Reset to step 1 after success
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <View style={tw`flex-1 p-5 justify-center`}>
      {step === 1 && (
        <>
          <Text style={tw`text-lg font-bold mb-3`}>Forgot Password</Text>
          <TextInput
            label="Enter Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Button mode="contained" onPress={handleForgotPassword} loading={loading} style={tw`mt-3`}>
            Send Reset Code
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={tw`text-lg font-bold mb-3`}>Enter Token</Text>
          <TextInput label="Token" mode="outlined" value={token} onChangeText={setToken} keyboardType="numeric" />
          <Button mode="contained" onPress={handleVerifyToken} loading={loading} style={tw`mt-3`}>
            Verify Code
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={tw`text-lg font-bold mb-3`}>Reset Password</Text>
          <TextInput label="New Password" mode="outlined" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button mode="contained" onPress={handleChangePassword} loading={loading} style={tw`mt-3`}>
            Change Password
          </Button>
        </>
      )}
    </View>
      <Footer/>
      </>
  );
};

export default ForgotPassword;
