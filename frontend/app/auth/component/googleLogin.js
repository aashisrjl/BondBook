import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.81:3000'; // Replace with your backend's base URL

// Complete the OAuth session
WebBrowser.maybeCompleteAuthSession();

export const GoogleLogin = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '554871473488-d218ivmucl9smge1c6cb8o1mg6fcds7d.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      if (authentication?.accessToken) {
        // Send the access token to the backend
        axios
          .post(`${BASE_URL}/google`, {
            token: authentication.accessToken,
          })
          .then(async (res) => {
            const { token } = res.data;
            Alert.alert("Login Success", "Token stored successfully.");
            
            // Store token in AsyncStorage for future use
            await AsyncStorage.setItem('token', token);
          })
          .catch((err) => {
            Alert.alert("Login Error", err?.response?.data?.message || "An error occurred");
          });
      }
    }
  }, [response]);

  const handleGoogleLogin = () => {
    if (request) {
      promptAsync();
    } else {
      Alert.alert("Error", "Google Login is not available.");
    }
  };

  return handleGoogleLogin;
};
