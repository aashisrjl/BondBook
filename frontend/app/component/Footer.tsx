import { Ionicons } from '@expo/vector-icons';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import React from 'react';
import tw from 'twrnc';
import { TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './types';
const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use react-navigation for navigation
  console.log('Navigation object:', navigation)

  return (
    <View style={tw`flex-row justify-around p-2 h-14  bg-black color-white mt-auto`}>
      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('About')}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Chat')}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>

      
      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Index')}>
        <Ionicons name="home" size={35} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Setting')}>
        <Ionicons name="settings" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={30} color="white" />
      </TouchableOpacity>
    
    </View>
  );
};

export default Footer;