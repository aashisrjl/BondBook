import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import tw from '../../../tw';
import Footer from '../../component/Footer';
import { useNavigation } from '@react-navigation/native';

export function FAQ() {
    const navigation = useNavigation();
  const faqs = [
    {
      question: 'What is BondBook?',
      answer:
        'BondBook is a private platform designed to help couples strengthen their relationship by sharing moments, daily updates, and intimate thoughts in a secure, digital space.',
    },
    {
      question: 'How is BondBook different from other social apps?',
      answer:
        'Unlike general social media, BondBook is exclusively for you and your partner. It’s a private space with no public sharing, focused on deepening your connection.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes! Privacy is our priority. All your data is encrypted and shared only between you and your partner, with no third-party access.',
    },
    {
      question: 'What can I share on BondBook?',
      answer:
        'You can share photos, videos, daily thoughts, and special moments. Think of it as a digital scrapbook just for the two of you.',
    },
    {
      question: 'Do I need to pay to use BondBook?',
      answer:
        'BondBook offers a free version with core features. We also have premium plans for additional functionalities like unlimited storage or custom themes.',
    },
    {
      question: 'Can I use BondBook on multiple devices?',
      answer:
        'Yes, BondBook syncs across your devices so you and your partner can stay connected wherever you are.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply download the app, create an account, and invite your partner to join you in your private BondBook space!',
    },
    {
      question: 'What if I have issues with the app?',
      answer:
        'Our support team is here to help! Reach out to us via the app or email us at support@bondbookapp.com.',
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-900 text-white`}>
      <ScrollView style={tw`flex-1`}>
        {/* Header Section */}
        <View style={tw`bg-gray-900 px-6 py-12`}>
          <View style={tw`items-center mb-6`}>
            {/* <Ionicons name="help-circle" size={48} color="#64748B" style={tw`mb-4`} /> */}
            <Text style={tw`text-3xl font-bold text-white text-center`}>
              Frequently Asked Questions
            </Text>
            <Text style={tw`text-lg text-gray-400 text-center px-4`}>
              Everything you need to know about BondBook.
            </Text>
          </View>
        </View>

        {/* FAQ List */}
        <View style={tw`px-6 py-8`}>
          <View style={tw`space-y-6`}>
            {faqs.map((faq, index) => (
              <View key={index} style={tw`bg-blue-300 rounded-lg p-4 shadow-md mb-4`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <Ionicons name="chatbubble-outline" size={20} color="#64748B" />
                  <Text style={tw`text-lg font-semibold text-black flex-1`}>
                    {faq.question}
                  </Text>
                </View>
                <Text style={tw`text-gray-600 mt-2 ml-8`}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={tw`px-6 py-8`}>
          <View style={tw`bg-green-400 rounded-xl p-6 items-center shadow-md`}>
            <Text style={tw`text-xl font-bold text-black mb-3 text-center`}>
              Still Have Questions?
            </Text>
            <TouchableOpacity style={tw`bg-slate-200 px-6 py-3 rounded-full`}
            onPress = {() => {navigation.navigate('ContactSupport')}}>
                
              <Text style={tw`text-slate-700 font-semibold`}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

       
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

export default FAQ;