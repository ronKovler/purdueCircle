import { Text, TextInput, View, Button, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react'
import { styles } from './stylesheet';

export default function ProfilePage ({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.wideViewContainer}>
        <View style={styles.sideBar}>
          <Image style={styles.image} source={require('../assets/logo.svg')} />
          <Text style={styles.header}>Hot Topics</Text>
          <Text style={styles.header}>Saved Posts</Text>
          <Text style={styles.header}>My Activity</Text>
          <Text style={styles.header}>Hot Topics</Text>
        </View>
        <View style={styles.profileBox}>
          <Text style={styles.header}>User's Profile Information</Text>
        </View>
        <View style={styles.sideBar}>
          <Text style={styles.header}>Messages</Text>
        </View>
      </View>
    </View>
  )
}

//postGrid:
const profile = StyleSheet.create({
  postGrid:{
    flexDirection: "row",
    flexWrap:"wrap",
    alignContent: "stretch",

  }
})