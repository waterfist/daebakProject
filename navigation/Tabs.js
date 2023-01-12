import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { YELLOW_COLOR, BLUE_COLOR } from "../color";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

import Main from "../screen/Main";

import My from "../screen/My";

import { authService } from "../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs({ navigation: { navigate } }) {
  const isDark = useColorScheme() === "dark";

  const commentInputHandle = () => {
    navigate("Stacks", { screen: "Login" });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: isDark ? YELLOW_COLOR : BLUE_COLOR,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLUE_COLOR,
        tabBarLabelPosition: "beside-icon",
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        options={{
          headerTitle: "2023그거알고있니",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => commentInputHandle()}>
              <Text
                style={{
                  color: isDark ? YELLOW_COLOR : BLUE_COLOR,
                  marginHorizontal: 10,
                }}
              >
                {authService.currentUser ? "" : "로그인"}
              </Text>
            </TouchableOpacity>
          ),
          headerTintColor: isDark ? YELLOW_COLOR : BLUE_COLOR,

          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="home"
              size={30}
              color={isDark ? YELLOW_COLOR : BLUE_COLOR}
            />
          ),
        }}
        name="Home"
        component={Main}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle"
              size={30}
              color={isDark ? YELLOW_COLOR : BLUE_COLOR}
            />
          ),
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
}
