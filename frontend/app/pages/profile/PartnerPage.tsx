import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const COVER_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

export default function PartnerPage() {
  const navigation= useNavigation();

  const [userData, setUserData] = useState({
    name: "Aashish Rijal",
    email: "aashisrijal252@example.com",
    photoUrl: PROFILE_IMAGE,
    coverUrl: COVER_IMAGE,
    bio: "Adventure seeker. Coffee lover. Professional photographer with a passion for capturing life's beautiful moments.",
    mood: "Adventurous",
    gender: "Male",
    age: 25,
    address: "Kathmandu, Nepal",
    stats: {
      photos: 248,
      timelines: 1234,
      diaries: 567
    },
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    }
  };

  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <View style={tw`items-center`}>
      <Text style={tw`text-xl font-bold text-gray-800`}>{value}</Text>
      <Text style={tw`text-sm text-gray-600 mt-1`}>{label}</Text>
    </View>
  );

  const SocialButton = ({ icon, color, url }: { icon: string; color: string; url: string }) => (
    <TouchableOpacity
      style={tw.style(`w-11 h-11 rounded-full justify-center items-center`, 
        { backgroundColor: color },
        Platform.select({ web: { cursor: 'pointer' } })
      )}
      onPress={() => handleSocialLink(url)}
    >
      <FontAwesome name={icon} size={20} color="white" />
    </TouchableOpacity>
  );

  const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={tw`flex-row items-center mb-4`}>
      <MaterialIcons name={icon} size={24} color="#6B7280" />
      <View style={tw`ml-3`}>
        <Text style={tw`text-sm text-gray-500`}>{label}</Text>
        <Text style={tw`text-base text-gray-800 mt-0.5`}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: userData.coverUrl }} style={tw`w-full h-48`} />

        {/* Profile Section */}
        <View style={tw`-mt-16 bg-white rounded-t-3xl px-5 pt-0 pb-6`}>
          <Image 
            source={{ uri: userData.photoUrl }} 
            style={tw`w-32 h-32 rounded-full border-4 border-white mx-auto -mt-16`}
          />
          
          <View style={tw`items-center mt-3`}>
            <Text style={tw`text-2xl font-bold text-gray-800`}>{userData.name}</Text>
            <Text style={tw`text-gray-600 mt-1`}>{userData.email}</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <MaterialIcons name="mood" size={20} color="#10B981" />
              <Text style={tw`text-green-600 ml-1`}>{userData.mood}</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View style={tw`flex-row justify-around mt-6 py-5 border-t border-b border-gray-200`}>
            <StatBox label="Photos" value={userData.stats.photos} />
            <StatBox label="Timelines" value={userData.stats.timelines} />
            <StatBox label="Diaries" value={userData.stats.diaries} />
          </View>

          {/* Social Links */}
          <View style={tw`flex-row justify-around mt-6`}>
            <SocialButton icon="facebook" color="#1877F2" url={userData.socialLinks.facebook} />
            <SocialButton icon="twitter" color="#1DA1F2" url={userData.socialLinks.twitter} />
            <SocialButton icon="instagram" color="#E4405F" url={userData.socialLinks.instagram} />
            <SocialButton icon="linkedin" color="#0A66C2" url={userData.socialLinks.linkedin} />
          </View>

          {/* Bio Section */}
          <View style={tw`mt-6 p-4 bg-gray-50 rounded-xl`}>
            <Text style={tw`text-gray-700 leading-6`}>{userData.bio}</Text>
          </View>

          {/* Details Section */}
          <View style={tw`mt-6`}>
            <DetailRow icon="cake" label="Age" value={`${userData.age} years`} />
            <DetailRow icon="person" label="Gender" value={userData.gender} />
            <DetailRow icon="location-on" label="Location" value={userData.address} />
          </View>

          {/* Action Buttons */}
          <View style={tw`mt-6 gap-3`}>
            <TouchableOpacity
              style={tw.style(
                `flex-row items-center justify-center p-4 bg-blue-600 rounded-xl`,
                Platform.select({ web: { cursor: 'pointer' } })
              )}
              onPress={() => navigation.navigate("PartnerInfo")}
            >
              <MaterialIcons name="group" size={24} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>View Partner Information</Text>
            </TouchableOpacity>

         
          </View>
        </View>
      </ScrollView>
    </View>
  );
}