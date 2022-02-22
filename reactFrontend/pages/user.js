import AsyncStorage from '@react-native-async-storage/async-storage';

class Authentication {
  async login(userID){
    try{
      await AsyncStorage.setItem('user', userID)
    } catch (error){
      console.error(error)
    }
  }

  async logout(){
    try{
      await AsyncStorage.removeItem('user')
    } catch (error){
      console.error(error)
    }
  }

  async isLoggedIn(){
    try{
      return await AsyncStorage.getItem('user') !== null
    } catch(error){
      console.log(error)
      return false;
    }
  }

  async getUserId(){
    return await AsyncStorage.getItem('user')
  }
}

const User = new Authentication()

export default User