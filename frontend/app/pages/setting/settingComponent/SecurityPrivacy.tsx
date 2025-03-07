import React from 'react'
import tw from '../../../../tw'
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity,Text,View, ScrollView} from 'react-native'
import Footer from '../../../component/Footer'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SecurityPrivacy = () => {
    const navigation = useNavigation()
  return (
    <>
    {/* Content */}
  {/* <View style={tw`flex-1 bg-gray-900 justify-center items-center`}> */}
      {/* Logout Confirmation Card */}
      <ScrollView style={tw`flex-1 bg-gray-900 p-5 py-10`}>

          <TouchableOpacity
            style={tw`flex-row items-center p-6 border-b border-gray-700`}
            onPress={() => navigation.navigate('PasswordSec')}
          >
            <MaterialIcons name='password' size={24} color="white" style={tw`mr-4`} />
            <Text style={tw`text-white text-base flex-1`}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-6 border-b border-gray-700`}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <MaterialIcons name='password' size={24} color="white" style={tw`mr-4`} />
            <Text style={tw`text-white text-base flex-1`}>Forgot Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-6 border-b border-gray-700`}
            onPress={() => navigation.navigate('Logout')}
          >
            <MaterialIcons name='password' size={24} color="white" style={tw`mr-4`} />
            <Text style={tw`text-white text-base flex-1`}>Logout</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
          </ScrollView>
        
      {/* </View> */}
   
      <Footer />
      </>
      
  )
}

export default SecurityPrivacy
