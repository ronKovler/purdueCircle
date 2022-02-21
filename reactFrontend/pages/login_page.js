import {Text, TextInput, View, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles, Logo} from './stylesheet';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [correct, setCorrect] = useState(true)
  const [emailError, setEmailError] = useState("")

  function SendLogin() {
    fetch("https://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:443/api/auth/login", {
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
        'https://ec2-18-190-24-178.us-east-2.compute.amazonaws.com:8080/api/auth/login'
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo/>
        </TouchableOpacity>
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
        <View style={[styles.buttonContainer, {alignSelf: 'center'}]}>
          <Pressable onPress={() => validateEmail()}><Text style={[styles.button, {minWidth: 90}]}>Login</Text></Pressable>
          <Pressable onPress={() => navigation.navigate("Create Account")}><Text style={[styles.button, {minWidth: 90}]}>Register</Text></Pressable>
        </View>
      </View>
    </View>
  );
}


//TODO: Adjust sizing of page to resize to display size? do we want to fix for mobile rn?
