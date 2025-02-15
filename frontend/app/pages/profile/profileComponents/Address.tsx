import React, { useState, useEffect } from "react";
import {
  View,
  PermissionsAndroid,
  Platform,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Searchbar } from "react-native-paper";
import Geolocation from "react-native-geolocation-service";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import Footer from "../../../component/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

const BASE_URL = "http://192.168.1.81:3000"; // Replace with your actual backend URL

export default function Address() {
  const navigation = useNavigation();
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.replace("Login");
    }
    console.log("Token:", token);
  };

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [placeName, setPlaceName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const saveAddress = async () => {
    try {
      if (!location.latitude || !location.longitude) {
        console.log("Error: Latitude and Longitude are required.");
        return;
      }
  
      const formattedLocation = [location.latitude, location.longitude]; // Convert to [lat, lon]
  
      console.log("Sending data:", { location: formattedLocation, placeName, photoUrl });
  
      const response = await axios.post(
        BASE_URL + "/saveAddress",
        { location: formattedLocation, placeName, photoUrl },
        { withCredentials: true }
      );
  
      console.log("Address saved:", response.data);
    } catch (error) {
      console.error("Server error while saving address:", error?.response?.data || error);
    }
  };
  
  


  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Get user location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
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
    checkToken();
  }, []);

  // Search location using OpenStreetMap
  const searchLocation = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "User-Agent": "MyApp/1.0 (your-email@example.com)", // Replace with your email
            "Accept-Language": "en",
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert("Error", "Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Take a photo
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "You need to allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaType: "photo",
      quality: 1,
      allowsEditing: true,
      saveToPhotos: true,
    });

    if (!result.assets || result.assets.length === 0) return;

    setPhotoUrl(result.assets[0].uri);
  };

  return (
    <View style={tw`flex px-1 mr-5 bg-silver rounded-lg w-[28rem]`}>
      {/* Searchbar */}
      <Searchbar
      placeholder="Search for an address"
      onChangeText={setPlaceName}
      value={placeName}
      onSubmitEditing={() => searchLocation(placeName)}
      style={tw`mb-4 w-full rounded-lg bg-silver text-white`}
      inputStyle={{ color: "black" }} // Text color inside input
      />
      
      {/* Map Container */}
      <View style={tw`flex-1 w-full overflow-hidden rounded-lg bg-silver p-2`}>
      <MapView
        style={tw`w-full h-full  bg-silver rounded-lg`}
        region={location}
        onRegionChangeComplete={setLocation}
      >
        <Marker coordinate={location} title="Selected Location" />
      </MapView>
      </View>

      {/* Capture Photo Button */}
      <TouchableOpacity style={tw`w-full mt-5 rounded-lg bg-[#A5BFCC]`} onPress={takePhoto}>
        <View style={tw`py-2`}>
          <Text style={tw`text-center text-slate-700`}>Take Photo</Text>
        </View>
      </TouchableOpacity>


      {/* Display Captured Image */}
      {photoUrl && (
      <Image source={{ uri: photoUrl }} style={tw`w-full h-48 mt-4 rounded-lg`} />
      )}

      {/* Share Location Button */}
      <TouchableOpacity style={tw`w-full mt-5 rounded-lg bg-blue-300`} onPress={saveAddress}>
        <View style={tw`py-2 `}>
          <Text style={tw`text-center text-slate-700`}>Share Location</Text>
        </View>
        </TouchableOpacity>
    </View>

  );
}