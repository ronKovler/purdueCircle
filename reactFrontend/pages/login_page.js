import { Text, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles, Logo } from './stylesheet';
import hash from "react-native-web/dist/vendor/hash";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function sendLogin(){
    fetch("http://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/login", {
      method: "POST",
      body: JSON.stringify({
          email: email,
          password: password
        }
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Logo/>
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.accountInputBox}
          placeholder='Username/Email'
          onChangeText={email => setEmail(email)} />
        <TextInput style={styles.accountInputBox}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)} />
        <View style={styles.button}>
          <Button title="Login" onPress={() => Alert.alert("bad")}/>
        </View>
        <View style={styles.button}>
          <Button title="Create Account" onPress={() => navigation.navigate("Create Account")}/>
        </View>
      </View>
    </View>
  );
}


//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?