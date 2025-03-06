import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';

const PasswordSection = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle password change API call
  const handleChangePassword = async () => {
    if (!password || !newPassword) {
      setError('Please fill in both fields');
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      console.log(BASE_URL+"/chnagepass")
      setLoading(true);
      setError(null);

      // Get the token from AsyncStorage for authentication
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please log in again');
        navigation.navigate('Login');
        return;
      }

      // Make API call to change password
      const response = await axios.post(
        `${BASE_URL}/user/changePassword`, // Assuming the endpoint is under /user
        {
          currentPassword: password,
          newPassword: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
        setPassword('');
        setNewPassword('');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`p-4 bg-white rounded-xl shadow-md`}>
      <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Password Settings</Text>
      
      <View style={tw`mb-4`}>
        <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Current Password</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
          placeholder="Enter current password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <Text style={tw`text-base font-medium mb-2 text-gray-700`}>New Password</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        
        <TouchableOpacity 
          style={tw`bg-blue-600 p-3 rounded-lg items-center shadow-md mb-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleChangePassword}
          disabled={loading}
        >
          <Text style={tw`text-white font-medium`}>
            {loading ? 'Changing...' : 'Change Password'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`p-3 items-center`} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={tw`text-blue-600 font-medium`}>Forgot Password?</Text>
        </TouchableOpacity>

        {error && (
          <Text style={tw`text-red-600 text-center mt-2`}>{error}</Text>
        )}
      </View>
    </View>
  );
};

export default PasswordSection;