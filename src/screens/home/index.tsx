import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Linking} from 'react-native';
import {screenStyle} from '../../styles/defaultScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './../../store/store';
import {
  getNowPlayingMovies,
  getPopulerMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../../store/actions/moviesActions';
import Section from './../../components/home/section';
import {CATEGORİES} from '../../utils/constants';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  addNewNotification,
  setToken,
} from '../../store/slices/notificationsSlice';
import {addNotificationDatabase} from '../../store/actions/notificationAction';

const Home: React.FC = () => {
  const {populerMovies, nowPlayingMovies, topRatedMovies, upcomingMovies} =
    useSelector((state: RootState) => state.movies);

  const {token} = useSelector((state: RootState) => state.notifications);

  const dispatch: AppDispatch = useDispatch();

  async function requestUserPermission() {
    const token = await messaging().getToken();
    dispatch(setToken(token));
    if (Platform.OS == 'android')
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

    const authStatus = await messaging().requestPermission();
  }

  useEffect(() => {
    requestUserPermission();
    dispatch(getPopulerMovies({page: 1}));
    dispatch(getNowPlayingMovies({page: 2}));
    dispatch(getTopRatedMovies({page: 3}));
    dispatch(getUpcomingMovies({page: 4}));

    if (!token) return;
  }, []);

  useEffect(() => {
    // uygulama açıkken
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      dispatch(
        addNewNotification({
          id: remoteMessage.messageId,
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          show: false,
          value: remoteMessage?.data?.movieId,
          sentTime: remoteMessage.sentTime,
        }),
      );
      dispatch(
        addNotificationDatabase({
          userId: token,
          id: remoteMessage.messageId,
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          show: false,
          value: remoteMessage?.data?.movieId,
          sentTime: remoteMessage.sentTime,
        }),
      );
    });
    // uygulama kapalıyken
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(remoteMessage);
        Linking.openURL(remoteMessage?.data?.link);
      });

    // uygulama arka plandayken
    messaging()
    .onNotificationOpenedApp(remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      Linking.openURL(remoteMessage?.data?.link);
    });

    return unsubscribe;
  }, [token]);

  const sections = [
    {
      id: 1,
      sectionTitle: 'Now Playing',
      category: CATEGORİES.NOWPLAYING,
      data: nowPlayingMovies,
    },
    {
      id: 2,
      sectionTitle: 'Popular',
      category: CATEGORİES.POPULER,
      data: populerMovies,
    },
    {
      id: 3,
      sectionTitle: 'Top Rated',
      category: CATEGORİES.TOPRATED,
      data: topRatedMovies,
    },
    {
      id: 4,
      sectionTitle: 'Upcoming',
      category: CATEGORİES.UPCOMING,
      data: upcomingMovies,
    },
  ];

  return (
    <View style={screenStyle.container}>
      <FlatList
        data={sections}
        renderItem={({item}) => (
          <Section
            title={item.sectionTitle}
            data={item.data}
            category={item.category}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
