import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// const navigation = useNavigation();
const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      navigation.replace("Login");
    }
    console.log("Token:", token);
    
  };
  export default checkToken;