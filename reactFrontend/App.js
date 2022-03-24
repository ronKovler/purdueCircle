import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from './pages/login_page';
import ProfilePage from './pages/profile_page';
import CreateAccountScreen from './pages/create_account';
import PostCreation from './pages/post_creation';
import HomeScreen from './pages/home_page';
import EditProfile from './pages/edit_profile';
import Topic_page from './pages/topic_page';
import SearchPage from './pages/search_page';
import {Text} from "react-native";
import User from "./pages/user";
import {Image} from "react-native-web";
import {styles} from "./pages/stylesheet";

global.serverAddress = "https://purduecircle.me:8443";

const Stack = createNativeStackNavigator();

const linkConfig = {
    screens: {
        Home: '',
        Login: 'login',
        'Create Account': 'create_account',
        'Create Post': 'create_post',
    }
}

const linking = {
    prefixes: [],
    config: linkConfig,
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(async () => {
        await User.checkLogin().then(items => {
            User.isLoggedIn = true;
            User.username = items.username;
            User.userId = items.userID;
        }, () => {
            User.isLoggedIn = false;
        })
        setIsLoading(false);
    })
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            {isLoading ? <Image style={[styles.image, {alignSelf: 'center'}]} source={require('./assets/choo.png')}/> :
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Search" component={SearchPage}/>
                    <Stack.Screen name="Topicline" component={Topic_page}/>
                    <Stack.Screen name="Create Post" component={PostCreation}/>
                    <Stack.Screen name="Profile Page" component={ProfilePage}/>
                    <Stack.Screen name="Edit Profile" component={EditProfile}/>
                    <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
                </Stack.Navigator>
            }
        </NavigationContainer>

    );
}

export {Stack}