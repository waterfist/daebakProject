import React from "react";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../util";
import Vote from "./Vote";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
export default function CommentLoader({ comment }) {
  const { navigate } = useNavigation();
  const goToPost = () => {
    navigate("Comment", {
      comment,
      from: "Post",
    });
  };

  return (
    <Column onPress={goToPost}>
      <AbovePart>
        <ReviewDate>
          {new Date(comment.createdAt).toLocaleDateString("kr")}
        </ReviewDate>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <ReviewTitle>{comment.title}</ReviewTitle>
        <ReviewContents numberOfLines={5}>{comment.contents}</ReviewContents>
      </AbovePart>
      <Vote vote_average={comment.rating} />
    </Column>
  );
}

const Column = styled.TouchableOpacity`
  justify-content: space-between;
  border-width: 1px;
  border-color: ${(props) => props.theme.color.title};
  width: ${SCREEN_WIDTH / 2.5 + "px"};
  border-radius: 10px;
  padding: 10px;
  height: 200px;
`;
const AbovePart = styled.View``;
const ReviewDate = styled.Text`
  color: ${(props) => props.theme.color.title};
  margin-bottom: 10px;
`;
const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.color.title};
  margin-top: 5px;
`;
const ReviewContents = styled.Text`
  color: ${(props) => props.theme.color.overview};
  line-height: 18px;
`;
