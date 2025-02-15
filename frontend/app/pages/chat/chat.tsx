import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import Footer from "../../component/Footer";

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "You" }]);
      setInputMessage("");
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}> 
      {/* Header */}
      <View style={tw`bg-white px-4 py-6 shadow-sm flex-row items-center`}> 
        <Text style={tw`text-gray-800 text-xl font-semibold`}>Chat Section</Text>
      </View>

      {/* Messages */}
      <ScrollView style={tw`flex-1 p-4 `}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.sender === "You"
                ? tw`self-end bg-blue-500 p-3 rounded-lg mb-3 max-w-3/4`
                : tw`self-start bg-gray-300 p-3 rounded-lg mb-3 max-w-3/4`
            }
          >
            <Text style={tw`text-white`}>{message.text }</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View style={tw`flex-row items-center bg-white p-2 rounded-lg shadow-md`}> 
        <TextInput
          style={tw`flex-1 bg-gray-100 p-3 rounded-lg`}
          placeholder="Type a message... "
          value={inputMessage }
          onChangeText={setInputMessage }
        />
        <TouchableOpacity onPress={sendMessage } style={tw`ml-2 bg-blue-600 p-3 rounded-lg`}>
          <Text style={tw`text-white font-semibold`}>Send</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default ChatSection;
