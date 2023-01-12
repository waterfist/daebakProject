import React, { useEffect, useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR } from '../color';
import styled from '@emotion/native';
import { authService, dbService } from '../firebase';
import CommentModal from '../components/CommentModal';
import CommentLoader from '../components/CommnetLoader';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useMutation } from 'react-query';
import { deletePostText } from '../api';

export default function Post({
  navigation,
  route: {
    params: { post, from },
  },
}) {
  const isDark = useColorScheme() === 'dark';
  const [comments, setComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // ------------- 상단 삭제 --------------
  const { mutate: removePost } = useMutation(body => deletePostText(body), {
    onSuccess: () => {
      console.log('삭제성공');
    },
    onError: err => {
      console.log('err in delete:', err);
    },
  });

  const onDelete = async () => {
    Alert.alert('댓글 삭제', '정말 현재 댓글를 삭제하시겠습니까?', [
      { text: 'cancel', style: 'destructive' },
      {
        text: 'OK. Delete it.',
        onPress: async () => {
          try {
            // await deleteDoc(doc(dbService, "comment", comment.id));
            await removePost(comment.id);
            Alert.alert('삭제가 완료되었습니다');
            navigation.navigate('Main');
          } catch (err) {
            console.log('err:', err);
          }
        },
      },
    ]);
  };

  // ------------- 상단 삭제 --------------
  // ------------- 상단 header --------------
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            뒤로
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {
                navigation.navigate('Stacks', { screen: 'PostInput' });
              }}
            >
              <Text
                style={{
                  color: isDark ? YELLOW_COLOR : BLUE_COLOR,
                  marginRight: '10%',
                }}
              >
                수정
              </Text>
            </TouchableOpacity>
          </View>
        );
      },
    });

    const q = query(
      collection(dbService, 'comment'),
      orderBy('createdAt', 'desc'),
      where('postId', '==', post.id)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const newComments = snapshot.docs.map(doc => ({
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
      navigation.navigate('Login');
      return;
    }
    setIsOpenModal(true);
  };
  // ------------- 댓글 box --------------
  // ------------- Post 내용  --------------
  return (
    <Container>
      <Text>{post.title}</Text>
      <EditButton onPress={onDelete}>
        <BtnTitle>삭제하기</BtnTitle>
      </EditButton>
      <AddComment onPress={goToComment}>
        <TempText>댓글추가</TempText>
      </AddComment>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: 'flex-start',
        }}
        keyExtractor={item => item.id}
        horizontal
        data={comments}
        ItemSeparatorComponent={HSeprator}
        renderItem={({ item }) => {
          return <CommentLoader comment={item} />;
        }}
      />

      <CommentModal
        postId={post.id}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </Container>
  );
}
// ------------- Post 내용  --------------
const TempText = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.color.title};
  text-align: center;
`;
const AddComment = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => props.theme.color.title};
  align-self: center;
  width: 40%;
`;
const HSeprator = styled.View`
  width: 10px;
`;
const Container = styled.ScrollView`
  padding: 20px;
`;
const EditButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.overview};
  border-width: 1px;
  border-color: ${props => (props.disabled ? 'grey' : props.theme.color.title)};
  border-radius: 10px;
  margin-bottom: 20px;
`;
const BtnTitle = styled.Text`
  color: ${props => (props.disabled ? 'grey' : 'yellow')};
  font-size: 20px;
  font-weight: 700;
`;
