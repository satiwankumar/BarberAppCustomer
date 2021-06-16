import AsyncStorage  from '@react-native-community/async-storage'
export const storeUserData = async (key,value) => {
    try {
        const jsonData = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonData)
    } catch (e) {
      // saving error
      console.log(e)
    }
}

export const getUserData = async(key) => {
    try{
        await AsyncStorage.getItem(key)
    }catch(e){
        console.log(e)
    }
}