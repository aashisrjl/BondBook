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
import Footer from "../../../component/Footer";

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
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [reminders,setReminders] = useState([]);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      console.log(BASE_URL+"/remainder")
      const res = await axios.get(`${BASE_URL}/getRemainders`);
      setReminders(res.data.remainders);
      console.log('remaider',reminders)
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };
  const handleCreateReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/createRemainder`, { title, date });
      Alert.alert("Success", "Reminder Created!");
      setTitle("");
      fetchReminders();
    } catch (error) {
      console.error("Error creating reminder:", error);
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
    <>
    <View style={tw`flex-1 bg-gray-50 w-[]`}>
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
              <TouchableOpacity onPress={()=>{deleteReminder(reminder._id)}}
              style={tw`bg-red-100 p-1 rounded-full px-3  `}>
                <Text style-={tw`text-yellow-500  text-xs`}>Delete </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={tw`h-20`} /> {/* Bottom spacing for FAB */}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`}
        onPress={() => setAddModelVisible(true)}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={addModelVisible} transparent={true} animationType="slide" >
        <View style={tw` flex justify-center items-center bg-transparent`}>
          <View style={tw `bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw `flex-row justify-between items-center mb-4`}>
            <Text style={tw `text-xl font-semibold text-gray-800 text-center `}>Add Reminders</Text>
            <TouchableOpacity onPress={() => setAddModelVisible(false)}>
              <X size={24} color="gray" />
            </TouchableOpacity>
            </View>

            <TextInput
            style={tw`border border-gray-300 p-2 rounded mb-3`}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}  />

          <TextInput
            style={tw`border border-gray-300 p-2 rounded mb-3`}
            placeholder="Date"
            value={date}
            onChangeText={setDate}  />

          <TouchableOpacity 
          style={tw`bg-blue-600 p-3 rounded-md mb-3`}
          onPress={()=>{
            handleCreateReminder();
            setAddModelVisible(false);
          }}>
            <Text style={tw`text-white text-center font-semibold`}> Add</Text>
            </TouchableOpacity>  

          </View>



        </View>

      </Modal>
    </View>
    <Footer/>
    </>
  );
};

export default Reminders;
