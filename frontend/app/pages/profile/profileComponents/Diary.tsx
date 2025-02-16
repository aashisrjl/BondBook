import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";
import { PlusIcon, BookOpen, X } from "lucide-react-native";
import axios from "axios";

const BASE_URL = "http://192.168.1.74:3000"; // Change this to your actual backend URL

const Diary = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addModelVisible, setAddModalVisible] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [DiaryType, setDiaryType] = useState("");
  const [selectedDiary, setSelectedDiary] = useState(null); // Added state for selected diary

  const handleCreateDiary = () => {
    axios
      .post(`${BASE_URL}/createDiary`, {
        title,
        content,
        DiaryType,
      })
      .then((response) => {
        console.log("created");
      })
      .catch((error) => {
        console.error("Error creating diary entry:", error);
      });
  };
  const handleUpdateDiary = (_id) => {
    console.log(title, content, DiaryType);
    axios
      .patch(`${BASE_URL}/updateDiary/${_id}`, {
        title,
        content,
        DiaryType,
      })
      .then((response) => {
        console.log("updated");
        setDiaryEntries(
          diaryEntries.map((entry) =>
            entry._id === _id ? { ...entry, title, content, DiaryType } : entry
          )
        ); // Update entry in state
      })
      .catch((error) => {
        console.error("Error updating diary entry:", error);
      });
  };

  const handleDeleteDiary = (_id) => {
    axios
      .delete(`${BASE_URL}/deleteDiary/${_id}`)
      .then((response) => {
        console.log("Diary deleted:");
        setDiaryEntries(diaryEntries.filter((entry) => entry._id !== _id)); // Remove deleted entry from state
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Error deleting diary entry:", error);
      });
  };

  // Fetch diary entries from backend
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/fetchAllDiary`);
        const data = await response.data.existingDiary;
        console.log("Fetched data:", data);
        setDiaryEntries(data);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-50 w-[28rem]`}>
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
              onPress={() => {
                setSelectedDiary(entry); // Set selected diary entry
                setTitle(entry.title);
                setContent(entry.content);
                setDiaryType(entry.DiaryType);
                setModalVisible(true); // Open modal with selected diary
              }}
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

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[
          tw`absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg`,
          { elevation: 4 },
        ]}
        onPress={() => setAddModalVisible(true)}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Diary Entry
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded-md mb-3`}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 rounded-md mb-3 h-20`}
              placeholder="Content"
              multiline
              value={content}
              onChangeText={setContent}
            />
            <Picker
              selectedValue={DiaryType}
              onValueChange={(itemValue) => setDiaryType(itemValue)}
              style={tw`border border-black-300 rounded-md mb-3`}
            >
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shared" value="Shared" />
            </Picker>
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md mb-3`}
              onPress={() => {
                handleUpdateDiary(selectedDiary._id);
                setModalVisible(false);
              }}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Update Entry
              </Text>
            </TouchableOpacity>
            {/* Delete Button */}
            {selectedDiary && (
              <TouchableOpacity
                style={tw`bg-red-600 p-3 rounded-md`}
                onPress={() => {
                  handleDeleteDiary(selectedDiary._id);
                  setModalVisible(false);
                }}
              >
                <Text style={tw`text-white text-center font-semibold`}>
                  Delete Entry
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal Form */}
      <Modal visible={addModelVisible} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-6 rounded-xl w-80 shadow-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-semibold text-gray-800`}>
                Diary Entry
              </Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <X size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded-md mb-3`}
              placeholder="Title"
              onChangeText={setTitle}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 rounded-md mb-3 h-20`}
              placeholder="Content"
              multiline
              onChangeText={setContent}
            />
            <Picker
              selectedValue={DiaryType}
              onValueChange={(itemValue) => setDiaryType(itemValue)}
              style={tw`border border-black-300 rounded-md mb-3`}
            >
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Shared" value="Shared" />
            </Picker>
            <TouchableOpacity
              style={tw`bg-blue-600 p-3 rounded-md mb-3`}
              onPress={() => {
                handleCreateDiary();
                setAddModalVisible(false);
              }}
            >
              <Text style={tw`text-white text-center font-semibold`}>
                Add Entry
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Diary;
