
import React, { useEffect, useState } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, Image, Modal, Alert 
} from "react-native";
import tw from "twrnc";
import { PlusIcon, Image as ImageIcon, XCircle, X, Trash2 } from "lucide-react-native";
import axios from "axios";
import { BASE_URL } from "@env";

const PhotoPartner = () => {
  const [photos, setPhotos] = useState([]); // Store fetched photos
  const [selectedPhoto,setSelectedPhoto]=useState(false);
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Fetch all photos from the backend
  const fetchPhotos = async () => {
    try {
      console.log(BASE_URL+"/fetchphoto")
      const res = await axios.get(`${BASE_URL}/getPartnerPhoto`);
      setPhotos(res.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };


  return (
    <View style={tw`flex-1 bg-gray-50   rounded-lg overflow-hidden `}> 
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

       {/* Modal for Viewing a Photo */}
       {selectedPhoto && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 w-full max-w-md relative`}> 
              <TouchableOpacity onPress={() => setSelectedPhoto(false)} style={tw` absolute top-1 right-1`}>
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <Image source={{uri: BASE_URL + "/"+ selectedPhoto.Url }} style={tw`w-full h-80 rounded-lg`} />
              <View style={tw`flex-row justify-between items-center p-2`}>
                <Text style={tw`text-gray-500 text-sm`}>{selectedPhoto.Phototype}</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}

         
    </View>
  );
};

export default PhotoPartner;

