import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "twrnc";
import { PlusIcon, Bell, X } from "lucide-react-native";
import { Modal, TextInput, Button } from "react-native-paper";
import axios from "axios";
import { BASE_URL } from "@env";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


const RemindersPartner = () => {
  const [date, setDate] = useState(new Date());
  const [reminders,setReminders] = useState([]);


  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getPartnerRemainders`);
      setReminders(res.data.remainders);
      console.log('remaider',reminders)
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };


  return (
    <View style={tw`flex-1 bg-gray-50 `}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Bell size={24} color="#4B5563" />
          <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
            Reminders
          </Text>
        </View>
        <Text style={tw`text-gray-500 text-sm`}>
          {reminders.length} upcoming reminders
        </Text>
      </View>

      {/* Reminders List */}
      <ScrollView style={tw`flex-1 px-4 pt-4`}>
        {reminders.map((reminder) => (
          <View
            key={reminder._id}
            style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100`}
          >
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-gray-800 text-lg font-semibold`}>
                {reminder.title}
              </Text>
              <View
                style={tw`${
                  reminder.isNotified ? "bg-green-100" : "bg-yellow-100"
                } px-3 py-1 rounded-full`}
              >
                <Text
                  style={tw`${
                    reminder.isNotified ? "text-green-800" : "text-yellow-800"
                  } text-xs`}
                >
                  {reminder.isNotified ? "Notified " : "Pending "}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-gray-500 text-sm`}>
                {formatDate(reminder.date)}
              </Text>
              
            </View>
          </View>
        ))}
        <View style={tw`h-20`} /> {/* Bottom spacing for FAB */}
      </ScrollView>

      </View>
  );
};

export default RemindersPartner;
