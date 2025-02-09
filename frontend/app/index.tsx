import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-between">
      {/* Header */}
      <View className="bg-white p-4 shadow-md ">
      <Text className="bg-blue-400 text-white text-center p-[150px] text-lg font-bold rounded-full ">
        WELCOME TO HOME SCREEN
      </Text>
      </View>

      

      {/* Instruction Section */}
      <View className="px-5 items-center border-b-4 pb-5 border-green-800">
        <Text className="text-center text-lg mb-2">Did you have an Account? </Text>
        <Text className="text-center text-lg mb-2">
          Click Login, if you have an account already.
        </Text>
        <Text className="text-center text-lg">Otherwise, click Register</Text>
      </View>
      {/* Links Section */}
      <View className="flex flex-row justify-between  px-10">
        <Link
          className="p-4 bg-green-500 w-[130px] rounded-lg text-white text-center font-medium"
          href="/auth/Login"
        >
          LOGIN
        </Link>
        <Link
          className="p-4 bg-blue-500 w-[160px] rounded-lg text-white text-center font-medium"
          href="/auth/Register"
        >
          REGISTER NOW
        </Link>
      </View>
      {/* // checking the link */}
      <Link href="/about"> Go to about page</Link>

      {/* Footer */}
      <View className="bg-pink-700 p-4">
        <Text className="text-center text-white font-bold">
          @all rights reserved @aashisrijal
        </Text>
      </View>
    </View>
  );
}
