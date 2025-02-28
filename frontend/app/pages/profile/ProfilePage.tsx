import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

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
import { BASE_URL } from "@env";

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

function ProfilePage(){
  const navigation = useNavigation();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [moodModalVisible, setMoodModalVisible] = useState(false);
  const [socialMediaModalVisible, setSocialMediaModalVisible] = useState(false);
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
      tiktok: " ",
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
  const [socialMediaData, setSocialMediaData] = useState({
    facebook: "",
    tiktok: "",
    instagram: "",
    linkedin: ""
  });
  const moodOptions = ["Happy ", "Sad ", "Angry ", "Calm ", "Excited ", "Bored ", "Romantic"];

  const statApi = async()=>{
      const res = await axios.patch(`${BASE_URL}/user/updateStat`);
  
    }
  useEffect(() => {
    fetchUserProfile();
    statApi();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("Login");
        return;
      }

      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data?.user;
      setUserData({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl ? `${BASE_URL}/${user.photoUrl}` : DEFAULT_PROFILE_IMAGE,
        coverUrl: DEFAULT_COVER_IMAGE,
        bio: user.bio || "",
        mood: user.mood || "",
        gender: user.gender || "male",
        age: user.age || 0,
        address: user.address || "",
        stats: {
          photos: user.stats?.photos,
          timelines: user.stats?.timeline,
          diaries: user.stats?.diaries
        },
        socialLinks: {
          facebook: user.socialMedia?.facebook || "",
          tiktok: user.socialMedia?.tiktok || "",
          instagram: user.socialMedia?.instagram || "",
          linkedin: user.socialMedia?.linkedin || ""
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
    if (url && url.trim() !== " ") {
      Linking.openURL(url);
    }
  };


  const handleChangeProfilePic = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
  
    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
    });
  
    if (!result.canceled) {
      // Update profile picture URL
      setUserData((prev) => ({ ...prev, photoUrl: result.assets[0].uri }));
  
      // If you need to upload the image to your backend
      const formData = new FormData();
      formData.append("profilePicture", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

        formData.append('photoUrl', {
          uri: imageUri,
          name: fileName || `profile-pic-${Date.now()}.${fileType}`,
          type: `image/${fileType}`,
        });
  
        // Upload image to server
        const response = await axios.patch(
          `${BASE_URL}/user/editProfilePic`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        // Update local state with new photo URL
        const newPhotoUrl = response.data.user?.photoUrl || `profile-pic-${Date.now()}.${fileType}`;
        setUserData(prev => ({
          ...prev,
          photoUrl: `${newPhotoUrl}`
        }));
  
        alert('Profile picture updated successfully!');
      }
    }
  

  const openSocialMediaModal = () => {
    setSocialMediaData({ ...userData.socialLinks });
    setSocialMediaModalVisible(true);
  };

  const handleUpdateSocialMedia = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${BASE_URL}/user/updateSocialMediaLinks`,
        socialMediaData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setUserData(prev => ({
        ...prev,
        socialLinks: { ...socialMediaData }
      }));
      setSocialMediaModalVisible(false);
    } catch (error) {
      console.error("Error updating social media links:", error);
      alert("Failed to update social media links");
    }
  };

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <View style={tw`items-center`}>
      <Text style={tw`text-xl font-bold text-gray-800`}>{value } </Text>
      <Text style={tw`text-sm text-gray-600 mt-1`}>{label + " "}</Text>
    </View>
  );

  const SocialButton = ({ icon, color, url }: { icon: string; color: string; url: string }) => (
    <TouchableOpacity
      style={tw.style(`w-11 h-11 rounded-full justify-center items-center`, 
        { backgroundColor: color },
        Platform.select({ web: { cursor: url && url.trim() !== " " ? 'pointer' : 'default' } }),
        (!url || url.trim() === " ") && 'opacity-50'
      )}
      onPress={() => handleSocialLink(url)}
      disabled={!url || url.trim() === " "}
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
        `${BASE_URL}/user/updateProfile`,
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
        `${BASE_URL}/user/updateMood`,
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
            <Text style={tw`text-2xl font-bold text-gray-800`}>{userData.name}</Text>
            <Text style={tw`text-gray-600 mt-1`}>{userData.email + " "}</Text>
            {userData.mood && (
              <TouchableOpacity
                style={tw`flex-row items-center mt-2`}
                onPress={() => setMoodModalVisible(true)}
              >
                <MaterialIcons name="mood" size={20} color="#10B981" />
                <Text style={tw`text-green-600 ml-1`}>{userData.mood + " "}</Text>
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
            <SocialButton icon="twitter" color="#000000" url={userData.socialLinks.tiktok} />
            <SocialButton icon="instagram" color="#E4405F" url={userData.socialLinks.instagram} />
            <SocialButton icon="linkedin" color="#0A66C2" url={userData.socialLinks.linkedin} />
          </View>

          <TouchableOpacity
            style={tw`mt-4 flex-row items-center justify-center p-3 bg-purple-600 rounded-xl`}
            onPress={openSocialMediaModal}
          >
            <MaterialIcons name="link" size={24} color="white" />
            <Text style={tw`text-white font-bold ml-2`}>Edit Social Links</Text>
          </TouchableOpacity>

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

      {/* Edit Profile Modal */}
      <Modal visible={editProfileModal} transparent={true} onDismiss={() => setEditProfileModal(false)}>
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`bg-white p-5 w-11/12 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Edit Profile</Text>
            {/* ... Existing edit profile modal content ... */}
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
                <Text style={tw`text-white`}>Save</Text>
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
            {moodOptions.map((moood) => (
              <TouchableOpacity
                key={moood}
                style={tw`py-2 px-4 mb-2 rounded-lg bg-gray-100 ${userData.mood === moood ? 'bg-blue-100' : ''}`}
                onPress={() => handleUpdateMood(moood)}
              >
                <Text style={tw`text-gray-800 ${userData.mood === moood ? 'font-bold text-blue-600' : ''}`}>
                  {moood}
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

      {/* Social Media Links Modal */}
      <Modal 
        visible={socialMediaModalVisible} 
        transparent={true} 
        onDismiss={() => setSocialMediaModalVisible(false)}
      >
        <View style={tw`flex justify-center items-center`}>
          <View style={tw`bg-white p-5 w-11/12 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>Edit Social Media Links</Text>

            <Text style={tw`text-gray-600`}>Facebook</Text>
            <TextInput
              value={socialMediaData.facebook}
              onChangeText={(text) => setSocialMediaData({ ...socialMediaData, facebook: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter Facebook URL"
            />

            <Text style={tw`text-gray-600 mt-4`}>TikTok</Text>
            <TextInput
              value={socialMediaData.tiktok}
              onChangeText={(text) => setSocialMediaData({ ...socialMediaData, tiktok: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter TikTok URL"
            />

            <Text style={tw`text-gray-600 mt-4`}>Instagram</Text>
            <TextInput
              value={socialMediaData.instagram}
              onChangeText={(text) => setSocialMediaData({ ...socialMediaData, instagram: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter Instagram URL"
            />

            <Text style={tw`text-gray-600 mt-4`}>LinkedIn</Text>
            <TextInput
              value={socialMediaData.linkedin}
              onChangeText={(text) => setSocialMediaData({ ...socialMediaData, linkedin: text })}
              style={tw`border p-2 rounded-lg mt-1`}
              placeholder="Enter LinkedIn URL"
            />

            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-gray-400 rounded-lg mr-2`}
                onPress={() => setSocialMediaModalVisible(false)}
              >
                <Text style={tw`text-white`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-blue-600 rounded-lg`}
                onPress={handleUpdateSocialMedia}
              >
                <Text style={tw`text-white`}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


export default ProfilePage;
