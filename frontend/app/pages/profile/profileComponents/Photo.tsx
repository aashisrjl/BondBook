import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import tw from "twrnc";
import { PlusIcon, Image as ImageIcon, XCircle } from "lucide-react-native";

const photos = [
  { id: 1, url: "https://via.placeholder.com/150", caption: "Sunset View", type: "Shared" },
  { id: 2, url: "https://via.placeholder.com/150", caption: "Mountain Trek", type: "Personal" },
  { id: 3, url: "https://via.placeholder.com/150", caption: "Beach Vibes", type: "Shared" },
  { id: 4, url: "https://via.placeholder.com/150", caption: "City Lights", type: "Personal" },
  { id: 5, url: "https://via.placeholder.com/150", caption: "Forest Trail", type: "Shared" },
  { id: 6, url: "https://via.placeholder.com/150", caption: "Snowy Peaks", type: "Personal" },
];

const Photo = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem] mx-auto rounded-lg overflow-hidden`}> 
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}> 
        <ImageIcon size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>Photo Gallery</Text>
      </View>

      {/* Photo Grid */}
      <ScrollView style={tw`flex-1 mt-2 `}>
        <View style={tw`flex-row flex-wrap -mx-1`}>
          {photos.map((photo) => (
            <TouchableOpacity 
              key={photo.id} 
              onPress={() => setSelectedPhoto(photo)}
              style={tw`w-38 px-1 mb-2`}
            >
              <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-2`}>
                <Image source={{ uri: photo.url }} style={tw`w-full h-40 rounded-lg`} />
                <Text style={tw`text-gray-800 text-sm font-semibold mt-1`}>{photo.caption}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Popup for Selected Photo */}
      {selectedPhoto && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 w-full max-w-md`}> 
              <TouchableOpacity onPress={() => setSelectedPhoto(null)} style={tw`absolute top-2 right-2`}>
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <Image source={{ uri: selectedPhoto.url }} style={tw`w-full h-60 rounded-lg`} />
              <Text style={tw`text-gray-800 text-lg font-semibold mt-2`}>{selectedPhoto.caption}</Text>
              <Text style={tw`text-gray-500 text-sm`}>{selectedPhoto.type}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Photo;
