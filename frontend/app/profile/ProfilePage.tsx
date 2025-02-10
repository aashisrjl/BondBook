import React, { useState } from "react";
import Address from "./components/Address";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

const ProfilePageScreen = () => {
  const [selectedSection, setSelectedSection] = useState("diary");

  const userData = {
    name: "Aashish Rijal",
    email: "aashisrijal252@example.com",
    photoUrl: "https://via.placeholder.com/150",
    bio: "Adventure seeker. Coffee lover.",
    mood: "Happy",
  };

  const sections = [
    { id: "diary", title: "Diary ", icon: "book" },
    { id: "notes", title: "Notes ", icon: "notes" },
    { id: "timeline", title: "Timeline ", icon: "timeline" },
    { id: "photos", title: "Photos ", icon: "photo-library" },
    { id: "videos", title: "Videos ", icon: "video-library" },
    { id: "address", title: "Address ", icon: "map" },

  ];

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Profile Header */}
      <View style={tw`bg-white p-4 flex-row items-center`}>
        <Image
          source={require("../assets/logo.png")}
          style={tw`w-16 h-16 rounded-full mr-4`}
        />
        <View>
          <Text style={tw`text-xl font-bold`}>{userData.name}</Text>
          <Text style={tw`text-gray-600`}>{userData.email}</Text>
          <Text style={tw`text-green-500 italic foot-bold`}>Mood: {userData.mood}</Text>
        </View>
      </View>

      {/* Sidebar Navigation */}
      <View style={tw`flex-row justify-around bg-gray-200 py-2`}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id }
            style={[
              tw`p-3`,
              selectedSection === section.id && tw`border-b-2 border-blue-500`,
            ]}
            onPress={() => setSelectedSection(section.id)}
          >
            <MaterialIcons name={section.icon} size={24} color="gray" />
            <Text style={tw`text-center text-gray-700`}>
              {section.title }
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Content Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`p-4`}>
        {selectedSection === "diary" && <Text>Your Diary Entries...</Text>}
        {selectedSection === "notes" && <Text>Your Notes...</Text>}
        {selectedSection === "timeline" && <Text>Your Timelines...</Text>}
        {selectedSection === "photos" && <Text>Your Photo Gallery...</Text>}
        {selectedSection === "videos" && <Text>Your Videos...</Text>}
        {selectedSection === "address" && <><Address/></>}

      </ScrollView>
    </View>
  );
};

export default ProfilePageScreen;
