import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity, CheckBox} from 'react-native';
import { styles, HeaderLogo, Choo, Logo } from './stylesheet';
import User from "./user";

export default function EditProfileScreen({navigation}) {
    const [username, setUsername] = User.username;
    const [firstName, setFirstName] = User.firstName;
    const [lastName, setLastName] = User.lastName;
    const [password, setPassword] = User.password;
    const [usernameError, setUsernameError] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const LogOut = async () => {
        await User.logout()
        navigation.navigate('Login');
    }
    
    //helper functions
    const SendUpdates = async () => {
        try {
            const newPassword = await fetch (serverAddress + "/api/modify/modify_password", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username,
                    'email': User.email,
                    'isPrivate': isPrivate
                })
            })
            console.log(newPassword)
            await fetch (serverAddress + "/api/modify/modify_first_name", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username,
                    'email': User.email,
                    'isPrivate': isPrivate
                })
            })
            await fetch (serverAddress + "/api/modify/modify_last_name", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username,
                    'email': User.email,
                    'isPrivate': isPrivate
                })
            })
            await fetch (serverAddress + "/api/modify/modify_private", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username,
                    'email': User.email,
                    'isPrivate': isPrivate
                })
            })
            const update = await fetch (serverAddress + "/api/modify/modify_username", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username,
                    'email': User.email,
                    'isPrivate': isPrivate
                })
            })
            if (!update) setUsernameError("Username already taken!");
            else navigation.navigate('Home');
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
                <Choo/>
              </View>
              <View style={{flex: 6}}>

              </View>
            </View>
            <View style={{flex: 5, flexDirection: 'column'}}>
              <View style={{flex: 2, backgroundColor: '737373'}}/>
              <View style={{flex: 3, backgroundColor: '#545454', paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center'}}>
                <Text style={styles.header}>{User.username}'s Profile Information</Text>
                <View style={{justifyContent: 'center'}}>
                    {usernameError.length > 0 && <Text style={{color: 'red'}}>{usernameError}</Text>}
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.username}
                        onChangeText={username => setUsername(username)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.firstName}
                        onChangeText={firstName => setFirstName(firstName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.lastName}
                        onChangeText={lastName => setLastName(lastName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.password}
                        onChangeText={password => setPassword(password)}/>
                    <View style={{flexDirection: "row"}}>
                        <CheckBox
                        value={isPrivate}
                        onValueChange={setIsPrivate}
                        />
                        <Text style={{color: '#ffc000', fontWeight: 'bold', fontSize: 15}}> Set name private</Text>
                    </View>
                    <Pressable onPress={() => SendUpdates()}><Text style={styles.button}>Save Changes</Text></Pressable>
                </View>
              </View>
              <View style={{flex: 3}}/>
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