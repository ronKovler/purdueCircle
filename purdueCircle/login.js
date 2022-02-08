import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
        
        <Text>Login</Text>
        <View style = {styles.loginBox}>
          <TextInput style={styles.inputBox}
            placeholder='Username/Email'
            onChangeText={email => setEmail(email)}/>
          
          <TextInput style={styles.inputBox}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}/>
        
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginBox:{
    backgroundColor: '#545454',
    
  },

  inputBox:{
    backgroundColor: '#d9d9d9',
    placeholderTextColor: '#a6a6a6',
    justifyContent: 'flex-start'
  },

  button:{
    backgroundColor:'#ffde59',
    justifyContent:'center'
  },

  image :{
    margin: 40
  },
});
