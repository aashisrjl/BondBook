import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import tw from "twrnc";
import { PlusIcon, Bell } from "lucide-react-native";

// Dummy reminder data
const reminders = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2024-03-20T10:00:00",
    isNotified: false,
  },
  {
    id: 2,
    title: "Doctor's Appointment",
    date: "2024-03-22T15:30:00",
    isNotified: true,
  },
  {
    id: 3,
    title: "Birthday Party Planning",
    date: "2024-03-25T14:00:00",
    isNotified: false,
  },
  {
    id: 4,
    title: "Project Deadline",
    date: "2024-03-28T18:00:00",
    isNotified: false,
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Reminders = () => {
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
                  reminder.isNotified 
                    ? 'bg-green-100' 
                    : 'bg-yellow-100'
                } px-3 py-1 rounded-full`}
              >
                <Text 
                  style={tw`${
                    reminder.isNotified 
                      ? 'text-green-800' 
                      : 'text-yellow-800'
                  } text-xs`}
                >
                  {reminder.isNotified ? 'Notified' : 'Pending'}
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
        style={[
          tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`,
          { elevation: 4 }
        ]}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Reminders;