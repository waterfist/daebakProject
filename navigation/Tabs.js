import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GREEN_COLOR, YELLOW_COLOR } from '../color';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Main from '../screen/Main';
import Search from '../screen/Search';
import My from '../screen/My';
import { authService } from '../firebase';

const Tab = createBottomTabNavigator();

export default function Tabs({ navigation: { navigate, setOptions } }) {
  const isDark = useColorScheme() === 'dark';

  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      // 로그아웃 요청
      signOut(authService)
        .then(() => {
          console.log('로그아웃 성공');
          setOptions({ headerRight: null });
        })
        .catch(err => alert(err));
    } else {
      // 로그인 화면으로
      navigate('Stacks', { screen: 'Login' });
    }
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
          headerRight: () => {
            return (
              <TouchableOpacity onPress={handleAuth}>
                <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                  {authService.currentUser ? '로그아웃' : '로그인'}
                </Text>
              </TouchableOpacity>
            );
          },

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
    </Tab.Navigator>
  );
}
