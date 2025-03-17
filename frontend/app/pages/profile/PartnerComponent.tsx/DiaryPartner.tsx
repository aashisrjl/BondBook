import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";
import { PlusIcon, BookOpen, X } from "lucide-react-native";
import axios from "axios";
import { BASE_URL } from "@env";

const DiaryPartner = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
// Added state for selected diary

  const fetchDiaries = async () => {
    try {
      console.log(BASE_URL+"/fetchdiary")
      const response = await axios.get(`${BASE_URL}/getPartnerDiary`);
      const data = await response.data.diaries;
      console.log("Fetched data:", data);
      setDiaryEntries(data);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };


  // Fetch diary entries from backend
  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm`}>
        <View style={tw`flex-row items-center mb-2`}>
          <BookOpen size={24} color="#4B5563" />
          <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
            My Diary
          </Text>
        </View>
        <Text style={tw`text-gray-500 text-sm`}>
          {diaryEntries.length} entries
        </Text>
      </View>

      {/* Diary List */}
      <ScrollView style={tw`flex-1 px-4 pt-4`}>
        {loading ? (
          <ActivityIndicator size="large" color="#4B5563" style={tw`mt-10`} />
        ) : (
          diaryEntries.map((entry) => (
            <TouchableOpacity
              key={entry._id}
              style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100`}
            >
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-gray-500 text-sm`}>
                  {new Date(entry.createdAt).toDateString()}
                </Text>
                <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                  <Text style={tw`text-blue-800 text-xs`}>
                    {entry.DiaryType + " "}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-gray-800 text-lg font-semibold mb-2`}>
                {entry.title}
              </Text>
              <Text style={tw`text-gray-600 leading-5`}>{entry.content}</Text>
            </TouchableOpacity>
          ))
        )}
        <View style={tw`h-20`} />
      </ScrollView>

    </View>
  );
};

export default DiaryPartner;
