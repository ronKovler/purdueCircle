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
  const [liked, setLiked] = useState(false)
  const postID = props.postID
  const userID = props.userID

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

  async function toggleFollowUser() {
    let url = serverAddress
    if (!followingUser) {
      url += ''
    } else{
      url += ''
    }
    try {
      await fetch(url, {
        userID: User.getUserId(),
        otherUserID: userID,
      }).then(() => setFollowingUser(!followingUser), () => console.log("Promise unfulfilled"))
    } catch (error) {
      console.error(error)
    }
  }

  async function toggleLike() {
    let url = serverAddress
    if (!liked) {
      url += ''
    } else{
      url += ''
    }
    try {
      await fetch(url, JSON.stringify({
        method: 'POST',
        userID: User.getUserId(),
        postID: postID
      })).then(() => setLiked(!liked), () => console.log("Promise unfulfilled"))
    } catch (error){
      console.error(error)
    }
  }

  async function toggleFollowTopic() {
    let url = serverAddress
    if (!followingTopic) { // add user to follow list if following
      url += ''
    } else{
      url += ''
    }
    try {
      await fetch(url, JSON.stringify({
        'userID': User.getUserId(),
        'topic_name': topic,
      })).then(() => setFollowingTopic(!followingTopic), () => console.log("Promise unfulfilled"))
    } catch (error){
      console.error(error)
    }
  }

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
                      onPress={() => toggleFollowUser()}>
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
                      onPress={() => toggleFollowTopic()}>
                      {!followingTopic ?
                      <Text style={postStyles.followButton}>Follow</Text> :
                      <Text style={postStyles.followButton}>Unfollow</Text>}
                  </Pressable> : null}
                <Text style={postStyles.topic}>{topic}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2, padding: 12.5}}>
        <Text style={postStyles.text}>{content}</Text>
      </View>
      <View style={{flex: 1, padding: 5}}>
        <Pressable onPress={() => toggleLike()}>
          {liked ?
            <Image source={require('../assets/full_heart.svg')} style={[postStyles.likeButton, {tintColor: 'red'}]}/> :
            <Image source={require('../assets/heart.svg')} style={postStyles.likeButton}/>}
        </Pressable>
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
    paddingTop: 5,
    flex: 1,
    minWidth: 300,
    maxHeight: 47.5,
    // borderBottomWidth: 4,
    // borderBottomColor: "#737373",
  },
  text: {
    borderTopWidth: 4,
    borderTopColor: '#737373',
    color: 'white',
    padding: 12.5,
    paddingBottom: 5,
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
  },
  likeButton: {
    maxWidth: 20,
    aspectRatio: 1,
    resizeMode: 'contain',
    flex: 1,
    marginLeft: 10,
  }
})