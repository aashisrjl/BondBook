import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import IndexScreen from './index';
import AboutScreen from './pages/about/about';
import AboutUs from './pages/about/AboutUs';
import Policies from './pages/about/Policies';
import ContactSupport from './pages/about/ContactSupport';
import Help from './pages/about/Help';
import LoginScreen from './auth/Login';
import RegisterScreen from './auth/Register';
import SettingPage from './pages/setting/SettingPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChatSection from './pages/chat/chat';
import { RootStackParamList } from './component/types';
import PartnerPage from './pages/profile/PartnerPage';
import PartnerInfo from './pages/profile/PartnerInfo';
import ForgotPassword from './pages/setting/settingComponent/forgotPassword';

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use the RootStackParamList for type safety

export default function RootLayout() {
  return (
    
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2E004F' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
          headerTitleAlign: 'left',
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} options={{ title: 'BondBook' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'AboutUs' }} />
        <Stack.Screen name="Policies" component={Policies} options={{ title: 'Policies' }} />
        <Stack.Screen name="ContactSupport" component={ContactSupport} options={{ title: 'ContactSupport' }} />
        <Stack.Screen name="Help" component={Help} options={{ title: 'Help' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Setting" component={SettingPage} options={{ title: 'Setting' }} />
        <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Profile' }} />
        <Stack.Screen name="Partner" component={PartnerPage} options={{ title: 'Partner' }} />
        <Stack.Screen name="PartnerInfo" component={PartnerInfo} options={{ title: 'Partner Info' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />

        <Stack.Screen name="Chat" component={ChatSection} options={{ title: 'Chat' }} />
      </Stack.Navigator>
      
  
  );
}
