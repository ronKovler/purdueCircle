import { Text, TextInput, View, Button, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles, Logo} from './stylesheet';
import {TouchableOpacity} from "react-native-web";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [correct, setCorrect] = useState(true)

  function SendLogin(){
    fetch("http://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
          email: email,
          password: password
        }
      )
    })
  }

  const GetLogin = async () => {
    try {
      const response = await fetch(
        'http://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/auth/login'
      );
      const json = await response.json();
      setId(json.id);
      setSuccess(true);
      setCorrect(true)
      return json;
    } catch (error) {
      console.error(error);
      //setCorrect(false)
    }
  }

  // useEffect(() => {
  //   GetLogin();
  // }, []);

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
        {(!correct ? <Text style={{color:'red'}}>Incorrect Password. Try again</Text> : null)}
        <TouchableOpacity style={styles.button} onPress={() => SendLogin()}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Create Account")}><Text>Create Account</Text></TouchableOpacity>
      </View>
    </View>
  );
}


//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?