import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";

export default function SearchPage({navigation}) {
    const [search, setSearch] = useState('')
    const [queried, setQueried] = useState(false)

    async function sendSearch() {
        const response = await fetch(serverAddress + 'api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                'search': search
            })
        })
        let json = await response.json()
        setQueried(true)
        return json
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.accountInputBox}
                    placeholder='Search...'
                    onChangeText={search => setSearch(search)}
                />
                <Pressable onPress={() => sendSearch()}>
                    <Text style={styles.button}>Go!</Text>
                </Pressable>
            </View>
            {!queried && <View style={{flex: 15}}/>}
            {queried && 
                <View style={styles.container}>
                    
                </View>
            }
        </View>
    );
}