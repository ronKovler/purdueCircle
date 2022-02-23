import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import React, {useState} from "react";
import User from "./user";

export default function Post(props, {navigation}) {
  const [user, setUser] = useState('user')
  const [topic, setTopic] = useState('topic')
  const [comments, setComments] = useState('comments')
  const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec tellus ac quam ullamcorper dictum facilisis non orci. Vivamus hendrerit et dui id scelerisque. Suspendisse potenti. Integer ante mauris, tempor. hijcsdahijklcadslojn;kcds;ljnkdfsvq lkjdfsvpoun')
  const [isLoading, setIsLoading] = useState(true)
  const [followingTopic, setFollowingTopic] = useState(false)
  const [followingUser, setFollowingUser] = useState(false)

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
    <View style={{backgroundColor: "#5F5F5F", margin: 5, flexDirection: 'column', height: 'fit-content', borderRadius: 20}}>
      <View style={postStyles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {!props.moves ?
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable
                    onClick={() => navigation.navigate("Profile Page")}>
                  <Image style={postStyles.icon}
                         source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1'}}/>
                </Pressable>
                <Pressable style={{paddingLeft: 10}}
                           onClick={() => navigation.navigate("Profile Page")}>
                  <Text style={postStyles.username}>{user}</Text>
                </Pressable>
                {User.isLoggedIn ?
                  <Pressable
                      onPress={() => setFollowingUser(!followingUser)}>
                      {!followingUser ?
                      <Text style={postStyles.followButton}>Follow</Text> :
                      <Text style={postStyles.followButton}>Unfollow</Text>}
                  </Pressable> : null}
                </View>: null
            }
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {User.isLoggedIn ?
                  <Pressable style={{paddingRight: 10}}
                      onPress={() => setFollowingTopic(!followingTopic)}>
                      {!followingTopic ?
                      <Text style={postStyles.followButton}>Follow</Text> :
                      <Text style={postStyles.followButton}>Unfollow</Text>}
                  </Pressable> : null}
              <Pressable
                  onPress={() => setFollowingTopic(!followingTopic)}>
                <Text style={postStyles.topic}>{topic}</Text>
              </Pressable>
          </View>
        </View>
      </View>
      <View style={{flex: 2, padding: 12.5}}>
        <Text style={postStyles.text}>{content}</Text>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    borderBottomWidth: 4,
    borderBottomColor: "#737373",
  },
  text: {
    color: 'white'
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
  }
})