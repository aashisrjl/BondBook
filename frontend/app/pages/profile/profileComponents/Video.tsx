import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { Video } from "expo-av";
import tw from "twrnc";
import { PlusIcon, XCircle, Play, Pause, VideoIcon } from "lucide-react-native";

const videos = [
  { id: 1, url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Ocean Waves", type: "Shared" },
  { id: 2, url: "https://www.w3schools.com/html/movie.mp4", caption: "Forest Walk", type: "Personal" },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  return (
    <View style={tw`flex-1 bg-gray-50  w-[28rem] mx-auto rounded-lg overflow-hidden`}> 
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}> 
      <VideoIcon size={24} color="#4B5563" />
        <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>Video Gallery</Text>
      </View>

      {/* Video Grid */}
      <ScrollView style={tw`flex-1 mt-2 mx-2`}>
        <View style={tw`flex-row flex-wrap -mx-1`}>
          {videos.map((video) => (
            <TouchableOpacity 
              key={video.id} 
              onPress={() => setSelectedVideo(video)}
              style={tw`w-1/2 px-1 mb-2`}
            >
              <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-2`}>
                <Image source={{ uri: "https://via.placeholder.com/150" }} style={tw`w-full h-40 rounded-lg`} />
                <Text style={tw`text-gray-800 text-sm font-semibold mt-1`}>{video.caption}</Text>
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

      {/* Modal Popup for Selected Video */}
      {selectedVideo && (
        <Modal transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-80 justify-center items-center p-4`}>
            <View style={tw`bg-white rounded-lg p-4 w-full max-w-md`}> 
              <TouchableOpacity onPress={() => setSelectedVideo(null)} style={tw`absolute top-2 right-2`}>
                <XCircle size={24} color="black" />
              </TouchableOpacity>
              <View>
                <Video
                  ref={videoRef}
                  source={{ uri: selectedVideo.url }}
                  style={tw`w-full h-60 rounded-lg`}
                  useNativeControls={false}
                  resizeMode="contain"
                  shouldPlay={isPlaying}
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsPlaying(!isPlaying);
                    isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
                  }}
                  style={tw`mt-2 p-2 bg-gray-800 rounded-full self-center`}
                >
                  {isPlaying ? <Pause size={24} color="white" /> : <Play size={24} color="white" />}
                </TouchableOpacity>
              </View>
              <Text style={tw`text-gray-800 text-lg font-semibold mt-2`}>{selectedVideo.caption}</Text>
              <Text style={tw`text-gray-500 text-sm`}>{selectedVideo.type}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default VideoGallery;
