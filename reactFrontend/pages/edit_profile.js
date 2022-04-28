import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, CheckBox, Image, Modal} from 'react-native';
import { styles, HeaderLogo, Choo } from './stylesheet';
import User from "./user";
import * as ImagePicker from "expo-image-picker";
import {Link, useIsFocused} from "@react-navigation/native";

export default function EditProfileScreen({navigation}) {
    const [username, setUsername] = useState(User.username);
    const [firstName, setFirstName] = useState(User.firstName);
    const [lastName, setLastName] = useState(User.lastName);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [isPrivate, setIsPrivate] = useState(false)
    const [newProfilePic, setNewProfilePic] = useState(User.profilePicture);
    const [success, setSuccess] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [isRestricted, setIsRestricted] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            console.log("Updating user information on edit profile page\n");
            setNewProfilePic(User.profilePicture);
            setIsRestricted(User.isRestricted);
            setIsPrivate(User.isPrivate);
            setUsername(User.username);
            setFirstName(User.firstName);
            setLastName(User.lastName);
            setPassword(User.password);
        }
    }, [isFocused])

    const LogOut = async () => {
        await User.logout()
        navigation.navigate('Login');
    }

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: .1,
        });

        if(!result.cancelled){
            setNewProfilePic(result.uri);
        }
    }

    const DeleteAccount = async () => {
        const response = await fetch(serverAddress + '/api/modify/delete_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': serverAddress,
            },
            body: JSON.stringify({
                'userID': await User.getuserID()
            }),
        })
        setDeleteModalVisible(false)
        await response.json()
        await User.logout()
        navigation.navigate('Login');
    }

    //helper functions
    const SendUpdates = async () => {
        try {
            let imagePath;
            if(newProfilePic !== User.profilePicture){
                let formData = new FormData();
                const response = await fetch(newProfilePic);
                const blob = await response.blob();
                formData.append("file", blob)
                let ret = await fetch(serverAddress + '/api/post/upload_image', {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': serverAddress,
                    },
                    body: formData
                })
                imagePath = await ret.json()
                imagePath = serverAddress + '/images/'+ imagePath.content
            }
            if(password.length > 32 || username.length > 24) return;
            const newPassword = await fetch (serverAddress + "/api/modify/modify_user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': serverAddress,
                },
                body: JSON.stringify({
                    'userID': User.userID,
                    'password': password === '' ? null : password,
                    'firstName': firstName,
                    'lastName': lastName,
                    'username': username === User.username ? null : username,
                    'email': User.email,
                    'isPrivate': isPrivate,
                    'profileImagePath': imagePath,
                    'isRestricted': isRestricted,
                })
            })
            if (newPassword.status !== 200) setUsernameError("Username already taken!");
            else {
                setSuccess("Changes saved successfully")
                navigation.navigate('Home');
            }
        } catch (error){
            console.error(error)
        }
    }

    return (
        <View style={styled.container}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
            <View style={{flex: 5, flexDirection: 'row', alignSelf: 'center'}}>
              {User.isLoggedIn ?
                  <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                      <Pressable onPress={() => LogOut()}><Text
                        style={styles.button}>Log Out</Text></Pressable>
                  </View> : <View style={{flex: 1}}/>}
              <View style={{flexDirection: 'row', justifyContent: 'center', flex: 2}}>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <HeaderLogo style={styles.headerIcon}/>
                </Pressable>
              </View>
              {User.isLoggedIn ?
                  <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
                      <Pressable onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
                          <Text style={styles.button}>Delete Account</Text></Pressable>
                  </View> : <View style={{flex: 1}}/>}
            </View>
            <View style={{flex: 2, backgroundColor: 'dimgrey'}}/>
          </View>
          <View style={{flex: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '737373'}}>
            <View style={{flex: 2, backgroundColor: 'dimgrey', justifyContent: 'center', alignItems: 'space-between'}}>
              <View style={{flex: 3}}>
                <Choo/>
              </View>
              <View style={{flex: 6}}>

              </View>
            </View>
            <View style={{flex: 5, flexDirection: 'column'}}>
              <View style={{flex: 2, backgroundColor: '737373'}}/>
              <View style={{flex: 13, backgroundColor: '#545454', paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center'}}>
                <View style={styles.centeredView}>
                    <Modal
                        transparent={true}
                        visible={deleteModalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setDeleteModalVisible(!deleteModalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text>Are you sure you want to delete your account?</Text>
                                    <Pressable
                                        style={styles.button}
                                        onPress={() => DeleteAccount()}
                                    >
                                        <Text style={styles.textStyle}>Yes</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.button}
                                        onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Text style={styles.header}>{User.username}'s Profile Information</Text>
                <View style={{justifyContent: 'center'}}>
                    <Pressable onPress={() => pickImage()}>
                        <Image style={styled.profilePicture} source={{uri: newProfilePic}}/>
                    </Pressable>
                    {usernameError != null ? <Text style={{color: 'red'}}>{usernameError}</Text> : null}
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.username}
                        onChangeText={username => setUsername(username)}/>
                    {username.length > 24 && <Text style={{color: 'red'}}>Username cannot be longer than 24 characters</Text>}
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.firstName}
                        onChangeText={firstName => setFirstName(firstName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={User.lastName}
                        onChangeText={lastName => setLastName(lastName)}/>
                    <TextInput
                        style={styles.accountInputBox}
                        placeholder={'Password'}
                        textContentType={"password"}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}/>
                    {password.length > 32 && <Text style={{color: 'red'}}>Password cannot be longer than 32 characters</Text>}
                    <TextInput style={styles.accountInputBox} secureTextEntry={true} onChangeText={double => setCheckPassword(double)} placeholder={'Reenter Password'}/>
                    {password !== checkPassword && <Text style={{color: 'red'}}>Passwords do not match</Text>}
                    <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <CheckBox
                            value={isPrivate}
                            onValueChange={setIsPrivate}
                            />
                            <Text style={{color: '#ffc000', fontWeight: 'bold', fontSize: 15}}> Set private account</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <CheckBox
                                value={isRestricted}
                                onValueChange={setIsRestricted}
                            />
                            <Text style={{color: '#ffc000', fontWeight: 'bold', fontSize: 15}}> Set restricted dms</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => SendUpdates()}><Text style={styles.button}>Save Changes</Text></Pressable>
                    {success !== '' ? <Text style={{color: 'green', textAlign: 'center'}}>{success}</Text> : null}
                </View>
              </View>
              <View style={{flex: 3}}/>
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
  },
    profilePicture: {
        height: 150,
        width: 150,
        borderRadius: 300,
        aspectRatio: 1,
    }
})