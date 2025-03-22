import { Bell, PlusIcon, Edit2, Trash2 } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, TextInput, Button, Image, Alert } from 'react-native';
import tw from '../../../../tw';
import Footer from '../../../component/Footer';
import { BASE_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';

const Surprise = () => {
  const [surprises, setSurprises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSurprise, setNewSurprise] = useState({
    message: '',
    photo: null, // Will store URI string
    scheduleFor: '',
    type: 'message'
  });
  const [editingSurprise, setEditingSurprise] = useState(null);

  useEffect(() => {
    fetchSurprises();
  }, []);

  const fetchSurprises = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fetchAllSurprise`);
      const data = await response.json();
      setSurprises(data.surprises || []);
    } catch (error) {
      console.error('Error fetching surprises:', error);
    }
  };

  const handlePickPhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const photoUri = result.assets[0].uri;
      setNewSurprise({ ...newSurprise, photo: photoUri });
    }
  };

  const handleAddSurprise = async () => {
    try {
      if (newSurprise.type === 'message' && !newSurprise.message) {
        Alert.alert('Error', 'Please enter a message');
        return;
      }
      if (newSurprise.type === 'photo' && !newSurprise.photo) {
        Alert.alert('Error', 'Please select a photo');
        return;
      }

      const formData = new FormData();
      if (newSurprise.type === 'message') {
        formData.append('message', newSurprise.message);
      } else if (newSurprise.photo) {
        formData.append('photo', {
          uri: newSurprise.photo,
          type: 'image/jpeg', // Assuming JPEG, adjust if needed
          name: 'photo.jpg'
        });
      }
      formData.append('scheduleFor', newSurprise.scheduleFor);

      if (editingSurprise) {
        const response = await fetch(`${BASE_URL}/updateSurprise/${editingSurprise._id}`, {
          method: 'PATCH',
          body: formData,
        });
        if (response.ok) {
          fetchSurprises();
          setEditingSurprise(null);
        } else {
          Alert.alert('Error', 'Failed to update surprise');
        }
      } else {
        const response = await fetch(`${BASE_URL}/sendSurprise`, {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          fetchSurprises();
        } else {
          Alert.alert('Error', 'Failed to add surprise');
        }
      }
      setModalVisible(false);
      setNewSurprise({ message: '', photo: null, scheduleFor: '', type: 'message' });
    } catch (error) {
      console.error('Error saving surprise:', error);
      Alert.alert('Error', 'An error occurred while saving the surprise');
    }
  };

  const handleDeleteSurprise = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteSurprise/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        fetchSurprises();
      } else {
        Alert.alert('Error', 'Failed to delete surprise');
      }
    } catch (error) {
      console.error('Error deleting surprise:', error);
      Alert.alert('Error', 'An error occurred while deleting the surprise');
    }
  };

  const handleEditSurprise = (surprise) => {
    setEditingSurprise(surprise);
    setNewSurprise({
      message: surprise.message || '',
      photo: surprise.photo || null,
      scheduleFor: surprise.scheduleFor || '',
      type: surprise.photo ? 'photo' : 'message'
    });
    setModalVisible(true);
  };

  return (
    <>
      <View style={tw`flex-1 bg-gray-50`}>
        {/* Header */}
        <View style={tw`bg-white px-4 py-6 shadow-sm`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Bell size={24} color="#4B5563" />
            <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
              Surprises
            </Text>
          </View>
          <Text style={tw`text-gray-500 text-sm`}>
            {surprises.length} {surprises.length === 1 ? 'message' : 'messages'}
          </Text>
        </View>

        {/* Surprises List */}
        <ScrollView style={tw`flex-1 px-4 pt-4`}>
          {surprises.map((surprise) => (
            <View
              key={surprise._id}
              style={tw`bg-white p-4 mb-4 rounded-lg shadow-sm flex-row justify-between items-center`}
            >
              <View>
                {surprise.message ? (
                  <Text style={tw`text-gray-800 font-medium`}>{surprise.message}</Text>
                ) : (
                  <>
                    <Text style={tw`text-gray-800 font-medium`}>Photo Surprise</Text>
                    {surprise.photo && (
                      <Image
                        source={{ uri: BASE_URL +"/"+ surprise.photo }}
                        style={tw`w-20 h-20 mt-2 rounded`}
                      />
                    )}
                  </>
                )}
                {surprise.scheduleFor && (
                  <Text style={tw`text-gray-500 text-sm`}>
                    Scheduled for: {new Date(surprise.scheduleFor).toLocaleDateString()}
                  </Text>
                )}
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  onPress={() => handleEditSurprise(surprise)}
                  style={tw`mr-4`}
                >
                  <Edit2 size={20} color="#4B5563" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteSurprise(surprise._id)}
                >
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={tw`h-20`} />
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
          style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
          onPress={() => {
            setEditingSurprise(null);
            setNewSurprise({ message: '', photo: null, scheduleFor: '', type: 'message' });
            setModalVisible(true);
          }}
        >
          <PlusIcon size={24} color="white" />
        </TouchableOpacity>

        {/* Modal for Add/Edit Surprise */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-6 rounded-lg w-80`}>
              <Text style={tw`text-xl font-semibold mb-4`}>
                {editingSurprise ? 'Edit Surprise' : 'Add New Surprise'}
              </Text>

              {/* Type Toggle */}
              <View style={tw`flex-row justify-between mb-4`}>
                <TouchableOpacity
                  style={tw`flex-1 p-2 ${newSurprise.type === 'message' ? 'bg-blue-100' : 'bg-gray-100'} rounded mr-2`}
                  onPress={() => setNewSurprise({ ...newSurprise, type: 'message', photo: null })}
                >
                  <Text style={tw`text-center ${newSurprise.type === 'message' ? 'text-blue-600' : 'text-gray-600'}`}>
                    Text Message
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`flex-1 p-2 ${newSurprise.type === 'photo' ? 'bg-blue-100' : 'bg-gray-100'} rounded ml-2`}
                  onPress={() => setNewSurprise({ ...newSurprise, type: 'photo', message: '' })}
                >
                  <Text style={tw`text-center ${newSurprise.type === 'photo' ? 'text-blue-600' : 'text-gray-600'}`}>
                    Photo
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Conditional Input Fields */}
              {newSurprise.type === 'message' ? (
                <TextInput
                  style={tw`border border-gray-300 p-2 mb-4 rounded`}
                  placeholder="Enter your surprise message"
                  value={newSurprise.message}
                  onChangeText={(text) => setNewSurprise({ ...newSurprise, message: text })}
                  multiline
                />
              ) : (
                <View style={tw`mb-4`}>
                  <TouchableOpacity
                    style={tw`border border-gray-300 p-2 rounded`}
                    onPress={handlePickPhoto}
                  >
                    <Text style={tw`text-gray-600`}>
                      {newSurprise.photo ? 'Change Photo' : 'Pick a Photo'}
                    </Text>
                  </TouchableOpacity>
                  {newSurprise.photo && (
                    <Image
                      source={{ uri: BASE_URL+"/"+newSurprise.photo }}
                      style={tw`w-32 h-32 mt-2 rounded self-center`}
                    />
                  )}
                </View>
              )}

              <TextInput
                style={tw`border border-gray-300 p-2 mb-4 rounded`}
                placeholder="Schedule For (YYYY-MM-DD)"
                value={newSurprise.scheduleFor}
                onChangeText={(text) => setNewSurprise({ ...newSurprise, scheduleFor: text })}
              />

              <View style={tw`flex-row justify-between`}>
                <Button
                  title="Cancel"
                  color="#EF4444"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  title={editingSurprise ? 'Update' : 'Add'}
                  color="#2563EB"
                  onPress={handleAddSurprise}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Footer />
    </>
  );
};

export default Surprise;