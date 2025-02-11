import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Platform, Button, Image, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import Footer from '../../../component/Footer';

export default function Address() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.7749, 
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [imageUri, setImageUri] = useState(null); // Store captured image URI

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS automatically handles permissions
  };


  // Get user location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        getCurrentLocation();
      }
    };
    fetchLocation();
  }, []);

  // Search for a location using OpenStreetMap Nominatim API
  const searchLocation = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent': 'MyApp/1.0 (your-email@example.com)', // Replace with your email
            'Accept-Language': 'en',
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert('Error', 'Location not found!');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      const grantedStorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      return (
        grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedStorage === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true; // iOS automatically handles permissions
  };

  const takePhoto = async () => {
    // Request camera permissions using Expo's built-in method
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to allow camera access.');
      return;
    }
    // Open camera
    const result = await ImagePicker.launchCameraAsync({
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
      base64: false,
      saveToPhotos: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Store the captured image
    }
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Searchbar
        placeholder="Search for an address"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={() => searchLocation(searchQuery)}
        style={tw`mb-4`}
      />
      <MapView style={tw`flex-1 h-vh w-[32rem]`} region={region} onRegionChangeComplete={setRegion}>
        {userLocation && <Marker coordinate={userLocation} title="Your Location" />}
        <Marker coordinate={region} title="Searched Location" />
      </MapView>

      {/* Capture Photo Button */}
      <TouchableOpacity>
      <Button title="Capture Photo" onPress={takePhoto} />
      </TouchableOpacity>

      {/* Display Captured Image */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={tw`w-full h-64 mt-4 rounded-lg`} />
      )}
      <View style={tw`mt-4 mb-0`}> 
      < Footer />
      </View>
    </View>
  );
}
