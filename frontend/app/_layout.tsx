import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    
      <Stack 
      screenOptions={{
        headerStyle:{
          backgroundColor:"green"
        },
        headerTitleStyle:{
          fontWeight:'bold',
          color:'red',
          fontSize: 25
        },
        headerTitleAlign: "center"
      }
      }
      />

  );
}


