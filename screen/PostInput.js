import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { authService, dbService } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { GREEN_COLOR, YELLOW_COLOR } from '../color';
import { SelectList } from 'react-native-dropdown-select-list';
import styled from '@emotion/native';
import uuid from 'react-native-uuid';

export default function PostInput({ navigation: { goBack, setOptions } }) {
  const [addPostTitle, setAddPostTitle] = useState('');
  const [addPostContents, setAddPostContents] = useState('');
  const [addPostCategory, setAddPostCategory] = useState('');

  const newPost = {
    title: addPostTitle,
    contents: addPostContents,
    category: addPostCategory,
    // id: uuid.v4(),
    createdAt: Date.now(),
    // userId: authService.currentUser?.uid,
  };

  const addPost = async () => {
    await addDoc(collection(dbService, 'Posts'), newPost);
    setAddPostTitle('');
    setAddPostContents('');
    setAddPostCategory('');
  };

  const data = [
    { key: '1', value: '기술' },
    { key: '2', value: '교육' },
    { key: '3', value: '보건' },
    { key: '4', value: '문화' },
    { key: '5', value: '환경' },
    { key: '6', value: '교통' },
    { key: '7', value: '정치' },
    { key: '8', value: '경제' },
  ];

  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
            뒤로
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => {
        return null;
      },
    });
  }, []);

  return (
    <Container>
      <SelectBox>
        <SelectList
          setSelected={val => setAddPostCategory(val)}
          data={data}
          save="value"
          placeholder="Select category"
          value={addPostCategory}
          maxHeight={200}
        />
      </SelectBox>
      <InputBox>
        <TitleInput
          placeholder="Title"
          value={addPostTitle}
          onChangeText={text => setAddPostTitle(text)}
        />
        <TitleInput
          placeholder="Content"
          value={addPostContents}
          onChangeText={text => setAddPostContents(text)}
        />
        <Button title="작성 완료" onPress={addPost} />
      </InputBox>
    </Container>
  );
}

export const Container = styled.View`
  padding: 40px;
  flex: 1;
  margin: 30px;
  /* justify-content: space-around; */
`;

export const TitleInput = styled.TextInput`
  border: 1px solid black;
  height: 45px;
  border-radius: 10px;
`;

export const SelectBox = styled.View``;

export const InputBox = styled.View``;
