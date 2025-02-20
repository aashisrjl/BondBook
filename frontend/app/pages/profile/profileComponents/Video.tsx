import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator, Alert } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import tw from "twrnc";
import { PlusIcon, XCircle, Play, Pause, VideoIcon, Trash2, X } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";

const BASE_URL =
 "http://192.168.1.74:3000";
  

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [videoType, setVideoType] = useState("Personal");
  const [addVideoModal, setAddVideoModal] = useState(false); 
  const videoRef = useRef(null);

  // Fetch videos from API
  const fetchVideos = async () => {
    console.log("Fetching videos from:", `${BASE_URL}/getvideo`);
    try {
      const res = await axios.get(`${BASE_URL}/getvideo`);
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

  // Handle Delete Video
  const handleDelete = async (videoId) => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          console.log("Deleting video with ID:", videoId);
          setDeleting(true);
          try {
            await axios.delete(`${BASE_URL}/deletegallery/${videoId}`);
            setVideos(videos.filter((video) => video._id !== videoId));
            setSelectedVideo(null);
            console.log("Video deleted successfully");
          } catch (error) {
            console.error("Error deleting video:", error.message);
          } finally {
            setDeleting(false);
            fetchVideos(); // Refresh the list
          }
        },
      },
    ]);
  };

  // Pick a video from device
  const pickVideo = async () => {
    console.log("Picking video...");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      console.log("Selected video URI:", asset.uri, "Type:", asset.type);
      setVideoUri(asset.uri);
    } else {
      console.log("Video selection canceled");
    }
  };

  // Handle Video Upload
  const postVideo = async () => {
    console.log("postVideo called with URI:", videoUri, "Type:", videoType);
    if (!videoUri) {
      Alert.alert("No Video Selected", "Please pick a video to upload.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("Url", {
      uri: videoUri,
      type: "video/mp4", // Consider dynamically setting this based on asset.type
      name: `video_${Date.now()}.mp4`,
    });
    formData.append("Phototype", videoType);

    console.log("Posting to:", `${BASE_URL}/createGallery`);
    try {
      const response = await axios.post(`${BASE_URL}/createGallery`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);
      if (response.status === 200) {
        setVideos([...videos, response.data.video]);
        setAddVideoModal(false);
        setVideoUri(null);
        console.log("Video uploaded successfully");
      } else {
        Alert.alert("Upload Failed", `Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Upload Error:", error.message, error.response?.data);
      Alert.alert("Upload Error", error.message);
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

      {/* Modal for Adding Video */}
      <Modal visible={addVideoModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>Upload Video</Text>
              <TouchableOpacity onPress={() => setAddVideoModal(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Video Picker Button */}
            {videoUri && <Text style={tw`text-md text-green-600 mb-2`}>Video Selected</Text>}
            <TouchableOpacity style={tw`bg-gray-300 p-3 rounded-lg mb-3`} onPress={pickVideo}>
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

export default VideoGallery;