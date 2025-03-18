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

const PartnerInfo = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Login");
      }
      console.log("Token:", token);
    };
    checkToken();
  }, [navigation]);

  const sections = [
    { id: "partnerdiary", title: "Diary", icon: "book", route: "partnerdiary" },
    { id: "partnerreminders", title: "Reminders", icon: "watch", route: "partnerreminders" },
    { id: "partnertimeline", title: "Timeline", icon: "timeline", route: "partnertimeline" },
    { id: "partnersurprise", title: "Surprises", icon: "mood", route: "partnersurprise" },
    { id: "partnerphotos", title: "Photos", icon: "photo", route: "partnerphotos" },
    { id: "partnervideos", title: "Videos", icon: "video-library", route: "partnervideos" },
    { id: "partnermusic", title: "Music", icon: "music-note", route: "partnermusic" },
    { id: "partneraddress", title: "Map", icon: "map", route: "partneraddress" },
  ];

  const SectionItem = ({ title, icon, route }) => (
    <TouchableOpacity
      style={tw`w-25 flex items-center mt-4`}
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
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <Text style={tw`text-white font-bold text-2xl`}>Partner Info</Text>
          <TouchableOpacity
            style={tw`bg-gray-200 p-2 rounded-2xl`}
            onPress={() => navigation.navigate("About")} // Adjust route as needed
          >
            <MaterialIcons name="home" size={32} color="black" />
          </TouchableOpacity>
        </View>

        {/* All Sections in a Single Grid */}
        <View style={tw`flex-row flex-wrap justify-evenly gap-8`}>
          {sections.map((section) => (
            <SectionItem key={section.id} {...section} />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default PartnerInfo;