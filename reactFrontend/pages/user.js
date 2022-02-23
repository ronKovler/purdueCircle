import AsyncStorage from '@react-native-async-storage/async-storage';

class Authentication {
  constructor() {
    this.isLoggedIn = false;
  }

  async login(userID){
    try{
      this.isLoggedIn = true;
      await AsyncStorage.setItem('user', userID)
    } catch (error){
      console.error(error)
    }
  }

  async logout(){
    try{
      await AsyncStorage.setItem('user', '-1')
      this.isLoggedIn = false;
      console.log('-1')
    } catch (error){
      console.error(error)
    }
  }

  async getUserId(){
    return await AsyncStorage.getItem('user')
  }
}

const User = new Authentication()

export default User