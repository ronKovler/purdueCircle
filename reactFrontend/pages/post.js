//TODO: Integrate fetch URL into getPostInfo
import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Image} from "react-native-web";

export default function Post(props, {navigation}) {
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
        <Pressable style={{flex: 1}}>
          <Image style={postStyles.icon} source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1'}}/>
        </Pressable>
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
    minWidth: 500,
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
  },
  icon: {
    alignSelf: "flex-start",

  }
})