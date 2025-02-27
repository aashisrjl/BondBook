import React, { useState, useEffect, useRef } from "react";
import {
  View,
  PermissionsAndroid,
  Platform,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Searchbar } from "react-native-paper";
import Geolocation from "react-native-geolocation-service";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_URL = window.location.hostname === "192.168.1.81" 
  ? "http://192.168.1.81:3000" 
  : "http://192.168.1.74:3000";


export default function AddressPartner() {
  const router = useRouter();
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [placeName, setPlaceName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
        setIsMapReady(true);
      },
      (error) => {
        Alert.alert("Error", "Failed to get location");
        setIsMapReady(true); // Set map as ready even if location fails
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const searchLocation = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            "User-Agent": "MyApp/1.0",
            "Accept-Language": "en",
          },
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLocation(newLocation);
        mapRef.current?.animateToRegion(newLocation);
      } else {
        Alert.alert("Error", "Location not found!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search location");
    } finally {
      setLoading(false);
    }
  };



  const onMapReady = () => {
    setIsMapReady(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Searchbar
            placeholder="Search for an address"
            onChangeText={setPlaceName}
            value={placeName}
            onSubmitEditing={() => searchLocation(placeName)}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
          />

          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              region={location}
              onRegionChangeComplete={setLocation}
              onMapReady={onMapReady}
              maxZoomLevel={19}
              minZoomLevel={3}
            >
              {isMapReady && (
                <Marker coordinate={location} title="Selected Location" />
              )}
            </MapView>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={takePhoto}
            disabled={loading || isCameraActive}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          {photoUrl ? (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: photoUrl }} 
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <TouchableOpacity 
            style={[styles.button, styles.shareButton]} 
            onPress={saveAddress}
            disabled={loading || isCameraActive}
          >
            <Text style={styles.buttonText}>
              {loading ? "Saving..." : "Share Location"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    width: SCREEN_WIDTH,
  },
  searchBar: {
    marginBottom: 16,
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    color: '#000',
  },
  mapContainer: {
    width: SCREEN_WIDTH - 32,
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: '#A5BFCC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  shareButton: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#2c3e50',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    width: SCREEN_WIDTH - 32,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
