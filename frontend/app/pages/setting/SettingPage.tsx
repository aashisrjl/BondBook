import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../component/Footer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

export function SettingsPage() {
  const navigation = useNavigation();
  const [selectedTheme, setSelectedTheme] = useState('Dark'); // Default theme

  // Unified list of settings options, including About Us, Policies, and Help
  const settingsOptions = [
    { id: 'ProfileSec', title: 'Personal Details', icon: 'person' },
    { id: 'PartnerSec', title: 'Add Partner', icon: 'receipt' },
    { id: 'SecurityPrivacy', title: 'Security & Privacy', icon: 'lock' },
    { id: 'AppSettings', title: 'App Settings', icon: 'settings' },
    { id: 'NotificationSec', title: 'Notifications', icon: 'help' },
    { id: 'AboutUs', title: 'About Us', icon: 'info' },
    { id: 'ContactSupport', title: 'Contact Us', icon: 'person' },
    { id: 'Policies', title: 'Policies', icon: 'description' },
    { id: 'Help', title: 'Help', icon: 'support-agent' },
    { id: 'Faq', title: 'Faq', icon: 'chat' },
    { id: 'Logout', title: 'Logout', icon: 'logout' },
  ];

  // Theme options for App Appearance
  const themeOptions = [
    { id: 'Light', title: 'Light', icon: 'brightness-5' },
    { id: 'Dark', title: 'Dark', icon: 'brightness-3' },
    { id: 'System', title: 'System', icon: 'settings-system-daydream' },
  ];
  const [user,setUser] = useState(null);
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please log in again');
        return;
      }

      // Fetch user profile
      const userResponse = await axios.get(
        `${BASE_URL}/user/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

        setUser(userResponse.data.user);
        console.log(userResponse.data.user)
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Header with Profile Info */}
      <View style={tw`p-4 flex-row items-center border-b border-gray-700`}>
        <View style={tw`w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4`}>
          <MaterialIcons name="person" size={30} color="white" />
        </View>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>{user?.name}</Text>
          <Text style={tw`text-gray-400 text-sm`}>{user?.email}</Text>
        </View>
      </View>

      {/* Settings Options */}
      <ScrollView style={tw`flex-1`}>
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={tw`flex-row items-center p-6 border-b border-gray-700`}
            onPress={() => navigation.navigate(option.id)}
          >
            <MaterialIcons name={option.icon} size={24} color="white" style={tw`mr-4`} />
            <Text style={tw`text-white text-base flex-1`}>{option.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        ))}

        {/* App Appearance Section */}
        <View style={tw`p-4 border-b border-gray-700`}>
          <Text style={tw`text-white text-lg font-semibold mb-2`}>App Appearance</Text>
          <View style={tw`flex-row  justify-center gap-6`}>
            {themeOptions.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={tw`items-center p-2 ${selectedTheme === theme.id ? 'bg-gray-700 rounded-lg' : ''}`}
                onPress={() => setSelectedTheme(theme.id)}
              >
                <MaterialIcons name={theme.icon} size={30} color="white" />
                <Text style={tw`text-white text-sm mt-1`}>{theme.title + " "}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
}

export default SettingsPage;