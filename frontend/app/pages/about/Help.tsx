import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../component/Footer';

const Help = () => {
  const navigation = useNavigation();

  return (
    <>
    <ScrollView style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Help</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Need assistance with our app? Here’s how you can get help and resolve common issues.
      </Text>
      
      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>1. Common Issues</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        - **Login Problems**: Ensure your credentials are correct. Reset your password if needed via the "Forgot Password" link.
        - **App Crashes**: Update to the latest version of the app or contact support.
        - **Feature Access**: Check your account settings or subscription status.
      </Text>

      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>2. Contact Support</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Reach out to our support team at support@yourapp.com or call us at +1-800-123-4567. We’re available 24/7.
      </Text>

      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>3. FAQs</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Visit our FAQ page for quick answers to common questions. You can access it via the "Help" button in the settings.
      </Text>

      <TouchableOpacity
        style={tw`bg-blue-600 p-3 rounded-lg items-center shadow-md mt-4`}
        onPress={() => navigation.navigate('ContactSupport')} // Optional: Navigate to a contact form
      >
        <Text style={tw`text-white font-medium`}>Contact Support</Text>
      </TouchableOpacity>

      <Text style={tw`text-gray-500 text-sm mt-4`}>
        For more detailed assistance, refer to our Policies or About Us sections.
      </Text>
    </ScrollView>
    <Footer/>
    </>
  );
};

export default Help;