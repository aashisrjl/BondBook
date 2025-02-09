import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className={`flex-1 ${darkMode ? "bg-black" : "bg-white"} p-6`}>
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
        <Text  className="p-2">Invite your partner by email address!</Text>
      </View>

      {/* Suggestion Section */}
      <View className={`mb-5 ${darkMode ? "bg-black" : "bg-white"} `}>
        <Text className="text-lg font-semibold mb-5">Suggestion</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row justify-center align-center gap-4">
            {/* Card 1 */}
            <TouchableOpacity className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3">
              <Image
                source={require("./assets/logo.png")}
                className="w-full h-32 rounded-md"
              />
              <Text className="text-center mt-2">Young and Beautiful</Text>
              <Text className="text-center text-sm">Lana Del Rey</Text>
            </TouchableOpacity>

            {/* Card 1 */}
            <TouchableOpacity className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3">
              <Image
                source={require("./assets/logo.png")}
                className="w-full h-32 rounded-md"
              />
              <Text className="text-center mt-2">Young and Beautiful</Text>
              <Text className="text-center text-sm">Lana Del Rey</Text>
            </TouchableOpacity>

            {/* Card 1 */}
            <TouchableOpacity className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3">
              <Image
                source={require("./assets/logo.png")}
                className="w-full h-32 rounded-md"
              />
              <Text className="text-center mt-2">Young and Beautiful</Text>
              <Text className="text-center text-sm">Lana Del Rey</Text>
            </TouchableOpacity>

            {/* Card 1 */}
            <TouchableOpacity className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3">
              <Image
                source={require("./assets/logo.png")}
                className="w-full h-32 rounded-md"
              />
              <Text className="text-center mt-2">Young and Beautiful</Text>
              <Text className="text-center text-sm">Lana Del Rey</Text>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity className="w-[150px] bg-gray-100 rounded-lg shadow-lg p-3">
              <Image
                source={require("./assets/logo.png")}
                className="w-full h-32 rounded-md"
              />
              <Text className="text-center mt-2">Do I Wanna Know</Text>
              <Text className="text-center text-sm">Arctic Monkeys</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Add Moments Section */}
      <View className={`mb-5  mt-10 ${darkMode ? "bg-black" : "bg-white"} `}>
        <Text className="text-xl p-3">Interact Directly from here</Text>
      <View
        className={`mt-10 flex-row justify-around ${
          darkMode ? "bg-black" : "bg-white"
        } `}
      >
        <TouchableOpacity className="items-center">
          <MaterialIcons name="note" size={70} color="green" />
          <Text className="font-bold">Add Note</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="musical-notes" size={70} color="green" />          
          <Text className="font-bold">Add music </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialIcons name="photo" size={70} color="green" />
          <Text className="font-bold">Add photo</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
        <MaterialIcons name="videocam" size={70} color="green" />
          <Text className="font-bold">Add photo</Text>
        </TouchableOpacity>

        
      </View>
      </View>

      {/* buttons */}
      <View className="mt-auto flex-col justify-center align-center">
        <TouchableOpacity className="flex-col justify-center align-center gap-5 ml">
          <Link
            href="./auth/Login"
            className="bg-green-600 p-6 rounded-2xl w-[95%] text-center text-2xl"
          >
           <MaterialIcons name="login" size={20} /> 
           Login{" "}
          </Link>
          <Link
            href="./auth/Register"
            className="bg-blue-600 p-6 rounded-2xl w-[95%] text-center text-2xl"
          >
            <MaterialIcons name="login" size={20} /> 
            Register{" "}
          </Link>
        </TouchableOpacity>
      </View>
    
      <View className="flex-row justify-around mt-10 p-4 border-t border-gray-300 mt-auto">
        <TouchableOpacity className="items-center">
        <Link href="/">
          <Ionicons name="home" size={35} color="black" />
        </Link>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
        <Link href="./about">
          <Ionicons name="information-circle" size={35} color="black" />
        </Link>
        </TouchableOpacity>


        <TouchableOpacity className="items-center">
          <Link href="./setting">
          <Ionicons name="settings" size={35} color="black" />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
         <Link href="./profile">
         <Ionicons name="person" size={35} color="black" />
         </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
