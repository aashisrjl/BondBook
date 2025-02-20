import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import tw from "twrnc";
import { PlusIcon, Clock, X, Plus } from "lucide-react-native";
import axios from "axios";
import { Modal, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const BASE_URL = window.location.hostname === "192.168.1.81" 
  ? "http://192.168.1.81:3000" 
  : "http://192.168.1.74:3000";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

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

// PhotoGallery Component with working navigation
const PhotoGallery = ({ photos, showNavigation = false, onPrevious, onNext, currentIndex }) => {
  const scrollViewRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Handle scroll to index
  useEffect(() => {
    if (scrollViewRef.current && containerWidth > 0) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * (CARD_WIDTH - 76),
        animated: true
      });
    }
  }, [currentIndex, containerWidth]);

  if (!Array.isArray(photos) || photos.length === 0) {
    return (
      <View style={tw`h-64 items-center justify-center`}>
        <Text style={tw`text-gray-500 text-center`}>No photos available</Text>
      </View>
    );
  }

  return (
    <View style={tw`relative`} onLayout={handleLayout}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[tw`h-64`, { flexGrow: 0 }]}
        contentContainerStyle={tw`gap-4`}
        scrollEventThrottle={16}
      >
        {photos.map((image, index) => (
          <View 
            key={index} 
            style={[
              tw`flex-shrink-0`,
              { width: CARD_WIDTH - 80 }
            ]}
          >
            <Image
              source={{ uri: image.startsWith('http') ? image : BASE_URL + "/" + image }}
              style={tw`h-64 rounded-lg w-full`}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      
      {showNavigation && photos.length > 1 && (
        <>
          <TouchableOpacity 
            style={tw`absolute top-1/2 left-2 z-10 bg-black/50 rounded-full w-10 h-10 items-center justify-center -translate-y-1/2`}
            onPress={onPrevious}
          >
            <Text style={tw`text-white font-bold text-xl`}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`absolute top-1/2 right-2 z-10 bg-black/50 rounded-full w-10 h-10 items-center justify-center -translate-y-1/2`}
            onPress={onNext}
          >
            <Text style={tw`text-white font-bold text-xl`}>→</Text>
          </TouchableOpacity>

          <View style={tw`absolute bottom-2 left-0 right-0 flex-row justify-center gap-2`}>
            {photos.map((_, index) => (
              <View 
                key={index}
                style={tw`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const Timeline = () => {
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [photo, setPhoto] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchTimelines();
  }, []);

  const fetchTimelines = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getTimeline`);
      const data = res.data.timeline;
      setTimelines(data);
    } catch (error) {
      console.error("Error fetching timeline:", error);
    }
  };

  const handleCreateTimeline = async () => {
    if (title && description && eventDate && photo.length > 0) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("eventDate", eventDate);
      formData.append("photo", {
        uri: photo[0], // or handle it if it's multiple
        type: "image/jpeg",
        name: "photo.jpg",
      });
  
      try {
        await axios.post(`${BASE_URL}/createTimeline`, formData);
        setTitle("");
        setDescription("");
        setEventDate("");
        setPhoto([]);  // Ensure you only reset photo here if needed
        setAddModal(false);
        fetchTimelines();
      } catch (error) {
        console.error("Error creating timeline:", error);
      }
    } else {
      Alert.alert("Validation", "Please fill all fields and select a photo.");
    }
  };
  

  const handleUpdateTimeline = async () => {
    if (!selectedTimelineId) return;
    try {
      await axios.patch(`${BASE_URL}/updateReminder/${selectedTimelineId}`, { title,description, eventDate });
      Alert.alert("Success", "Timeline Updated!");
      setTitle(" ");
      setDescription(" ");
      setEventDate("");
      setSelectedTimelineId(null);
      setUpdateModal(false);
      fetchTimelines();
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  const handleDeleteTimeline = async (selectedTimelineId) => {
    try {
      await axios.delete(`${BASE_URL}/deleteTimeline/${selectedTimelineId}`);
      Alert.alert("Success", "Reminder Deleted!");
      setUpdateModal(false);
      fetchTimelines();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const handleAddMorePhoto = async(selectedTimelineId)=>{
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to photos.");
      return;
    }

    if (result.assets) {
      const selectedPhoto = result.assets[0].uri;
      try {
        await axios.patch(`${BASE_URL}/addPhotoToTimeline/${setSelectedTimelineId}`, { photo: selectedPhoto });
        Alert.alert("Success", "Photo added to timeline!");
        fetchTimelines();
      } catch (error) {
        console.error("Error adding photo to timeline:", error);
      }
    } else {
      Alert.alert("No image selected", "Please select an image to upload.");
    }

  }

  
    if (!result.canceled) {
      setPhoto(result.assets.map((asset) => asset.uri)); // State updated with selected image(s)
    }
  };
  

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photo.length - 1));
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < photo.length - 1 ? prevIndex + 1 : 0));
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
        {timelines.length === 0 ? (
          <Text style={tw`text-center text-gray-600 mt-6`}>No timeline entries yet.</Text>
        ) : (
          timelines.map((event, index) => (
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
                onPress={() => {
                  setUpdateModal(true);
                  setSelectedTimelineId(event._id);
                  setTitle(event.title);
                  setDescription(event.description);
                  setEventDate(formatDate(event.eventDate));
                  setPhoto(event.photo);
                  setCurrentPhotoIndex(0); // Reset photo index when opening modal
                }}
              >
                <Image
                  source={{ uri: BASE_URL + "/" + event.photo[0] }}
                  style={[
                    tw`w-full h-48`,
                    { width: CARD_WIDTH - 40 }
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
          ))
        )}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => { setAddModal(true) }}
        style={[
          tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg`,
          { elevation: 4 }
        ]}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Update Modal */}
      <Modal visible={updateModal} transparent={true} animationType="slide">
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`bg-white p-6 rounded-xl w-105 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Your Timeline
              </Text>
              <TouchableOpacity onPress={() => setUpdateModal(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <PhotoGallery 
              photos={photo}
              showNavigation={true}
              onPrevious={goToPreviousPhoto}
              onNext={goToNextPhoto}
              currentIndex={currentPhotoIndex}
            />

            <TextInput
              label="Event Title"
              value={title}
              onChangeText={setTitle}
              style={tw`mb-4`}
            />
            <TextInput
              label="Event Description"
              value={description}
              onChangeText={setDescription}
              multiline
              style={tw`mb-4`}
            />
            <TextInput
              label="Event Date"
              value={eventDate}
              onChangeText={setEventDate}
              style={tw`mb-4`}
            />

            <TouchableOpacity
              onPress={handleUpdateTimeline}
              style={tw`bg-blue-500 py-2 rounded-xl items-center mb-2`}
            >
              <Text style={tw`text-white text-lg`}>Update </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteTimeline(selectedTimelineId)}
              style={tw`bg-red-500 py-2 rounded-xl items-center`}
            >
              <Text style={tw`text-white text-lg`}>Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={addModal} transparent={true} animationType="slide">
        <View style={tw`flex   justify-center items-center`}>
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
              style={tw`border bg-white border-gray-300 p-1 rounded-md mb-3`}
              placeholder="Title"
              onChangeText={setTitle}
            />
            <TextInput
              style={tw`border bg-white border-gray-300 p-1 rounded-md mb-3 h-20`}
              placeholder="Description"
              multiline
              onChangeText={setDescription}
            />
            <TextInput
              style={tw`border bg-white border-gray-300 p-1 rounded-md mb-3 h-20`}
              placeholder="Date"
              onChangeText={setEventDate}
            />
            {photo &&(
              <Text style={tw`text-green-600`} >uploaded Successfully</Text>
            ) }
             <TouchableOpacity
              style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
              onPress={()=>{handleAddMorePhoto(selectedTimelineId)}}
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
