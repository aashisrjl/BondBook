import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, Platform, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Searchbar } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import * as ImagePicker from 'react-native-image-picker';
import tw from 'twrnc';

export default function Address() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.7749, // Default: San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [imageUri, setImageUri] = useState(null); // To store captured image

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
        alert('Location not found!');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Capture photo using the camera
  const takePhoto = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true, // Saves image to gallery
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if ((response as any).error) {
          console.error('Camera error:', (response as any).error);
        } else {
          setImageUri(response.assets[0].uri); // Store captured image URI
        }
      }
    );
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
      <MapView style={{ flex: 1, height: 400 }} region={region} onRegionChangeComplete={setRegion}>
        {userLocation && <Marker coordinate={userLocation} title="Your Location" />}
        <Marker coordinate={region} title="Searched Location" />
      </MapView>

      {/* Capture Photo Button */}
      <Button title="Capture Photo" onPress={takePhoto} />

      {/* Display Captured Image */}
      {imageUri && <Image source={{ uri: imageUri }} style={tw`w-full h-64 mt-4 rounded`} />}
    </View>
  );
}
