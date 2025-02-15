import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import tw from "twrnc";
import { PlusIcon, Bell, X } from "lucide-react-native";
import { Modal, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const reminders = [
  { id: 1, title: "Team Meeting", date: "2024-03-20T10:00:00", isNotified: false },
  { id: 2, title: "Doctor's Appointment", date: "2024-03-22T15:30:00", isNotified: true },
  { id: 3, title: "Birthday Party Planning", date: "2024-03-25T14:00:00", isNotified: false },
  { id: 4, title: "Project Deadline", date: "2024-03-28T18:00:00", isNotified: false },
];

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

const Reminders = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateReminder = () => {
    Alert.alert("Created", `Reminder: ${title} at ${date.toLocaleString()}`);
    setAddModalVisible(false);
  };

  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem]`}>
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
          <TouchableOpacity
            key={reminder.id}
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
                  {reminder.isNotified ? "Notified" : "Pending"}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-500 text-sm`}>
                {formatDate(reminder.date)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={tw`h-20`} /> {/* Bottom spacing for FAB */}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
        onPress={() => setAddModalVisible(true)}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Add Reminder
              </Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <TextInput
              mode="outlined"
              label="Title"
              value={title}
              onChangeText={setTitle}
              style={tw`mb-3`}
            />

            {/* Date Picker */}
            <TouchableOpacity
              style={tw`border border-gray-300 p-3 rounded-md mb-3`}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={tw`text-gray-800`}>
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={(event:any, selectedDate:Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md mb-3`}
              onPress={handleCreateReminder}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Add Reminder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Reminders;
