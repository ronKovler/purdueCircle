import {Text, TextInput, View, Alert} from 'react-native';
import React, {useState} from 'react'
import {styles, Logo} from './stylesheet';
import {TouchableOpacity} from "react-native-web";

export default function CreateAccountScreen({navigation}) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')


  //TODO: insert URL
  function Register() {
    fetch("", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password
      })
    })
  }

  const validateSubmission = () => {
    var validUsername = false
    var validEmail = false
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username.length == 0) {
      setUsernameError("Username is required")
    } else {
      setUsernameError("")
      validUsername = true
    }

    if (email.length == 0) {
      setEmailError("Email is required")
    } else if (reg.test(email) == false) {
      setEmailError("Enter a valid email address")
    } else {
      setEmailError("")
      validEmail = true
    }

    if (validUsername && validEmail) {
      Register()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Logo/>
        <Text style={styles.header}>Create Account</Text>
        <TextInput style={styles.accountInputBox}
                   placeholder="First Name"/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Last Name"/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Username"/>
        {usernameError.length > 0 && <Text style={{color: 'red'}}>{usernameError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Email'
                   onChangeText={email => setEmail(email)}/>
        {emailError.length > 0 && <Text style={{color: 'red'}}>{emailError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   onChangeText={password => setPassword(password)}/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Re-enter Password"
                   secureTextEntry={true} onChangeText={reenter => setReenter(reenter)}/>
        {password !== reenter ? <Text style={{color:'red'}}>Passwords do not match</Text> : null}
        <TouchableOpacity onPress={() => validateSubmission()}><Text style={styles.button}>Register</Text></TouchableOpacity>
      </View>
    </View>
  )
}
