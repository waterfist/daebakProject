import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import styled from '@emotion/native';
import { useMutation } from 'react-query';
import { deletePost } from '../api';

const PostCards = ({ post }) => {
  const { isLoading: isLoadingDeleting, mutate: removePost } = useMutation(
    ['deletePost', post.id],
    body => deletePost(body),
    {
      onSuccess: () => {
        console.log('삭제성공');
      },
      onError: err => {
        console.log('err in delete:', err);
      },
    }
  );

  const [modalVisible, setModalVisible] = useState(false);

  const onDeletePost = async id => {
    Alert.alert('게시글 삭제', '정말 현재 게시글을 삭제하시겠습니까?', [
      { text: 'cancel', style: 'destructive' },
      {
        text: 'OK. Delete it.',
        onPress: async () => {
          try {
            await removePost(id);
            alert('삭제가 완료되었습니다.');
          } catch (err) {
            console.log('err:', err);
          }
        },
      },
    ]);
  };

  // const goToPost = () => {
  //   navigate("Stacks", { screen: "Post" });
  // };

  if (isLoadingDeleting) {
    return <Text>조금만 기다려주세요!</Text>;
  }

  return (
    <>
      <UserPostsView key={post.id}>
        <TextContainer>
          <StaticText>제목</StaticText>
          <VariableText numberOfLines={1} ellipsizeMode="tail">
            {post.title}
          </VariableText>
        </TextContainer>
        <TextContainer>
          <StaticText>내용</StaticText>
          <VariableText numberOfLines={1} ellipsizeMode="tail">
            {post.contents}
          </VariableText>
        </TextContainer>
        <TextContainer>
          <StaticText>작성일</StaticText>
          <VariableText numberOfLines={1} ellipsizeMode="tail">
            {new Date(post.createdAt).toLocaleDateString('kr')}
          </VariableText>
        </TextContainer>
        <DeleteButtonBoxView>
          <TouchableOpacity onPress={() => onDeletePost(post.id)}>
            <Text style={{ fontSize: 18, color: 'white' }}>삭제</Text>
          </TouchableOpacity>
        </DeleteButtonBoxView>
      </UserPostsView>
    </>
  );
};

export default PostCards;

const UserPostsView = styled.View`
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border-color: #3b71f3;
  background-color: #dbe7ff;

  height: 130px;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 240px;
`;

const DeleteButtonBoxView = styled.View`
  align-items: center;
  border-width: 1px;
  border-radius: 5px;
  border-color: #dbe7ff;
  background-color: #3b71f3;

  width: 25%;
  height: 25%;

  margin-top: 7px;
`;

const StaticText = styled.Text`
  font-size: 18px;
  margin-right: 7px;
`;

const VariableText = styled.Text`
  font-size: 14px;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 400,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
