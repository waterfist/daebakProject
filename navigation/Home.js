import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { GREEN_COLOR, YELLOW_COLOR } from "../color";
import Login from "../screen/Login";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import CommentInput from "../screen/CommentInput";
import CommentList from "../screen/CommentList";
import Join from "../screen/Join";
import Main from "../screen/Main";
import My from "../screen/My";
import Post from "../screen/Post";
import PostInput from "../screen/PostInput";
import Search from "../screen/Search";

const NativeStack = createNativeStackNavigator();

export default function Home({ navigation: { goBack, navigate, setOptions } }) {
  const isDark = useColorScheme() === "dark";

  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      // 로그아웃 요청
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공");
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      // 로그인 화면으로
      navigate("Login");
    }
  };
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitle: "abcde",
        headerTitleAlign: "center",
        headerLeft: () => (
          // 상단 좌측 뒤로가기
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
              뒤로
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          // 로그인여부
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                {authService.currentUser ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
          );
        },
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
      }}
    >
      {/* Screen 페이지 9개 */}
      <NativeStack.Screen name="CommentInput" component={CommentInput} />
      <NativeStack.Screen name="CommentList" component={CommentList} />
      <NativeStack.Screen name="Join" component={Join} />
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Main" component={Main} />
      <NativeStack.Screen name="My" component={My} />
      <NativeStack.Screen name="Post" component={Post} />
      <NativeStack.Screen name="PostInput" component={PostInput} />
      <NativeStack.Screen name="Search" component={Search} />
    </NativeStack.Navigator>
  );
}
