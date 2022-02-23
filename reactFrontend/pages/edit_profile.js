import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import { styles, HeaderLogo, Choo, Logo } from './stylesheet';
import User from "./user";

export default function EditProfileScreen({navigation}) {
    const [username, setUsername] = useState("TestUsername")
    const [firstName, setFirstName] = useState("TestFirstName")
    const [lastName, setLastName] = useState("TestLastName")
    const [password, setPassword] = useState("TestPassword")

    const LogOut = async () => {
        await User.logout()
        navigation.navigate('Login');
    }
    
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
              {User.isLoggedIn ?
              <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => LogOut()}><Text
                    style={styles.button}>Log Out</Text></TouchableOpacity>
              </View> : <View style={{flex: 1}}/>}
              <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <HeaderLogo style={styles.headerIcon}/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}/>
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
          </View>
          <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
            <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center', alignItems: 'space-between'}}>
              <View style={{flex: 3}}>
                <Image style={styles.image}  source={require('../assets/choo.png')}/>
              </View>
              <View style={{flex: 6}}>

              </View>
            </View>
            <View style={{flex: 5, flexDirection: 'column'}}>
              <View style={{flex: 2, backgroundColor: '737373'}}/>
              <View style={{flex: 3, backgroundColor: '#545454', paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center'}}>
                <Text style={styles.header}>User's Profile Information</Text>
                <View style={{justifyContent: 'center'}}>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={username}
                        onChangeText={username => setUsername(username)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={firstName}
                        onChangeText={firstName => setFirstName(firstName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={lastName}
                        onChangeText={lastName => setLastName(lastName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={password}
                        onChangeText={password => setPassword(password)}/>
                    <Pressable onPress={() => SendUpdates()}><Text style={styles.button}>Save Changes</Text></Pressable>
                </View>
              </View>
              <View style={{flex: 3}}/>
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
          </View>
        </View>
    )

    /*
    return (
        <View style={styled.container}>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.image} source={require('../assets/logo.svg')} />
                    </TouchableOpacity>
            </View>
            <View style={styles.loginBox}>
                <Text style={styles.header}>User's Profile Information</Text>
                <TextInput
                    style={styles.accountInputBox}
                    placeholder={username}
                    onChangeText={username => setUsername(username)}/>
                <TextInput
                    style={styles.accountInputBox}
                    placeholder={firstName}
                    onChangeText={firstName => setFirstName(firstName)}/>
                <TextInput
                    style={styles.accountInputBox}
                    placeholder={lastName}
                    onChangeText={lastName => setLastName(lastName)}/>
                <TextInput
                    style={styles.accountInputBox}
                    placeholder={password}
                    onChangeText={password => setPassword(password)}/>
                <Pressable onPress={() => SendUpdates()}><Text style={styles.button}>Save Changes</Text></Pressable>
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                <Text style={styles.header}>Messages</Text>
            </View>
        </View>
    )
    */
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