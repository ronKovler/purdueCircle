import { Text, TextInput, View, Button, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './stylesheet';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image style={styles.image} source={require('../assets/logo.svg')} />
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.inputBox}
          placeholder='Username/Email'
          onChangeText={email => setEmail(email)} />
        <TextInput style={styles.inputBox}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={password => setPassword(password)} />
        <View style={styles.button}>
          <Button title="Login" onPress={() => Alert.alert("bad")}/>
        </View>
        <View style={styles.button}>
          <Button title="Create Account" onPress={navigation.navigate("Create Account")}/>
        </View>
      </View>
    </View>
  );
}

//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?