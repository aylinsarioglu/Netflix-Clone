import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Collections} from '../../utils/collections';

export const addNotificationDatabase = createAsyncThunk(
  'notifications/addNotificationDatabase',
  async (values: object, {rejectWithValue}) => {
    try {
      const data = await firestore()
        .collection(Collections.NOTIFICATIONS)
        .add(values);
      return values;
    } catch (error: any) {
      console.log('hata', error); // rejected durumuna düşmesi için hata döndür
      return rejectWithValue('Bildirim kaydedilemedi');
    }
  },
);

export const getNotificationList = createAsyncThunk(
  'notifications/getNotificationList',
  async (userId: string, {rejectWithValue}) => {
    try {
      const data = await firestore()
        .collection(Collections.NOTIFICATIONS)
        .where('userId', '==', userId)
        .get();

      const notificationList = data.docs.map(notification => ({
        notificationId: notification.id,
        ...notification.data(),
        show: notification.data().show ?? false,
      }));

      return notificationList;
    } catch (error: any) {
      return rejectWithValue('Beklenmedik bir hata oluştu');
    }
  },
);

export const updateNotification = createAsyncThunk(
  'notifications/updateNotification',
  async (notificationId: string) => {
    try {
      const data = await firestore()
        .collection(Collections.NOTIFICATIONS)
        .doc(notificationId)
        .update({show: true});
    } catch (error: any) {
      console.log('Error:', error);
    }
  },
);
