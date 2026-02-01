import React, {memo, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import SectionTitle from './sectionTitle';
import {SectionProps} from '../../models/ui/sectionProps';
import MovieCard from '../movies/movieCard';
import {useNavigation} from '@react-navigation/native';
import {MOVIELIST} from '../../utils/route';
import {AppDispatch} from '../../store/store';
import {useDispatch} from 'react-redux';
import {setCategory} from '../../store/slices/moviesSlice';

const Section: React.FC<SectionProps> = ({data, title, category}) => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const handleNavigate = useCallback(() => {
    dispatch(setCategory(category));
    navigation.navigate(MOVIELIST);
  }, []);
  return (
    <View style={styles.container}>
      <SectionTitle title={title} onPress={handleNavigate} />
      <FlatList
        data={data}
        renderItem={({item}) => <MovieCard movie={item} />}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

export default memo(Section);
