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
import tw from 'twrnc';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Footer from "./component/Footer"; // Add the Footer component if needed

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={tw`flex-1 ${darkMode ? "bg-black" : "bg-white"}`}>
      <ScrollView style={tw`flex-grow p-6`}>
        {/* Header */}
        <View style={tw`items-center mb-8 mt-4`}>
          <Text style={tw`text-4xl font-bold text-blue-800 mt-5`}>
            My BondBook
          </Text>
          <Text style={tw`text-sm text-red-600`}>
            Oops! You haven't shared BondBook to anyone yet!!
          </Text>
        </View>

        {/* Add Someone Section */}
        <View style={tw`mb-14`}>
          <TextInput
            placeholder="Add someone..."
            style={tw`border border-gray-300 rounded-md p-3`}
          />
          <Text style={tw`p-2`}>Invite your partner by email address!</Text>
        </View>

        {/* Suggestion Section */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-lg font-semibold mb-5`}>Suggestion</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex-row gap-4`}>
              {[...Array(4)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`w-[150px] bg-gray-100 rounded-lg shadow-lg p-3`}
                >
                  <Image
                    source={require("./assets/logo.png")}
                    style={tw`w-full h-32 rounded-md`}
                  />
                  <Text style={tw`text-center mt-2`}>Young and Beautiful</Text>
                  <Text style={tw`text-center text-sm`}>Lana Del Rey</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Add Moments Section */}
        <View style={tw`mb-5 mt-10`}>
          <Text style={tw`text-xl p-3`}>Interact Directly from here</Text>
          <View style={tw`mt-10 flex-row justify-around`}>
            <TouchableOpacity style={tw`items-center`}>
              <MaterialIcons name="note" size={70} color="green" />
              <Text style={tw`font-bold`}>Add Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <Ionicons name="musical-notes" size={70} color="green" />
              <Text style={tw`font-bold`}>Add Music</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <MaterialIcons name="photo" size={70} color="green" />
              <Text style={tw`font-bold`}>Add Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <MaterialIcons name="videocam" size={70} color="green" />
              <Text style={tw`font-bold`}>Add Video</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login & Register Buttons */}
        <View style={tw`pb-20 flex-col justify-center items-center mt-14`}>
          <TouchableOpacity style={tw`w-[95%]`}>
            <Link
              href="./auth/Login"
              style={tw`bg-green-600 p-6 rounded-2xl text-center text-2xl text-white`}
            >
              <MaterialIcons name="login" size={20} /> Login
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={tw `w-[95%] mt-4` }>
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
    < Footer />
    </View>
  );
}
