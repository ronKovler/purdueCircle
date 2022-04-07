import {Pressable, StyleSheet, Text, View, Image, Linking} from "react-native";
import React, {useEffect, useState} from "react";
import User from "./user";
import {useNavigation} from '@react-navigation/native';
import {Link} from "@react-navigation/native";

const renderPost = ({item}) => {
    let link = item.link
    if(item.link !== null && !item.link.includes('https://') && !item.link.includes('http://')){
        link = 'https://' + item.link;
    }
    return <Post topic={item.topicName} user={item.username} content={item.content} postID={item.postID}
                 userID={item.userID} anonymous={item.anonymous} link={link} imagePath={item.imagePath}
                 netReactions={item.netReactions} reaction={item.reaction} userFollowed={item.userFollowed} topicFollowed={item.topicFollowed}/>
    // TODO: check item fields for reactions
};

function Post(props) {
    const [user, setUser] = useState(props.user)
    const [topic, setTopic] = useState(props.topic)
    const [comments, setComments] = useState()
    const [content, setContent] = useState(props.content)
    const [isLoading, setIsLoading] = useState(true)
    const [topicFollowed, setTopicFollowed] = useState(props.topicFollowed)
    const [userFollowed, setUserFollowed] = useState(props.userFollowed)
    const [reaction, setReaction] = useState(props.reaction)
    const [anonymous, setAnonymous] = useState(props.anonymous)
    const postID = props.postID
    const [userID, setUserID] = useState(props.userID)
    const navigation = useNavigation();
    const [link, setLink] = useState(props.link);
    const [image, setImage] = useState(props.imagePath);
    const [netReactions, setNetReactions] = useState(props.netReactions)

    //TODO: set liked/disliked props


    //TODO: Force login if interacted while not logged in
    async function toggleFollowUser() {
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/user/"
        if (!userFollowed) {
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
            }).then(() => setUserFollowed(!userFollowed), () => console.log("Promise unfulfilled"))
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
        if (reaction !== 0) {
            url += 'like_post'
        } else {
            url += 'unlike_post'
        }
        try {
            const newNum = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                }),
            }).then(() => {
                let temp = 0
                if (reaction === 0) temp = -1
                setReaction(temp)
                setNetReactions(newNum)
            }, () => console.log("Promise unfulfilled"))
        } catch (error) {
            console.error(error)
        }
    }

    async function toggleDislike() {
        if (!User.isLoggedIn) {
            log.console("UHHHH")
            return
        }
        let url = serverAddress + '/api/user/'
        if (reaction !== 1) {
            url += 'dislike_post'
        } else {
            url += 'undislike_post'
        }
        try {
            const newNum = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                }),
            }).then(() => {
                let temp = 1
                if (reaction === 1) temp = -1
                setReaction(temp)
                setNetReactions(newNum)
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
        if (!topicFollowed) { // add user to follow list if following
            url += "follow_topic"
        } else {
            url += "unfollow_topic"
        }
        url += "/" + userID + "/" + topic
        try {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
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
                                {anonymous ?
                                    <Pressable style={{paddingLeft: 10}}
                                               onClick={() => console.log("printed?")}>
                                        <Text style={postStyles.username}>Anonymous</Text>
                                    </Pressable> :
                                    <Link style={postStyles.username} to={'/user/' + userID}>{user}</Link>
                                }
                                {(User.isLoggedIn && User.userID !== userID && !anonymous) ?
                                    <Pressable
                                        onPress={() => toggleFollowUser()}>
                                        {!userFollowed ?
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
                                {!topicFollowed ?
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
                <View style={{flex: 3, padding: 5, flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Text style={postStyles.text}>{content}</Text>
                    </View>
                    {image !== null ?
                        <View style={{flex: 1}}>
                            <Image source={{uri: image}}
                                   style={{height: 150, width: 150}}/>
                        </View>
                        : null
                    }
                </View>
                {link !== null ?
                    <Text style={{color: 'blue'}} onPress={() => window.open(link, '_blank')}>{link}</Text>
                    : null
                }
                <View style={{flexBasis: 1, padding: 5}}>
                    {User.isLoggedIn ?
                        <View style={{flexDirection:"row"}}>
                            <Pressable onPress={() => toggleLike()} style={{flex: 1}}>
                                {reaction === 0 ?
                                    <Image source={require('../assets/thumbs-up-full.svg')}
                                           style={[postStyles.likeButton, {tintColor: 'red'}]}/> :
                                    <Image source={require('../assets/thumbs-up-empty.svg')}
                                           style={postStyles.likeButton}/>}
                            </Pressable>
                            <Text style={[postStyles.text, {paddingTop: 1}]}>{netReactions}</Text>
                            <Pressable onPress={() => toggleDislike()} style={{flex: 1}}>
                                {reaction === 1 ?
                                    <Image source={require('../assets/thumbs-down-full.svg')} style={[postStyles.likeButton, {tintColor: 'blue'}]}/> :
                                    <Image source={require('../assets/thumbs-down-empty.svg')} style={postStyles.likeButton}/>}
                            </Pressable>
                            <View style={{flex: 16}}>

                            </View>
                        </View>
                        : null}

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
        flex: 1
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

export {Post, renderPost}