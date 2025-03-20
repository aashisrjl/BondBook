import React from 'react';
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
import Diary from './pages/about/profileComponents/Diary';
import Reminders from './pages/about/profileComponents/Remainder';
import Timeline from './pages/about/profileComponents/Timeline';
import Photo from './pages/about/profileComponents/Photo';
import VideoGallery from './pages/about/profileComponents/Video';
import MusicPage from './pages/about/profileComponents/Music';
import Address from './pages/about/profileComponents/Address';
import Surprise from './pages/about/profileComponents/Surprise';
import DiaryPartner from './pages/profile/PartnerComponent.tsx/DiaryPartner';
import RemindersPartner from './pages/profile/PartnerComponent.tsx/RemainderPartner';
import TimelinePartner from './pages/profile/PartnerComponent.tsx/TimelinePartner';
import PhotoPartner from './pages/profile/PartnerComponent.tsx/PhotoPartner';
import VideoGalleryPartner from './pages/profile/PartnerComponent.tsx/VideoPartner';
import AddressPartner from './pages/profile/PartnerComponent.tsx/AddressPartner';
import LogoutSection from './pages/setting/settingComponent/LogoutSection';
import NotificationSection from './pages/setting/settingComponent/NotificationSection';
import PartnerSection from './pages/setting/settingComponent/PartnerSection';
import PasswordSection from './pages/setting/settingComponent/PasswordSection';
import ProfileSection from './pages/setting/settingComponent/ProfileSection';
import SecurityPrivacy from './pages/setting/settingComponent/SecurityPrivacy';
import FAQ from './pages/about/faq';

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use the RootStackParamList for type safety


export default function RootLayout() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
          headerTitleAlign: 'left',
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} options={{ title: 'BondBook' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Hub' }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'AboutUs' }} />
        <Stack.Screen name="Policies" component={Policies} options={{ title: 'Policies' }} />
        <Stack.Screen name="ContactSupport" component={ContactSupport} options={{ title: 'ContactSupport' }} />
        <Stack.Screen name="Help" component={Help} options={{ title: 'Help' }} />
        <Stack.Screen name="Faq" component={FAQ} options={{ title: 'FAQs' }} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacy} options={{ title: 'Securities' }} />

        <Stack.Screen name="Logout" component={LogoutSection} options={{ title: 'Logout' }} />
        <Stack.Screen name="NotificationSec" component={NotificationSection} options={{ title: 'Notification Setting' }} />
        <Stack.Screen name="PartnerSec" component={PartnerSection} options={{ title: 'Partner Setting' }} />
        <Stack.Screen name="PasswordSec" component={PasswordSection} options={{ title: 'Password' }} />
        <Stack.Screen name="ProfileSec" component={ProfileSection} options={{ title: 'Partners' }} />




        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Setting" component={SettingPage} options={{ title: 'Setting' }} />
        <Stack.Screen name="Profile" component={ProfilePage} options={{ title: 'Profile' }} />
        <Stack.Screen name="Partner" component={PartnerPage} options={{ title: 'Partner' }} />
        <Stack.Screen name="PartnerInfo" component={PartnerInfo} options={{ title: 'Partner Info' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />

        <Stack.Screen name="diary" component={Diary} options={{ title: 'Diary' }} />
        <Stack.Screen name="reminders" component={Reminders} options={{ title: 'Reminders' }} />
        <Stack.Screen name="timeline" component={Timeline} options={{ title: 'Timelines' }} />
        <Stack.Screen name="photos" component={Photo} options={{ title: 'Photos' }} />
        <Stack.Screen name="videos" component={VideoGallery} options={{ title: 'Videos' }} />
        <Stack.Screen name="music" component={MusicPage} options={{ title: 'Musics' }} />
        <Stack.Screen name="address" component={Address} options={{ title: 'Address' }} />
        <Stack.Screen name="surprise" component={Surprise} options={{ title: 'Surprises' }} />

        <Stack.Screen name="partnerdiary" component={DiaryPartner} options={{ title: 'Diary' }} />
        <Stack.Screen name="partnerreminders" component={RemindersPartner} options={{ title: 'Reminders' }} />
        <Stack.Screen name="partnertimeline" component={TimelinePartner} options={{ title: 'Timelines' }} />
        <Stack.Screen name="partnerphotos" component={PhotoPartner} options={{ title: 'Photos' }} />
        <Stack.Screen name="partnervideos" component={VideoGalleryPartner} options={{ title: 'Videos' }} />
        <Stack.Screen name="partnermusic" component={MusicPage} options={{ title: 'Musics' }} />
        <Stack.Screen name="partneraddress" component={AddressPartner} options={{ title: 'Address' }} />
        <Stack.Screen name="partnersurprise" component={Surprise} options={{ title: 'Surprises' }} />


        <Stack.Screen name="Chat" component={ChatSection} options={{ title: 'Chat' }} />

      </Stack.Navigator>
  );
}