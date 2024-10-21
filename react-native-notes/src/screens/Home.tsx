import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {Category} from '../store/reducers/categories';
import {Note} from '../store/reducers/notes';
import {Icons} from '../components';
import {Route} from '../constants/RouteConstants';

interface ItemProps {
  category: Category;
}
const Home = ({navigation}) => {
  const categories = useSelector(
    (state: RootState) => state.categoryReducer?.categories,
  );
  const contents = useSelector((state: RootState) => state.noteReducer?.notes);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({category}: ItemProps) => {
    const categoryNotes = contents
      ?.filter((item: Note) => item.categoryId === category.id)
      .sort((a: Note, b: Note) => {
        const dateA = new Date(a.createdDateTime);
        const dateB = new Date(b.createdDateTime);
        return dateA.getTime() - dateB.getTime();
      });

    return (
      <View style={{padding: 16}}>
        <Text>{category.name}</Text>
        {categoryNotes?.length ? (
          categoryNotes?.map((note: Note) => (
            <TouchableOpacity
              key={Math.random()}
              style={styles.noteButton}
              onPress={() => {
                navigation.navigate(Route.NEW_NOTE);
              }}>
              <Text style={{flex: 1}}>{note.content.substring(0, 20)}</Text>
              <Icons.AntDesign name="right" size={16} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noteButton}>No notes</Text>
        )}
      </View>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <Icons.Ionicons name="time-outline" size={16} />
          <Text style={{marginLeft: 5}}>Recently created notes</Text>
        </View>
      }
      data={categories}
      renderItem={({item}) => <Item key={item.id} category={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  noteButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    padding: 16,
    marginBottom: 5,
  },
});
