import React, {useMemo} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {screenStyle} from '../../styles/defaultScreenStyle';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import MovieCard from '../../components/movies/movieCard';
import {CATEGORİES} from '../../utils/constants';
import CategoryCard from '../../components/movies/categoryCard';


const MovieList: React.FC = ({route}) => {
  const {
    nowPlayingMovies,
    topRatedMovies,
    populerMovies,
    upcomingMovies,
    categories,
    selectedCategory,
  } = useSelector((state: RootState) => state.movies);
  const categoryData = () => {
    switch (selectedCategory?.category) {
      case CATEGORİES.NOWPLAYING:
        return nowPlayingMovies;
      case CATEGORİES.POPULER:
        return populerMovies;
      case CATEGORİES.TOPRATED:
        return topRatedMovies;
      case CATEGORİES.UPCOMING:
        return upcomingMovies;
    }
  };
  const filteredData = useMemo(() => categoryData(),[selectedCategory]);

  return (
    <View style={screenStyle.container}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({item}) => <CategoryCard category={item} />}
      />
      <FlatList
        numColumns={2}
        data={filteredData}
        renderItem={({item}) => <MovieCard movie={item} />}
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
    color: 'white',
  },
});

export default MovieList;
