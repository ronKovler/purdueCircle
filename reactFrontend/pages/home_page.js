import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {styles, HeaderLogo, Choo, Logo} from './stylesheet';
import Post from "./post";
import currentUser from "./user";
import {useIsFocused} from "@react-navigation/native";

export default function HomeScreen({navigation}) {
    const [isLoggedIn, setIsLoggedIn] = useState(currentUser.isLoggedIn);
    const [loading, setLoading] = useState(true)
    const [timelineData, setTimelineData] = useState(null)
    const isFocused = useIsFocused()

    //TODO: Setup timer to get new posts

    const LogOut = async () => {
        await currentUser.logout()
        navigation.navigate('Login')
        setIsLoggedIn(currentUser.isLoggedIn)
    }

    useEffect(async () => {
        const data = await getTimeline();
        await checkLoggedIn();
        setTimelineData(data);
    }, [isFocused])

    const Login = async () => {
        navigation.navigate('Login')
        setIsLoggedIn(currentUser.isLoggedIn)
    }

    async function getTimeline() {
        const response = await fetch(serverAddress + '/api/user/hot_timeline', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
        })
        let json = await response.json()
        setLoading(false)
        return json
    }

    async function checkLoggedIn() {
        let test = await currentUser.getUserId()
        currentUser.isLoggedIn = test !== -1
        setIsLoggedIn(test !== -1)
    }

    /*async function getPost(){
        Post.get
    }*/

    const renderPost = ({item}) => {
        console.log(item)
        return <Post topic={item.topicName} user={item.username} content={item.content} postID={item.postId}
                     userID={item.userId}/>
    };

    return (
        <View style={styled.container}>
            {!loading ?
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                        {isLoggedIn ?
                            <View style={styles.buttonContainer}>
                                <Pressable onPress={() => LogOut()}><Text
                                    style={styles.button}>Log Out</Text></Pressable>
                            </View> : <View style={{flex: 1}}/>}
                        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                            <HeaderLogo style={styles.headerIcon}/>
                        </View>
                        {!isLoggedIn ?
                            <View style={styles.buttonContainer}>
                                <Pressable onPress={() => Login()}><Text
                                    style={styles.button}>Login</Text></Pressable>
                                <Pressable onPress={() => navigation.navigate('Create Account')}><Text
                                    style={styles.button}>Register</Text></Pressable>
                            </View> :
                            <View style={styles.buttonContainer}>
                                <Pressable onPress={() => navigation.navigate('Profile Page')}><Text
                                    style={styles.button}>View Profile</Text></Pressable>
                            </View>}
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                    </View>
                </View> :
                <Image style={[styles.image, {alignSelf: 'center'}]} source={require('../assets/choo.png')}/>}
            {!loading ?
                <View style={{
                    flex: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '737373'
                }}>
                    <View style={{
                        flex: 2,
                        backgroundColor: 'dimgrey',
                        justifyContent: 'center',
                        alignItems: 'space-between'
                    }}>
                        <View style={{flex: 3}}>
                            <Image style={styles.image} source={require('../assets/choo.png')}/>
                        </View>
                        {isLoggedIn ?
                            <View style={{flex: 6, justifyContent: 'center'}}>
                                <View style={{flex: 2}}/>
                                <View style={{flex: 1}}>
                                    <Pressable onPress={() => navigation.navigate('Search')}>
                                        <Text style={styles.button}>Search</Text>
                                    </Pressable>
                                </View>
                                <View style={{flex: 1}}>
                                    <Pressable>
                                        <Text style={styles.button}>Hot Posts</Text>
                                    </Pressable>
                                </View>
                                <View style={{flex: 1}}>
                                    <Pressable>
                                        <Text style={styles.button}>Saved Posts</Text>
                                    </Pressable>
                                </View>
                                <View style={{flex: 1}}>
                                    <Pressable onPress={() => navigation.navigate('Create Post')}>
                                        <Text style={styles.button}>Create Post</Text>
                                    </Pressable>
                                </View>
                                <View style={{flex: 6}}/>
                            </View> : <View style={{flex: 6}}/>}
                    </View>
                    <View style={{flex: 5, flexDirection: 'column'}}>
                        <View style={{flex: 1, backgroundColor: '737373'}}/>
                        {/*<ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>*/}
                        {/*    <Post/><Post/><Post/><Post/><Post/><Post/>*/}
                        {/*    <Post/><Post/><Post/><Post/><Post/>*/}
                        {/*</ScrollView>*/}
                        <FlatList data={timelineData} renderItem={renderPost} keyExtractor={item => item.postId}
                                  extraData={isLoggedIn}/>
                        <View style={{flex: 2, backgroundColor: '737373'}}/>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                </View>
                : null}
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