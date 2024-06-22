import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';

import Home from "../screens/Home";
import Buscador from "../screens/Buscador";
import CrearPosteo from "../screens/CrearPosteo";
import MiPerfil from "../screens/MiPerfil";


const Tab = createBottomTabNavigator()

class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={Buscador}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="search" size={24} />,
          }}
        />
        <Tab.Screen
          name="Crear Posteo"
          component={CrearPosteo}
          options={{
            headerShown: false,
            tabBarIcon: () => <Octicons name="diff-added" size={24} />,
          }}
        />
        <Tab.Screen
          name="Mi Perfil"
          component={MiPerfil}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="user" size={24} />,
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default TabNav