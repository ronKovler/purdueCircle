import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './pages/login_page';
import CreateAccountScreen from './pages/create_account';
import PostCreation from './pages/post_creation';
import HomeScreen from './pages/home_page';

const Stack = createNativeStackNavigator();

// TODO: Stylesheet, header, buttons
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "PurdueCircle" }} />
        <Stack.Screen name="Create Post" component={PostCreation}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {Stack}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#ffde59',
    justifyContent: 'center'
  },

});