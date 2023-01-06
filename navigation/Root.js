import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{ headerShown: false, headerTitle: "222" }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}

// Home, Explore, Account
// 밑에 하단바임
