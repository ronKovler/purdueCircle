import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TextInput, Image, Pressable} from "react-native";
import {Link, useIsFocused} from "@react-navigation/native";
import User from "./user";
import {Choo} from "./stylesheet";


function renderMessage({item}) {
    const userID = item.fromUserID;
    return (
        <View style={{flex: 1}}>
            {userID === User.userID ?
                <View style={{direction: 'rtl'}}>
                    <View style={[dmStyles.messageBox, {backgroundColor: '#ffde59'}]}>
                        <Text style={[dmStyles.messageText, {color: 'black'}]}>{item.content}</Text>
                    </View>
                </View>
                :
                <View style={[dmStyles.messageBox, {backgroundColor: '#484848'}]}>
                    <Text style={[dmStyles.messageText, {color: 'white'}]}>{item.content}</Text>
                </View>
            }
        </View>
    )
}

let stompClient;
export default function DirectMessagePage({navigation, route}) {
    const [messageData, setMessageData] = useState(null)
    const [toUser, setToUser] = useState(route.params.id)
    const [toUsername, setToUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const list = useRef(1);

    useEffect(async () => {
        if (isFocused) {
            list.current = 1;
            setIsLoading(true)
            await getReceivingUser()
            await getMessageData()
            connect();
            setIsLoading(false)
        }
    }, [isFocused])

    async function getMessageData() {
        await fetch(serverAddress + '/api/dm/get_user_direct_messages/' + User.userID + '/' + toUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then(json => {
            setMessageData(json)
        })
        //TODO: catch statement
    }

    async function onMessageReceived(msg) {
        const body = JSON.parse(msg.body);
        if (body.fromUserID == toUser) {
            console.log(body.fromUserID)
            // setMessageData([...messageData, body])
            // setMessageData('')
            await getMessageData()
        }
    }

    function connect() {
        const Stomp = require("stompjs")
        let SockJS = require("sockjs-client")
        SockJS = new SockJS(serverAddress + '/ws');
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, () => {
            stompClient.subscribe('/user/' + User.userID + '/queue/messages', onMessageReceived)
        }, (err) => {
            console.error(err)
        })
    }

    async function sendMessage() {
        if (newMessage.trim() !== '') {
            const message = {
                fromUserID: User.userID,
                toUserID: toUser,
                content: newMessage,
            }
            stompClient.send("/app/chat", {}, JSON.stringify(message))
            setNewMessage("");
            setMessageData([...messageData, message])
            //TODO: fix sent message rendering and beautify
            list.current.scrollToEnd();
        }
    }

    async function getReceivingUser(){
        await fetch(serverAddress + '/api/user/get_user/' + toUser, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then(json => {
            setToUsername(json.username)
            setProfilePic(json.profileImagePath)
        })
    }

    return (
        <View style={dmStyles.fullWindow}>
            {isLoading ? <Choo/> :
                <View style={dmStyles.mainWindow}>
                    <View style={dmStyles.headerBar}>
                        <Pressable onPress={() => navigation.pop() || navigation.navigate("Home")}>
                            <Image style={dmStyles.backButton} source={require("../assets/back-button.svg")}/>
                        </Pressable>
                        <Image style={dmStyles.headerProfilePic} source={{uri: profilePic}}/>
                        <Link to={'/user/' + toUser} style={dmStyles.contactUsername}>{toUsername}</Link>
                    </View>
                    <View style={dmStyles.messageList}>
                        {messageData !== null ? <FlatList data={messageData} renderItem={renderMessage} keyExtractor={item => item.dmID} ref = {list}
                                  onContentSizeChange={() => list.current.scrollToEnd({animated: false})}/> : null}
                    </View>
                    <View style={dmStyles.messageInput}>
                        <TextInput placeholder={"Write a message..."} value={newMessage}
                                   onChangeText={message => setNewMessage(message)} onSubmitEditing={sendMessage}/>
                    </View>
                </View>}
        </View>
    )
}

const dmStyles = StyleSheet.create({
    fullWindow: {
        backgroundColor: "#737373",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    mainWindow: {
        flex: 1,
        maxWidth: 800,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#5f5f5f",
    },
    messageInput: {
        // flex: 1,
        margin: 5,
        padding: 10,
        fontSize: 32,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    headerBar: {
        padding: 10,
        flexDirection: 'row',
        flex: 1,
    },
    headerProfilePic: {
        height: 60,
        borderRadius: 120,
        aspectRatio: 1,
        flexGrow: 0,
        flex: 1,
    },
    inlineProfilePic: {},
    messageList: {
        maxHeight: "92.5%",
        flex: 15,
    },
    contactUsername: {
        padding: 10,
        fontSize: '24px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageBox: {
        borderRadius: 5,
        resizeMode: 'contain',
        minWidth: '0%',
        maxWidth: "40%",
        padding: 7.5,
        margin: 3,
        alignSelf: 'flex-start'
    },
    messageText: {
        // fontWeight: 'bold',
        fontSize: 16,
    },
    backButton: {
        height: null,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10,
    }
})