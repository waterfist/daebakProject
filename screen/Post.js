import React, { useEffect, useCallback } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { GREEN_COLOR, YELLOW_COLOR } from "../color";
import styled from "@emotion/native";

export default function Post({
  navigation,
  route: {
    params: { comment, from },
  },
}) {
  const isDark = useColorScheme() === "dark";
  // ------------- 상단 header --------------
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
            뒤로
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigate("Stacks", { screen: "PostInput" });
            }}
          >
            <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
              게시글수정
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }, []);
  // ------------- 상단 header --------------
  // ------------- 댓글 box --------------
  const goToComment = () => {
    navigation.navigate("Stacks", {
      screen: "TestComment",
      params: { comment: comment, from: "My" },
    });
  };
  // ------------- 댓글 box --------------
  // ------------- Post 내용  --------------
  return (
    <View>
<<<<<<< HEAD
      <Text>{comment.title}</Text>
      <AddComment onPress={goToComment}>
        <TempText>댓글 리스트</TempText>
      </AddComment>
=======
      <Text>내 자리</Text>
>>>>>>> dev
    </View>
  );
}
// ------------- Post 내용  --------------
const TempText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.color.title};
  text-align: center;
`;
const AddComment = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.color.title};
  align-self: center;
  width: 40%;
`;
