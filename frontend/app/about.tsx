import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import Footer from './component/Footer';

export function AboutPage() {
    const features = [
        {
            icon: 'heart',
            title: 'Connect with Your Partner',
            description: 'Stay connected with your loved one through our intimate sharing platform'
        },
        {
            icon: 'camera',
            title: 'Share Moments',
            description: 'Capture and share special moments, photos, and videos privately'
        },
        {
            icon: 'calendar',
            title: 'Daily Updates',
            description: 'Share your daily experiences, thoughts, and feelings with each other'
        },
        {
            icon: 'lock',
            title: 'Private & Secure',
            description: 'Your relationship data is private and secure, shared only between you and your partner'
        }
    ];

    return (
      <>
        <ScrollView style={tw`flex-1 bg-white`}>
            {/* Hero Section */}
            <View style={tw`bg-pink-50 px-4 py-12`}>
                <View style={tw`items-center mb-6`}>
                    <Icon name="heart" size={48} style={tw`text-pink-500 mb-4`} />
                    <Text style={tw`text-3xl font-bold text-gray-800 mb-2 text-center`}>
                        Welcome to BondBook
                    </Text>
                    <Text style={tw`text-lg text-gray-600 text-center px-4`}>
                        Strengthening relationships through meaningful digital connections
                    </Text>
                </View>
            </View>

            {/* Features Section */}
            <View style={tw`px-4 py-8`}>
                <Text style={tw`text-2xl font-bold text-gray-800 mb-6 text-center`}>
                    Why Choose BondBook?
                </Text>
                
                <View style={tw`space-y-6`}>
                    {features.map((feature, index) => (
                        <View key={index} style={tw`bg-white rounded-lg p-4 shadow-sm border border-gray-100`}>
                            <View style={tw`flex-row items-center mb-3`}>
                                <View style={tw`w-10 h-10 bg-pink-100 rounded-full items-center justify-center mr-3`}>
                                    <Icon name={feature.icon} size={20} style={tw`text-pink-500`} />
                                </View>
                                <Text style={tw`text-lg font-semibold text-gray-800`}>
                                    {feature.title}
                                </Text>
                            </View>
                            <Text style={tw`text-gray-600 ml-13`}>
                                {feature.description}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Mission Section */}
            <View style={tw`bg-gray-50 px-4 py-8`}>
                <Text style={tw`text-2xl font-bold text-gray-800 mb-4 text-center`}>
                    Our Mission
                </Text>
                <Text style={tw`text-gray-600 text-center leading-6`}>
                    BondBook is dedicated to helping couples maintain strong, intimate connections in our digital age. We believe that technology should bring partners closer together, making it easier to share life's precious moments.
                </Text>
            </View>

            {/* Get Started Section */}
            <View style={tw`px-4 py-8`}>
                <View style={tw`bg-pink-500 rounded-lg p-6 items-center`}>
                    <Text style={tw`text-xl font-bold text-white mb-3 text-center`}>
                        Ready to Strengthen Your Bond?
                    </Text>
                    <Text style={tw`text-white text-center mb-4`}>
                        Join thousands of couples who are already sharing their journey on BondBook
                    </Text>
                    <TouchableOpacity 
                        style={tw`bg-white px-6 py-3 rounded-full`}
                        onPress={() => {/* Handle navigation to signup */}}
                    >
                        <Text style={tw`text-pink-500 font-semibold`}>Get Started Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={tw`bg-gray-50 px-4 py-6`}>
                <Text style={tw`text-center text-gray-500 text-sm`}>
                    © 2025 BondBook. All rights reserved.
                </Text>
            </View>
        </ScrollView>
        <Footer />
        </>
    );
}

export default AboutPage;
