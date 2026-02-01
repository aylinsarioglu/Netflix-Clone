import {createSlice} from '@reduxjs/toolkit';
import {MoviesState} from '../../models/data/moviesState';
import {
  getMovieDetail,
  getMyList,
  getNowPlayingMovies,
  getPopulerMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovie
} from '../actions/moviesActions';
import {CATEGORİES} from '../../utils/constants';

const initialState: MoviesState = {
  populerMovies: [],
  myList:[],
  searchList:[],
  nowPlayingMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  pending: false,
  pendingSearch:false,
  error: {},
  selectedCategory: {},
  categories: [
    {
      id: 1,
      category: CATEGORİES.NOWPLAYING,
      categoryTitle: 'Now playing',
    },
    {
      id: 2,
      category: CATEGORİES.POPULER,
      categoryTitle: 'Populer',
    },
    {
      id: 3,
      category: CATEGORİES.TOPRATED,
      categoryTitle: 'Top Rated',
    },
    {
      id: 4,
      category: CATEGORİES.UPCOMING,
      categoryTitle: 'UpComing',
    },
  ],
  movieDetailData: {},
  pendingMovieDetail: false,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = state.categories.find(
        c => c.category == action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPopulerMovies.pending, state => {
        state.pending = true;
      })
      .addCase(getPopulerMovies.fulfilled, (state, action) => {
        (state.populerMovies = action.payload), (state.pending = false);
      })
      .addCase(getPopulerMovies.rejected, (state, action) => {
        (state.pending = false), (state.error = action.error);
      })
      .addCase(getNowPlayingMovies.pending, state => {
        state.pending = true;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        (state.nowPlayingMovies = action.payload), (state.pending = false);
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        (state.pending = false), (state.error = action.error);
      })
      .addCase(getTopRatedMovies.pending, state => {
        state.pending = true;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        (state.topRatedMovies = action.payload), (state.pending = false);
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        (state.pending = false), (state.error = action.error);
      })
      .addCase(getUpcomingMovies.pending, state => {
        state.pending = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        (state.upcomingMovies = action.payload), (state.pending = false);
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        (state.pending = false), (state.error = action.error);
      })
      .addCase(getMovieDetail.pending, state => {
        state.pendingMovieDetail = true;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        (state.movieDetailData = action.payload), (state.pending = false);
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        (state.pendingMovieDetail = false), (state.error = action.error);
      })
      .addCase(searchMovie.pending, state => {
        state.pendingSearch = true;
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        (state.searchList = action.payload), (state.pendingSearch = false);
      })
      .addCase(searchMovie.rejected, (state, action) => {
        (state.pendingSearch = false), (state.error = action.error);
      })
      .addCase(getMyList.fulfilled, (state, action) => {
        (state.myList = action.payload);
      });
  },
});

export const {setCategory} = moviesSlice.actions;
export default moviesSlice.reducer;
