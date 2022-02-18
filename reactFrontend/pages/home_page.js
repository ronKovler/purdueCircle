import React, {Component, useState} from 'react';
import {View, Text, Button, StatusBar, StyleSheet, Pressable} from 'react-native';
import {styles} from './stylesheet';
import {TouchableOpacity} from "react-native-web";
// TODO Post UI and import to timeline?

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Purdue Circle!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Account')}><Text>Create Account</Text></TouchableOpacity>
      </View>
      <StatusBar style="auto"/>
    </View>
  )
}