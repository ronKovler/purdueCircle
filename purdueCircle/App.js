import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './pages/login_page';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Purdue Circle!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "PurdueCircle" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginBox: {
    backgroundColor: '#545454',

  },

  inputBox: {
    backgroundColor: '#d9d9d9',
    textDecorationColor: '#a6a6a6',
    justifyContent: 'flex-start'
  },

  button: {
    backgroundColor: '#ffde59',
    justifyContent: 'center'
  },

  image: {
    margin: 40
  },
});
