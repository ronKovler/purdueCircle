import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TextInput} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import User from "./user";

function renderMessage({item}){
    const userID = item.fromUserID;
    return(
        <View style={dmStyles.messageBox}>
            <Text>{item.content}</Text>
        </View>
    )
}

let stompClient
export default function DirectMessagePage({navigation}){
    const [messageData, setMessageData] = useState(null)
    const [toUser, setToUser] = useState(3)
    const [newMessage, setNewMessage] = useState('');
    const isFocused = useIsFocused();

    useEffect( async () => {
        if(isFocused) {
            await getMessageData()
            connect();
        }
    }, [isFocused])

    async function getMessageData(){
        await fetch(serverAddress + '/api/dm/get_user_direct_messages/' + User.userID + '/' + toUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            }
        }).then(response => response.json()).then(json => setMessageData(json))
        //TODO: catch statement
    }

    async function onMessageReceived(msg){
        const body = JSON.parse(msg.body);
        if(body.fromUserID === toUser) {
            console.log(body.fromUserID)
            // setMessageData('')
            await getMessageData()
        }
    }

    function connect(){
        const Stomp = require("stompjs")
        let SockJS = require("sockjs-client")
        SockJS = new SockJS(serverAddress + '/ws');
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, () => {stompClient.subscribe('/user/' + User.userID + '/queue/messages', onMessageReceived)}, (err) => {console.error(err)})
    }

    async function sendMessage(){
        if(newMessage.trim() !== ''){
            const message = {
                fromUserID: User.userID,
                toUserID: toUser,
                content: newMessage,
            }
            stompClient.send("/app/chat", {}, JSON.stringify(message))
            setNewMessage('');
            await getMessageData()
            //TODO: fix sent message rendering and beautify
        }
    }

    return(
        <View style={dmStyles.fullWindow}>
            <View style={{flex: 1}}/>
            <View style={dmStyles.mainWindow}>
                <View style={dmStyles.headerBar}>
                    <Text style={dmStyles.contactUsername}>username</Text>
                </View>
                <View style={dmStyles.messageList}>
                    <FlatList data={messageData} renderItem={renderMessage} keyExtractor={item => item.dmID}/>
                </View>
                <View style={dmStyles.messageInput}>
                    <TextInput placeholder={"Write a message..."} onChangeText={message => setNewMessage(message)} onSubmitEditing={sendMessage}/>
                </View>
            </View>
            <View style={{flex: 1}}/>
        </View>
    )
}

const dmStyles = StyleSheet.create({
    fullWindow:{
        backgroundColor: "#737373",
        flex: 1,
        flexDirection: 'row'
    },
    mainWindow:{
        flex: 1,
    },
    messageInput:{

    },
    headerBar:{
        flexDirection: 'row',
        flex: 1,
    },
    headerProfilePic:{

    },
    inlineProfilePic:{

    },
    messageList:{

    },
    contactUsername:{
        justifyContent: 'flex-start',
        fontSize: '24px',
    },
    messageBox: {
        color: '#484848',
        borderRadius: 5,
        resizeMode: 'contain',
    }
})