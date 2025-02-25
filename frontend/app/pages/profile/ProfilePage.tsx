import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Modal, TextInput } from "react-native-paper";
import { router } from "expo-router";
import axios from "axios";

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
const BASE_URL = 'http://192.168.1.81:3000'

function ProfilePage() {
  const navigation = useNavigation();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [moodModalVisible, setMoodModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: " ",
    email: " ",
    photoUrl: DEFAULT_PROFILE_IMAGE,
    coverUrl: DEFAULT_COVER_IMAGE,
    bio: " ",
    mood: " ",
    gender: " ",
    age: 0,
    address: " ",
    stats: {
      photos: 0,
      timelines: 0,
      diaries: 0
    },
    socialLinks: {
      facebook: " ",
      twitter: " ",
      instagram: " ",
      linkedin: " "
    }
  });
  const [editData, setEditData] = useState({ 
    name: "", 
    bio: "", 
    age: "",
    address: ""
  });
  const moodOptions = ["Happy ", "Sad ", "Angry ", "Calm ", "Excited ", "Bored ", "Romantic"];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("Login");
        return;
      }

      const response = await axios.get(BASE_URL+ "/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user;
      setUserData({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl ? `${BASE_URL}/${user.photoUrl}` : DEFAULT_PROFILE_IMAGE,
        coverUrl: DEFAULT_COVER_IMAGE,
        bio: user.bio || "",
        mood: user.mood || "",
        gender: user.gender || "male", // Not provided in API response
        age: user.age || 0,
        address: user.address || "",
        stats: { // These aren't in the API response, so we'll keep them as 0
          photos: 0,
          timelines: 0,
          diaries: 0
        },
        socialLinks: {
          facebook: user.socialMedia.facebook || "",
          twitter:  "", // Not in API response
          instagram: user.socialMedia.instagram || "",
          linkedin: user.socialMedia.linkedin || ""
        }
      });

    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleChangeProfilePic = () => {
    console.log("Opening image picker to change profile picture");
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

  const openEditModal = () => {
    setEditData({ 
      name: userData.name, 
      bio: userData.bio, 
      age: userData.age.toString(),
      address: userData.address
    });
    setEditProfileModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const updateData = {
        name: editData.name,
        age: parseInt(editData.age),
        address: editData.address,
        bio: editData.bio
      };

      const response = await axios.patch(
        BASE_URL+"/user/updateProfile",
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user || {};
      setUserData(prevData => ({
        ...prevData,
        name: updatedUser.name || editData.name,
        age: updatedUser.age || parseInt(editData.age),
        address: updatedUser.address || editData.address,
        bio: updatedUser.bio || editData.bio
      }));

      setEditProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleUpdateMood = async (newMood: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        BASE_URL+"/user/updateMood",
        { mood: newMood },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setUserData(prev => ({ ...prev, mood: newMood }));
      setMoodModalVisible(false);
    } catch (error) {
      console.error("Error updating mood:", error);
      alert("Failed to update mood");
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: userData.coverUrl }} style={tw`w-full h-48`} />
        <View style={tw`-mt-16 bg-white rounded-t-3xl px-5 pt-0 pb-6`}>
          <View style={tw`relative`}>
            <Image 
              source={{ uri: userData.photoUrl }} 
              style={tw`w-32 h-32 rounded-full border-4 border-white mx-auto -mt-16`}
            />
            <TouchableOpacity
              style={tw`absolute bottom-0 right-1/3 w-10 h-10 bg-blue-600 rounded-full justify-center items-center`}
              onPress={handleChangeProfilePic}
            >
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={tw`items-center mt-3`}>
            <Text style={tw`text-2xl font-bold text-gray-800`}>{userData.name }</Text>
            <Text style={tw`text-gray-600 mt-1`}>{userData.email }</Text>
            {userData.mood && (
              <TouchableOpacity
                style={tw`flex-row items-center mt-2`}
                onPress={() => setMoodModalVisible(true)}
              >
                <MaterialIcons name="mood" size={20} color="#10B981" />
                <Text style={tw`text-green-600 ml-1`}>{userData.mood + " " }</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={tw`flex-row justify-around mt-6 py-5 border-t border-b border-gray-200`}>
            <StatBox label="photos" value={userData.stats.photos} />
            <StatBox label="Timelines" value={userData.stats.timelines} />
            <StatBox label="Diaries" value={userData.stats.diaries} />
          </View>

          <View style={tw`flex-row justify-around mt-6`}>
            <SocialButton icon="facebook" color="#1877F2" url={userData.socialLinks.facebook} />
            <SocialButton icon="twitter" color="#1DA1F2" url={userData.socialLinks.twitter} />
            <SocialButton icon="instagram" color="#E4405F" url={userData.socialLinks.instagram} />
            <SocialButton icon="linkedin" color="#0A66C2" url={userData.socialLinks.linkedin} />
          </View>

          {userData.bio && (
            <View style={tw`mt-6 p-4 bg-gray-50 rounded-xl`}>
              <Text style={tw`text-gray-700 leading-6`}>{userData.bio}</Text>
            </View>
          )}

          <View style={tw`mt-6`}>
            {userData.age > 0 && (
              <DetailRow icon="cake" label="Age" value={`${userData.age} years`} />
            )}
            {userData.gender && (
              <DetailRow icon="person" label="Gender" value={userData.gender} />
            )}
            {userData.address && (
              <DetailRow icon="location-on" label="Location" value={userData.address} />
            )}
          </View>

          <View style={tw`mt-6 gap-3`}>
            <TouchableOpacity
              style={tw.style(
                `flex-row items-center justify-center p-4 bg-blue-600 rounded-xl`,
                Platform.select({ web: { cursor: 'pointer' } })
              )}
              onPress={() => navigation.navigate("Partner")}
            >
              <MaterialIcons name="group" size={24} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>Inspect Partner</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw.style(
                `flex-row items-center justify-center p-4 bg-gray-700 rounded-xl`,
                Platform.select({ web: { cursor: 'pointer' } })
              )}
              onPress={() => openEditModal()}
            >
              <MaterialIcons name="edit" size={24} color="white" />
              <Text style={tw`text-white font-bold ml-2`}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal visible={editProfileModal} transparent={true} onDismiss={() => setEditProfileModal(false)}>
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`bg-white p-5 w-11/12 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Edit Profile</Text>

            <Text style={tw`text-gray-600`}>Name</Text>
            <TextInput
              value={editData.name}
              onChangeText={(text) => setEditData({ ...editData, name: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter name"
            />

            <Text style={tw`text-gray-600 mt-4`}>Bio</Text>
            <TextInput
              value={editData.bio}
              onChangeText={(text) => setEditData({ ...editData, bio: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter bio"
              multiline
            />

            <Text style={tw`text-gray-600 mt-4`}>Age</Text>
            <TextInput
              value={editData.age}
              onChangeText={(text) => setEditData({ ...editData, age: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter age"
              keyboardType="numeric"
            />

            <Text style={tw`text-gray-600 mt-4`}>Address</Text>
            <TextInput
              value={editData.address}
              onChangeText={(text) => setEditData({ ...editData, address: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter address"
            />


            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-gray-400 rounded-lg mr-2`}
                onPress={() => setEditProfileModal(false)}
              >
                <Text style={tw`text-white`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-blue-600 rounded-lg`}
                onPress={handleSaveProfile}
              >
                <Text style={tw`text-white`}>Save </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Mood Selection Modal */}
      <Modal 
        visible={moodModalVisible} 
        transparent={true} 
        onDismiss={() => setMoodModalVisible(false)}
      >
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`bg-white p-5 w-3/4 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Select Mood</Text>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={tw`py-2 px-4 mb-2 rounded-lg bg-gray-100 ${userData.mood === mood ? 'bg-blue-100' : ''}`}
                onPress={() => handleUpdateMood(mood)}
              >
                <Text style={tw`text-gray-800 ${userData.mood === mood ? 'font-bold text-blue-600' : ''}`}>
                  {mood}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={tw`mt-4 px-4 py-2 bg-gray-400 rounded-lg self-end`}
              onPress={() => setMoodModalVisible(false)}
            >
              <Text style={tw`text-white`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePage;