import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
// import Footer from '../../component/Footer';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Modal } from 'react-native-paper';
const BASE_URL = 'http://192.168.254.146:3000';

export function SettingsPage() {
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState('profile');
    
    const renderContent = () => {
        switch(activeSection) {
            case 'profile':
                return <ProfileSection />;
            case 'password':
                return <PasswordSection />;
            case 'partner':
                return <PartnerSection />;
            case 'logout':
                return <LogoutSection />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <View style={tw`flex-1 flex-row bg-gray-100`}>
            {/* Sidebar */}
            <View style={tw`w-[70px] bg-white border-r border-gray-200`}>
            <TouchableOpacity  onPress={() => navigation.navigate('Index')}
                    style={tw`p-4 mt-4 ${activeSection === 'home' ? 'bg-blue-100' : ''}`}
            
                >
                    <View style={tw`items-center flex flex-col`} >
                    <Icon name="home" size={30} style={tw`mb-1 text-gray-700`} />
                    <Text style={tw`text-xs text-center text-gray-700`}>  Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={tw`p-4 ${activeSection === 'profile' ? 'bg-blue-100' : ''}`}
                    onPress={() => setActiveSection('profile')}
                >
                    <Icon name="user" size={24} style={tw`mb-1 text-gray-700`} />
                    <Text style={tw`text-xs text-center text-gray-700`}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={tw`p-4 ${activeSection === 'password' ? 'bg-blue-100' : ''}`}
                    onPress={() => setActiveSection('password')}
                >
                    <Icon name="key" size={24} style={tw`mb-1 text-gray-700`} />
                    <Text style={tw`text-xs text-center text-gray-700`}>Password</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={tw`p-4 ${activeSection === 'partner' ? 'bg-blue-100' : ''}`}
                    onPress={() => setActiveSection('partner')}
                >
                    <Icon name="users" size={24} style={tw`mb-1 text-gray-700`} />
                    <Text style={tw`text-xs text-center text-gray-700`}>Partner</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={tw`p-4 mt-auto ${activeSection === 'logout' ? 'bg-blue-100' : ''}`}
                    onPress={() => setActiveSection('logout')}
                >
                    <Icon name="sign-out" size={24} style={tw`mb-1 text-gray-700`} />
                    <Text style={tw`text-xs text-center text-gray-700`}>Logout</Text>
                </TouchableOpacity>
            </View>
            

            {/* Content Area */}
            <ScrollView style={tw`flex-1 p-4`}>
                {renderContent()}
            </ScrollView>
        </View>
        
    );
}

function ProfileSection() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
    });

    return (
        <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Profile Settings</Text>
            
            <View style={tw`mb-6`}>
                <Text style={tw`text-lg mb-2`}>Profile Picture</Text>
                <TouchableOpacity style={tw`w-24 h-24 bg-gray-200 rounded-full items-center justify-center`}>
                    <Icon name="image" size={30} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-medium mb-1 text-gray-700`}>Name</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-white`}
                    placeholder="Enter your name"
                    value={userInfo.name}
                    onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                />
                
                <Text style={tw`text-base font-medium mb-1 text-gray-700`}>Email</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-white`}
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                />
                
                <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg items-center`}>
                    <Text style={tw`text-white font-medium`}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function PasswordSection() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Password Settings</Text>
            
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-medium mb-1 text-gray-700`}>Current Password</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-white`}
                    placeholder="Enter current password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                
                <Text style={tw`text-base font-medium mb-1 text-gray-700`}>New Password</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-white`}
                    placeholder="Enter new password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                
                <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg items-center mb-4`}>
                    <Text style={tw`text-white font-medium`}>Change Password</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`p-3 items-center`}>
                    <Text style={tw`text-blue-500 font-medium`}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
function PartnerSection() {
    const [email, setEmail] = useState('');
    const [addPartnerModel, setAddPartnerModel] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



// Send email to partner
const sendEmailToPartner = async () => {
    try {
        const tokenn = await AsyncStorage.getItem("token"); // Consistent naming
        if (!tokenn) {
            router.replace("Login");
            return;
        }
        
        setLoading(true);
        setError(null);
        
        const res = await axios.post(
            `${BASE_URL}/user/addPartner`,
            { email }, // Wrap email in an object
            {
                headers: {
                    "Content-Type": "application/json", // Fixed template literal syntax
                    "Authorization": `Bearer ${tokenn}`, // Using the correct token variable
                },
            }
        );
        
        if (res.status === 200) {
            Alert.alert('Success', 'Partner invitation sent successfully');
            setAddPartnerModel(true); // Show token input modal
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to send invitation');
        Alert.alert('Error', error);
    } finally {
        setLoading(false);
    }
};
    // Verify partner token
    const verifyPartnerEmail = async () => {
        try {
            const tokenn = await AsyncStorage.getItem("token");
            if (!tokenn) {
              router.replace("Login");
              return;
            }
            setLoading(true);
            setError(null);
            const res = await axios.post(`${BASE_URL}/user/verifyPartnerToken`,token,{
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${tokenn}`,
                },
              });
            
            if (res.status === 200) {
                Alert.alert('Success', 'Partner verified successfully');
                setAddPartnerModel(false);
                setToken(''); // Clear token after successful verification
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid token');
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
    };

    // Remove partner with confirmation
    const removePartner = async () => {
        const tokenn = await AsyncStorage.getItem("token");
        if (!tokenn) {
          router.replace("Login");
          return;
        }
        Alert.alert(
            'Confirm Removal',
            'Are you sure you want to remove your partner?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            setError(null);
                            const res = await axios.delete(`${BASE_URL}/user/deletePartner`,{
                                headers:{
                                    "Authorization": `Bearer ${tokenn}`,
                                }
                            });
                            
                            if (res.status === 200) {
                                Alert.alert('Success', 'Partner removed successfully');
                                setEmail(''); // Clear email field
                            }
                        } catch (err) {
                            setError(err.response?.data?.message || 'Failed to remove partner');
                            Alert.alert('Error', error);
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Partner Settings</Text>
            
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-medium mb-1 text-gray-700`}>Partner Email</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 bg-white`}
                    placeholder="Enter partner email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TouchableOpacity 
                    style={tw`bg-blue-500 p-3 rounded-lg items-center mb-2 ${loading ? 'opacity-50' : ''}`}
                    onPress={()=> sendEmailToPartner()}
                    disabled={loading || !email}
                >
                    <Text style={tw`text-white font-medium`}>
                        {loading ? 'Sending...' : 'Add Partner'}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={tw`bg-red-500 p-3 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
                    onPress={removePartner}
                    disabled={loading}
                >
                    <Text style={tw`text-white font-medium`}>
                        {loading ? 'Processing...' : 'Remove Partner'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Token Entry */}
            <Modal visible={addPartnerModel} transparent={true} animationType="fade">
                <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                    <View style={tw`bg-white w-80 p-6 rounded-lg`}>
                        <Text style={tw`text-lg font-semibold mb-4 text-center`}>
                            Enter Token Sent to Your Partner
                        </Text>
                        
                        <TextInput
                            style={tw`border border-gray-300 rounded-lg p-3 mb-4`}
                            placeholder="Enter Token"
                            value={token}
                            onChangeText={setToken}
                            autoCapitalize="none"
                        />

                        <TouchableOpacity 
                            style={tw`bg-blue-500 p-3 rounded-lg items-center mb-2 ${loading ? 'opacity-50' : ''}`}
                            onPress={verifyPartnerEmail}
                            disabled={loading || !token}
                        >
                            <Text style={tw`text-white font-medium`}>
                                {loading ? 'Verifying...' : 'Verify'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={tw`p-2 rounded-lg items-center`}
                            onPress={() => {
                                setAddPartnerModel(false);
                                setToken('');
                            }}
                            disabled={loading}
                        >
                            <Text style={tw`text-red-500 font-medium`}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {error && (
                <Text style={tw`text-red-500 text-center mt-2`}>{error}</Text>
            )}
        </View>
    );
}

function LogoutSection() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        // Handle logout logic
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
        //hit logout api
        axios.post(BASE_URL+ "logout",{
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
        })
    };

    return (
        <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Logout</Text>
            <Text style={tw`text-base mb-4 text-gray-700`}>Are you sure you want to logout?</Text>
            <TouchableOpacity style={tw`bg-red-500 p-3 rounded-lg items-center`} onPress={handleLogout}>
                <Text style={tw`text-white font-medium`}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SettingsPage;