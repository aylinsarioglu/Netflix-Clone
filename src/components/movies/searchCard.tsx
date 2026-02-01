import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {MovieCardProps} from '../../models/ui/movieCardProps';
import {Play} from 'iconsax-react-nativejs';
import {IMAGE_BASE_URL} from '../../service/urls';
import {useNavigation} from '@react-navigation/native';
import {MOVIEDETAIL} from '../../utils/route';

const SearchCard: React.FC<MovieCardProps> = ({movie}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(MOVIEDETAIL, {movieId: movie.id})}
      activeOpacity={0.9}
      style={styles.container}>
      <View>
        <Image
          source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'center'}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 24,
            color: 'white',
          }}>
          {movie.title}
        </Text>
      </View>
      <View style={{marginHorizontal: 10, justifyContent: 'center'}}>
        <Play size={30} color="white" variant="Bold" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export default SearchCard;
