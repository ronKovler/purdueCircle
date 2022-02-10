import { Text, TextInput, View, Button, Image, Alert } from 'react-native';
import React, { useState } from 'react'
import { styles } from './stylesheet';

export default function CreateAccountScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image style={styles.image} source={require("../assets/logo.svg")} />
        <Text style={styles.header}>Create Account</Text>
        <TextInput style={styles.inputBox}
          placeholder="Name"/>
        <TextInput style={styles.inputBox}
          placeholder="Username"/>
        <TextInput style={styles.inputBox}
          placeholder='Email'
          onChangeText={email => setEmail(email)} />
        <TextInput style={styles.inputBox}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)} />
        <TextInput style={styles.inputBox}
          placeholder="Re-enter Password"
          secureTextEntry={true}/>
        <View style={styles.button}>
          <Button title="Register" onPress={() => Alert.alert("do nothing")}/>
        </View>
      </View>
    </View>
  )
}