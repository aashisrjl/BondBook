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
  SafeAreaView,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { BASE_URL } from "@env";
import tw from "../../../../tw";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  useEffect(() => {
    checkToken();
    fetchPartnerAddress();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
      return token;
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const fetchPartnerAddress = async () => {
    try {
      setLoading(true);
      const token = await checkToken();
      const response = await axios.get(BASE_URL +'/getPartnerAddress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { address } = response.data;
      if (address) {
        const newLocation = {
          latitude: address.location[0],
          longitude: address.location[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLocation(newLocation);
        setPlaceName(address.placeName);
        setPhotoUrl(address.photoUrl);
        mapRef.current?.animateToRegion(newLocation);
      }
    } catch (error) {
      console.error("Error fetching partner address:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Failed to fetch partner address");
      }
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
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
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView 
        style={tw`flex-1`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex-1 p-4 w-[31rem]`}>
          <Searchbar
            placeholder="Search for an address"
            onChangeText={setPlaceName}
            value={placeName}
            onSubmitEditing={() => searchLocation(placeName)}
            style={tw`mb-4 w-full self-center rounded-lg bg-white`}
            inputStyle={tw`text-black`}
          />

          <View style={tw`w-full h-72 mb-4 rounded-lg overflow-hidden self-center`}>
            <MapView
              ref={mapRef}
              style={tw`w-full h-full`}
              region={location}
              onRegionChangeComplete={setLocation}
              onMapReady={onMapReady}
              maxZoomLevel={19}
              minZoomLevel={3}
            >
              {isMapReady && (
                <Marker 
                  coordinate={location} 
                  title={placeName || "Partner's Location"}
                />
              )}
            </MapView>
          </View>

          {photoUrl ? (
            <View style={tw`w-full h-52 mb-4 rounded-lg overflow-hidden self-center bg-white`}>
              <Image 
                source={{ uri: `${BASE_URL}/${photoUrl}` }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <TouchableOpacity 
            style={tw`w-full bg-blue-200 p-3 rounded-lg mb-4 self-center`}
            onPress={fetchPartnerAddress}
            disabled={loading}
          >
            <Text style={tw`text-gray-800 text-center text-base font-medium`}>
              {loading ? "Loading..." : "Refresh Partner Location"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}