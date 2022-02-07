import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}){
    return (
        <View style={styles.container}>
            <Text>Welcome to Purdue Circle!</Text>
            <Button title = "Login" onPress = {() => navigation.navigate('Login')}/>
            <StatusBar style="auto" />
        </View>
    )
}

export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name = "Home"
                component={HomeScreen}
                options={{title: "PurdueCircle"}}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
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
      textDecorationColor: '#a6a6a6',
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
