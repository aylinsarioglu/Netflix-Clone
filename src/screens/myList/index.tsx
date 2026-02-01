import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { screenStyle } from '../../styles/defaultScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import MovieCard from '../../components/movies/movieCard';
import { getMyList } from '../../store/actions/moviesActions';

const MyList: React.FC = () => {
  const {myList} = useSelector((state:RootState)=> state.movies)
  const {token} = useSelector((state:RootState)=> state.notifications)

  const dispatch:AppDispatch=useDispatch()
  useEffect(() => {
dispatch(getMyList(token))
  }, [])
  return (
    <View style={screenStyle.container}>
       <FlatList
              numColumns={2}
              data={myList}
              renderItem={({item}) => <MovieCard movie={item} />}
            />
    </View>
  );
};


export default MyList;