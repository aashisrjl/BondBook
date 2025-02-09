import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const Footer = () => {
  return (
    <View className="flex-row justify-around mt-10 p-4 border-t border-gray-300 mt-auto">
    <TouchableOpacity className="items-center">
    <Link href="/">
      <Ionicons name="home" size={35} color="black" />
    </Link>
    </TouchableOpacity>

    <TouchableOpacity className="items-center">
    <Link href="../about">
      <Ionicons name="information-circle" size={35} color="black" />
    </Link>
    </TouchableOpacity>


    <TouchableOpacity className="items-center">
      <Link href="../setting/settingPage">
      <Ionicons name="settings" size={35} color="black" />
      </Link>
    </TouchableOpacity>

    <TouchableOpacity className="items-center">
     <Link href="../profile">
     <Ionicons name="person" size={35} color="black" />
     </Link>
    </TouchableOpacity>
  </View>
  )
}

export default Footer
