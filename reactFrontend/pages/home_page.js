import React, {} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import { styles, HeaderLogo } from './stylesheet';
import Post from "./post";
import User from "./user";

export default function HomeScreen({navigation}) {

    return (
        <View style={styled.container}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
                <View style={{flex: 5, flexDirection: 'column', alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                        <HeaderLogo style={styles.headerIcon}/>
                    </View>
                </View>
                <View style={{flex: 2, backgroundColor: 'dimgrey'}}>
                    {!User.isLoggedIn ?
                      <View style={styles.buttonContainer}>
                          <Pressable onPress={() => navigation.navigate('Login')}><Text
                            style={styles.button}>Login</Text></Pressable>
                          <Pressable onPress={() => navigation.navigate('Create Account')}><Text
                            style={styles.button}>Register</Text></Pressable>
                      </View> : null}
                </View>
            </View>
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
                <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center'}}>
                    <Pressable style={{alignSelf: 'center'}}>
                        <Text style={styles.button}>Hot Posts</Text>
                    </Pressable>
                    <Pressable style={{alignSelf: 'center'}}>
                        <Text style={styles.button}>Saved Posts</Text>
                    </Pressable>
                    <Pressable style={{alignSelf: 'center'}} onPress={() => navigation.navigate('Create Post')}>
                        <Text style={styles.button}>Create Post</Text>
                    </Pressable>
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