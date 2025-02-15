import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import tw from "twrnc";
import { PlusIcon, Clock } from "lucide-react-native";

// Dummy timeline data
const timelineEvents = [
  {
    id: 1,
    title: "Mountain Adventure",
    eventDate: "2024-03-15T14:30:00",
    photo: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format&fit=crop&q=60",
    description: "Explored the hidden trails of Mount Rainier. The views were absolutely breathtaking, and we even spotted some wildlife along the way!",
  },
  {
    id: 2,
    title: "Coffee Experience",
    eventDate: "2024-03-10T12:00:00",
    photo: "https://images.unsplash.com/photo-1682687221038-404670f01d03?w=500&auto=format&fit=crop&q=60",
    description: "Coffee tasting session at the new artisanal café downtown. Each blend told its own story of origin and craftsmanship.",
  },
  {
    id: 3,
    title: "Beach Yoga",
    eventDate: "2024-03-05T18:45:00",
    photo: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=500&auto=format&fit=crop&q=60",
    description: "Sunset yoga session on the beach. The perfect blend of mindfulness and nature's beauty.",
  }
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48; // 24px padding on each side

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Timeline = () => {
  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem]`}>
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Clock size={24} color="#4B5563" />
          <Text style={tw`text-gray-800 text-xl font-semibold ml-2`}>
            My Timeline
          </Text>
        </View>
        <Text style={tw`text-gray-500 text-sm`}>
          {timelineEvents.length} captured moments
        </Text>
      </View>

      {/* Timeline List */}
      <ScrollView style={tw`flex-1 px-6 pt-6`}>
        {timelineEvents.map((event, index) => (
          <View key={event.id} style={tw`mb-8 relative`}>
            {/* Timeline line */}
            {index !== timelineEvents.length - 1 && (
              <View 
                style={[
                  tw`absolute left-4 top-[90px] bottom-[-40px] w-0.5 bg-gray-200`,
                  { zIndex: 1 }
                ]} 
              />
            )}
            
            {/* Date bubble */}
            <View style={tw`flex-row items-center mb-4 relative z-10`}>
              <View style={tw`w-8 h-8 rounded-full bg-blue-500 items-center justify-center`}>
                <Text style={tw`text-white text-xs font-bold`}>
                  {new Date(event.eventDate).getDate()}
                </Text>
              </View>
              <Text style={tw`text-gray-600 ml-3 text-sm`}>
                {formatDate(event.eventDate)}
              </Text>
            </View>

            {/* Event Card */}
            <TouchableOpacity 
              style={tw`bg-white rounded-xl shadow-sm overflow-hidden ml-10`}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: event.photo }}
                style={[
                  tw`w-full h-48`,
                  { width: CARD_WIDTH - 40 } // Adjust for the left margin
                ]}
                resizeMode="cover"
              />
              <View style={tw`p-4`}>
                <Text style={tw`text-gray-900 font-semibold text-lg mb-2`}>
                  {event.title}
                </Text>
                <Text style={tw`text-gray-700 leading-6`}>
                  {event.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={[
          tw`absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg`,
          { elevation: 4 }
        ]}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Timeline;