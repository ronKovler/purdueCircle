import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './pages/login_page';
import CreateAccountScreen from './pages/create_account';
import { styles as mainStyles } from './pages/stylesheet';
import PostCreation from './pages/post_creation';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style = {mainStyles.header}>Welcome to Purdue Circle!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <StatusBar style="auto" />
    </View>
  )
}
// TODO: Stylesheet, header, buttons
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Create Post" component={PostCreation}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "PurdueCircle" }} />
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
