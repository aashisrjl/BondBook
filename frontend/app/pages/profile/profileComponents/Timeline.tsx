import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import tw from "twrnc";
import { PlusIcon, Clock, X } from "lucide-react-native";
import axios from "axios";
import { Modal, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

// const timelineEvents = [
//   {
//     id: 1,
//     title: "Mountain Adventure",
//     eventDate: "2024-03-15T14:30:00",
//     photo: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop&q=60",
//     description: "Explored the hidden trails of Mount Rainier. The views were absolutely breathtaking, and we even spotted some wildlife along the way!",
//   },
//   {
//     id: 2,
//     title: "Coffee Experience",
//     eventDate: "2024-03-10T12:00:00",
//     photo: "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=500&auto=format&fit=crop&q=60",
//     description: "Coffee tasting session at the new artisanal café downtown. Each blend told its own story of origin and craftsmanship.",
//   },
//   {
//     id: 3,
//     title: "Beach Yoga",
//     eventDate: "2024-03-05T18:45:00",
//     photo: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=500&auto=format&fit=crop&q=60",
//     description: "Sunset yoga session on the beach. The perfect blend of mindfulness and nature's beauty.",
//   }
// ];

const BASE_URL = "http://192.168.1.74:3000"; // Replace with your actual backend URL


const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48; // 24px padding on each side

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Timeline = () => {
  const [addModal,setAddModal]= useState(false);
  const [updateModal,setUpdateModal]= useState(false);
  const [title,setTitle]= useState('');
  const [description,setDescription] = useState('');
  const [eventDate,setEventDate] = useState('');
  const [photo,setPhoto] = useState(null);
  const [timelines,setTimelines] = useState([]);
  const [selectedMTimeline,setSelectedTimeline] = useState('');

  useEffect(()=>{
    fetchTimelines();
  },[])

  const fetchTimelines = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getTimeline`);
      const data = res.data.timeline
      setTimelines(data);
      console.log('tmerline',timelines)
    } catch (error) {
      console.error("Error fetching timeline:", error);
    }
  };

  const handleCreateTimeline = async () => {
    if (!title.trim() || !eventDate.trim() || !photo.trim()) {
      Alert.alert("Error", " Fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/createTimeline`, { title, description,eventDate,photo });
      Alert.alert("Success", "Timeline Created!");
      setTitle("");
      setDescription("");
      setEventDate("");
      setPhoto(null);
      setAddModal(false);
          
      fetchTimelines();
    } catch (error) {
      console.error("Error creating timeline:", error);
    }
  };

  // const updateReminder = async () => {
  //   if (!selectedReminderId) return;
  //   try {
  //     await axios.patch(`${BASE_URL}/updateReminder/${selectedReminderId}`, { title, date });
  //     Alert.alert("Success", "Reminder Updated!");
  //     setTitle("");
  //     setSelectedReminderId(null);
  //     fetchReminders();
  //   } catch (error) {
  //     console.error("Error updating reminder:", error);
  //   }
  // };

  // const deleteReminder = async (id) => {
  //   try {
  //     await axios.delete(`${BASE_URL}/deleteRemainder/${id}`);
  //     Alert.alert("Success", "Reminder Deleted!");
  //     fetchReminders();
  //   } catch (error) {
  //     console.error("Error deleting reminder:", error);
  //   }
  // };

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
      console.log('result',result)
  
      if (result.assets) {
        setPhoto(result.assets[0].uri);
      } else {
        Alert.alert("No image selected", "Please select an image to upload.");
        return;
      }
    };

  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem]`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Clock size={24} color="#4B5563" />
          <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
            My Timeline
          </Text>
        </View>
        <Text style={tw`text-gray-500 text-sm`}>
          {timelines.length} captured moments
        </Text>
      </View>

      {/* Timeline List */}
      <ScrollView style={tw`flex-1 px-6 pt-6`}>
        {timelines.map((event, index) => (
          <View key={event._id} style={tw`mb-8 relative`}>
            {/* Timeline line */}
            {index !== timelines.length - 1 && (
              <View 
                style={[
                  tw`absolute left-4 top-[90px] bottom-[-40px] w-0.5 bg-gray-200`,
                  { zIndex: 1 }
                ]} 
              />
            )}
            
            {/* Date bubble */}
            <View style={tw`flex-row items-center mb-4 relative z-10`}>
              <View style={tw`w-8 h-8 rounded-full bg-blue-500 items-center justify-center`}>
                <Text style={tw`text-white text-xs font-bold`}>
                  {new Date(event.eventDate).getDate()}
                </Text>
              </View>
              <Text style={tw`text-gray-600 ml-3 text-sm`}>
                {formatDate(event.eventDate)}
              </Text>
            </View>

            {/* Event Card */}
            <TouchableOpacity 
              style={tw`bg-white rounded-xl shadow-sm overflow-hidden ml-10`}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: BASE_URL + "/" + event.photo }}
                style={[
                  tw`w-full h-48`,
                  { width: CARD_WIDTH - 40 } // Adjust for the left margin
                ]}
                resizeMode="cover"
              />
              <View style={tw`p-4`}>
                <Text style={tw`text-gray-900 font-semibold text-lg mb-2`}>
                  {event.title}
                </Text>
                <Text style={tw`text-gray-700 leading-6`}>
                  {event.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
      onPress={()=>{setAddModal(true)}}
        style={[
          tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg`,
          { elevation: 4 }
        ]}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>
         {/* Modal Form */}
      <Modal visible={addModal} transparent animationType="slide">
        <View style={tw`flex justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-90 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Timeline Entry
              </Text>
              <TouchableOpacity onPress={() => setAddModal(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={tw`border border-gray-300 p-1 rounded-md mb-3`}
              placeholder="Title"
              onChangeText={setTitle}
            />
            <TextInput
              style={tw`border border-gray-300 p-1 rounded-md mb-3 h-20`}
              placeholder="Description"
              multiline
              onChangeText={setDescription}
            />
            <TextInput
              style={tw`border border-gray-300 p-1 rounded-md mb-3 h-20`}
              placeholder="Date"
              onChangeText={setEventDate}
            />
            {photo &&(
              <Text style={tw`text-green-600`} >uploaded Successfully</Text>
            ) }
             <TouchableOpacity
              style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
              onPress={pickImage}
            >
              <Text style={tw`text-center`}>Upload Image</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md mb-3`}
              onPress={() => {
                handleCreateTimeline();
                setAddModal(false);
              }}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

export default Timeline;