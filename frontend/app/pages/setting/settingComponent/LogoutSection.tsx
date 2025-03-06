import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';

const LogoutSection = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      console.log(BASE_URL+"/logout")
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
    <View style={tw`p-4 bg-white rounded-xl shadow-md`}>
      <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Logout</Text>
      <Text style={tw`text-base mb-4 text-gray-700`}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={tw`bg-red-600 p-3 rounded-lg items-center shadow-md`} onPress={handleLogout}>
        <Text style={tw`text-white font-medium`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutSection;