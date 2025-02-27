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
import DiaryPartner from "./PartnerComponent.tsx/DiaryPartner";
import RemindersPartner from "./PartnerComponent.tsx/RemainderPartner";
import TimelinePartner from "./PartnerComponent.tsx/TimelinePartner";
import PhotoPartner from "./PartnerComponent.tsx/PhotoPartner";
import VideoGalleryPartner from "./PartnerComponent.tsx/VideoPartner";
import AddressPartner from "./PartnerComponent.tsx/AddressPartner";
const PartnerInfo= ()=>  {
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
  },[navigation]);
  

  const [selectedSection, setSelectedSection] = useState("diary");

  const sections = [
    { id: "diary", title: "Diary ", icon: "book" },
    { id: "remind", title: "Remind  ", icon: "watch" },
    { id: "timeline", title: "Timeline ", icon: "timeline" },
    { id: "photos", title: "Photos ", icon: "photo-library" },
    { id: "videos", title: "Videos ", icon: "video-library" },
    { id: "address", title: "Address ", icon: "map" },

  ];

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-row justify-around bg-gray-200 py-2`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id }
            style={[tw`p-3`,selectedSection === section.id && tw`border-b-2 border-blue-500`,]}
            onPress={() => setSelectedSection(section.id)}>
            <MaterialIcons name={section.icon } size={30} color="gray" />
            <Text style={tw`text-center text-gray-700`}>
              {section.title }
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>


      {/* Content Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`p-2`}>
        {selectedSection === "diary" && <> < DiaryPartner/> </>}
        {selectedSection === "remind" && <> <RemindersPartner /> </>}
        {selectedSection === "timeline" && <> <TimelinePartner /> </>}
        {selectedSection === "photos" && <> <PhotoPartner/> </>}
        {selectedSection === "videos" && <> <VideoGalleryPartner /> </>}
        {selectedSection === "address" && <><AddressPartner/></>}

      </ScrollView>
      <Footer />
    </View>
  );
};

export default PartnerInfo