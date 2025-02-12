import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';

const facebookSignInFunction = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      console.log('Login cancelled');
      return;
    }

    const data = await AccessToken.getCurrentAccessToken();
    const accessToken = data.accessToken.toString();

    // Send the token to your backend
    const response = await axios.post('http://192.168.1.81:3000/auth/facebook/callback', { token: accessToken });
    console.log('Facebook login successful:', response.data);
  } catch (error) {
    console.log('Facebook login error:', error);
  }
};

export default facebookSignInFunction;