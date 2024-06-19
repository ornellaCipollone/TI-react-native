import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native';

import Home from '../screens/Home';
import MiPerfil from '../screens/MiPerfil'

const Tab = createBottomTabNavigator()
export default class TabNav extends Component {
  render() {
    return (
        <Stack.Navigator>
                <Stack.Screen />
        </Stack.Navigator>
    )
  }
}