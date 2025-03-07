import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';

import { BASE_URL } from '@env';
import Footer from '../../../component/Footer';

const PartnerSection = () => {
  const [email, setEmail] = useState('');
  const [addPartnerModel, setAddPartnerModel] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Send email to partner
  const sendEmailToPartner = async () => {
    try {
      console.log(BASE_URL+"/addpartner")
      const tokenn = await AsyncStorage.getItem('token');
      if (!tokenn) {
        router.replace('Login');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      const res = await axios.post(
        `${BASE_URL}/user/addPartner`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenn}`,
          },
        }
      );
      
      if (res.status === 200) {
        Alert.alert('Success', 'Partner invitation sent successfully');
        setAddPartnerModel(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send invitation');
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  // Verify partner token
  const verifyPartnerEmail = async () => {
    try {
      console.log(BASE_URL+"/verifyemail")
      const tokenn = await AsyncStorage.getItem('token');
      if (!tokenn) {
        router.replace('Login');
        return;
      }
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${BASE_URL}/user/verifyPartnerToken`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenn}`,
          },
        }
      );
      
      if (res.status === 200) {
        Alert.alert('Success', 'Partner verified successfully');
        setAddPartnerModel(false);
        setToken('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid token');
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove partner with confirmation
  const removePartner = async () => {
    console.log(BASE_URL+"/removePartner")
    const tokenn = await AsyncStorage.getItem('token');
    if (!tokenn) {
      router.replace('Login');
      return;
    }
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove your partner?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setLoading(true);
              setError(null);
              const res = await axios.delete(`${BASE_URL}/user/deletePartner`, {
                headers: {
                  'Authorization': `Bearer ${tokenn}`,
                },
              });
              
              if (res.status === 200) {
                Alert.alert('Success', 'Partner removed successfully');
                setEmail('');
              }
            } catch (err) {
              setError(err.response?.data?.message || 'Failed to remove partner');
              Alert.alert('Error', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <>
    <View style={tw`flex justify-center align-center bg-gray-900 h-full`}>
      <Animatable.View animation="fadeInUp" duration={500} style={tw`w-11/12 max-w-md p-6 bg-white rounded-xl shadow-lg p-6 m-8 mt-60`}>
      <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Partner Settings</Text>
      
      <View style={tw`mb-4`}>
        <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Partner Email</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
          placeholder="Enter partner email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          style={tw`bg-blue-600 p-3 rounded-lg items-center mb-2 ${loading ? 'opacity-50' : ''}`}
          onPress={sendEmailToPartner}
          disabled={loading || !email}
        >
          <Text style={tw`text-white font-medium`}>
            {loading ? 'Sending...' : 'Add Partner'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={tw`bg-red-600 p-3 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
          onPress={removePartner}
          disabled={loading}
        >
          <Text style={tw`text-white font-medium`}>
            {loading ? 'Processing...' : 'Remove Partner'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Token Entry */}
      <Modal visible={addPartnerModel} transparent={true} animationType="fade">
        <View style={tw`justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white w-80 p-6 rounded-xl shadow-md`}>
            <Text style={tw`text-lg font-semibold mb-4 text-center text-gray-800`}>
              Enter Token Sent to Your Partner
            </Text>
            
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
              placeholder="Enter Token"
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
            />

            <TouchableOpacity 
              style={tw`bg-blue-600 p-3 rounded-lg items-center mb-2 ${loading ? 'opacity-50' : ''}`}
              onPress={verifyPartnerEmail}
              disabled={loading || !token}
            >
              <Text style={tw`text-white font-medium`}>
                {loading ? 'Verifying...' : 'Verify'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={tw`p-2 items-center`}
              onPress={() => {
                setAddPartnerModel(false);
                setToken('');
              }}
              disabled={loading}
            >
              <Text style={tw`text-red-600 font-medium`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {error && (
        <Text style={tw`text-red-600 text-center mt-2`}>{error}</Text>
      )}

      </Animatable.View>
      <Footer/>
    </View>
      </>
  );
};

export default PartnerSection;