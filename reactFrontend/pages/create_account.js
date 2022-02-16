import { Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react'
import {styles, Logo, YellowButton} from './stylesheet';

export default function CreateAccountScreen ({navigation}) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //TODO: Encrypt password before POST, insert URL
  function register(){
    fetch("",{
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
          placeholder="Name"/>
        <TextInput style={styles.accountInputBox}
          placeholder="Username"/>
        <TextInput style={styles.accountInputBox}
          placeholder='Email'
          onChangeText={email => setEmail(email)} />
        <TextInput style={styles.accountInputBox}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)} />
        <TextInput style={styles.accountInputBox}
          placeholder="Re-enter Password"
          secureTextEntry={true}/>
        <YellowButton style={{margin:5}} title="Register" onPress={() => Alert.alert("do nothing")}/>
      </View>
    </View>
  )
}
