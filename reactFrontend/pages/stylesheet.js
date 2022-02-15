import {Image, StyleSheet} from "react-native";
import React from "react";

const FormInput = (props) =>{
    return (
        <TextInput style={styles.accountInputBox}
            placeholder={props.placeholder}
            spellCheck={false}
            autoCorrect={false}/>
    )
}

const Logo = ({navigation}, props) => {
    return(
        <Image style={styles.image} source={require('../assets/logo.svg')} onClick={() => navigation.navigate("Home")}/>
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
    },
    text:{
        fontFamily: 'Helvetica'
    }

})

export { styles, FormInput, Logo };