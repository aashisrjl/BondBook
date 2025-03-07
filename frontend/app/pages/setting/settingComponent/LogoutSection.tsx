import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { BASE_URL } from '@env';
import Footer from '../../../component/Footer';

const LogoutSection = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      console.log(`${BASE_URL}/logout`);
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('token');

      // Hit logout API
      await axios.post(`${BASE_URL}/logout`, {
        withCredentials: true,
      });

      // Navigate to Login screen
      navigation.navigate('Login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
  {/* Content */}
  <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
      {/* Logout Confirmation Card */}
      <Animatable.View animation="fadeInUp" duration={500} style={tw`w-11/12 max-w-md p-6 bg-white rounded-xl shadow-lg`}>
        <Text style={tw`text-2xl font-bold text-center text-gray-800 mb-4`}>Logout</Text>
        <Text style={tw`text-base text-center text-gray-600 mb-6`}>
          Are you sure you want to log out of your account?
        </Text>
        <TouchableOpacity
          style={tw`bg-red-600 p-3 rounded-lg items-center shadow-md active:bg-red-700`}
          onPress={handleLogout}
        >
          <Text style={tw`text-white font-semibold text-base`}>Confirm Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mt-4 p-3 items-center bg-gray-200 rounded-lg shadow-md`}
          onPress={() => navigation.goBack()} // Go back to the previous screen
        >
          <Text style={tw`text-gray-800 font-medium text-base`}>Cancel</Text>
        </TouchableOpacity>
    </Animatable.View>
      </View>
   
      <Footer />
      </>
  );
};

export default LogoutSection;