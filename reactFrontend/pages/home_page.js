import React, {} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles, HeaderLogo } from './stylesheet';
import { ScrollView, TouchableOpacity } from "react-native-web";
import Post from "./post";
import User from "./user";

export default function HomeScreen({navigation}) {

    return (
        <View style={styled.container}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}> // Upper section of the page, with the logo and buttons
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>                       // Left margin of the upper section
                <View style={{flex: 2, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                    <HeaderLogo style={styles.headerIcon}/>                  // Headerlogo displays no matter what
                    {!User.isLoggedIn ?                                      // Display login/signup buttons depending on whether logged in or not
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text
                            style={styles.button}>Login</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Create Account')}><Text
                            style={styles.button}>Register</Text></TouchableOpacity>
                    </View> : null}
                </View>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}/>           // Right margin of the upper section
            </View>
            <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>  // This begins the lower section of the page
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}>                         // Left margin of the lower section
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>                            // Container for scrollview, to give a fixed height
                    <View style={{flex: 1, backgroundColor: '737373'}}/>                     // Nesting scrollview in view with flexbasis fixed the problem
                    <ScrollView style={{flex: 100, flexBasis: 100}}>                         // Of the scrollview extending way off the page
                        <Post/><Post/><Post/><Post/><Post/><Post/>                           // Scrollview and contents
                        <Post/><Post/><Post/><Post/><Post/><Post/>
                    </ScrollView>
                    <View style={{flex: 2, backgroundColor: '737373'}}/>                     // Margin at the bottom, technically could have been a margin prop
                </View>
                <View style={{flex: 1, backgroundColor: 'dimgrey'}}>                         // Right margin of the lower section
                </View>
            </View>
        </View>
    )
}

const styled = StyleSheet.create({
    container: {
        resizeMode: 'contain',
        flex: 1,
        backgroundColor: '#737373',                   // Slightly altered version of container from the style sheet
        alignItems: 'stretch',                        // Main difference is that this is a stretch align
        justifyContent: 'center',
        minHeight: 'fit-content',
      }
})