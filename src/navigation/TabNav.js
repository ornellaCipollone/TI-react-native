import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
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