import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Email from 'react-native-email-link'; // Import react-native-email-link
import Footer from '../../component/Footer';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Prepare the email content
    const emailBody = `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      
      Message:
      ${formData.message}
    `;

    // Use react-native-email-link to open the default email client
    Email.open(['aashisrijal252@gmail.com']) // Replace with your support email
      .then(() => {
        Alert.alert('Success', 'Support request sent successfully');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      })
      .catch((err) => {
        setError('Failed to open email client. Please ensure an email app is configured on your device.');
        Alert.alert('Error', err.message || err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ScrollView style={tw`flex-1 p-4 bg-white rounded-xl shadow-md`}>
        <Text style={tw`text-2xl font-bold mb-6 text-gray-800`}>Contact Support</Text>
        
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Name</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            autoCapitalize="words"
          />
          
          <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Email</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Subject</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50`}
            placeholder="Enter subject"
            value={formData.subject}
            onChangeText={(text) => handleChange('subject', text)}
          />
          
          <Text style={tw`text-base font-medium mb-2 text-gray-700`}>Message</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50 h-24`}
            placeholder="Enter your message"
            value={formData.message}
            onChangeText={(text) => handleChange('message', text)}
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity 
            style={tw`bg-blue-600 p-3 rounded-lg items-center shadow-md ${loading ? 'opacity-50' : ''}`}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={tw`text-white font-medium`}>
              {loading ? 'Sending...' : 'Send Request'}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text style={tw`text-red-600 text-center mt-2`}>{error}</Text>
          )}
        </View>

        <Text style={tw`text-gray-500 text-sm mt-4`}>
          You can also reach us at aashisrijal252@gmail.com or +977 9847749997.
        </Text>
      </ScrollView>
      <Footer />
    </>
  );
};

export default ContactSupport;