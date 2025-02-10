import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    
      <Stack 
      screenOptions={{
        headerStyle:{
          backgroundColor:"blue"
        },
        headerTitleStyle:{
          fontWeight:'bold',
          color:'white',
          fontSize: 25,
        },
        headerTitleAlign: "left"
      }
      }
      >
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="pages/about/about" options={{ title: 'About' }} />
            <Stack.Screen name="auth/Login" options={{ title: 'Login' }} />
            <Stack.Screen name="auth/Register" options={{ title: 'Register' }} />
            <Stack.Screen name="pages/setting/SettingPage" options={{ title: 'Setting' }} />
            <Stack.Screen name="pages/profile/ProfilePage" options={{ title: 'Profile' }} />

      </Stack>



  );
}


