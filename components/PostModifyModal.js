import { useState } from "react";
import styled from "@emotion/native";

import { Modal, Alert, Text } from "react-native";

import { useMutation } from "react-query";
import { editPost } from "../api";

export default function PostModifyModal({
  id,
  post,
  isOpenModifyModal,
  setIsOpenModifyModal,
  navigation,
}) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [ratings, setRatings] = useState(0);
  const getRatings = (rating) => {
    setRatings(rating);
  };
  const { isLoading: isLoadingEditing, mutate: revisePost } = useMutation(
    ["editPost", id],
    (body) => editPost(body),
    {
      onSuccess: () => {
        console.log("수정성공");
      },
      onError: (err) => {
        console.log("err in edit:", err);
      },
    }
  );
  const onEditPost = async (id) => {
    if (!ratings && !modalTitle && !modalContent && !modalUrl) {
      alert("수정한 부분이 없습니다.");
      return;
    }

    let editingObj = {};
    if (ratings) {
      Object.assign(editingObj, { rating: ratings });
    }
    if (modalTitle) {
      Object.assign(editingObj, { title: modalTitle });
    }
    if (modalContent) {
      Object.assign(editingObj, { contents: modalContent });
    }
    if (modalUrl) {
      Object.assign(editingObj, { contents: modalUrl });
    }
    Alert.alert(
      "게시글 수정",
      "이대로 게시글 수정하시겠습니까? 입력한 부분만 수정됩니다.",
      [
        { text: "Cancel", style: "destructive" },
        {
          text: "OK. Edit it",
          onPress: async () => {
            try {
              console.log("성공");
              await revisePost({ postId: id, editingObj });
              setModalContent("");
              setModalTitle("");
              setModalUrl("");
              setRatings(0);
              setIsOpenModifyModal(false);

              navigation.reset({
                routes: [
                  {
                    name: "Post",
                    params: {
                      post: {
                        title: modalTitle,
                        contents: modalContent,
                        url: modalUrl,
                        ratings: ratings,
                      },
                    },
                  },
                ],
              });
            } catch (err) {
              console.log("err:", err);
            }
          },
        },
      ]
    );
  };

  if (isLoadingEditing) {
    return <Text>로딩 중입니다.</Text>;
  }

  return (
    <Modal visible={isOpenModifyModal} transparent animationType="fade">
      <Backdrop>
        <Dialog>
          <InputWrapper>
            <ModalTitle>제목</ModalTitle>
            <TitleInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            >
              <Text>{post.title}</Text>
            </TitleInput>
            <ModalTitle>내용</ModalTitle>
            <ContentInput
              textAlignVertical="top"
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
              multiline
              maxLength={300}
              placeholder={post.contents}
            >
              <Text>{post.contents}</Text>
            </ContentInput>
            <ModalTitle>Url</ModalTitle>
            <UrlInput
              value={modalUrl}
              onChangeText={(text) => setModalUrl(text)}
              placeholder={post.url}
            >
              <Text>{post.url} </Text>
            </UrlInput>
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn
              onPress={() => setIsOpenModifyModal(false)}
              title="취소"
            />
            <ModalBtn
              onPress={() => {
                onEditPost(id);
              }}
              title="수정 완료"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
}

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 0.4px solid black;
`;
const ContentInput = styled(TitleInput)`
  min-height: 250px;
  border: 0.4px solid black;
`;
const UrlInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 0.4px solid black;
`;
const ModalBtn = styled.Button`
  color: black;
`;
const InputWrapper = styled.View``;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: gray;
`;
const Dialog = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.color.modalBg};
  width: 80%;
  height: 70%;
  padding: 20px;
  justify-content: space-between;
  border-radius: 5px;
  background-color: white;
  border: #3b71f3;
`;
const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
