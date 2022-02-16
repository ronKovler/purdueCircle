import {Button, Image, StyleSheet, View} from "react-native";
import React from "react";

const Logo = ({navigation}, props) => {
    return(
        <Image style={styles.image} source={require('../assets/logo.svg')} onClick={() => navigation.navigate("Home")}/>
    )
}

const YellowButton = ({navigation}, props) => {
    return(
      <View style={props.style}>
          <Button color="#ffde59" title={props.title} onPress={(props.onPress())}/>
      </View>
    )
}

const styles = StyleSheet.create({
    border:{
        flex: 1,
        backgroundColor: '#737373',
    },
    container: {
        resizeMode: 'contain',
        flex: 1,
        backgroundColor: '#737373',
        alignItems: 'center',
        justifyContent: 'center',
        //transform: [{scale: 1.25}],
    },
    wideViewContainer: {
        resizeMode: 'contain',
        flex: 1,
        backgroundColor: '#545454',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        //transform: [{scale: 1.25}],
    },
    header: {
        textAlign: 'center',
        color: '#ffc000',
        fontWeight: 'bold',
        margin: 5,
        fontSize: 18,
    },
    accountInputBox: {
        backgroundColor: '#d9d9d9',
        textDecorationColor: '#a6a6a6',
        justifyContent: 'center',
        padding: 7.5,
        margin: 5,
        minWidth: 200,
    },
    loginBox: {
        resizeMode: 'contain',
        backgroundColor: '#545454',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
    },
    sideBar: {
        resizeMode: 'contain',
        backgroundColor: '#545454',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        minWidth: 200,
        minHeight: 300,
    },
    profileBox: {
        backgroundColor: '#d9d9d9',
        textDecorationColor: '#a6a6a6',
        justifyContent: 'center',
        minWidth: 300,
        minHeight: 300,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        aspectRatio: 1,
        //margin: 15,
        maxWidth: 968,
    },
    button: {
        //padding: 5, 
        margin: 5,
        flex: 1,
    },
    text:{
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        flexDirection:'row',
        flex: 1,
        justifyContent: 'space-evenly',
    }
})

export { styles, Logo, YellowButton };