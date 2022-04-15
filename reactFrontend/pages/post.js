import {Pressable, StyleSheet, Text, View, Image, TextInput, FlatList} from "react-native";
import React, {useState} from "react";
import User from "./user";
import {useLinkTo} from '@react-navigation/native';
import {Link} from "@react-navigation/native";

const renderPost = ({item}) => {
    let link = item.link
    if (item.link !== null && !item.link.includes('https://') && !item.link.includes('http://')) {
        link = 'https://' + item.link;
    }
    return <Post topic={item.topicName} user={item.username} content={item.content} postID={item.postID}
                 userID={item.userID} anonymous={item.anonymous} link={link} imagePath={item.imagePath}
                 netReactions={item.netReactions} reaction={item.reaction} userFollowed={item.userFollowed}
                 topicFollowed={item.topicFollowed} isSaved={item.isSaved} comments={item.comments}/>
    // TODO: check item fields for reactions
};

function Post(props) {
    // const [user, setUser] = useState(props.user)
    // const [topic, setTopic] = useState(props.topic)
    // const [comments, setComments] = useState(props.comments)
    // const [content, setContent] = useState(props.content)
    // const [anonymous, setAnonymous] = useState(props.anonymous)
    // const [userID, setUserID] = useState(props.userID)
    // const [link, setLink] = useState(props.link);

    const user = props.user;
    const topic = props.topic;
    const content = props.content;
    const anonymous = props.anonymous;
    const userID = props.userID;
    const postID = props.postID
    const link = props.link;
    const comments = props.comments;

    const [newComment, setNewComment] = useState("")
    const [topicFollowed, setTopicFollowed] = useState(props.topicFollowed)
    const [userFollowed, setUserFollowed] = useState(props.userFollowed)
    const [reaction, setReaction] = useState(props.reaction)
    const [netReactions, setNetReactions] = useState(props.netReactions)
    const [isSaved, setIsSaved] = useState(props.isSaved)
    const [image, setImage] = useState(props.imagePath);
    const linkto = useLinkTo();

    const renderComment = ({item}) => {
        return (
            <View style={postStyles.commentBoundary}>
                <Link style={postStyles.commentUsername} to={"/user/" + item.userID}>{item.username}</Link>
                <Text style={postStyles.commentContent}>{item.content}</Text>
            </View>
        )
    }

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
            let newNum = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                }),
            })
            //TODO: catch invalid response
            newNum = await newNum.json()
            let temp = 0
            if (reaction === 0) temp = -1
            setReaction(temp)
            setNetReactions(newNum)
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
            let newNum = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                }),
            })
            newNum = await newNum.json()
            let temp = 1
            if (reaction === 1) temp = -1
            setReaction(temp)
            setNetReactions(newNum)
        } catch (error) {
            console.error(error)
        }
    }

    async function toggleSavePost() {
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/user/"
        if (!isSaved) {
            url += "save_post"
        } else {
            url += "unsave_post"
        }

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID
                })
            }).then((response) =>{
                if(response.status === 200)
                    setIsSaved(!isSaved)
            })
        } catch (error) {
            console.log(error)
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
        url += "/" + User.userID + "/" + topic
        try {
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
            }).then(() => setTopicFollowed(!topicFollowed))
        } catch (error) {
            console.log(error)
        }
    }

    async function postComment() {
        if (!User.isLoggedIn) {
            return
        }
        let url = serverAddress + "/api/post/create_comment"
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': await User.getuserID(),
                    'postID': postID,
                    'content': newComment,
                    'username': User.username
                })
            }).then(() => setNewComment(""))
        } catch (error) {
            console.log(error)
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
                                    onClick={() => linkto("/user/" + userID)}>
                                    <Image style={postStyles.icon}
                                           source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1'}}/>
                                </Pressable>
                                {anonymous ?
                                    <Text style={postStyles.username}>Anonymous</Text>
                                    :
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
                        <Link style={postStyles.topicStyle} to={'/topic/' + topic}>{topic}</Link>
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
                                   style={{height: '250px', width: 'auto', resizeMode: 'center'}}/>
                        </View>
                        : null
                    }
                </View>
                {link !== null ?
                    <View style={{flexDirection: "row", margin: 4, marginBottom: 10}}>
                        <Text style={[postStyles.text, {color: 'blue', alignSelf: 'flex-end'}]} onPress={() => window.open(link, '_blank')}>{link}</Text>
                    </View>
                    : null
                }
                <View style={{flexBasis: 1}}>
                    {User.isLoggedIn ?
                        <>
                            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                                <Pressable onPress={() => toggleLike()} style={{flex: 2}}>
                                    {reaction === 0 ?
                                        <Image source={require('../assets/thumbs-up-full.svg')}
                                               style={[postStyles.likeButton, {tintColor: 'red'}]}/> :
                                        <Image source={require('../assets/thumbs-up-empty.svg')}
                                               style={postStyles.likeButton}/>}
                                </Pressable>
                                <Text style={[postStyles.text, {paddingTop: 1}]}>{netReactions}</Text>
                                <Pressable onPress={() => toggleDislike()} style={{flex: 2}}>
                                    {reaction === 1 ?
                                        <Image source={require('../assets/thumbs-down-full.svg')}
                                               style={[postStyles.likeButton, {tintColor: 'blue'}]}/> :
                                        <Image source={require('../assets/thumbs-down-empty.svg')}
                                               style={postStyles.likeButton}/>}
                                </Pressable>
                                <Pressable onPress={() => toggleSavePost()} style={{flex: 3}}>
                                    {!isSaved ?
                                        <Text style={postStyles.followButton}>Save</Text> :
                                        <Text style={postStyles.followButton}>Unsave</Text>}
                                </Pressable>
                                <View style={{flex: 16}}>
                                </View>
                            </View>
                            <View style={{flexDirection: "column", justifyContent: 'space-between'}}>
                                <View style={postStyles.commentWindow}>
                                    <FlatList style={{flexGrow: 0}} data={comments} renderItem={renderComment}
                                              keyExtractor={item => item.content}
                                              extraData={comments} showsVerticalScrollIndicator={false}/>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <TextInput
                                        style={postStyles.commentInputBox}
                                        onChangeText={setNewComment}
                                        value={newComment}
                                        placeholder="Write a comment..."
                                    />
                                    <Pressable onPress={() => postComment()}>
                                        <Text style={postStyles.button}>Post</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </>
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
        paddingBottom: 120,
        overflow: 'scroll',
        flex: 2
    },
    button: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        margin: 5,
        backgroundColor: "#ffde59",
        resizeMode: 'contain',
        borderRadius: 5
    },
    username: {
        flex: 1,
        fontWeight: 'bold',
        paddingLeft: 10,
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
        color: '#ffde59',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    likeButton: {
        maxWidth: 20,
        aspectRatio: 1,
        resizeMode: 'contain',
        flex: 1,
        marginLeft: 10,
    },
    commentInputBox: {
        backgroundColor: '#d9d9d9',
        textDecorationColor: '#a6a6a6',
        alignSelf: 'stretch',
        padding: 7.5,
        margin: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
    },
    commentUsername: {
        alignSelf: "left",
        // color: '#ffde59',
        color: 'black',
        // fontWeight: 'bold',
    },
    commentContent: {
        paddingLeft: 5,
        alignSelf: "left",
        // color: '#ffde59',
        color: 'white',
        // fontWeight: 'bold',
    },
    commentBoundary: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 2,
    },
    commentWindow: {
        margin: 5,
    }
})

export {Post, renderPost}