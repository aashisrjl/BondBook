
import React, { useState, useEffect } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert 
} from "react-native";
import tw from "twrnc";
import { PlusIcon, Bell, Trash2, Edit2 } from "lucide-react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const BASE_URL = "http://192.168.1.74:3000"; // Replace with your actual backend URL

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
// <<<<<<< aashhis-branch
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleCreateReminder = () => {
//     Alert.alert("Created", `Reminder: ${title} at ${date.toLocaleString()}`);
//     setAddModalVisible(false);
// =======
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getRemainders`);
      setReminders(res.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };



  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setIsDatePickerVisible(false);
    }
  };

  const createReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/createReminder`, { title, date });
      Alert.alert("Success", "Reminder Created!");
      setTitle("");
      fetchReminders();
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  const updateReminder = async () => {
    if (!selectedReminderId) return;

    try {
      await axios.patch(`${BASE_URL}/updateReminder/${selectedReminderId}`, { title, date });
      Alert.alert("Success", "Reminder Updated!");
      setTitle("");
      setSelectedReminderId(null);
      fetchReminders();
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deleteRemainder/${id}`);
      Alert.alert("Success", "Reminder Deleted!");
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm mb-4`}>
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

      {/* Input Section */}
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <TextInput
          style={tw`w-full bg-gray-200 p-3 rounded-lg mb-3`}
          placeholder="Enter Reminder Title"
          value={title}
          onChangeText={setTitle}
        />
        
        <TouchableOpacity 
          style={tw`bg-gray-300 p-3 rounded-lg mb-3`}
          onPress={() => setIsDatePickerVisible(true)}
        >
          <Text style={tw`text-center`}>
            {date ? formatDate(date.toString()) : "Pick a Date & Time"}
          </Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-lg`}
          onPress={selectedReminderId ? updateReminder : createReminder}
        >
          <Text style={tw`text-white text-center font-bold`}>
            {selectedReminderId ? "Update Reminder" : "Add Reminder"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reminders List */}
      <ScrollView style={tw`flex-1`}>
        {reminders.map((reminder) => (
          <View 
            key={reminder.id} 
            style={tw`bg-white rounded-xl p-4 mb-4 shadow-md border border-gray-100 flex-row justify-between items-center`}
          >
            <View>
              <Text style={tw`text-gray-800 text-lg font-semibold`}>
                {reminder.title}
              </Text>
              <Text style={tw`text-gray-500 text-sm`}>
                {formatDate(reminder.date)}
              </Text>
            </View>

            <View style={tw`flex-row`}>
              {/* Edit Button */}
              <TouchableOpacity 
                style={tw`bg-yellow-500 p-2 rounded-lg mr-2`}
                onPress={() => {
                  setTitle(reminder.title);
                  setDate(new Date(reminder.date));
                  setSelectedReminderId(reminder.id);
                }}
              >
                <Edit2 size={20} color="white" />
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity 
                style={tw`bg-red-500 p-2 rounded-lg`}
                onPress={() => deleteReminder(reminder.id)}
              >
                <Trash2 size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}

      <TouchableOpacity 
        style={[
          tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`,
          { elevation: 4 }
        ]}
        onPress={() => setSelectedReminderId(null)}
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
