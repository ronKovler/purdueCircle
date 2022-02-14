import { Text, TextInput, Button, View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { styles } from './stylesheet'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncCreatableSelect from 'react-select/async-creatable'

const Stack = createNativeStackNavigator()

//TODO: Integrate topic selection with database
export default function PostCreation({ navigation }) {
  const [inputtedText, setInputtedText] = useState('')
  const [topic, setTopic] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.border}/>
      <View style={[styles.loginBox]}>
        <Text style={styles.header}>Create Post</Text>
        <View style={pageStyles.buttonContainer}>
          <View style={[styles.button, {flex: 1}]}><Button color="#ffde59" title="Link" onPress={() => CreateURLPost()}/></View>
          <View style={[styles.button, {flex: 1}]}><Button color="#ffde59" title="Image" onPress={() => CreateImagePost()}/></View>
        </View>
        <View style={[styles.button, styles.text]}>
          <AsyncCreatableSelect placeholder="Topic"/>
        </View>
        <TextInput style={styles.accountInputBox} placeholder='Text' onChangeText={() => setInputtedText(inputtedText)} />
        <View style={styles.button}><Button color="#ffde59" title="Create" onPress={() => CreateImagePost()}/></View>
      </View>
      <View style={styles.border}/>
    </View>
  )
}

function CreateURLPost(){
  const [url, setURL] = useState('')
  
  return (
    <TextInput style={styles.accountInputBox} placeholder='URL' onChangeText={() => setURL(url)}/>
  )
}

function CreateImagePost(){
  return(
    <Text>Placeholder</Text>
  )
}

const pageStyles = StyleSheet.create({
    buttonContainer: {
      flexDirection:'row',
      flex: 1,
      justifyContent: 'space-evenly',
    }
  }
)