import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Dropdown from '../components/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import Button from '../components/Button';
import {addNote} from '../store/actions/note';
import {Route} from '../constants/RouteConstants';

const NewNote = ({navigation}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categoryReducer?.categories,
  );

  const _onSave = () => {
    dispatch(
      addNote({
        content,
        categoryId: category,
        createdDateTime: new Date().toLocaleString(),
      }),
    );

    setCategory('');
    setContent('');

    navigation.navigate(Route.HOME);
  };
  const maxLength = 200;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Dropdown
        data={
          categories
            ? categories.map(item => ({
                label: item.name,
                value: item.id,
              }))
            : []
        }
        title={'Choose a category'}
        placeholder={'Choose a category'}
        onChanged={value => setCategory(value)}
      />
      <View style={styles.textAreaContainer}>
        <TextInput
          multiline={true}
          onChangeText={setContent}
          value={content}
          placeholder="Please input note content"
          maxLength={maxLength}
          style={styles.textArea}
        />
        <Text
          style={{textAlign: 'right'}}>{`${content.length}/${maxLength}`}</Text>
      </View>
      <View style={{flex: 1}} />
      <Button title="Save" onPress={_onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    margin: 16,
  },
  textArea: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    padding: 16,
    height: 200,
  },
});

export default NewNote;
