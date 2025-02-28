import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from "react-native";
import tw from "twrnc";
import { PlusIcon, Clock, X } from "lucide-react-native";
import axios from "axios";
import { Modal, TextInput } from "react-native-paper";
import { BASE_URL } from "@env";

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

const PhotoGallery = ({ photos, showNavigation = false, onPrevious, onNext, currentIndex }) => {
  const scrollViewRef = React.useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

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

const TimelinePartner = () => {
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
      const res = await axios.get(`${BASE_URL}/getPartnerTimeline`);
      setTimelines(res.data.timelines);
    } catch (error) {
      console.error("Error fetching timeline:", error);
    }
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photo.length - 1));
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev < photo.length - 1 ? prev + 1 : 0));
  };

  return (
    <View style={tw`flex-1 bg-gray-50 w-124 `}>
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

      <ScrollView style={tw`flex-1 px-6 pt-6`}>
        {timelines.length === 0 ? (
          <Text style={tw`text-center text-gray-600 mt-6`}>No timeline entries yet.</Text>
        ) : (
          timelines.map((event, index) => (
            <View key={event._id} style={tw`mb-8 relative`}>
              {index !== timelines.length - 1 && (
                <View 
                  style={[
                    tw`absolute left-4 top-[90px] bottom-[-40px] w-0.5 bg-gray-200`,
                    { zIndex: 1 }
                  ]} 
                />
              )}
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
                  setCurrentPhotoIndex(0);
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


            <Text style={tw`mb-4`}>{title}</Text>
            <Text style={tw`mb-4`}>{description}</Text>
        
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 text-sm`}>Event Date</Text>
              <Text style={tw`text-gray-900 text-base`}>{eventDate}</Text>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default TimelinePartner;