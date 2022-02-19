import {React, Component} from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Logo from './stylesheet'
import Post from './post'

const Home = (props) => {
   return (
      <View style = {stylesHere.container}>
         <View style = {stylesHere.leftcolumn}>
            <View>
                <Logo/>
            </View>
         </View>
         <View style = {stylesHere.middlecolumn}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <HeaderLogo style={styles.headerIcon}/>
                {!User.isLoggedIn ?
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text
                      style={styles.button}>Login</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Create Account')}><Text
                      style={styles.button}>Register</Text></TouchableOpacity>
                  </View> : null}
              </View>
              <ScrollView style={{flex: 10}}>
                <Post/>
                <Post/><Post/><Post/><Post/><Post/>
              </ScrollView>
         </View>
         <View style = {stylesHere.rightcolumn}>

         </View>
      </View>
   )
}

export default Home

const stylesHere = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'grey'
    },
    leftcolumn: {
        flex: 1,
        backgroundColor: 'dimgrey'
    },
    middlecolumn: {
        flex: 2,
        backgroundColor: 'silver'
    },
    rightcolumn: {
        flex: 1,
        backgroundColor: 'dimgrey'
    },
    headerStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '100',
        marginBottom: 24
    },
})