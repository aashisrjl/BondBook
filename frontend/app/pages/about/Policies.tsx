import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import Footer from '../../component/Footer'


const Policies = () => {
  return (
    <>
    <ScrollView style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>Policies</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Welcome to our Policies page. Here, you can find detailed information about our app’s policies to ensure transparency and compliance with user expectations.
      </Text>
      
      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>1. Data Privacy Policy</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        We are committed to protecting your personal information. We collect data only with your consent and use it to enhance your experience. Your data is securely stored and not shared with third parties without explicit permission.
      </Text>

      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>2. Usage Policy</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Users must use the app responsibly and in accordance with local laws. Any misuse, including unauthorized access or spam, may result in account suspension or termination.
      </Text>

      <Text style={tw`text-xl font-semibold mb-2 text-gray-800`}>3. Refund Policy</Text>
      <Text style={tw`text-gray-600 mb-4`}>
        Refunds are available within 30 days of purchase for any unused services, subject to our review. Please contact our support team for assistance.
      </Text>

      <Text style={tw`text-gray-500 text-sm mt-4`}>
        For more details or specific inquiries, please contact us via the Help section or email us at support@yourapp.com.
      </Text>
    </ScrollView>
    <Footer/>
    </>
  );
};

export default Policies;