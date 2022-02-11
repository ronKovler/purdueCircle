import { Text, TextInput, Button, View } from 'react-native'
import { useState } from 'react'
import { styles } from './stylesheet'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncCreatableSelect from 'react-select/async-creatable'

const Stack = createNativeStackNavigator()

//TODO: Integrate topic selection with database
export default function PostCreation({ navigation }) {
  const [url, setURL] = useState('')
  const [inputtedText, setInputtedText] = useState('')
  const [topic, setTopic] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={[styles.loginBox]}>
        <Text style={styles.header}>Create Post</Text>
        <TextInput style={styles.accountInputBox} placeholder='URL' onChangeText={() => setURL(url)}/>
        <TextInput style={styles.accountInputBox} placeholder='Text' onChangeText={() => setInputtedText(inputtedText)} />
      </View>
      <View style={styles.border}/>
    </View>
  )
}