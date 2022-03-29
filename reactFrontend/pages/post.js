import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import User from "./user";
import {useNavigation} from '@react-navigation/native';
import {Link} from "@react-navigation/native";

export default function Post(props) {
    const [user, setUser] = useState(props.user)
    const [topic, setTopic] = useState(props.topic)
    const [comments, setComments] = useState()
    const [content, setContent] = useState(props.content)
    const [isLoading, setIsLoading] = useState(true)
    const [followingTopic, setFollowingTopic] = useState(false)
    const [followingUser, setFollowingUser] = useState(false)
    const [liked, setLiked] = useState(false)
    const [anonymous, setAnonymous] = useState(props.anonymous)
    const postID = props.postID
    const [userID, setUserID] = useState(props.userID)
    const navigation = useNavigation();

    async function getPostInfo() {
        try {
            console.log(postID)
            await fetch(serverAddress + '/api/post/get_post/' + postID , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },

            }).then(response => response.json()).then(
                response => {
                    console.log(response)
                    setUserID(response.userID)
                    setUser(response.username)
                    setTopic(response.topic)
                    setContent(response.content)
                    setAnonymous(response.anonymous)
                }
            )
            await fetch(serverAddress + 'api/post/is_liked/' + 1 + "/" + postID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                }//,
                //body: {
                    //'postID': postID,
                    //'userID': 1
                //}
            }).then(response => response.json()).then(
                response => {
                    setLiked(response)
                }
            )

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    //TODO: Force login if interacted while not logged in
    async function toggleFollowUser() {
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/user/"
        if (!followingUser) {
            url += "follow_user/" + User.userID + "/" + userID
        } else {
            url += "unfollow_user/" + User.userID + "/" + userID
        }
        try {
            await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
            }).then(() => setFollowingUser(!followingUser), () => console.log("Promise unfulfilled"))
        } catch (error) {
            console.error(error)
        }
    }

    async function toggleLike() {
        if (!User.isLoggedIn) {
            log.console("UHHHH")
            return
        }
        let url = serverAddress + '/api/user/'
        if (!liked) {
            url += 'like_post'
        } else {
            url += 'unlike_post'
        }
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                }),
            }).then(() => {
                setLiked(!liked)
            }, () => console.log("Promise unfulfilled"))
        } catch (error) {
            console.error(error)
        }
    }

    async function toggleFollowTopic() {
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/user/"
        if (!followingTopic) { // add user to follow list if following
            url += "follow_topic"
        } else {
            url += "unfollow_topic"
        }
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'userID': User.getuserID(),
                    'topic_name': topic,
                }),
            }).then(() => setFollowingTopic(!followingTopic))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={{
            backgroundColor: "#5F5F5F",
            margin: 5,
            flexDirection: 'column',
            height: 'fit-content',
            borderRadius: 20
        }}>
            <View style={postStyles.headerContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {!props.moves ?
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Pressable
                                    onClick={() => navigation.navigate('Profile Page')}>
                                    <Image style={postStyles.icon}
                                           source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1'}}/>
                                </Pressable>
                                { anonymous ?
                                    <Pressable style={{paddingLeft: 10}}
                                               onClick={() => console.log("printed?")}>
                                        <Text style={postStyles.username}>Anonymous</Text>
                                    </Pressable> :
                                    <Link style={postStyles.username} to={'/user/' + userID}>{user}</Link>
                                    }
                                {(User.isLoggedIn && User.userID !== userID && !anonymous) ?
                                    <Pressable
                                        onPress={() => toggleFollowUser()}>
                                        {!followingUser ?
                                            <Text style={postStyles.followButton}>Follow</Text> :
                                            <Text style={postStyles.followButton}>Unfollow</Text>}
                                    </Pressable> : null}
                            </View> : null
                        }
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {User.isLoggedIn ?
                            <Pressable style={{paddingRight: 10}}
                                       onPress={() => toggleFollowTopic()}>
                                {!followingTopic ?
                                    <Text style={postStyles.followButton}>Follow</Text> :
                                    <Text style={postStyles.followButton}>Unfollow</Text>}
                            </Pressable> : null}
                        <Pressable onPress={() => navigation.navigate("Topic Page", topic)}>
                            <Text style={postStyles.topicStyle}>{topic}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={postStyles.box}>
                <Text style={postStyles.text}>{content}</Text>
                <View style={{flexBasis: 1, padding: 5}}>
                    {User.isLoggedIn ?
                        <Pressable onPress={() => toggleLike()}>
                            {liked ?
                                <Image source={require('../assets/full_heart.svg')}
                                       style={[postStyles.likeButton, {tintColor: 'red'}]}/> :
                                <Image source={require('../assets/heart.svg')} style={postStyles.likeButton}/>}
                        </Pressable> : null}
                </View>
            </View>
        </View>
    )
}
/*
Post.defaultProps = {
    moves: true
};
*/

const postStyles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        //paddingTop: 5,
        flex: 1,
        minWidth: 300,
        maxHeight: 47.5,
        // borderBottomWidth: 4,
        // borderBottomColor: "#737373",
    },
    text: {
        borderTopColor: '#737373',
        color: 'white',
        flex: 2
    },
    box: {
        borderTopWidth: 4,
        borderTopColor: '#737373',
        padding: 12.5,
        paddingBottom: 25,
        flex: 2
    },
    button: {
        flex: 1,
        backgroundColor: "#969696",
    },
    username: {
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: 4,
        paddingRight: 7,
    },
    topicStyle: {
        flex: 1,
        fontWeight: 'bold',
        // alignSelf: 'flex-end',
        marginRight: 6,
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius: 50,
        flex: 1,
        aspectRatio: 1,
        padding: 10
    },
    followButton: {
        color: 'blue',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    likeButton: {
        maxWidth: 20,
        aspectRatio: 1,
        resizeMode: 'contain',
        flex: 1,
        marginLeft: 10,
    }
})