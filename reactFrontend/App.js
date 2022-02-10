import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './pages/login_page';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#ffde59" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTxt}>Welcome to Purdue Circle!</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.button}>
          <Button color="#CEB888" title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.button}>
          <Button color="#CEB888" title="Sign up" onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "PurdueCircle" }} />
        <Stack.Screen name="Login" component={LoginScreen} />
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

  welcomeTxt: {
    marginBottom: 10
  },

  button: {
    justifyContent: 'center',
    margin: 1,
  },

});
