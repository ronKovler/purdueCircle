import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import {Choo, HeaderLogo, styles} from './stylesheet';
import {renderPost} from "./post";
import User from "./user";
import {Link, useIsFocused, useLinkTo} from "@react-navigation/native";

export default function ProfilePage({route, navigation}) {
    const LogOut = async () => {
        await User.logout()
        await navigation.navigate('Login');
    }

    const [userlineData, setUserlineData] = useState(null);
    const [userID, setUserID] = useState(route.params.id);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [followsData, setFollowsData] = useState(null);
    const [topicsData, setTopicsData] = useState(null);
    const [reactedData, setReactedData] = useState(null);
    const [isPrivate, setPrivate] = useState(false);
    const isFocused = useIsFocused();
    const linkTo = useLinkTo();
    const [onReactedTo, setOnReactedTo] = useState(false);
    const onFocusColor = "rgba(255,222,89,0.5)";
    const offFocusColor = "#ffde59";
    const [postColor, setPostColor] = useState(onFocusColor);
    const [reactedColor, setReactedColor] = useState(offFocusColor);
    const [profilePic, setProfilePic] = useState(null)
    const [currentBlocks, setCurrentBlocks] = useState(false)
    const [currentFollows, setCurrentFollows] = useState(false);
    const [userBlocks, setUserBlocks] = useState(false);
    const [userFollows, setUserFollows] = useState(false);

    useEffect(async () => {
        setIsLoading(true)
        setUserlineData('');
        setUserID(route.params.id);
        if (isFocused) {
            const data = await getUserline();
            const followsData = await getFollowsData()
            const topicData = await getTopicData()
            if (userID !== User.userID.toString()) {
                await fetch(serverAddress + '/api/user/get_user/' + userID, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': serverAddress,
                    }
                }).then(items => items.json()).then(items => {
                    setUsername(items.username)
                    setFirstName(items.firstName)
                    setLastName(items.lastName)
                    setPrivate(items.isPrivate)
                    setProfilePic(items.profileImagePath)
                })
            } else {
                setUsername(User.username)
                setFirstName(User.firstName)
                setLastName(User.lastName)
                setPrivate(User.isPrivate)
                setProfilePic(User.profilePicture)
                setUserBlocks(User.isBlocked)
            }
            await fetch(serverAddress + '/api/user/get_relationship/' + User.userID + '/' + userID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                }
            }).then(items => items.json()).then(items => {
                setCurrentBlocks(items.otherUserBlocked);
                setUserBlocks(items.currentUserBlocked);
                setCurrentFollows(items.currentUserFollowing);
                setUserFollows(items.otherUserFollowing);
            })
            setUserlineData(data);
            setFollowsData(followsData)
            setTopicsData(topicData);
        }
        setIsLoading(false);
    }, [isFocused, userID])


    const renderTopic = ({item}) => {
        return (
            // <Pressable onPress={() => navigation.navigate("Topic Page", item.content)}>
            //     <Text style={styles.button}>{item.content}</Text>
            // </Pressable>
            <Link style={styles.button} to={'/topic/' + item.content}>{item.content}</Link>
        )
    };

    const renderUser = ({item}) => {
        return (
            // <Pressable onPress={() => navigation.navigate("Profile Page", {id: item.userID})}>
            <Pressable onPress={() => {
                setUsername(item.username)
                setUserID(item.userID)
                linkTo('/user/' + item.userID)
                setUserlineData('')
            }}>
                <Text style={styles.button}>{item.username}</Text>
            </Pressable>
        )
    };

    async function getReactedTo() {
        fetch(serverAddress + '/api/user/get_reacted_to_posts/' + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then(json => {
            if(reactedData === null)
                setReactedData(json)
        })
    }

    async function renderReacted() {
        if(!onReactedTo){
            await getReactedTo()
            setUserlineData(null)
            setPostColor(offFocusColor)
            setReactedColor(onFocusColor)
        } else {
            setUserlineData(await getUserline())
            setReactedData(null);
            setPostColor(onFocusColor);
            setReactedColor(offFocusColor);
        }
        setOnReactedTo(!onReactedTo);
    }

    async function getUserline() {
        const response = await fetch(serverAddress + '/api/user/get_userline/' + userID + '/' + User.userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            },
        })
        return await response.json()
    }

    async function getFollowsData() {
        const response = await fetch(serverAddress + '/api/user/get_user_following/' + userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            },
        })
        return await response.json()
    }

    async function getTopicData() {
        const response = await fetch(serverAddress + '/api/user/get_user_topic_following/' + userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            },
        })
        return await response.json()
    }

    async function toggleBlock() {
        let url = serverAddress + '/api/user'
        if (!currentBlocks) {
            url += '/block_user/'
        } else {
            url += '/unblock_user/'
        }
        url += User.userID + "/" + userID
        try {
            await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
            }).then((response) => {
                if (response.status == 200)
                    setCurrentBlocks(!currentBlocks)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function toggleFollow(){
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/user/"
        if (!currentFollows) {
            url += "follow_user/" + User.userID + "/" + userID
        } else {
            url += "unfollow_user/" + User.userID + "/" + userID
        }
        try {
            await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
            }).then(() => setCurrentFollows(!currentFollows), () => console.log("Promise unfulfilled"))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styled.container}>
            {isLoading ? <Choo/> :
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                        {User.isLoggedIn ?
                            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                                <Pressable onPress={() => LogOut()}><Text
                                    style={styles.button}>Log Out</Text></Pressable>
                            </View> : <View style={{flex: 1}}/>}
                        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                            <Pressable onPress={() => navigation.navigate('Home')}>
                                <HeaderLogo style={styles.headerIcon}/>
                            </Pressable>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            {userID == User.userID ?
                                    <Pressable onPress={() => navigation.navigate('Edit Profile')}>
                                        <Text style={styles.button}>Edit Profile</Text>
                                    </Pressable> :
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <Pressable onPress={() => linkTo("/dm/" + userID)}>
                                            {!currentBlocks || !userBlocks ?
                                                <Text style={styles.button}>DM</Text> : null}
                                        </Pressable>
                                        <Pressable onPress={() => toggleBlock()}>
                                            {!currentBlocks ?
                                                <Text style={styles.button}>Block</Text> :
                                                <Text style={styles.button}>Unblock</Text>
                                            }
                                        </Pressable>
                                        <Pressable onPress={() => toggleFollow()}>
                                                {currentFollows ?
                                                    <Text style={[styles.button, {backgroundColor: onFocusColor}]}>Following</Text>
                                                : <Text style={[styles.button, {backgroundColor: offFocusColor}]}>Follow</Text>}
                                        </Pressable>
                                    </View>}
                        </View>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                </View>}
            {isLoading ? null :
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
                            <Choo/>
                        </View>
                        <View style={{flex: 6}}>
                            <View style={{flex: 1}}/>
                            <View style={{flex: 1}}>
                                <Text style={styles.header}>
                                    {username}'s Followed Topics
                                </Text>
                            </View>
                            <View style={{flex: 10}}>
                                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                                <FlatList
                                    data={topicsData}
                                    renderItem={renderTopic}
                                    keyExtractor={item => item.content}
                                    showsVerticalScrollIndicator={false}
                                    extraData={userID}
                                />
                                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 5, flexDirection: 'column'}}>
                        <View style={{flex: 1, backgroundColor: '737373'}}/>
                        <View style={{flexDirection: "row", padding: 20, paddingLeft: 40}}>
                            <Image style={styled.profilePicture} source={{uri: profilePic}}/>
                            <View style={{flexDirection: 'column', paddingLeft: 15}}>
                                { isPrivate ? null :
                                <Text style={{fontWeight: 'bold', fontSize: '28px', margin: 10, marginBottom: 3}}>{firstName} {lastName}</Text>}
                                <Text style={{fontSize: '16px', margin: 13, marginTop: 0}}>{username}</Text>
                            </View>
                        </View>

                        <View style={{flex: 6, backgroundColor: '737373'}}>
                            {!onReactedTo ?
                                <View style={{flexDirection: "row"}}>
                                    <View style={[styles.button, {backgroundColor: postColor}]}>
                                        <Text style={{fontWeight: 'bold'}}>{username}'s Posts</Text>
                                    </View>
                                    <Pressable style={[styles.button, {backgroundColor: reactedColor}]} onPress={() => renderReacted()}>
                                        <Text style={{fontWeight: 'bold'}}>{username}'s Reacted To</Text>
                                    </Pressable>
                                </View>
                                :
                                <View style={{flexDirection: "row"}}>
                                    <Pressable style={[styles.button, {backgroundColor: postColor}]} onPress={() => renderReacted()}>
                                        <Text style={{fontWeight: 'bold'}}>{username}'s Posts</Text>
                                    </Pressable>
                                    <View style={[styles.button, {backgroundColor: reactedColor}]}>
                                        <Text style={{fontWeight: 'bold'}}>{username}'s Reacted To</Text>
                                    </View>
                                </View>
                            }
                        </View>
                        <View style={{flexBasis: 1, flex: 100, paddingTop: 30}}>
                            {!onReactedTo ?
                                <FlatList data={userlineData} renderItem={renderPost} keyExtractor={item => item.postId}
                                          extraData={userID} style={{flexGrow: 0}}
                                          showsVerticalScrollIndicator={false}/>
                                :
                                <FlatList data={reactedData} renderItem={renderPost} keyExtractor={item => item.postId}
                                          extraData={userID} style={{flexGrow: 0}}
                                          showsVerticalScrollIndicator={false}/>}
                        </View>
                        <View style={{flex: 2, backgroundColor: '737373'}}/>
                    </View>
                    <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                        <View style={{flex: 3, alignItems: 'center'}}>
                            {!isPrivate && <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 15
                            }}>{firstName} {lastName}</Text>}
                        </View>
                        <View style={{flex: 6}}>
                            <View style={{flex: 1}}/>
                            <View style={{flex: 1}}>
                                <Text style={styles.header}>
                                    {username}'s Followed Users
                                </Text>
                            </View>
                            <View style={{flex: 10}}>
                                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                                <FlatList
                                    data={followsData}
                                    renderItem={renderUser}
                                    keyExtractor={item => item.username}
                                    showsVerticalScrollIndicator={false}
                                    extraData={userID}
                                />
                                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                            </View>
                        </View>
                    </View>
                </View>}
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
    },
    profilePicture: {
        height: 150,
        width: 150,
        borderRadius: 300,
        aspectRatio: 1,
    }
})