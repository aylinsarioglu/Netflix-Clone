import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {searchMovie} from '../../store/actions/moviesActions';
import {screenStyle} from '../../styles/defaultScreenStyle';
import SearchCard from '../../components/movies/searchCard';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('Merhaba');
  const dispatch: AppDispatch = useDispatch();
  const {searchList, pendingSearch} = useSelector(
    (state: RootState) => state.movies,
  );
  const handleSearch = () => {
    dispatch(
      searchMovie({
        query: searchText,
        include_adult: false,
      }),
    );
  };
  useEffect(() => {
    dispatch(
      searchMovie({
        query: searchText,
        include_adult: false,
      }),
    );
  }, []);

  const header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <TextInput
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder="Search"
          style={{
            backgroundColor: 'gray',
            paddingVertical: 20,
            padding: 5,
            borderRadius: 8,
            fontSize: 18,
            flex: 1,
          }}
          placeholderTextColor={'black'}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}>
          <Text style={{color: 'white', fontWeight: '600', fontStyle: 18}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={screenStyle.container}>
      <Text style={styles.text}>Search</Text>
      <FlatList
        ListEmptyComponent={
          <Text style={{color: 'gray'}}>
            Lütfen aramak istediğiniz filmi giriniz.
          </Text>
        }
        ListHeaderComponent={header}
        data={searchList}
        renderItem={({item}) => <SearchCard movie={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default Search;
