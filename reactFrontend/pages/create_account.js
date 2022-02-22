import {Text, TextInput, View, Alert} from 'react-native';
import React, {useState} from 'react'
import {styles, Logo} from './stylesheet';
import {TouchableOpacity} from "react-native-web";

export default function CreateAccountScreen({navigation}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  //TODO: insert URL
  function Register() {
    fetch("", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
      })
    })
  }

  const validateSubmission = () => {
    var validUsername = false
    var validEmail = false
    var validPassword = false
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username.length === 0) {
      setUsernameError("Username is required")
    } else {
      setUsernameError("")
      validUsername = true
    }

    if (email.length === 0) {
      setEmailError("Email is required")
    } else if (reg.test(email) === false) {
      setEmailError("Enter a valid email address")
    } else {
      setEmailError("")
      validEmail = true
    }

    if (password.length === 0) {
      setPasswordError("Password is required")
    } else {
      setPasswordError("")
      validPassword = true
    }

    if (validUsername && validEmail && validPassword) {
      Register()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo/>
        </TouchableOpacity>
        <Text style={styles.header}>Create Account</Text>
        <TextInput style={styles.accountInputBox}
                   placeholder="First Name"/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Last Name"/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Username"
                   onChangeText={username => setUsername(username)}/>
        {usernameError.length > 0 && <Text style={{color: 'red'}}>{usernameError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Email'
                   onChangeText={email => setEmail(email)}/>
        {emailError.length > 0 && <Text style={{color: 'red'}}>{emailError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   onChangeText={password => setPassword(password)}/>
        {passwordError.length > 0 && <Text style={{color: 'red'}}>{passwordError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder="Re-enter Password"
                   secureTextEntry={true} onChangeText={reenter => setReenter(reenter)}/>
        {password !== reenter ? <Text style={{color:'red'}}>Passwords do not match</Text> : null}
        <View style={[styles.buttonContainer, {alignSelf: 'center'}]}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={[styles.button, {minWidth: 90}]}>Login</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => validateSubmission()}><Text style={styles.button}>Register Account</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
