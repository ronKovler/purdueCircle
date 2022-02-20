import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";

const Logo = ({navigation}, props) => {
  return (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <Image style={styles.image} source={require('../assets/logo.svg')}/>
    </Pressable>
  )
}

const HeaderLogo = (props, {navigation}) => {
  return (
    <Pressable onPress={() => navigation.navigate('Home')}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image style={props.style} source={require('../assets/logo.svg')}/>
        <Text style={styles.header}>PurdueCircle</Text>
      </View>
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
    flex: 9,
    backgroundColor: '#737373',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: 'fit-content',
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
  headerIcon: {
    aspectRatio: 1,
    minWidth: 60,
    minHeight: 60,
    alignSelf: 'center',
  },
  button: {
    textAlign: "center",
    // textAlignVertical: "center",
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: "space-evenly",
    padding: 10,
    margin: 5,
    backgroundColor: "#ffde59",
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Helvetica'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    // position: "absolute",
    // justifyContent: 'center',
  }

})

export {styles, Logo, HeaderLogo};