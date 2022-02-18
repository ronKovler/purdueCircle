import {Text, TextInput, View, Button, Alert} from 'react-native';
import React, {useState} from 'react'
import {styles, Logo, YellowButton} from './stylesheet';
import {TouchableOpacity} from "react-native-web";

export default function CreateAccountScreen({navigation}) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('')


  //TODO: Encrypt password before POST, insert URL
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
        <TextInput style={styles.accountInputBox}
                   placeholder='Email'
                   onChangeText={email => setEmail(email)}/>
        <TextInput style={styles.accountInputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   onChangeText={password => setPassword(password)}/>
        <TextInput style={styles.accountInputBox}
                   placeholder="Re-enter Password"
                   secureTextEntry={true} onChangeText={reenter => setReenter(reenter)}/>
        {password !== reenter ? <Text style={{color:'red'}}>Passwords do not match</Text> : null}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("do nothing")}><Text>Register</Text></TouchableOpacity>
      </View>
    </View>
  )
}
