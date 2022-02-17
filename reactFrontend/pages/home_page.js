import {Component, useState} from 'react';
import {View, Text, Button, StatusBar, StyleSheet, Pressable} from 'react-native';
import {styles} from './stylesheet';
// TODO Post UI and import to timeline?

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Purdue Circle!</Text>
      <Post/>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Login" onPress={() => navigation.navigate('Login')}/>
        </View>
        <View style={styles.button}>
          <Button title="Create Account" onPress={() => navigation.navigate('Create Account')}/>
        </View>
      </View>
      <StatusBar style="auto"/>
    </View>
  )
}

//TODO: Integrate fetch URL into getPostInfo
// How to create a state template?
function Post(props, {navigation}) {
  const [user, setUser] = useState('user')
  const [topic, setTopic] = useState('topic')
  const [comments, setComments] = useState('comments')
  const [content, setContent] = useState('content')
  const [isLoading, setIsLoading] = useState(true)

  const getPostInfo = async () => {
    try {
      const response = await fetch()
      const json = await response.json()

    } catch {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
// Get like icon and make pressable
  return (
    <View style={postStyles.postContainer}>
      <View style={{flexDirection: 'row'}}>
        <Pressable style={{flex: 1}} onClick={() => navigation.navigate("Profile Page")}>
          <Text style={postStyles.username}>{user}</Text>
        </Pressable>
        <Pressable style={{flex: 1}}>
          <Text style={postStyles.topic}>{topic}</Text>
        </Pressable>
      </View>
      <Text style={postStyles.text}>{content}</Text>
    </View>
  )
}

const postStyles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: "#5F5F5F",
    minWidth: 200,
  },
  text: {
    flex: 1,
    color: 'white',
  },
  button: {
    flex: 1,
    backgroundColor: "#969696",
  },
  username: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  topic: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  }
})
