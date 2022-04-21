import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {styles, HeaderLogo} from './stylesheet';
import {Post, renderPost} from "./post";
import User from "./user";
import {Link, useIsFocused} from "@react-navigation/native";

export default function HomeScreen({navigation}) {
    const [isLoggedIn, setIsLoggedIn] = useState(User.isLoggedIn)
    const [loading, setLoading] = useState(true)
    const [timelineData, setTimelineData] = useState(null)
    const [dmData, setDmData] = useState(null)
    const isFocused = useIsFocused()
    const [currentPage, setCurrentPage] = useState(null) //3 states: hotTimeline, userTimeline, savedPosts
    const [isDown, setIsDown] = useState(false)

    //TODO: Setup timer to get new posts

    const renderDms = ({item}) => {
        return <Link style={[styles.button, {alignItems: 'flex-start'}]} to={'/dm/' + item.toUserID}>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>{item.fromUsername}{'\n'}</Text>
            <Text style={{fontWeight: 'normal'}}>{item.content}</Text>
        </Link>
        // TODO: check item fields for reactions
    };

    const LogOut = async () => {
        await User.logout()
        await navigation.navigate('Login')
        setIsLoggedIn(User.isLoggedIn)
    }

    useEffect(async () => {
        if (isFocused === true) {
            await checkLoggedIn();
            await getTimeline();
        } else {
            setTimelineData(null);
        }
    }, [isFocused])

    const UserTimeline = async () => {
        await GetLine('/api/user/get_user_timeline/' + User.userID, 'userTimeline');
    }

    const SavedPosts = async () => {
        await GetLine('/api/user/get_saved_posts_line/' + User.userID, 'savedPosts');
    }

    const HotPosts = async () => {
        await GetLine('/api/user/hot_timeline/' + User.userID, 'hotTimeline');
    }

    const GetLine = async (apiURL, page) => {
        setLoading(true);
        await setTimelineData(null)
        await setDmData(null);
        // timelineData = null


        await fetch(serverAddress + "/api/dm/get_conversations/" + User.userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then((json) => {
            setDmData(json);
            // timelineData = json
        }).catch(() => {
            console.error("Cannot connect to server")
            setIsDown(true);
            // isDown = true;
        })


        await fetch(serverAddress + apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then((json) => {
            setTimelineData(json);
            // timelineData = json
            setCurrentPage(page);
            // currentPage = page;
            setLoading(false);
        }).catch(() => {
            console.error("Cannot connect to server")
            setIsDown(true);
            // isDown = true;
        })
    }

    const Login = async () => {
        await navigation.navigate('Login')
        setIsLoggedIn(User.isLoggedIn)
    }

    async function getTimeline() {
        if (User.isLoggedIn) {
            await UserTimeline();
        } else {
            await HotPosts();
        }
    }

    async function checkLoggedIn() {
        setIsLoggedIn(User.isLoggedIn)
    }

    return (
        <View style={styled.container}>
            {!loading && isFocused ?
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                        {isLoggedIn ?
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable onPress={() => LogOut()}><Text
                                    style={styles.button}>Log Out</Text></Pressable>
                            </View> : <View style={{flex: 1}}/>}
                        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                            <HeaderLogo style={styles.headerIcon}/>
                        </View>
                        {!isLoggedIn ?
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable onPress={() => Login()}><Text
                                    style={styles.button}>Login</Text></Pressable>
                                <Pressable onPress={() => navigation.navigate('Create Account')}><Text
                                    style={styles.button}>Register</Text></Pressable>
                            </View> :
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable
                                    onPress={() => navigation.navigate('Profile Page', {id: User.userID})}><Text
                                    style={styles.button}>View Profile</Text></Pressable>
                            </View>
                        }
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                    </View>
                </View> :
                <View>
                    {isDown ? <Text style={{fontWeight: "bold", color: "red", alignSelf: "center", fontSize: 48}}>Cannot connect to server</Text> : null}
                    <Image style={[styles.image, {alignSelf: 'center'}]}
                           source={{uri: 'https://purduecircle.me:8443/UI_images/choo.png'}}/>
                </View>
            }

            {!loading && isFocused ?
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
                            <Image style={styles.image}
                                   source={{uri: 'https://purduecircle.me:8443/UI_images/choo.png'}}/>
                        </View>
                        {isLoggedIn ?
                            <View style={{flex: 6, justifyContent: 'center'}}>
                                <View style={{flex: 2}}/>
                                <View style={{flex: 1}}>
                                    <Pressable onPress={() => navigation.navigate('Search')}>
                                        <Text style={styles.button}>Search</Text>
                                    </Pressable>
                                </View>
                                {currentPage !== 'userTimeline' ?
                                    <View style={{flex: 1}}>
                                        <Pressable onPress={() => getTimeline()}>
                                            <Text style={styles.button}>Following Posts</Text>
                                        </Pressable>
                                    </View> : null}
                                {currentPage !== 'hotTimeline' ?
                                    <View style={{flex: 1}}>
                                        <Pressable onPress={async () => await HotPosts()}>
                                            <Text style={styles.button}>Hot Posts</Text>
                                        </Pressable>
                                    </View> : null}
                                {currentPage !== 'savedPosts' ?
                                    <View style={{flex: 1}}>
                                        <Pressable onPress={async () => await SavedPosts()}>
                                            <Text style={styles.button}>Saved Posts</Text>
                                        </Pressable>
                                    </View> : null}
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
                            <FlatList style={{flexGrow: 0}} data={timelineData} renderItem={renderPost}
                                      keyExtractor={item => item.postID}
                                      extraData={timelineData} showsVerticalScrollIndicator={false}/>
                        </View>
                        <View style={{flex: 1, backgroundColor: '737373'}}/>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey', alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold', paddingBottom: 20}}>Current DMs</Text>
                        <FlatList style={{flexGrow: 0}} data={dmData} renderItem={renderDms}
                                    keyExtractor={item => item.dmID} extraData={dmData}
                                    showsVerticalScrollIndicator={false}>
                        </FlatList>
                    </View>
                </View>
                : null
            }
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