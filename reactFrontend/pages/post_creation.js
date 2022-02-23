import { Text, TextInput, View, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {styles} from './stylesheet'
import AsyncCreatableSelect from 'react-select/async-creatable'

//TODO: Integrate topic selection with database
export default function PostCreation({ navigation }) {
  const [inputtedText, setInputtedText] = useState('')
  const [topic, setTopic] = useState('')

  const SendPost = async () => {
      try {
          const response = await fetch(serverAddress + "/api/post/create_post", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json; charset=utf-8',
                  'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({
                  'topic': topic,
                  'content': inputtedText
              })
          })
          const postID = await response.json();
          console.log(postID)

          if (userID < 0) console.log("Failed to Create Post!");
          else navigation.navigate('Home');

      } catch (error){
          console.error(error)
      }
  }


  return (
    <View style={[styles.container, {padding: 15}]}>
      <View style={styles.border}/>
      <View style={[styles.loginBox]}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={[styles.headerIcon, {margin: 10}]} source={require('../assets/logo.svg')}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center', color: '#ffc000', fontWeight: 'bold', fontSize: 18, padding: 10}}>Create Post</Text>
        </View>
        <View style={{flex: 5}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Pressable>
                        <Text style={styles.button}>Embed Link</Text>
                    </Pressable>
                </View>
                <View style={{flex: 1}}>
                    <Pressable>
                        <Text style={styles.button}>Attach Image</Text>
                    </Pressable>
                </View>
            </View>
            <View style={[styles.text, {padding: 5, flex: 1}]}>
              <AsyncCreatableSelect placeholder="Topic"/>
            </View>
            <TextInput multiline={true} style={[styles.accountInputBox, createStyles.textInput]} placeholder='Text' onChangeText={() => setInputtedText(inputtedText)} />
            <Pressable onPress={() => SendPost()}><Text style={styles.button}>Create</Text></Pressable>
        </View>
      </View>
      <View style={styles.border}/>
    </View>
  )
}

// TODO: Get post URL from API and updated for images and URLs next sprint
/*
function SendPost(topic, text){
  fetch("https://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/create_post", {
    method: 'POST',
    body: JSON.stringify({
      'topic': topic,
      'content': inputtedText
    })
  })

  const postID = await response.json();
  console.log(userID)
  if (userID < 0) console.log("Failed to Create Post!");
  else navigation.navigate('Home');
}
*/

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

const createStyles = StyleSheet.create({
  textInput:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 400,
    minHeight: 100,
    maxHeight: 'fit-content',
  }
})