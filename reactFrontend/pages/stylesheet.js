import {Button, Image, Pressable, StyleSheet, View} from "react-native";
import React from "react";

const Logo = ({navigation}) => {
  return (
    <Pressable onClick={() => navigation.navigate("Home")}>
      <Image style={styles.image} source={require('../assets/logo.svg')}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  border: {
    flex: 1,
    backgroundColor: '#737373',
  },
  container: {
    resizeMode: 'contain',
    flex: 1,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignContent: 'space-around',
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
    resizeMode: 'contain',
    aspectRatio: 1,
    //margin: 15,
    maxWidth: 968,
  },
  button: {
    textAlign: "center",
    //textAlignVertical: "center",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    padding: 10,
    margin: 5,
    backgroundColor: "#ffde59",
    flex: 1,
    minWidth: 100,
    maxHeight: 40,
  },
  text: {
    fontFamily: 'Helvetica'
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  }
})

export {styles, Logo};