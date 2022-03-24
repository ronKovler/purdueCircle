import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, FlatList, Picker} from 'react-native';
import React, { useState, useEffect } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";

export default function SearchPage({navigation}) {
    const [search, setSearch] = useState('')
    const [queried, setQueried] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [selectedValue, setSelectedValue] = useState("topic")

    async function sendSearch() {
        if (search.length != 0) {
            setQueried(true)
            let url = serverAddress + "/api/user/search"
            if (selectedValue === "user") {
                url += "/0"
            } else {
                url += "/1"
            }

            url += "/" + search

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            let json = await response.json()
            return json
        }
    }

    useEffect(async () => {
        const data = await sendSearch();
        setSearchData(data);
    }, [])

    const renderSearch = ({item}) => {
        console.log(item)
        if (selectedValue === "topic") {
            return <Topic topic={item.content}/>
        }
        if (selectedValue === "user") {
            return <User username={item.content}/>
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
                    <Picker.Item label="Topic" value="topic"/>
                    <Picker.Item label="User" value="user"/>
                </Picker>
                <Pressable onPress={() => sendSearch()}>
                    <Text style={styles.button}>Go!</Text>
                </Pressable>
            </View>
            {!queried && <View style={{flex: 15}}/>}
            {queried && 
                <View style={{flex: 15}}>
                    <Text>Testing testing testing testing</Text>
                    <FlatList
                        data={searchData}
                        renderItem={renderSearch}
                        // keyExtractor={(item) => item.content}
                        extraData={searchData}
                    />
                </View>
            }
        </View>
    );
}