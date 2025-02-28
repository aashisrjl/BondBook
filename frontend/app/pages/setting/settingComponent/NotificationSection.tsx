// NotificationSection.js
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';

const NotificationSection = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please log in again');
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/user/updateNotifications`,
        {
          enabled: notificationsEnabled,
          frequency,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Notification settings saved successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`p-4 bg-white rounded-xl shadow-md`}>
      <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Notification Settings</Text>
      
      <View style={tw`mb-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-base font-medium text-gray-700`}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Notification Frequency</Text>
        <View style={tw`mb-4`}>
          <TouchableOpacity
            style={tw`p-3 bg-gray-50 rounded-lg mb-2 ${frequency === 'daily' ? 'border border-blue-600' : ''}`}
            onPress={() => setFrequency('daily')}
          >
            <Text style={tw`text-base ${frequency === 'daily' ? 'text-blue-600' : 'text-gray-700'}`}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`p-3 bg-gray-50 rounded-lg mb-2 ${frequency === 'weekly' ? 'border border-blue-600' : ''}`}
            onPress={() => setFrequency('weekly')}
          >
            <Text style={tw`text-base ${frequency === 'weekly' ? 'text-blue-600' : 'text-gray-700'}`}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`p-3 bg-gray-50 rounded-lg ${frequency === 'never' ? 'border border-blue-600' : ''}`}
            onPress={() => setFrequency('never')}
          >
            <Text style={tw`text-base ${frequency === 'never' ? 'text-blue-600' : 'text-gray-700'}`}>Never</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={tw`bg-blue-600 p-3 rounded-lg items-center shadow-md ${loading ? 'opacity-50' : ''}`}
          onPress={handleSaveNotifications}
          disabled={loading}
        >
          <Text style={tw`text-white font-medium`}>
            {loading ? 'Saving...' : 'Save Settings'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={tw`text-red-600 text-center mt-2`}>{error}</Text>
      )}
    </View>
  );
};

export default NotificationSection;