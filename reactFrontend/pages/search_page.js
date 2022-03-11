import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, { useState } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";

export default function SearchPage({navigation}) {
    const [search, setSearch] = useState('')
    const [queried, setQueried] = useState(false)
    const [searchData, setSearchData] = useState(null)

    async function sendSearch() {
        const response = await fetch(serverAddress + 'api/search', {
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

    useEffect(async () => {
        const data = await sendSearch();
        setSearchData(data);
    }, [isFocused])

    const renderSearch = ({item}) => {
        console.log(item)
        if (item.type == "post") {
            return <Post topic={item.topicName} user={item.username} content={item.content} postID={item.postId}
                     userID={item.userId}/>
        }
        if (item.type == "user") {
            return <User username={item.username} name={item.name}/>
        }
        
    };

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
                <View style={{flex: 15}}>
                    <FlatList
                        data={searchData}
                        renderItem={renderSearch}
                        keyExtractor={(item) => item.type}
                    />
                </View>
            }
        </View>
    );
}