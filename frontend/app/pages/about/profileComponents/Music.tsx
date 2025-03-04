import { Bell, PlusIcon } from 'lucide-react-native';
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../../../tw';

const MusicPage = () => {
    return(
    <View style={tw`flex-1 bg-gray-50 w-[31rem]`}>
    {/* Header */}
    <View style={tw`bg-white px-4 py-6 shadow-sm`}>
      <View style={tw`flex-row items-center mb-2`}>
        <Bell size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
          Musics
        </Text>
      </View>
      <Text style={tw`text-gray-500 text-sm`}>
        {0} musics
      </Text>
    </View>

    {/* Reminders List */}
    <ScrollView style={tw`flex-1 px-4 pt-4`}>
     
      <View style={tw`h-20`} /> {/* Bottom spacing for FAB */}
    </ScrollView>

    {/* Floating Add Button */}
    <TouchableOpacity
      style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
    >
      <PlusIcon size={24} color="white" />
    </TouchableOpacity>

  </View>
);
}

export default MusicPage
