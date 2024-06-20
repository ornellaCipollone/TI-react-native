import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Login from "../screens/Login";
import Register from "../screens/Register";
import Comment from "../screens/Comment";
import SuPerfil from "../screens/SuPerfil";
import EditarPerfil from "../screens/EditarPerfil";
import TabNav from "./TabNav";

export default class MainNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Comment"
            component={Comment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuPerfil"
            component={SuPerfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TabNav" 
            component={TabNav} 
            options= {{ headerShown : false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
