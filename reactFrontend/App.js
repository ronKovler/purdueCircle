import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { } from 'react';
import LoginScreen from './pages/login_page';
import ProfilePage from './pages/profile_page';
import CreateAccountScreen from './pages/create_account';
import PostCreation from './pages/post_creation';
import HomeScreen from './pages/home_page';
import {Text} from "react-native";

const Stack = createNativeStackNavigator();

const linkConfig = {
  screens:{
    Home: '',
    Login: 'login',
    'Create Account': 'create_account',
    'Create Post': 'create_post',
  }
}

const linking ={
  prefixes: [],
  config: linkConfig,
}

export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "PurdueCircle" }} />
        <Stack.Screen name="Create Post" component={PostCreation}/>
        <Stack.Screen name="Profile Page" component={ProfilePage}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {Stack}