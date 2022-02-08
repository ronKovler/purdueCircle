
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.inputBox}
          placeholder='Username/Email'
          onChangeText={email => setEmail(email)} />
        <TextInput style={styles.inputBox}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)} />
      </View>
    </View>
  );
}

//TODO: Adjust sizing of page to resize to display size
const styles = StyleSheet.create({
  container: {
    //resizeMode: 'contain',
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
    //transform: [{scale: 1.25}],
  },

  loginBox: {
    resizeMode: 'contain',
    backgroundColor: '#545454',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
  },

  inputBox: {
    backgroundColor: '#d9d9d9',
    textDecorationColor: '#a6a6a6',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    minWidth: 200,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    aspectRatio: 1.044,
    margin: 15,
    maxWidth: 968,
  },

  header: {
    textAlign: 'center',
    color: '#ffc000',
    fontWeight: 'bold'
  },
}
)