import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GREEN_COLOR, YELLOW_COLOR } from '../color';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Main from '../screen/Main';
import Search from '../screen/Search';
import My from '../screen/My';
import TestComment from '../screen/TestComment';

const Tab = createBottomTabNavigator();

export default function Tabs({ navigation: { navigate } }) {
  const isDark = useColorScheme() === 'dark';

  const commentInputHandle = () => {
    navigate('Stacks', { screen: 'CommentInput' });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarLabelPosition: 'beside-icon',
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        options={{
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => commentInputHandle()}>
              <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                게시글 작성
              </Text>
            </TouchableOpacity>
          ),

          headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Main}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="My"
        component={My}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="TestComment"
        component={TestComment}
      />
    </Tab.Navigator>
  );
}
