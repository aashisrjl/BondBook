import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../component/Footer";

const AboutPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Login");
      }
      console.log("Token:", token);
    };
    // checkToken();
  }, [navigation]);

  const sections = [
    { id: "diary", title: "Diary", icon: "book", route: "diary" },
    { id: "reminders", title: "Reminders", icon: "watch", route: "reminders" },
    { id: "timeline", title: "Timeline", icon: "timeline", route: "timeline" },
    { id: "surprise", title: "Surprises", icon: "mood", route: "surprise" },
    { id: "photos", title: "Photos", icon: "photo", route: "photos" },
    { id: "videos", title: "Videos", icon: "video-library", route: "videos" },
    { id: "music", title: "Music", icon: "music-note", route: "music" },
    { id: "address", title: "Map", icon: "map", route: "address" },
  ];

  const SectionItem = ({ title, icon, route }) => (
    <TouchableOpacity
      style={tw`w-27 flex items-center mt-3`}
      onPress={() => navigation.navigate(route)}
    >
      <View style={tw`bg-white h-20 w-20 rounded-2xl flex items-center justify-center`}>
        <MaterialIcons name={icon} size={30} color="black" />
      </View>
      <Text style={tw`text-white font-bold text-lg mt-2 text-center`}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Search Section */}
      <View style={tw`bg-gray-800 px-4 py-6`}>
        <View style={tw`flex-row items-center bg-gray-700 rounded-lg px-3 py-2`}>
          <MaterialIcons name="search" size={24} color="gray" />
          <TextInput
            style={tw`flex-1 ml-2 text-white`}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 bg-gray-800 px-4 py-6`}
      >
        {/* Header with Profile Button */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <Text style={tw`text-white font-bold text-2xl`}>Home Services</Text>
          <TouchableOpacity
            style={tw`bg-gray-200 p-2 rounded-2xl`}
            onPress={() => navigation.navigate("PartnerInfo")}
          >
            <MaterialIcons name="person" size={32} color="black" />
          </TouchableOpacity>
        </View>

        {/* Home Services Section */}
        <View style={tw`flex-row flex-wrap justify-leftly gap-2`}>
          {sections.slice(0, 4).map((section) => (
            <SectionItem key={section.id} {...section} />
          ))}
        </View>

        {/* Media Section */}
        <Text style={tw`text-white font-bold text-2xl mt-10 mb-6`}>Media</Text>
        <View style={tw`flex-row flex-wrap justify-leftly`}>
          {sections.slice(4, 7).map((section) => (
            <SectionItem key={section.id} {...section} />
          ))}
        </View>

        {/* Address Section */}
        <Text style={tw`text-white font-bold text-2xl mt-10 mb-6`}>Address</Text>
        <View style={tw`flex-row flex-wrap justify-leftly mb-10`}>
          {sections.slice(7).map((section) => (
            <SectionItem key={section.id} {...section} />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default AboutPage;