import AsyncStorage from '@react-native-community/async-storage';
import api from '../utils/api';

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // AsyncStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    
  }
};

export default setAuthToken;