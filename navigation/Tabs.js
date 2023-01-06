import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GREEN_COLOR, YELLOW_COLOR } from "../color";
import { Text, useColorScheme, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Home from "./Home";
import Explore from "./Explore";
import Account from "./Account";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarLabelPosition: "beside-icon",
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="Explore"
        component={Explore}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
}
