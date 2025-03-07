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
    { id: "diary", title: "Diary", icon: "book" },
    { id: "reminders", title: "Reminders", icon: "watch" },
    { id: "timeline", title: "Timeline", icon: "timeline" },
    { id: "photos", title: "Photos", icon: "photo-library" },
    { id: "videos", title: "Videos", icon: "video-library" },
    { id: "music", title: "Music", icon: "music-note" },
    { id: "address", title: "Address", icon: "map" },
  ];

  return (
    <View style={tw`flex-1 bg-gray-900`}>
     
      {/* Search Section inspired by the Hub app */}
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

      {/* Section Navigation */}
      <ScrollView
      vertical
        showsVerticalScrollIndicator={false}
        style={tw`flex bg-gray-800 p-6`}
      >
        <Text style={tw`text-white font-bold text-2xl p-2`}> Home Services </Text>

        <View style={tw`flex-row justify-between p-1`}>
        <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnerdiary')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl `}>
            <MaterialIcons  name='book' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Diary </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnerreminders')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl ml-4 `}>
            <MaterialIcons  name='watch' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Reminders  </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnertimeline')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl ml-4 `}>
            <MaterialIcons  name='timeline' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Timelines  </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnersurprise')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl ml-4 `}>
            <MaterialIcons  name='mood' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Surprises  </Text>
          </TouchableOpacity>

        </View>

        <Text style={tw`text-white font-bold text-2xl p-2 mt-10`}> Media </Text>

        <View style={tw`flex-row gap-6`}>
        <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnerphotos')}
          >
            <View style={tw`items-center`}>
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl `}>
            <MaterialIcons  name='photo' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2`}>Photos </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnervideos')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl  `}>
            <MaterialIcons  name='video-library' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Videos  </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partnermusic')}
          >
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl  `}>
            <MaterialIcons  name='music-note' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Musics  </Text>
          </TouchableOpacity>
        </View>

      {/* address */}
        <Text style={tw`text-white font-bold text-2xl p-2 mt-10`}> Address </Text>
        <View style={tw`flex-row gap-6`}>
        <TouchableOpacity
            style={tw`p-2 mt-4 items-left `}
            onPress={() => navigation.navigate('partneraddress')}
          >
            <View style={tw`items-center`}>
            <View style={tw`flex justify-center items-center bg-white h-20 w-20 rounded-2xl `}>
            <MaterialIcons  name='map' size={30} color="black" />
            </View>
            <Text style={tw`text-white font-bold text-xl text-left mt-2 pl-2`}>Map </Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default PartnerInfo;