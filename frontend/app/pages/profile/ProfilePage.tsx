import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
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
    };
    checkToken();
  }, [navigation]);

  const [userData, setUserData] = useState({
    name: "Aashish Rijal",
    email: "aashisrijal252@example.com",
    photoUrl: "https://via.placeholder.com/150",
    bio: "Adventure seeker. Coffee lover.",
    mood: "Happy",
    gender: "Male",
    age: 25,
    address: "Kathmandu, Nepal",
  });

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView>
        {/* Profile Header */}
        <View style={tw`bg-white p-4 flex-row items-center border-b border-gray-300`}>
          <Image source={{ uri: userData.photoUrl }} style={tw`w-20 h-20 rounded-full mr-4`} />
          <View>
            <Text style={tw`text-xl font-bold`}>{userData.name}</Text>
            <Text style={tw`text-gray-600`}>{userData.email}</Text>
            <Text style={tw`text-green-500 italic`}>Mood: {userData.mood}</Text>
          </View>
        </View>

        {/* User Details */}
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-bold text-gray-700`}>User Details</Text>
          <Text style={tw`text-gray-600 mt-2`}><Text style={tw`font-bold`}>Age:</Text> {userData.age}</Text>
          <Text style={tw`text-gray-600`}><Text style={tw`font-bold`}>Gender:</Text> {userData.gender}</Text>
          <Text style={tw`text-gray-600`}><Text style={tw`font-bold`}>Address:</Text> {userData.address}</Text>
          <Text style={tw`text-gray-600`}><Text style={tw`font-bold`}>Bio:</Text> {userData.bio}</Text>

          {/* Partner Information Button */}
          <TouchableOpacity
            style={tw`mt-4 p-3 bg-blue-500 rounded-lg flex-row items-center justify-center`}
            onPress={() => navigation.navigate("PartnerInfo")}
          >
            <MaterialIcons name="group" size={24} color="white" />
            <Text style={tw`text-white font-bold ml-2`}>View Partner Information</Text>
          </TouchableOpacity>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={tw`mt-4 p-3 bg-gray-500 rounded-lg flex-row items-center justify-center`}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <MaterialIcons name="edit" size={24} color="white" />
            <Text style={tw`text-white font-bold ml-2`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AboutPage;
