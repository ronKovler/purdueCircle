import React, {} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import { styles, HeaderLogo, Choo, Logo } from './stylesheet';
import Post from "./post";
import User from "./user";

export default function HomeScreen({navigation}) {

    const LogOut = async () => {
        await User.logout
        navigation.navigate('Login');
    }

    return (
        <View style={styled.container}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
                    {User.isLoggedIn ?
                        <View style={styles.buttonContainer}>
                              <Pressable onPress={() => LogOut()}><Text
                                style={styles.button}>Log Out</Text></Pressable>
                        </View> : <View style={{flex: 1}}/>}
                    <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                        <HeaderLogo style={styles.headerIcon}/>
                    </View>
                    {!User.isLoggedIn ?
                      <View style={styles.buttonContainer}>
                          <Pressable onPress={() => navigation.navigate('Login')}><Text
                            style={styles.button}>Login</Text></Pressable>
                          <Pressable onPress={() => navigation.navigate('Create Account')}><Text
                            style={styles.button}>Register</Text></Pressable>
                      </View> :
                      <View style={styles.buttonContainer}>
                          <Pressable onPress={() => navigation.navigate('Profile Page')}><Text
                            style={styles.button}>View Profile</Text></Pressable>
                      </View>}
                </View>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                </View>
            </View>
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
                <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center', alignItems: 'space-between'}}>
                    <View style={{flex: 3}}>
                        <Image style={styles.image}  source={require('../assets/choo.png')}/>
                    </View>
                    {User.isLoggedIn ?
                    <View style={{flex: 6, justifyContent: 'center'}}>
                        <View style={{flex: 2}}/>
                        <View style={{flex: 1}}>
                            <Pressable>
                                <Text style={styles.button}>Hot Posts</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1}}>
                            <Pressable>
                                <Text style={styles.button}>Saved Posts</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 1}}>
                            <Pressable onPress={() => navigation.navigate('Create Post')}>
                                <Text style={styles.button}>Create Post</Text>
                            </Pressable>
                        </View>
                        <View style={{flex: 6}}/>
                    </View> : <View style={{flex: 6}}/>}
                </View>
                <View style={{flex: 5, flexDirection: 'column'}}>
                    <View style={{flex: 1, backgroundColor: '737373'}}/>
                    <ScrollView style={{flex: 100, flexBasis: 100}} showsVerticalScrollIndicator={false}>
                        <Post/><Post/><Post/><Post/><Post/><Post/>
                        <Post/><Post/><Post/><Post/><Post/><Post/>
                    </ScrollView>
                    <View style={{flex: 2, backgroundColor: '737373'}}/>
                </View>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
            </View>
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