
import React, { useEffect, useState } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, Image, Modal, Alert 
} from "react-native";
import tw from "twrnc";
import { PlusIcon, Image as ImageIcon, XCircle, X, Trash2 } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Footer from "../../../component/Footer";
import { BASE_URL } from "@env";


const Photo = () => {
  const [phototype, setPhotoType] = useState("Shared");
  const [Url, setUrl] = useState("");
  const [photos, setPhotos] = useState([]); // Store fetched photos
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Fetch all photos from the backend
  const fetchPhotos = async () => {
    try {
      // console.log(BASE_URL+"/diary")
      const res = await axios.get('http://192.168.1.74:3000/getphoto');
      setPhotos(res.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  // Delete a specific photo by ID
  const deletePhoto = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deletegallery/${id}`);
      Alert.alert("Success", "Photo deleted successfully.");
      setPhotos(photos.filter(photo => photo._id !== id)); // Update UI
      setSelectedPhoto(null);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // Upload a new photo
  const postPhoto = async () => {
    if (!Url) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/createGallery`, { Url, phototype });
      Alert.alert("Success", "Photo uploaded successfully.");
      setPhotos(res.data); // Update UI with new photo
      setAddModalVisible(false);
      setUrl("");
      fetchPhotos();
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUrl(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "Please select an image to upload.");
    }
  };

  return (
    <>
    <View style={tw`flex-1 bg-gray-50 w-[]  rounded-lg overflow-hidden`}> 
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}> 
        <ImageIcon size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>Photo Gallery</Text>
      </View>

      {/* Photo Grid */}
      <ScrollView style={tw`flex-1 mt-2 `}>
        <View style={tw`flex-row flex-wrap -mx-1`}>
          {photos.length > 0 ? (
            photos.map((photo) => (
              <TouchableOpacity 
                key={photo._id} 
                onPress={() => setSelectedPhoto(photo)}
                style={tw`w-38 px-1 mb-2`}
              >
                <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-2`}>
                  <Image 
                  source={{ uri: BASE_URL + "/" + photo.Url }}
                  style={tw`w-full h-40 rounded-lg`} />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={tw` text-gray-500 text-lg mt-30 ml-30`}>   No photos available  </Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
        onPress={() => setAddModalVisible(true)}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Viewing a Photo */}
      {selectedPhoto && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 w-full max-w-md relative`}> 
              <TouchableOpacity onPress={() => setSelectedPhoto(null)} style={tw` absolute top-1 right-1`}>
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <Image source={{uri: BASE_URL + "/"+ selectedPhoto.Url }} style={tw`w-full h-80 rounded-lg`} />
              <View style={tw`flex-row justify-between items-center p-2`}>
                <Text style={tw`text-gray-500 text-sm`}>{selectedPhoto.Phototype}</Text>
                <TouchableOpacity onPress={() => deletePhoto(selectedPhoto._id)}>
                  <View style={tw`bg-red-600 p-2 rounded-lg`}>
                    <Trash2 size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal for Adding a Photo */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Share Photos
              </Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Image Picker Button */}
            {Url ? (
              <Text style={tw`text-md text-green-600 mb-2`}>Image Selected</Text>
            ) : (
              <TouchableOpacity
                style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
                onPress={pickImage}
              >
                <Text style={tw`text-center`}>Pick an Image</Text>
              </TouchableOpacity>
            )}

            {/* Category Picker */}
            <Picker
              selectedValue={phototype}
              onValueChange={(itemValue) => setPhotoType(itemValue)}
              style={tw`border border-gray-300 rounded-md mb-3`}
            >
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shared" value="Shared" />
            </Picker>

            {/* Upload Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md`}
              onPress={postPhoto}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Upload Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    <Footer />
    </>
  );
};

export default Photo;

