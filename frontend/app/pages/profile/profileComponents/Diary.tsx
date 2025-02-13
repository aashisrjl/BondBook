import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import tw from "twrnc";
import { PlusIcon, BookOpen } from "lucide-react-native";

// Dummy diary data with more realistic content
const diaryEntries = [
  {
    id: 1,
    date: "March 15, 2024",
    title: "A Perfect Spring Day",
    content: "Today was absolutely beautiful. The cherry blossoms are in full bloom, and I spent the afternoon in the park reading my favorite book. The gentle breeze and warm sunlight made everything feel magical...",
    mood: "Happy",
  },
  {
    id: 2,
    date: "March 14, 2024",
    title: "Late Night Thoughts",
    content: "Couldn't sleep tonight. My mind kept wandering to the upcoming presentation at work. Decided to make some chamomile tea and write down my thoughts. Sometimes the quiet of night brings the most clarity...",
    mood: "Reflective",
  },
  {
    id: 3,
    date: "March 13, 2024",
    title: "Coffee Shop Chronicles",
    content: "Found a new coffee shop downtown. The atmosphere was perfect for writing - exposed brick walls, soft jazz playing, and the smell of freshly ground coffee beans. Spent hours working on my novel...",
    mood: "Inspired",
  },
  {
    id: 4,
    date: "March 13, 2024",
    title: "Coffee Shop Chronicles",
    content: "Found a new coffee shop downtown. The atmosphere was perfect for writing - exposed brick walls, soft jazz playing, and the smell of freshly ground coffee beans. Spent hours working on my novel...",
    mood: "Inspired",
  },
];

const Diary = () => {
  return (
    <View style={tw`flex-1 bg-gray-50 w-140`}>
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
        {diaryEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100`}
          >
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-gray-500 text-sm`}>{entry.date}</Text>
              <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
                <Text style={tw`text-blue-800 text-xs`}>{entry.mood}</Text>
              </View>
            </View>
            <Text style={tw`text-gray-800 text-lg font-semibold mb-2`}>
              {entry.title}
            </Text>
            <Text style={tw`text-gray-600 leading-5`} numberOfLines={3}>
              {entry.content}
            </Text>
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

export default Diary;