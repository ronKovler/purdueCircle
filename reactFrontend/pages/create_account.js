import { Text, TextInput, View, Button, Image, Alert } from 'react-native';
import React, { useState } from 'react'
import { styles } from './stylesheet';

export default function CreateAccountScreen ({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image style={styles.image} source={require("../assets/logo.svg")} />
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
        <View style={styles.button}>
          <Button title="Register" onPress={() => Alert.alert("do nothing")}/>
        </View>
      </View>
    </View>
  )
}