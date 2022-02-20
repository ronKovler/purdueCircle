import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {styles, Logo} from './stylesheet';
import {TouchableOpacity} from "react-native-web";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [correct, setCorrect] = useState(true)
  const [emailError, setEmailError] = useState("")

  function SendLogin() {
    fetch("http://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
          email: email,
          password: password
        }
      )
    })
  }

  const GetLogin = async () => {
    try {
      const response = await fetch(
        'http://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/auth/login'
      );
      const json = await response.json();
      setId(json.id);
      setSuccess(true);
      setCorrect(true)
      return json;
    } catch (error) {
      console.error(error);
      //setCorrect(false)
    }
  }

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email.length == 0) {
      setEmailError("Email is required")
    } else if (reg.test(email) == false) {
      setEmailError("Enter a valid email address")
    } else {
      setEmailError("")
      SendLogin()
    }
  }

  // useEffect(() => {
  //   GetLogin();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Logo/>
        <Text style={styles.header}>Login</Text>
        <TextInput style={styles.accountInputBox}
                   placeholder='Username/Email'
                   onChangeText={email => setEmail(email)}/>
        {emailError.length > 0 && <Text style={{color: 'red'}}>{emailError}</Text>}
        <TextInput style={styles.accountInputBox}
                   placeholder='Password'
                   secureTextEntry={true}
                   onChangeText={password => setPassword(password)}/>
        {(!correct ? <Text style={{color: 'red'}}>Incorrect Password. Try again</Text> : null)}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => validateEmail()}><Text style={styles.button}>Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Create Account")}><Text style={styles.button}>Register</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?