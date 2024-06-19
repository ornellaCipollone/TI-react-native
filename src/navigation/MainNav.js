
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';import React, { Component } from 'react'

import Login from '../screens/Login'
import Register from '../screens/Register'
import TabNav from './TabNav'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class MainNav extends Component {
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={ Login } options={ { headerShown: false } }/>
                <Stack.Screen name="Register" component={ Register } options={ { headerShown: false } } />
                <Stack.Screen name='tabnav' component={TabNav} />
                <Stack.Screen name="SuPerfil" component={ SuPerfil } options={ { headerShown: false } }/>
            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}