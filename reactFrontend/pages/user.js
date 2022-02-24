import AsyncStorage from '@react-native-async-storage/async-storage';

class Authentication {
  constructor() {
    this.isLoggedIn = false;
    this.username = '';
  }

  async login(userID, username) {
    try{
      await AsyncStorage.setItem('user', userID)
      this.isLoggedIn = true;
      this.username = username;
      console.log(this.isLoggedIn);
      console.log(this.username);
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