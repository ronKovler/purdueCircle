import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {styles, HeaderLogo, Choo, Logo} from './stylesheet';
import {renderPost} from "./post";
import User from "./user";
import {useIsFocused, useLinkTo} from "@react-navigation/native";

export default function TopicPage({route, navigation}) {
    const [isLoggedIn, setIsLoggedIn] = useState(User.isLoggedIn)
    const [loading, setLoading] = useState(true)
    const [timelineData, setTimelineData] = useState(null)
    const isFocused = useIsFocused()
    const [topic, setTopic] = useState(route.params.topic)
    const linkTo = useLinkTo()

    console.log("Topic: " + route.params.topic)
    //TODO: Setup timer to get new posts

    const LogOut = async () => {
        await User.logout()
        await navigation.navigate('Login')
        setIsLoggedIn(User.isLoggedIn)
    }

    useEffect(async () => {
        if(isFocused) {
            await setTopic(route.params.topic)
            const data = await getTimeline();
            await checkLoggedIn();
            setTimelineData(data);
        } else{
            setTimelineData("");
            setTopic('')
        }
    }, [isFocused])

    const Login = async () => {
        await navigation.navigate('Login')
        setIsLoggedIn(User.isLoggedIn)
    }

    async function getTimeline() {
        const response = await fetch(serverAddress + '/api/user/get_topic_page/' + topic + '/' + User.userID, {
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
        setIsLoggedIn(User.isLoggedIn)
    }

    /*async function getPost(){
        Post.get
    }*/

    return (
        <View style={styled.container}>
            {!loading ?
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                        {isLoggedIn ?
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable onPress={() => LogOut()}><Text
                                    style={styles.button}>Log Out</Text></Pressable>
                            </View> : <View style={{flex: 1}}/>}
                        <View style={{flexDirection: 'column', justifyContent: 'center', flex: 1}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                                <Pressable onPress={() => navigation.navigate('Home')}>
                                    <HeaderLogo style={styles.headerIcon}/>
                                </Pressable>
                            </View>
                            <Text style={{alignItems: 'center', textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}>{topic}</Text>
                        </View>
                        {!isLoggedIn ?
                            <View style={styles.buttonContainer}>
                                <Pressable onPress={() => Login()}><Text
                                    style={styles.button}>Login</Text></Pressable>
                                <Pressable onPress={() => navigation.navigate('Create Account')}><Text
                                    style={styles.button}>Register</Text></Pressable>
                            </View> :
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable onPress={() => linkTo('/user/' + User.userID)}><Text
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
                                    <Pressable onPress={() => navigation.navigate('Create Post')}>
                                        <Text style={styles.button}>Create Post</Text>
                                    </Pressable>
                                </View>
                                <View style={{flex: 6}}/>
                            </View> : <View style={{flex: 6}}/>}
                    </View>
                    <View style={{flex: 5, flexDirection: 'column'}}>
                        <View style={{flex: 1, backgroundColor: '737373'}}/>
                        <View style={{flexBasis: 1, flex: 100}}>
                            <FlatList style={{flexGrow: 0}} data={timelineData}
                                      renderItem={renderPost} keyExtractor={item => item.postId}
                                      extraData={isLoggedIn} showsVerticalScrollIndicator={false}/>
                        </View>
                        <View style={{flex: 1, backgroundColor: '737373'}}/>
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