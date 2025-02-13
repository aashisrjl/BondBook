import { Ionicons } from '@expo/vector-icons';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import React from 'react';
import tw from 'twrnc';
import { TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './types';
const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use react-navigation for navigation

  return (
    <View style={tw`flex-row justify-around p-4 border-t border-gray-300 bg-[#2E004F] mt-auto`}>
      
      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Index')}>
        <Ionicons name="home" size={35} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('About')}>
        <Ionicons name="information-circle" size={35} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Setting')}>
        <Ionicons name="settings" size={35} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={35} color="white" />
      </TouchableOpacity>
    
    </View>
  );
};

export default Footer;