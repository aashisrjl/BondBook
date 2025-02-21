import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../component/Footer";
// import Footer from "../../component/Footer";
// import Diary from "./profileComponents/Diary";
// import Reminders from "./profileComponents/Remainder";
// import Timeline from "./profileComponents/Timeline";
// import Photo from "./profileComponents/Photo";
// import VideoGallery from "./profileComponents/Video";
// import Address from "./profileComponents/Address";

const AboutPage= ()=>  {
  const navigation = useNavigation();
  const [selectedSection, setSelectedSection] = useState("diary");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Token check failed:", error);
      }
    };
    checkToken();
  }, [navigation]);

  const userData = {
    name: "Aashish Rijal",
    email: "aashisrijal252@example.com",
    photoUrl: "https://via.placeholder.com/150",
    bio: "Adventure seeker. Coffee lover.",
    mood: "Happy",
  };

  const sections = [
    { id: "diary", title: "Diary", icon: "book" },
    { id: "remind", title: "Reminders", icon: "notifications" },
    { id: "timeline", title: "Timeline", icon: "history" },
    { id: "photos", title: "Photos", icon: "image" },
    { id: "videos", title: "Videos", icon: "videocam" },
    { id: "address", title: "Address", icon: "location-on" },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`px-6 pt-8 pb-6 border-b border-gray-100`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <Image
              source={require("../../assets/logo.png")}
              style={tw`w-16 h-16 rounded-full mr-4`}
            />
            <View>
              <Text style={tw`text-xl font-medium text-gray-900`}>
                {userData.name}
              </Text>
              <Text style={tw`text-sm text-gray-500 mt-1`}>
                {userData.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={tw`p-2 rounded-full bg-gray-100`}
            onPress={() => {/* Add edit profile navigation */}}
          >
            <MaterialIcons name="edit" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation */}
      <View style={tw`border-b border-gray-100`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-6`}
        >
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={tw`py-4 px-4 ${
                selectedSection === section.id
                  ? "border-b-2 border-indigo-600"
                  : ""
              }`}
              onPress={() => setSelectedSection(section.id)}
            >
              <View style={tw`flex-row items-center`}>
                <MaterialIcons
                  name={section.icon}
                  size={20}
                  color={
                    selectedSection === section.id ? "#4F46E5" : "#6B7280"
                  }
                  style={tw`mr-2`}
                />
                <Text
                  style={tw`text-sm font-medium ${
                    selectedSection === section.id
                      ? "text-indigo-600"
                      : "text-gray-600"
                  }`}
                >
                  {section.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View> */}

      {/* Content */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`px-6 py-6`}
      >
        <View style={tw`rounded-lg border border-gray-100 bg-white p-4`}>
          {selectedSection === "diary" && <Diary />}
          {selectedSection === "remind" && <Reminders />}
          {selectedSection === "timeline" && <Timeline />}
          {selectedSection === "photos" && <Photo />}
          {selectedSection === "videos" && <VideoGallery />}
          {selectedSection === "address" && <Address />}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={tw`border-t border-gray-100`}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default ProfilePageScreen;
