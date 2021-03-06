import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";

const Logo = ({navigation}, props) => {
  return (
      <Image style={styles.image} source={{uri: 'https://purduecircle.me:8443/UI_images/logo.svg'}}/>
  )
}

export const Choo = ({navigation}, props) => {
  return (
      <Image style={[styles.image, {alignSelf: 'center'}]} source={{uri: 'https://purduecircle.me:8443/UI_images/choo.png'}}/>
  )
}

const HeaderLogo = (props, {navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
        <Image style={props.style} source={{uri: 'https://purduecircle.me:8443/UI_images/logo.svg'}}/>
        <Text style={styles.header}>PurdueCircle</Text>
    </View>
  )
}

const CPLogo = (props, {navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
        <Image style={props.style} source={{uri: 'https://purduecircle.me:8443/UI_images/logo.svg'}}/>
        <Text style={styles.header}>Create Post</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  border: {
    flex: 1,
    backgroundColor: '#737373',
  },
  container: {
    resizeMode: 'contain',
    flex: 9,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: 'fit-content',
  },
  wideViewContainer: {
    resizeMode: 'contain',
    flex: 5,
    backgroundColor: '#545454',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    //transform: [{scale: 1.25}],
  },
  header: {
    alignSelf:'center',
    textAlign: 'center',
    color: '#ffc000',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
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
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  sideBar: {
    resizeMode: 'contain',
    backgroundColor: '#545454',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    minWidth: 200,
    minHeight: 300,
    flex: 2
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
  headerIcon: {
    aspectRatio: 1,
    minWidth: 60,
    minHeight: 60,
    alignSelf: 'center'
  },
  button: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    margin: 5,
    backgroundColor: "#ffde59",
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 5
  },
  text: {
    fontFamily: 'Helvetica'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
    // position: "absolute",
    // justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingTop: 20,
    padding: 50
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  createPostText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    margin: 5,
  }
})

export {styles, Logo, HeaderLogo};