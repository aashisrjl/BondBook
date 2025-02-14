import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { PlusIcon, Image as ImageIcon } from "lucide-react-native";

// Dummy photo data
const photos = [
  {
    id: 1,
    url: "https://via.placeholder.com/150",
    caption: "Sunset View",
    type: "Shared",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/150",
    caption: "Mountain Trek",
    type: "Personal",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/150",
    caption: "Beach Vibes",
    type: "Shared",
  },
  {
    id: 4,
    url: "https://via.placeholder.com/150",
    caption: "City Lights",
    type: "Personal",
  },
];

const Photo = () => {
  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem]`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}>
        <ImageIcon size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>Photo Gallery</Text>
      </View>

      {/* Photo List */}
      <ScrollView style={tw`flex-1 px-4 pt-4`}>
        {photos.map((photo) => (
          <View key={photo.id} style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100`}>
            <Image source={{ uri: photo.url }} style={tw`w-full h-40 rounded-lg mb-2`} />
            <Text style={tw`text-gray-800 text-lg font-semibold`}>{photo.caption}</Text>
            <Text style={tw`text-gray-500 text-sm`}>{photo.type}</Text>
          </View>
        ))}
        <View style={tw`h-20`} /> {/* Bottom spacing */}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Photo;