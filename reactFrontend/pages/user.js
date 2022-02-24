import AsyncStorage from '@react-native-async-storage/async-storage';

class Authentication {
  constructor() {
    this.isLoggedIn = false;
    this.username = "";
    this.firstName = "";
    this.lastName = "";
    this.password = "";
    this.userId = -1;
  }

  async login(userID, username, firstName, lastName, password, email) {
    try{
      await AsyncStorage.setItem('user', userID)
      this.isLoggedIn = true;
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.userId = userID;
      this.email = email;
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
    let no = await AsyncStorage.getItem('user')
    return JSON.parse(no)
  }
}

const User = new Authentication()

export default User