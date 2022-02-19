import {Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Image} from "react-native-web";

export default function Post(props, {navigation}) {
  const [user, setUser] = useState('user')
  const [topic, setTopic] = useState('topic')
  const [comments, setComments] = useState('comments')
  const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec tellus ac quam ullamcorper dictum facilisis non orci. Vivamus hendrerit et dui id scelerisque. Suspendisse potenti. Integer ante mauris, tempor. ')
  const [isLoading, setIsLoading] = useState(true)
  const [followingTopic, setFollowingTopic] = useState('false')
  const [followingUser, setFollowingUser] = useState('false')

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
//TODO: Get like icon and make pressable
  return (
    <View style={{backgroundColor: "#5F5F5F", margin: 5, flexDirection: 'column', height: 'fit-content'}}>
      <View style={postStyles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Pressable>
              <Image style={postStyles.icon}
                     source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1'}}/>
            </Pressable>
            <Pressable style={{alignSelf: 'center', paddingLeft: '5'}}
                       onClick={() => navigation.navigate("Profile Page")}>
              <Text style={postStyles.username}>{user}</Text>
            </Pressable>
            {followingUser ?
              <Pressable style={{alignSelf: 'center'}}>
                <Text style={postStyles.followButton}>Follow</Text>
              </Pressable> : null}
          </View>
          <Pressable style={{alignSelf: 'center'}}>
            <Text style={postStyles.topic}>{topic}</Text>
          </Pressable>
          {followingTopic ?
            <Pressable style={{alignSelf: 'center'}}>
              <Text style={postStyles.followButton}>Follow</Text>
            </Pressable> : null}
        </View>
      </View>
      <Text style={postStyles.text}>{content}</Text>
    </View>
  )
}

const postStyles = StyleSheet.create({
  headerContainer: {
    padding: 5,
    paddingLeft: 10, paddingRight: 10,
    flex: 1,
    minWidth: 300,
    maxHeight: 47.5,
    borderBottomWidth: 2,
    borderBottomColor: "#919191",
  },
  text: {
    color: 'white',
    maxWidth: 400,
    padding: 12.5,
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
  topic: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: 6,
  },
  icon: {
    alignSelf: "flex-start",
    width: 25,
    height: 25,
    borderRadius: 50,
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'space-around',
    margin: 4,
  },
  followButton: {
    color: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})