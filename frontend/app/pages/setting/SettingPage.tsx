import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import ProfileSection from './settingComponent/ProfileSection'; // Separate component
import PasswordSection from './settingComponent/PasswordSection'; // Separate component
import PartnerSection from './settingComponent/PartnerSection'; // Separate component
import LogoutSection from './settingComponent/LogoutSection'; // Separate component
import NotificationSection from './settingComponent/NotificationSection'; // Separate component
import Footer from '../../component/Footer'

export function SettingsPage() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'password':
        return <PasswordSection />;
      case 'partner':
        return <PartnerSection />;
      case 'notifications':
        return <NotificationSection />;
      case 'logout':
        return <LogoutSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-blue-600 p-4 rounded-b-3xl shadow-md`}>
        <Text style={tw`text-2xl font-bold text-white text-center`}>Settings</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={tw`flex-row justify-around p-4 bg-white border-b border-gray-200 shadow-sm`}>
        <TouchableOpacity
          style={tw`p-2 ${activeSection === 'profile' ? 'border-b-2 border-blue-600' : ''}`}
          onPress={() => setActiveSection('profile')}
        >
          <Text style={tw`text-base font-semibold ${activeSection === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`p-2 ${activeSection === 'password' ? 'border-b-2 border-blue-600' : ''}`}
          onPress={() => setActiveSection('password')}
        >
          <Text style={tw`text-base font-semibold ${activeSection === 'password' ? 'text-blue-600' : 'text-gray-600'}`}>
            Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`p-2 ${activeSection === 'partner' ? 'border-b-2 border-blue-600' : ''}`}
          onPress={() => setActiveSection('partner')}
        >
          <Text style={tw`text-base font-semibold ${activeSection === 'partner' ? 'text-blue-600' : 'text-gray-600'}`}>
            Partner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`p-2 ${activeSection === 'notifications' ? 'border-b-2 border-blue-600' : ''}`}
          onPress={() => setActiveSection('notifications')}
        >
          <Text style={tw`text-base font-semibold ${activeSection === 'notifications' ? 'text-blue-600' : 'text-gray-600'}`}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`p-2 ${activeSection === 'logout' ? 'border-b-2 border-blue-600' : ''}`}
          onPress={() => setActiveSection('logout')}
        >
          <Text style={tw`text-base font-semibold ${activeSection === 'logout' ? 'text-blue-600' : 'text-gray-600'}`}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView style={tw`flex-1 p-4 bg-gray-50`}>
        {renderContent()}
      </ScrollView>

      <View style={tw`flex-row flex-wrap justify-center p-4 bg-gray-100 border-t border-gray-200 shadow-md`}>
        <TouchableOpacity onPress = {()=>{navigation.navigate('AboutUs')}}
          style={tw`px-4 py-2 m-1 bg-white rounded-lg shadow-sm`}
        >
          <Text style={tw`text-gray-700 text-base font-medium`}> About Us </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>{navigation.navigate('Policies')}}
          style={tw`px-4 py-2 m-1 bg-white rounded-lg shadow-sm`}
        >
          <Text style={tw`text-gray-700 text-base font-medium`}> Policies </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>{navigation.navigate('Help')}}
          style={tw`px-4 py-2 m-1 bg-white rounded-lg shadow-sm`}
        >
          <Text style={tw`text-gray-700 text-base font-medium`}> Helps </Text>
        </TouchableOpacity>
    </View>

      <Footer/>
    </View>
  );

}
export default SettingsPage;