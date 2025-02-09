import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className={`flex-1 ${darkMode ? "bg-black" : "bg-white"}`}>
      <ScrollView className="flex-grow bg-white p-6">
        {/* Header */}
        <View className="items-center mb-8 mt-4">
          <Text className="text-4xl font-bold text-blue-800 mt-5">
            My BondBook
          </Text>
          <Text className="text-sm text-red-600">
            Oops! You haven't shared BondBook to anyone yet!!
          </Text>
        </View>

        {/* Add Someone Section */}
        <View className="mb-14">
          <TextInput
            placeholder="Add someone..."
            className="border border-gray-300 rounded-md p-3"
          />
          <Text className="p-2">Invite your partner by email address!</Text>
        </View>

        {/* Suggestion Section */}
        <View className="mb-5">
          <Text className="text-lg font-semibold mb-5">Suggestion</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {[...Array(4)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3"
                >
                  <Image
                    source={require("./assets/logo.png")}
                    className="w-full h-32 rounded-md"
                  />
                  <Text className="text-center mt-2">Young and Beautiful</Text>
                  <Text className="text-center text-sm">Lana Del Rey</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Add Moments Section */}
        <View className="mb-5 mt-10">
          <Text className="text-xl p-3">Interact Directly from here</Text>
          <View className="mt-10 flex-row justify-around">
            <TouchableOpacity className="items-center">
              <MaterialIcons name="note" size={70} color="green" />
              <Text className="font-bold">Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <Ionicons name="musical-notes" size={70} color="green" />
              <Text className="font-bold">Add Music</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <MaterialIcons name="photo" size={70} color="green" />
              <Text className="font-bold">Add Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <MaterialIcons name="videocam" size={70} color="green" />
              <Text className="font-bold">Add Video</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login & Register Buttons (Fixed for iPhone X) */}
        <View className="pb-20 flex-col justify-center items-center">
          <TouchableOpacity className="w-[95%]">
            <Link
              href="./auth/Login"
              className="bg-green-600 p-6 rounded-2xl text-center text-2xl text-white"
            >
              <MaterialIcons name="login" size={20} /> Login
            </Link>
          </TouchableOpacity>

          <TouchableOpacity className="w-[95%] mt-4">
            <Link
              href="./auth/Register"
              className="bg-blue-600 p-6 rounded-2xl text-center text-2xl text-white"
            >
              <MaterialIcons name="person-add" size={20} /> Register
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View className="flex-row justify-around p-4 border-t border-gray-300">
        <TouchableOpacity>
          <Link href="/">
            <Ionicons name="home" size={35} color="black" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="./about">
            <Ionicons name="information-circle" size={35} color="black" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="./setting">
            <Ionicons name="settings" size={35} color="black" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="./profile">
            <Ionicons name="person" size={35} color="black" />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
