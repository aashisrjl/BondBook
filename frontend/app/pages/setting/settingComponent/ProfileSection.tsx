import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert,TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';
import {useNavigation} from "@react-navigation/native";
import PartnerSection from './PartnerSection'

const ProfileSection = () => {
    const navigation = useNavigation()
  const [user, setUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    console.log(BASE_URL+"/fetchProfile")
    try {
      setLoading(true);
      setError(null);

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

      if (userResponse.status === 200) {
        setUser(userResponse.data.user);
        
        // Fetch partner profile if partnerId exists
        if (userResponse.data.user.partnerId) {
          const partnerResponse = await axios.get(
            `${BASE_URL}/user/partnerProfile`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );

          if (partnerResponse.status === 200) {
            setPartner(partnerResponse.data.partner);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile data');
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`p-4 bg-white rounded-xl shadow-md h-full items-center justify-center`}>
        <Text style={tw`text-gray-600`}>Loading...</Text>
      </View>
    );
  }

//   if (error) {
//     return (
//       <View style={tw`p-4 bg-white rounded-xl shadow-md h-full items-center justify-center`}>
//         <Text style={tw`text-red-600`}>{error}</Text>
//         <TouchableOpacity
//           style={tw`bg-blue-600 p-3 rounded-lg mt-4`}
//           onPress={fetchProfileData}
//         >
//           <Text style={tw`text-white font-medium`}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

  return (
    <ScrollView style={tw`p-4 bg-white rounded-xl shadow-md`}>
      <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Profile</Text>

      {/* User Profile */}
      <View style={tw`mb-8`}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Profile")
        }}> 
        <View style={tw`flex-row items-center mb-4`}>
          <Image
            source={{ uri: `${BASE_URL}/${user?.photoUrl}` }}
            style={tw`w-16 h-16 rounded-full mr-4`}
            onError={() => setError('Failed to load user photo')}
          />
          <View>
            <Text style={tw`text-lg font-semibold text-gray-800`}>{user?.email}</Text>
            <Text style={tw`text-gray-600 text-sm`}>{user?.bio}</Text>
            <Text style={tw`text-gray-600 text-sm`}>Mood: {user?.mood}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>

      {/* Partner Profile (if exists) */}
      {partner && (
        <View style={tw`mb-8 border-t border-gray-200 pt-4`}>
          <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>You’re Connected!</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Partner')
          }}> 
          <View style={tw`flex-row items-center mb-4 bg-blue-50 p-3 rounded-xl shadow-md`}>
            <Image
              source={{ uri: `${BASE_URL}/${partner?.photoUrl}` }}
              style={tw`w-16 h-16 rounded-full mr-4`}
              onError={() => setError('Failed to load partner photo')}
            />
            <View>
              <Text style={tw`text-lg font-semibold text-gray-800`}>{partner.email}</Text>
              <Text style={tw`text-gray-600 text-sm`}>{partner.bio}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Mood: {partner.mood}</Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
      )}

      {!partner && (
        <View>
        <Text style={tw`text-gray-500 text-center mt-4`}>No partner connected yet.</Text>
        <PartnerSection/>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileSection;