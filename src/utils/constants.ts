import {Dimensions} from 'react-native';
import {TAB} from './route';

const API_KEY = '2e1afd3a5fb498d1cc0ad463b716d6b4';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTFhZmQzYTVmYjQ5OGQxY2MwYWQ0NjNiNzE2ZDZiNCIsIm5iZiI6MTc1OTA4NDc3My44NTc5OTk4LCJzdWIiOiI2OGQ5ODBlNTQzMDYxOWFmNDQzOGJkNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CkfgmYvVIm-hbn1QDr0KA4Nlgy_JR1pd75iJcQjmCPo';

enum CATEGORİES {
  POPULER = 'populer',
  TOPRATED = 'topRated',
  NOWPLAYING = 'nowPlaying',
  UPCOMING = 'upComing',
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const linking = {
  prefixes: ['https://www.netflix.com/', 'netflix://'],
  config: {
    initialRouteName: TAB,
    screens: {
      'Movie Detail': {
        path: 'movie/:movieId',
      },
    },
  },
};

export {API_KEY, token, CATEGORİES, screenHeight, screenWidth, linking};
