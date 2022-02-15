import { Component } from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { styles } from './stylesheet';
// TODO Post UI and import to timeline?

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Welcome to Purdue Circle!</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <StatusBar style="auto"/>
      </View>
    )
  }

class Post extends Component{
    
}