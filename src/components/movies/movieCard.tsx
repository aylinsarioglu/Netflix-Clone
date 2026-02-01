import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IMAGE_BASE_URL} from '../../service/urls';
import {MovieCardProps} from '../../models/ui/movieCardProps';
import {screenWidth} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {MOVIEDETAIL} from '../../utils/route';

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  const navigation = useNavigation();
  if (!movie) {
  return null; // veya loading component
}
{movie?.production_companies?.map((company) => (
  <Text key={company.id}>{company.name}</Text>
))}

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(MOVIEDETAIL, {movieId: movie.id})}
    
      activeOpacity={0.9}
      style={styles.container}>
      <Image
        source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
        style={{
          width: 400,
          height: 300,
          resizeMode: 'contain',
          borderRadius: 10,
        }}
      />
      <Text numberOfLines={1} style={styles.text}>
        {movie.title}
      </Text>
      <Text numberOfLines={1} style={styles.text}>
        Rated:{movie.vote_average}-{movie.id}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    maxWidth: screenWidth / 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginTop: 10,
  },
});

export default memo(MovieCard);
