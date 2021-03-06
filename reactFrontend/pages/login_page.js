import {Text, TextInput, View, Pressable, TouchableOpacity, AsyncStorage} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles, Logo} from './stylesheet';
import User from "./user";
import {useIsFocused} from "@react-navigation/native";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState('')
    const [success, setSuccess] = useState(false)
    const [correct, setCorrect] = useState(true)
    const [emailError, setEmailError] = useState("")
    const isFocused = useIsFocused()

    useEffect(() => {
        //do nothing
    }, [isFocused]);

    const SendLogin = async () => {
        try {
            const response = await fetch(serverAddress + "/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            })
            const user = await response.json();
            console.log(user.userID);
            console.log(user.username);
            if (user.userID >= 0) {
                await User.login(user);

                navigation.navigate('Home');
            } else { //password failed
                User.isLoggedIn=false;
                console.log("FAILED FUCKER TRY AGAIN");

                //ADD ERROR DIALOGUE HERE-------------------------------------------
                setEmailError("Username/Password combination is invalid. Try Again");
            }

        } catch (error){
            console.error(error)
        }
    }


const GetLogin = async () => {
    try {
        const response = await fetch(
            'http://purduecircle.me:8443/api/auth/login', {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'no-cors',
                    'Authorization': 'F]-K&A9%(n5hmS-y',
                },
            }
        );
        const json = await response.json();
        console.log(id.toString());
        setId(json.id);
        if (id <= 0) {
            console.log("FAILED FUCKER TRY AGAIN");
            setEmail(id.toString());
        }
        setEmail("TEST");
        setSuccess(true);
        setCorrect(true);
        return json;
    } catch (error) {
        console.error(error);
        //setCorrect(false)
    }
}

const validateEmail = () => {
    if (email.length === 0) {
        setEmailError("Email/Username is required")
    } else {
        setEmailError("")
        //GetLogin()
        SendLogin()

    }
}

// useEffect(() => {
//   GetLogin();
// }, []);

return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo/>
        </TouchableOpacity>
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.accountInputBox}
                   placeholder='Email/Username'
                   onChangeText={email => setEmail(email)}
                   onSubmitEditing={(event)=>{
                       if(event.nativeEvent.key === 'Enter')
                           validateEmail()
                   }}
        />
        {emailError.length > 0 && <Text style={{color: 'red'}}>{emailError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   onChangeText={password => setPassword(password)}
                   onSubmitEditing={(event)=>{
                       if(event.nativeEvent.key === 'Enter')
                           validateEmail()
                   }}
        />
        {(!correct ? <Text style={{color: 'red'}}>Incorrect Password. Try again</Text> : null)}
        <View style={[styles.buttonContainer, {alignSelf: 'center'}]}>
          <Pressable onPress={() => validateEmail()}><Text style={[styles.button, {minWidth: 90}]}>Login</Text></Pressable>
          <Pressable onPress={() => navigation.navigate("Create Account")}><Text style={[styles.button, {minWidth: 90}]}>Create an Account</Text></Pressable>
        </View>
      </View>
    </View>
);
}


//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?
