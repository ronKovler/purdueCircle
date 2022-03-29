import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity,
    Modal,
    CheckBox,
    Button
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {styles} from './stylesheet'
import User from "./user";
import {useIsFocused} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'

//TODO: Integrate topic selection with database
export default function PostCreation({navigation}) {
    const [inputtedText, setInputtedText] = useState('')
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(true)
    const [link, setLink] = useState('Link...')
    const [image, setImage] = useState('Image...')
    const [linkModalVisible, setLinkModalVisible] = useState(false)
    const [imageModalVisible, setImageModalVisible] = useState(false)
    const [anonymous, setAnonymous] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        //do nothing
    }, [isFocused]);

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: .3,
        });

        if(!result.cancelled){
            setImage(result.uri);
        }
    }

    const SendPost = async () => {
        try {
            let imagePath;
            if(image !== "Image..."){
                let formData = new FormData();
                const response = await fetch(image);
                const blob = await response.blob();
                formData.append("file", blob)
                imagePath = JSON.parse(await fetch(serverAddress + '/api/post/upload_image', {
                    method: "POST",
                    headers: {
                        // 'Content-Type': '',
                        'Access-Control-Allow-Origin': serverAddress,
                    },
                    body: formData
                }))
            }
            const response = await fetch(serverAddress + "/api/post/create_post", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'content': inputtedText,
                    'userID': User.userID,
                    'topicName': topic,
                    'link': link,
                    'imagePath': imagePath,
                    'anonymous': anonymous
                })
            })
            const postID = await response.json();
            console.log(postID)

            if (User.userID < 0) console.log("Failed to Create Post!");
            else navigation.navigate('Home');

        } catch (error) {
            console.error(error)
        }
    }

    async function getTopics() {
        try {
            const response = await fetch(serverAddress + '/api/post/get_topics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            const topics = await response.json()
            setLoading(false)
            return topics
        } catch (error) {
            console.log(error)
        }
    }

    const topicOptions = async () => {
        const response = await fetch(serverAddress + '/api/post/get_topics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
        })
        let options = await response.json()

        console.log(options);
        return options;
    }

    return (
        <View style={[styles.container, {padding: 15}]}>
            <View style={styles.border}/>
            <View style={[styles.loginBox]}>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 10
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image style={[styles.headerIcon, {margin: 10}]} source={require('../assets/logo.svg')}/>
                    </TouchableOpacity>
                    <Text
                        style={{textAlign: 'center', color: '#ffc000', fontWeight: 'bold', fontSize: 18, padding: 10}}>Create
                        Post</Text>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        transparent={true}
                        visible={linkModalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setLinkModalVisible(!linkModalVisible);
                            }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput placeholder={link} style={styles.modalText} onChangeText={newText => setLink(newText)}/>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => setLinkModalVisible(!linkModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Done</Text>
                                </Pressable>
                        </View>
                    </View>
                    </Modal>
                    <Modal
                        transparent={true}
                        visible={imageModalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setImageModalVisible(!imageModalVisible);
                            }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable onPress={() => pickImage()}><Text>Pick Image</Text></Pressable>
                            {image !== "Image..." ? <Image source={{uri : image}} style={{width: 200, height: 200}}/> : null}
                                <Pressable
                                    style={styles.button}
                                    onPress={() => setImageModalVisible(!imageModalVisible)}>
                                    <Text style={styles.textStyle}>Done</Text>
                                </Pressable>
                        </View>
                    </View>
                    </Modal>
                </View>
                <View style={{flex: 5}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Pressable onPress={() => setLinkModalVisible(!linkModalVisible)}>
                                <Text style={styles.button}>Embed Link</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1}}>
                            <Pressable onPress={() => setImageModalVisible(!imageModalVisible)}>
                                <Text style={styles.button}>Attach Image</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', paddingBottom: 20}}>
                        <View style={{flex: 1}}>
                            {link !== 'Link...' && !linkModalVisible &&
                                <Text style={styles.createPostText}>{link.length < 21 ? `${link}` : `${link.substring(0, 20)}...`}</Text>
                            }
                        </View>
                        <View style={{flex: 1}}>
                            {image !== 'Image...' && !imageModalVisible &&
                                <Text style={styles.createPostText}>Image Attached Successfully</Text>
                            }
                        </View>
                    </View>
                    <View style={[styles.text, {padding: 10, flex: 1}]}>
                        <TextInput placeholder='Topic' onChangeText={newText => setTopic(newText)} style={{flex: 1, backgroundColor: '#d9d9d9', padding: 5}}/>
                    </View>
                    <TextInput multiline={true} style={[styles.accountInputBox, createStyles.textInput]}
                               placeholder='Text' onChangeText={newText => setInputtedText(newText)}/>
                    <View style={{flexDirection: "row"}}>
                        <CheckBox
                            value={anonymous}
                            onValueChange={setAnonymous}
                        />
                        <Text style={{color: '#ffc000', fontWeight: 'bold', fontSize: 15}}> Post as anonymous</Text>
                    </View>
                    <Pressable onPress={() => SendPost()}><Text style={styles.button}>Create</Text></Pressable>
                </View>
            </View>
            <View style={styles.border}/>
        </View>
    )
}

// TODO: Get post URL from API and updated for images and URLs next sprint

// function SendPost(topic, text){
//   fetch("https://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/create_post", {
//     method: 'POST',
//     body: JSON.stringify({
//       'topic': topic,
//       'content': inputtedText
//     })
//   })

//   const postID = await response.json();
//   console.log(userID)
//   if (userID < 0) console.log("Failed to Create Post!");
//   else navigation.navigate('Home');
// }

function CreateURLPost() {
    const [url, setURL] = useState('')

    return (
        <TextInput style={styles.accountInputBox} placeholder='URL' onChangeText={() => setURL(url)}/>
    )
}

function CreateImagePost() {
    return (
        <Text>Placeholder</Text>
    )
}

const createStyles = StyleSheet.create({
    textInput: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: 400,
        minHeight: 100,
        maxHeight: 'fit-content',
    }
})