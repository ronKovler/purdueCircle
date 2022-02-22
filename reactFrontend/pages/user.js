import EncryptedStorage from "react-native-encrypted-storage";

class Authentication {
  async login(userID){
    try{
      await EncryptedStorage.setItem('user', userID)
    } catch (error){
      console.error(error)
    }
  }

  async logout(){
    try{
      await EncryptedStorage.removeItem('user')
    } catch (error){
      console.error(error)
    }
  }

  async isLoggedIn(){
    try{
      return await EncryptedStorage.getItem('user') !== undefined
    } catch(error){
      console.log(error)
      return false;
    }
  }
}

const User = new Authentication()

export default User