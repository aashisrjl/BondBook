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
        headerTitleAlign: "center"
      }
      }
      >
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
            <Stack.Screen name="auth/Login" options={{ title: 'Login' }} />
            <Stack.Screen name="auth/Register" options={{ title: 'Register' }} />

      </Stack>



  );
}


