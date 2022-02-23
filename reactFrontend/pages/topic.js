import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import React, {useState} from "react";
import styles from './stylesheet';

export default function Topic(props, {navigation}) {
    const [topic, setTopic] = useState('topic')

    return (
        <View style={{backgroundColor: "#5F5F5F", margin: 5, flexDirection: 'column', height: 'fit-content', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={topicStyles.text}>
                test
            </Text>
        </View>
    )
}

const topicStyles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    padding: 5,
    fontSize: 18
  }
})