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
            // await deleteDoc(doc(dbService, "reviews", review.id));
            await removePost(id);
            alert('삭제가 완료되었습니다.');
          } catch (err) {
            console.log('err:', err);
          }
        },
      },
    ]);
  };

  if (isLoadingDeleting) {
    return <Text>조금만 기다려주세요!</Text>;
  }

  return (
    <>
      <UserPostsView key={post.id}>
        <Text>{post.title}</Text>
        <Text>{post.contents}</Text>
        <Text>{new Date(post.createdAt).toLocaleDateString('kr')}</Text>
        <TouchableOpacity onPress={() => onDeletePost(post.id)}>
          <Text>삭제</Text>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    <Text>{post.title}</Text>
                    <Text>{post.contents}</Text>
                    <Text>
                      {new Date(post.createdAt).toLocaleDateString('kr')}
                    </Text>
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </UserPostsView>
    </>
  );
};

export default PostCards;

const UserPostsView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: green;

  height: 130px;
  width: 230px;
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
