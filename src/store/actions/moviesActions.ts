import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRequest} from '../../service/verb';
import {
  MOVIE_DETAIL_URL,
  MOVIE_SEARCH_URL,
  NOW_PLAYING_URL,
  POPULER_URL,
  TOP_RATED_URL,
  UPCOMING_URL,
} from '../../service/urls';
import firestore, { documentId } from '@react-native-firebase/firestore';
import {Collections} from '../../utils/collections';
import {Alert} from 'react-native';

const getPopulerMovies = createAsyncThunk(
  'movies/getPopulerMovies',
  async params => {
    try {
      const response = await getRequest(POPULER_URL, params);
      return response.data.results;
    } catch (error) {
      console.log('error', error);
    }
  },
);
const getMovieDetail = createAsyncThunk(
  'movies/getMovieDetail',
  async movieId => {
    try {
      const url = MOVIE_DETAIL_URL + movieId;
      const response = await getRequest(url, {});
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  },
);
const searchMovie = createAsyncThunk('movies/searchMovie', async params => {
  try {
    const response = await getRequest(MOVIE_SEARCH_URL, params);
    return response.data.results;
  } catch (error) {
    console.log('error', error);
  }
});
const getNowPlayingMovies = createAsyncThunk(
  'movies/getNowPlayingMovies',
  async params => {
    try {
      const response = await getRequest(NOW_PLAYING_URL, params);
      return response.data.results;
    } catch (error) {
      console.log('error', error);
    }
  },
);
const getTopRatedMovies = createAsyncThunk(
  'movies/getTopRatedMovies',
  async params => {
    try {
      const response = await getRequest(TOP_RATED_URL, params);
      return response.data.results;
    } catch (error) {
      console.log('error', error);
    }
  },
);
const getUpcomingMovies = createAsyncThunk(
  'movies/getUpcomingMovies',
  async params => {
    try {
      const response = await getRequest(UPCOMING_URL, params);
      return response.data.results;
    } catch (error) {
      console.log('error', error);
    }
  },
);
const addMyList = createAsyncThunk(
  'movies/addMyList',
  async (values: object, {rejectWithValue}) => {
    console.log('values', values);
    try {
      const data = await firestore()
        .collection(Collections.MYLISTMOVİE)
        .add(values);
      Alert.alert(
        'Film Eklendi',
        'Film listenize başarılı bir şekilde eklendi',
        [
          {
            text: 'Tamam',
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
    } catch (error: any) {
      console.log('hata', error); // rejected durumuna düşmesi için hata döndür
      return rejectWithValue('Bildirim kaydedilemedi');
    }
  },
);
const getMyList = createAsyncThunk(
  'movies/getMyList',
  async (userId: string, {rejectWithValue}) => {
    try {
      const data = await firestore()
        .collection(Collections.MYLISTMOVİE)
        .where('userId', '==', userId)
        .get();

      const myList = data.docs.map(movie => ({
        documentId: movie.id,
        ...movie.data(),
        show: movie.data().show ?? false,
      }));

      return myList;
    } catch (error: any) {
      return rejectWithValue('Beklenmedik bir hata oluştu');
    }
  },
);

export {
  getPopulerMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetail,
  searchMovie,
  addMyList,
  getMyList
};
