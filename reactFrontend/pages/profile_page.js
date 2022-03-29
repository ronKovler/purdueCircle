import {Text, TextInput, View, Button, Image, StyleSheet, Pressable, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react'
import {Choo, HeaderLogo, styles} from './stylesheet';
import Post from "./post";
import Topic from "./topic";
import User from "./user";
import {useIsFocused} from "@react-navigation/native";

export default function ProfilePage ({route, navigation}) {
    const LogOut = async () => {
        await User.logout()
        await navigation.navigate('Login');
    }

    const [userlineData, setUserlineData] = useState(null);
    const userID = route.params.id;
    const [isLoggedIn, setIsLoggedIn] = useState(User.isLoggedIn)
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const isFocused = useIsFocused()

    useEffect(async () => {
        const data = await getUserline();
        if (userID !== User.userID) {
            await fetch(serverAddress + '/api/user/get_user/' + userID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                }
            }).then((items) => {
                 setUsername(items.username);
            })
        } else {
            setUsername(User.username);
        }
        setUserlineData(data);
        setIsLoading(false);
    }, [isFocused])

    const renderPost = ({item}) => {
        console.log(item)
        return <Post topic={item.topicName} user={item.username} content={item.content} postID={item.postId}
                     userID={item.userID}/>
    };

    async function getUserline() {
        const response = await fetch(serverAddress + '/api/user/get_userline/' + userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            },
        })
        let json = await response.json()
        setIsLoading(false)
        return json
    }

  return (
    <View style={styled.container}>
        { isLoading ? <Choo/> :
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
            <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                {User.isLoggedIn ?
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => LogOut()}><Text
                            style={styles.button}>Log Out</Text></Pressable>
                    </View> : <View style={{flex: 1}}/>}
                <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                    <Pressable onPress={() => navigation.navigate('Home')}>
                        <HeaderLogo style={styles.headerIcon}/>
                    </Pressable>
                </View>
                <View style={{flex: 1}}>
                    <Pressable onPress={() => navigation.navigate('Edit Profile')}>
                        <Text style={styles.button}>Edit Profile</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
        </View>}
        { isLoading ? null :
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
            <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center', alignItems: 'space-between'}}>
                <View style={{flex: 3}}>
                    <Image style={styles.image}  source={require('../assets/choo.png')}/>
                </View>
                <View style={{flex: 6}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.header}>
                            {username}'s Followed Topics
                        </Text>
                    </View>
                    <View style={{flex: 10}}>
                        <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                        <ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                        </ScrollView>
                        <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    </View>
                </View>
            </View>
            <View style={{flex: 5, flexDirection: 'column'}}>
                <View style={{flex: 1, backgroundColor: '737373'}}/>
                <View style={{flex: 7, backgroundColor: '737373'}}>
                    <Text style={styles.header}>{username}'s Posts</Text>
                </View>
                {/*<ScrollView style={{flex: 93, flexBasis: 100}} showsVerticalScrollIndicator={false}>
            <Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/>
            <Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/><Post moves={true}/>
          </ScrollView>*/}
                <View style={{flexBasis: 1, flex: 100}}>
                    <FlatList data={userlineData} renderItem={renderPost} keyExtractor={item => item.postId}
                              extraData={isLoggedIn} style={{flexGrow: 0}} showsVerticalScrollIndicator={false}/>
                </View>
                <View style={{flex: 2, backgroundColor: '737373'}}/>
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                <View style={{flex: 3}}>
                </View>
                <View style={{flex: 6}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.header}>
                            {username}'s Followed Topics
                        </Text>
                    </View>
                    <View style={{flex: 10}}>
                        <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                        <ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                            <Topic/><Topic/><Topic/><Topic/><Topic/><Topic/>
                        </ScrollView>
                        <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                    </View>
                </View>
            </View>
        </View> }
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'stretch',
    justifyContent: 'center',
    minHeight: 'fit-content',
  }
})