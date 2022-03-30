import {Text, TextInput, View, Pressable, FlatList, Picker} from 'react-native';
import React, { useState, useEffect } from 'react'
import {HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";
import {useIsFocused} from "@react-navigation/native";

export default function SearchPage({navigation}) {
    const [search, setSearch] = useState('')
    const [queried, setQueried] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const [selectedValue, setSelectedValue] = useState("topic")
    const isFocused = useIsFocused();

    useEffect(() => {
        //do nothing
    }, [isFocused]);

    async function sendSearch() {
        if (search.length !== 0) {
            setQueried(true)
            let url = serverAddress + "/api/user/search"
            if (selectedValue === "user") {
                console.log("Made it to user")
                url += "/0"
            } else {
                console.log("Made it to topic")
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
            setSearchData(json)
        }
    }

    useEffect(async () => {
        const data = await sendSearch();
        setSearchData(searchData);
    }, [isFocused])

    const renderSearch = ({item}) => {
        var nav
        var param
        if (selectedValue == "topic") {
            nav = "Topic Page"
            param = item.content
        } else {
            nav = "Profile Page"
            param = {id: item.userID}
        }
        console.log("Param: " + param.id)
        return (
            <Pressable onPress={() => navigation.navigate(nav, param)}>
                <Text style={styles.button}>{item.content}</Text>
            </Pressable>
        )
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
                           onSubmitEditing={(event)=>{
                               if(event.nativeEvent.key === 'Enter')
                                   sendSearch().then()
                           }}
                />
                <Text style={{textAlign: 'center', color: '#ffc000', fontWeight: 'bold', fontSize: 18, paddingTop: 17,padding: 10}}>
                    Search by:
                </Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
                    <FlatList
                        data={searchData}
                        renderItem={renderSearch}
                        keyExtractor={item => item.content}
                        extraData={searchData}
                    />
                </View>
            }
        </View>
    );
}