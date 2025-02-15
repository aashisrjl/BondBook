import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import tw from '../../../tw';
import Footer from '../../component/Footer';
import { useNavigation } from '@react-navigation/native';
export function AboutPage() {
  const navigation = useNavigation();
  const features = [
    {
      icon: 'heart',
      title: 'Connect with Your Partner',
      description: 'Stay connected with your loved one through our intimate sharing platform',
    },
    {
      icon: 'camera',
      title: 'Share Moments',
      description: 'Capture and share special moments, photos, and videos privately',
    },
    {
      icon: 'calendar',
      title: 'Daily Updates',
      description: 'Share your daily experiences, thoughts, and feelings with each other',
    },
    {
      icon: 'lock',
      title: 'Private & Secure',
      description: 'Your relationship data is private and secure, shared only between you and your partner',
    },
  ];
  return (
    <>
      <SafeAreaView style={tw`flex-1 bg-[#F8FAFC]`}>
        <ScrollView style={tw`flex-1`}>
          {/* Hero Section */}
          <View style={tw`bg-[#F8FAFC] px-6 py-12`}>
            <View style={tw`items-center mb-6`}>
              <Ionicons name="heart" size={48} color="#64748B" style={tw`mb-4`} />
              <Text style={tw`text-3xl font-bold text-black text-center`}>
                Welcome to <Text style={tw`text-blue-600`}>BondBook </Text>
              </Text>
              <Text style={tw`text-lg text-gray-600 text-center px-4`}>
                Strengthening relationships through meaningful digital connections.
              </Text>
            </View>
          </View>
          {/* Features Section */}
          <View style={tw`px-6 py-8`}>
            <Text style={tw`text-2xl font-bold text-black mb-6 text-center`}>
              Why Choose BondBook?
            </Text>
            <View style={tw` gap-2`}>
              {features.map((feature, index) => (
                <View key={index} style={tw`bg-white rounded-lg p-4 shadow-md`}>
                  <View style={tw`flex-row items-center mb-3`}>
                    <View style={tw`w-10 h-10 bg-slate-200 rounded-full items-center justify-center mr-3`}>
                      <Ionicons name={feature.icon} size={20} color="#64748B" />
                    </View>
                    <Text style={tw`text-lg font-semibold text-black`}>{feature.title}</Text>
                  </View>
                  <Text style={tw`text-gray-600 ml-12`}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Mission Section */}
          <View style={tw`bg-white mx-6 px-6 py-8 rounded-2xl shadow-md`}>
            <Text style={tw`text-2xl font-bold text-black mb-4 text-center`}>
              Our Mission
            </Text>
            <Text style={tw`text-gray-600 text-center leading-6`}>
              BondBook is dedicated to helping couples maintain strong, intimate connections
              in our digital age. We believe technology should bring partners closer together,
              making it easier to share life's precious moments.
            </Text>
          </View>
          {/* Get Started Section */}
          <View style={tw`px-6 py-8`}>
            <View style={tw`bg-white rounded-xl p-6 items-center shadow-md`}>
              <Text style={tw`text-xl font-bold text-black mb-3 text-center`}>
                Ready to Strengthen Your Bond?
              </Text>
              <TouchableOpacity style={tw`bg-slate-200 px-6 py-3 rounded-full`}onPress={()=>{navigation.navigate('Register')}} >
                <Text style={tw`text-slate-700 font-semibold`}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Footer */}
          <View style={tw`bg-white px-6 py-6 rounded-t-2xl`}>
            <Text style={tw`text-center text-gray-500 text-sm`}>
              © 2025 BondBook. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Footer />
    </>
  );
}
export default AboutPage;