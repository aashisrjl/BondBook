import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, Alert } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import tw from "twrnc";
import { PlusIcon, XCircle, Play, Pause, VideoIcon, Trash2, X } from "lucide-react-native";  
import { BASE_URL } from "@env";

const VideoGalleryPartner = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoType, setVideoType] = useState("Personal");
  const [addVideoModal, setAddVideoModal] = useState(false); 
  const videoRef = useRef(null);

  // Fetch videos from API
  const fetchVideos = async () => {
    console.log("Fetching videos from:", `${BASE_URL}/getvideo`);
    try {
      const res = await axios.get(`${BASE_URL}/getPartnerVideo`);
      console.log("Fetched videos:", res.data.videos);
      setVideos(res.data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-50  mx-auto rounded-lg overflow-hidden`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}>
        <VideoIcon size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>Video Gallery</Text>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#4B5563" style={tw`mt-4`} />
      ) : (
        <ScrollView style={tw`flex-1 mt-2 mx-2`}>
          <View style={tw`flex-row flex-wrap -mx-1`}>
            {videos.map((video) => (
              <TouchableOpacity
                key={video._id} // Changed from video.id to video._id
                onPress={() => setSelectedVideo(video)}
                style={tw`w-1/2 px-1 mb-2`}
              >
                <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-2`}>
                  <Image
                    source={{ uri: BASE_URL + "/" + video.Url || "https://via.placeholder.com/150" }}
                    style={tw`w-full h-40 rounded-lg`}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("Opening modal");
          setAddVideoModal(true);
        }}
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Popup for Selected Video */}
      {selectedVideo && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 h-200 w-full`}>
              <TouchableOpacity
                onPress={() => setSelectedVideo(null)}
                style={tw`absolute top-2 right-2`}
              >
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <View>
                <Video
                  ref={videoRef}
                  source={{ uri: BASE_URL + "/" + selectedVideo.Url }}
                  style={tw`w-full h-170`}
                  useNativeControls={false}
                  resizeMode="contain"
                  shouldPlay={isPlaying}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsPlaying(!isPlaying);
                    isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
                  }}
                  style={tw`mt-[-40px] p-2 bg-gray-800 rounded-full self-center`}
                >
                  {isPlaying ? <Pause size={24} color="white" /> : <Play size={24} color="white" />}
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-gray-500 text-sm`}>{selectedVideo.Phototype}</Text>
                <TouchableOpacity onPress={() => handleDelete(selectedVideo._id)}>
                  <View style={tw`bg-red-600 p-2 rounded-lg`}>
                    <Trash2 size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default VideoGalleryPartner;