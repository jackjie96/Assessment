import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import {Category} from '../store/reducers/categories';
import {Note} from '../store/reducers/notes';
import Button from '../components/Button';
import {purgeNote} from '../store/actions/note';

interface ItemProps {
  category: Category;
}
const Summary = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categoryReducer?.categories,
  );
  const contents = useSelector((state: RootState) => state.noteReducer?.notes);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({category}: ItemProps) => {
    const categoryNotes = contents?.filter(
      (item: Note) => item.categoryId === category.id,
    );
    return (
      <View style={{padding: 16}}>
        <Text>{category.name}</Text>
        <Text
          style={
            styles.noteButton
          }>{`This topic has a total of ${categoryNotes?.length} record(s)`}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={categories}
        renderItem={({item}) => <Item key={item.id} category={item} />}
        keyExtractor={item => item.id}
      />
      <Button
        title="Delete All Notes"
        onPress={() => {
          dispatch(purgeNote());
        }}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  noteButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    padding: 16,
  },
});
