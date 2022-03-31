import {Text, TextInput, View, Pressable} from 'react-native';
import React, {useState} from 'react'
import {styles, Logo} from './stylesheet';
import User from "./user";

export default function CreateAccountScreen({navigation}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  async function Register() {
    let ID = await fetch(serverAddress + '/api/user/create_account', {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': serverAddress,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
      })
    })
    ID = await ID.json()
    setFirstName('');
    setLastName('');
    setUsername('')
    setEmail('');
    setPassword('');
    await User.login(ID)
  }

  const validateSubmission = () => {
    let validFirstName = false
    let validLastName = false
    let validUsername = false
    let validEmail = false
    let validPassword = false

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (firstName.length === 0) {
      setFirstNameError("First name is required")
    } else {
      setFirstNameError("")
      validFirstName = true
    }

    if (lastName.length === 0) {
      setLastNameError("Last name is required")
    } else {
      setLastNameError("")
      validLastName = true
    }

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

    if (validFirstName && validLastName && validUsername && validEmail && validPassword) {
      Register().then(() => navigation.navigate('Home'))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Pressable onPress={() => navigation.navigate('Home')}>
            <Logo/>
        </Pressable>
        <Text style={styles.header}>Create Account</Text>
        <TextInput style={styles.accountInputBox}
                   placeholder="First Name"
                   onChangeText={firstName => setFirstName(firstName)}/>
        {firstNameError.length > 0 && <Text style={{color: 'red'}}>{firstNameError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder="Last Name"
                   onChangeText={lastName => setLastName(lastName)}/>
        {lastNameError.length > 0 && <Text style={{color: 'red'}}>{lastNameError}</Text>}
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
            <Pressable onPress={() => navigation.navigate("Login")}><Text style={[styles.button, {minWidth: 90}]}>Login</Text></Pressable>
            <Pressable onPress={() => validateSubmission()}><Text style={styles.button}>Register Account</Text></Pressable>
        </View>
      </View>
    </View>
  )
}
