import React, {} from 'react';
import {View, Text } from 'react-native';
import {styles, HeaderLogo} from './stylesheet';
import {ScrollView, TouchableOpacity} from "react-native-web";
import Post from "./post";
import User from "./user";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <HeaderLogo style={styles.headerIcon}/>
        {!User.isLoggedIn ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text
              style={styles.button}>Login</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Create Account')}><Text
              style={styles.button}>Register</Text></TouchableOpacity>
          </View> : null}
      </View>
      <ScrollView style={{flex: 10}}>
        <Post/>
        <Post/><Post/><Post/><Post/><Post/>
      </ScrollView>
    </View>
  )
}