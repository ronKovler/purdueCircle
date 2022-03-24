import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, FlatList, Picker} from 'react-native';
import React, { useState } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";

export default function SearchPage({navigation}) {
    const [search, setSearch] = useState('')
    const [queried, setQueried] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [selectedValue, setSelectedValue] = useState("post")

    async function sendSearch() {
        if (search.length != 0) {
            setQueried(true)
            const response = await fetch(serverAddress + 'api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'search': search,
                    'searchType': selectedValue
                })
            })
            let json = await response.json()

            useEffect(async () => {
                const data = await sendSearch();
                setSearchData(data);
            }, [])
            return json
        }
    }

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
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <HeaderLogo style={styles.headerIcon}/>
                </Pressable>
                <TextInput style={styles.accountInputBox}
                    placeholder='Search...'
                    onChangeText={search => setSearch(search)}
                />
                <Text style={{textAlign: 'center', color: '#ffc000', fontWeight: 'bold', fontSize: 18, paddingTop: 17,padding: 10}}>
                    Search by: 
                </Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Post" value="post"/>
                    <Picker.Item label="User" value="user"/>
                </Picker>
                <Pressable onPress={() => sendSearch()}>
                    <Text style={styles.button}>Go!</Text>
                </Pressable>
                <View style={{flexDirection: "column"}}>
                    
                </View>
            </View>
            {!queried && <View style={{flex: 15}}/>}
            {queried && 
                <View style={{flex: 15}}>
                    <Text>Testing testing testing testing</Text>
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