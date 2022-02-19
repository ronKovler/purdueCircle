import { Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {styles} from './stylesheet'
import AsyncCreatableSelect from 'react-select/async-creatable'
import {TouchableOpacity} from "react-native-web";

//TODO: Integrate topic selection with database
export default function PostCreation({ navigation }) {
  const [inputtedText, setInputtedText] = useState('')
  const [topic, setTopic] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.border}/>
      <View style={[styles.loginBox]}>
        <Text style={styles.header}>Create Post</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => CreateURLPost}><Text style={styles.button}>Link</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => CreateImagePost}><Text style={styles.button}>Image</Text></TouchableOpacity>
        </View>
        <View style={[styles.text, {padding: 5}]}>
          <AsyncCreatableSelect placeholder="Topic"/>
        </View>
        <TextInput style={styles.accountInputBox} placeholder='Text' onChangeText={() => setInputtedText(inputtedText)} />
        <TouchableOpacity onPress={() => SendPost(topic, '', '', inputtedText)}><Text style={styles.button}>Create</Text></TouchableOpacity>
      </View>
      <View style={styles.border}/>
    </View>
  )
}

// TODO: Get post URL from API and updated for images and URLs next sprint
function SendPost(topic, text){
  fetch("https://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/create_post", {
    method: 'POST',
    body: JSON.stringify({
      topic: topic,
      content: text
    })
  })
}

function CreateURLPost(){
  const [url, setURL] = useState('')
  
  return (
    <TextInput style={styles.accountInputBox} placeholder='URL' onChangeText={() => setURL(url)}/>
  )
}

function CreateImagePost(){
  return(
    <Text>Placeholder</Text>
  )
}