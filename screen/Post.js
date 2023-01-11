import React, { useEffect, useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { GREEN_COLOR, YELLOW_COLOR } from "../color";
import styled from "@emotion/native";
import { authService, dbService } from "../firebase";
import CommentModal from "../components/CommentModal";
import CommentLoader from "../components/CommnetLoader";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Post({
  navigation,
  route: {
    params: { comment, from },
  },
}) {
  const isDark = useColorScheme() === "dark";
  const [comments, setComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

    const q = query(
      collection(dbService, "comment"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(newComments);
    });
    return unsubscribe;
  }, []);
  // ------------- 상단 header --------------
  // ------------- 댓글 box --------------
  const goToComment = async () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigation.navigate("Login");
      return;
    }
    setIsOpenModal(true);
  };
  // ------------- 댓글 box --------------
  // ------------- Post 내용  --------------
  return (
    <View>
      <Text>{comment.title}</Text>
      <AddComment onPress={goToComment}>
        <TempText>댓글 추가</TempText>
      </AddComment>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: "flex-start",
        }}
        keyExtractor={(item) => item.id}
        horizontal
        data={comments}
        ItemSeparatorComponent={HSeprator}
        renderItem={({ item }) => {
          return <CommentLoader comment={item} />;
        }}
      />

      <CommentModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
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
const HSeprator = styled.View`
  width: 10px;
`;
