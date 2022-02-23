import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";

export default function ProfilePage ({navigation}) {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  //helper functions
  const SendUpdates = async () => {
    try {
      const response = await fetch (serverAddress + "api/update", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          'username': username,
          'firstName': firstName,
          'lastName': lastName,
          'password': password
        })
      })
      const success = await response.json();
      console.log(success)
    } catch (error){
      console.error(error)
    }
  }

  return (
    <View style={styled.container}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
        <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
          <View style={{flex: 1}}/>
          <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <HeaderLogo style={styles.headerIcon}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
              <Text style={styles.button}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
      </View>
      <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
        <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center', alignItems: 'space-between'}}>
          <View style={{flex: 3}}>
            <Image style={styles.image}  source={require('../assets/choo.png')}/>
          </View>
          <View style={{flex: 6}}>
              <View style={{flex: 1}}/>
              <View style={{flex: 1}}>
                <Text style={styles.header}>
                  Followed Topics
                </Text>
              </View>
              <View style={{flex: 10}}>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                  <ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>
                    <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                    <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                    <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                  </ScrollView>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
              </View>
          </View>
        </View>
        <View style={{flex: 5, flexDirection: 'column'}}>
          <View style={{flex: 1, backgroundColor: '737373'}}/>
            <ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>
              <Post/><Post/><Post/><Post/><Post/><Post/>
              <Post/><Post/><Post/><Post/><Post/><Post/>
            </ScrollView>
          <View style={{flex: 2, backgroundColor: '737373'}}/>
        </View>
        <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
      </View>
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: 'fit-content',
  }
})