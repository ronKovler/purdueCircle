import React, {} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles, HeaderLogo } from './stylesheet';
import { ScrollView, TouchableOpacity } from "react-native-web";
import Post from "./post";
import User from "./user";

export default function HomeScreen({navigation}) {

    return (
        <View style={styled.container}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
                <View style={{flex: 2, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                    <HeaderLogo style={styles.headerIcon}/>
                    {!User.isLoggedIn ?
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text
                            style={styles.button}>Login</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Create Account')}><Text
                            style={styles.button}>Register</Text></TouchableOpacity>
                    </View> : null}
                </View>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>
            </View>
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}>
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <View style={{flex: 1, backgroundColor: '737373'}}/>
                    <ScrollView style={{flex: 100, flexBasis: 100}}>
                        <Post/><Post/><Post/><Post/><Post/><Post/>
                        <Post/><Post/><Post/><Post/><Post/><Post/>
                    </ScrollView>
                    <View style={{flex: 2, backgroundColor: '737373'}}/>
                </View>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}>
                </View>
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