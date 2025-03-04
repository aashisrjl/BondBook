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
import axios from "axios";
import { BASE_URL } from "@env";

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

export default function PartnerPage() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    photoUrl: DEFAULT_PROFILE_IMAGE,
    coverUrl: DEFAULT_COVER_IMAGE,
    bio: "",
    mood: "",
    gender: "",
    age: 0,
    address: "",
    stats: {
      photos: 0,
      timeline: 0,
      diaries: 0
    },
    socialLinks: {
      facebook: "",
      tiktok: "",
      instagram: "",
      linkedin: ""
    }
  });

  useEffect(() => {
    fetchPartnerProfile();
  }, []);

  const fetchPartnerProfile = async () => {
    try {
      console.log(BASE_URL+ "/profile/partner")
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await axios.get(BASE_URL + "/user/partnerProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const partner = response.data.partner;
      if (!partner) {
        throw new Error("Partner not found");
      }

      setPartnerData({
        name: partner.name || "",
        email: partner.email || "",
        photoUrl: partner.photoUrl 
          ? `${BASE_URL}/${partner.photoUrl}` 
          : DEFAULT_PROFILE_IMAGE,
        coverUrl: DEFAULT_COVER_IMAGE,
        bio: partner.bio || "",
        mood: partner.mood || "",
        gender: "", // Assuming this might not be in the response
        age: partner.age || 0,
        address: partner.address || "",
        stats: { // Not in API response, keeping as default
          photos: partner.stats.photos,
          timeline:partner.stats.timeline,
          diaries: partner.stats.diaries
        },
        socialLinks: {
          facebook: partner.socialMedia?.facebook || "",
          tiktok: partner.socialMedia?.tiktok || "", // Not in response based on previous example
          instagram: partner.socialMedia?.instagram || "",
          linkedin: partner.socialMedia?.linkedin || ""
        }
      });

    } catch (error) {
      console.error("Error fetching partner profile:", error);
      alert("Failed to load partner profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLink = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <View style={tw`items-center`}>
      <Text style={tw`text-xl font-bold text-gray-800`}>{value}</Text>
      <Text style={tw`text-sm text-gray-600 mt-1`}>{label}</Text>
    </View>
  );

  const SocialButton = ({ icon, color, url }: { icon: string; color: string; url: string }) => (
    <TouchableOpacity
      style={tw.style(
        `w-11 h-11 rounded-full justify-center items-center`,
        { backgroundColor: color },
        Platform.select({ web: { cursor: url ? 'pointer' : 'default' } }),
        !url && 'opacity-50'
      )}
      onPress={() => handleSocialLink(url)}
      disabled={!url}
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

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading partner profile...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: partnerData.coverUrl }} style={tw`w-full h-48`} />
        <View style={tw`-mt-16 bg-white rounded-t-3xl px-5 pt-0 pb-6`}>
          <Image 
            source={{ uri: partnerData.photoUrl }} 
            style={tw`w-32 h-32 rounded-full border-4 border-white mx-auto -mt-16`}
          />
          
          <View style={tw`items-center mt-3`}>
            <Text style={tw`text-2xl font-bold text-gray-800`}>{partnerData.name || "Unnamed Partner"}</Text>
            {partnerData.email && (
              <Text style={tw`text-gray-600 mt-1`}>{partnerData.email + " "}</Text>
            )}
            {partnerData.mood && (
              <View style={tw`flex-row items-center mt-2`}>
                <MaterialIcons name="mood" size={20} color="#10B981" />
                <Text style={tw`text-green-600 ml-1`}>{partnerData.mood + " "}</Text>
              </View>
            )}
          </View>

          <View style={tw`flex-row justify-around mt-6 py-5 border-t border-b border-gray-200`}>
            <StatBox label="Photos" value={partnerData.stats.photos} />
            <StatBox label="Timelines " value={partnerData.stats.timeline} />
            <StatBox label="Diaries " value={partnerData.stats.diaries} />
          </View>

          <View style={tw`flex-row justify-around mt-6`}>
            <SocialButton icon="facebook" color="#1877F2" url={partnerData.socialLinks.facebook} />
            <SocialButton icon="twitter" color="#1DA1F2" url={partnerData.socialLinks.tiktok} />
            <SocialButton icon="instagram" color="#E4405F" url={partnerData.socialLinks.instagram} />
            <SocialButton icon="linkedin" color="#0A66C2" url={partnerData.socialLinks.linkedin} />
          </View>

          {partnerData.bio && (
            <View style={tw`mt-6 p-4 bg-gray-50 rounded-xl`}>
              <Text style={tw`text-gray-700 leading-6`}>{partnerData.bio}</Text>
            </View>
          )}

          <View style={tw`mt-6`}>
            {partnerData.age > 0 && (
              <DetailRow icon="cake" label="Age" value={`${partnerData.age} years`} />
            )}
            {partnerData.gender && (
              <DetailRow icon="person" label="Gender" value={partnerData.gender } />
            )}
            {partnerData.address && (
              <DetailRow icon="location-on" label="Location" value={partnerData.address} />
            )}
          </View>

          <View style={tw`mt-6 gap-3`}>
          <TouchableOpacity
              style={tw.style(
                `flex-row items-center justify-center p-4 bg-purple-600 rounded-xl`,
                Platform.select({ web: { cursor: 'pointer' } })
              )}
              onPress={() => navigation.navigate("PartnerInfo")}
            >
              <Text style={tw`text-white font-bold ml-2`}>Partner Informations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                `flex-row items-center justify-center p-4 bg-blue-600 rounded-xl`,
                Platform.select({ web: { cursor: 'pointer' } })
              )}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>Back to Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}