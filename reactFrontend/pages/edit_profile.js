import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import { styles, HeaderLogo, Choo, Logo } from './stylesheet';
import User from "./user";

export default function EditProfileScreen({navigation}) {
    const [username, setUsername] = useState("TestUsername")
    const [firstName, setFirstName] = useState("TestFirstName")
    const [lastName, setLastName] = useState("TestLastName")
    const [password, setPassword] = useState("TestPassword")
    
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
        <View style={styles.container}>
            <View style={styles.wideViewContainer}>
                <View style={styles.sideBar}>
                    <Image style={styles.image} source={require('../assets/logo.svg')} />
                    <Text style={styles.header}>Hot Topics</Text>
                    <Text style={styles.header}>Saved Posts</Text>
                    <Text style={styles.header}>My Activity</Text>
                    <Text style={styles.header}>Hot Topics</Text>
                </View>
                <View style={styles.profileBox}>
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
                <View style={styles.sideBar}>
                    <Text style={styles.header}>Messages</Text>
                </View>
            </View>
        </View>
    )
}