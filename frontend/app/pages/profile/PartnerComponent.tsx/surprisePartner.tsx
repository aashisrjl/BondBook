import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated, Alert, Modal } from 'react-native';
import tw from '../../../../tw';
import { BASE_URL } from '@env';
import Footer from '../../../component/Footer';
import { Gift } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SurprisePartner = () => {
  const [partnerSurprises, setPartnerSurprises] = useState([]);
  const [selectedSurprise, setSelectedSurprise] = useState(null);
  const [animation] = useState(new Animated.Value(0)); // For gift opening animation

  useEffect(() => {
    fetchPartnerSurprises();
  }, []);

  const fetchPartnerSurprises = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Await token retrieval
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await fetch(`${BASE_URL}/getPartnerSurprise`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Partner surprises:', data);
      if (response.ok) {
        setPartnerSurprises(data.surprises || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch partner surprises');
      }
    } catch (error) {
      console.error('Error fetching partner surprises:', error);
      Alert.alert('Error', 'An error occurred while fetching partner surprises');
    }
  };

  const openGift = (surprise) => {
    if (selectedSurprise) {
      // Close the current modal first
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setSelectedSurprise(surprise);
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Open new gift
      setSelectedSurprise(surprise);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeGift = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedSurprise(null));
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  return (
    <View style={tw`flex-1 bg-gradient-to-b from-blue-100 to-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white px-6 py-8 shadow-lg rounded-b-3xl`}>
        <Text style={tw`text-gray-800 text-2xl font-bold text-center`}>
          Partner Surprises
        </Text>
        <Text style={tw`text-gray-600 text-base text-center mt-1`}>
          {partnerSurprises.length} surprise{partnerSurprises.length !== 1 ? 's' : ''} waiting for you
        </Text>
      </View>

      {/* Surprises List */}
      <ScrollView style={tw`flex-1 px-6 pt-6`}>
        {partnerSurprises.length === 0 ? (
          <Text style={tw`text-gray-500 text-lg text-center mt-10 font-medium`}>
            No surprises from your partner yet!
          </Text>
        ) : (
          partnerSurprises.map((surprise) => (
            <TouchableOpacity
              key={surprise._id}
              style={tw`mb-8 items-center bg-white p-4 rounded-2xl shadow-md`}
              onPress={() => openGift(surprise)}
            >
              <Gift size={70} color="#FFD700" style={tw`mb-3`} />
              <Text style={tw`text-gray-700 text-base font-semibold`}>
                Unwrap Your Surprise!
              </Text>
              <Text style={tw`text-gray-500 text-sm mt-1`}>
                "FromYourPartner " "     
              </Text>
            </TouchableOpacity>
          ))
        )}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Modal for Surprise Content */}
      <Modal
        visible={!!selectedSurprise}
        transparent={true}
        animationType="none"
        onRequestClose={closeGift}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-60`}>
          <Animated.View style={[tw`bg-white p-6 rounded-3xl w-11/12 max-h-3/4`, animatedStyle]}>
            {selectedSurprise && (
              <>
                <Text style={tw`text-gray-800 text-xl font-bold text-center mb-4`}>
                  Your Surprise!
                </Text>
                {selectedSurprise.message ? (
                  <Text style={tw`text-gray-700 text-lg text-center font-medium`}>
                    {selectedSurprise.message}
                  </Text>
                ) : (
                  selectedSurprise.photo && (
                    <Image
                      source={{ uri: `${BASE_URL}/${selectedSurprise.photo}` }}
                      style={tw`w-full h-64 rounded-2xl`}
                      resizeMode="contain"
                    />
                  )
                )}
                <TouchableOpacity
                  style={tw`mt-6 bg-blue-600 py-3 px-6 rounded-full`}
                  onPress={closeGift}
                >
                  <Text style={tw`text-white text-base font-semibold text-center`}>
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

export default SurprisePartner;