import AsyncStorage from '@react-native-async-storage/async-storage';

class Authentication {
  constructor() {
    this.isLoggedIn = false;
  }

  async login(userID) {
    try{
      await AsyncStorage.setItem('user', userID)
      this.isLoggedIn = true;
    } catch (error){
      console.error(error)
    }
  }

  async isLoggedIn() {
    return this.isLoggedIn();
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