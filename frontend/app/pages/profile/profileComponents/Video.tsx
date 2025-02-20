
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, Alert } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // ✅ Import Axios
import tw from "twrnc";
import { PlusIcon, XCircle, Play, Pause, VideoIcon, Trash2, X } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";

const BASE_URL = window.location.hostname === "192.168.1.81" 
  ? "http://192.168.1.81:3000" 
  : "http://192.168.1.74:3000";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [videoType, setVideoType] = useState("Personal");
  const [addVideoModal, setAddVideoModel] = useState(false);
  const videoRef = useRef(null);

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getvideo`);
      setVideos(res.data.videos); // Axios auto-parses JSON
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchVideos();
  }, []);

  // Handle Delete Video
  const handleDelete = async (videoId) => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          setDeleting(true);
          try {
            await axios.delete(`${BASE_URL}/deletegallery/${videoId}`);
            setVideos(videos.filter((video) => video.id !== videoId));
            setSelectedVideo(null);
          } catch (error) {
            console.error("Error deleting video:", error.message);
          } finally {
            setDeleting(false);
            fetchVideos();
          }
        },
      },
    ]);
  };

  // Pick a video from device
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  // Handle Video Upload
  const postVideo = async () => {
    if (!videoUri) {
      Alert.alert("No Video Selected", "Please pick a video to upload.");
      return;
    }

    setUploading(true);

    let formData = new FormData();
    formData.append("Url", {
      uri: videoUri,
      type: "video/mp4",
      name: "uploaded_video.mp4",
    });
    formData.append("Phototype", videoType);

    try {
      const response = await axios.post(`${BASE_URL}/uploadvideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setVideos([...videos, response.data.video]); // Update state with new video
        setAddVideoModel(false);
        setVideoUri(null);
      } else {
        Alert.alert("Upload Failed", "There was an error uploading your video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem] mx-auto rounded-lg overflow-hidden`}> 
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
                key={video.id} 
                onPress={() => setSelectedVideo(video)}
                style={tw`w-1/2 px-1 mb-2`}
              >
                <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-2`}>
                  <Image source={{ uri:BASE_URL + "/" + video.Url || "https://via.placeholder.com/150" }} style={tw`w-full h-40 rounded-lg`} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity onPress={() => setAddVideoModel(true)}
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Adding Video */}
      <Modal visible={addVideoModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>Upload Video</Text>
              <TouchableOpacity onPress={() => setAddVideoModel(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Video Picker Button */}
            {videoUri && (
              <Text style={tw`text-md text-green-600 mb-2`}>Video Selected</Text>
            )}
              <TouchableOpacity
                style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
                onPress={pickVideo}
              >
                <Text style={tw`text-center`}>Pick a Video</Text>
              </TouchableOpacity>
            

            {/* Category Picker */}
            <Picker
              selectedValue={videoType}
              onValueChange={(itemValue) => setVideoType(itemValue)}
              style={tw`border border-gray-300 rounded-md mb-3`}
            >
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shared" value="Shared" />
            </Picker>

            {/* Upload Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md`}
              onPress={postVideo}
              disabled={uploading}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                {uploading ? "Uploading..." : "Upload Video"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

     
      {/* Modal Popup for Selected Video */}
      {selectedVideo && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 h-200 w-full`}> 
              <TouchableOpacity onPress={() => setSelectedVideo(null)} style={tw`absolute top-2 right-2`}>
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <View>
                <Video
                  ref={videoRef}
                  source={{ uri: BASE_URL + "/"+ selectedVideo.Url }}
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
              <View style={tw `flex-row justify-between`}>
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

export default VideoGallery;

