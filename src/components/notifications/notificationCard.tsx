import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {NotificationCardProps} from '../../models/ui/notificationCardProps';
import {Notification} from 'iconsax-react-nativejs';
import { useNavigation } from '@react-navigation/native';
import { MOVIEDETAIL } from '../../utils/route';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { readNotification } from '../../store/slices/notificationsSlice';
import moment from 'moment';
import { updateNotification } from '../../store/actions/notificationAction';

const NotificationCard: React.FC<NotificationCardProps> = ({notification}) => {
  const navigation = useNavigation();
  const dispatch:AppDispatch=useDispatch();
  return (
    <Pressable
    onPress={()=>{
      dispatch(readNotification(notification.id))
      dispatch(updateNotification(notification.notificationId));

      navigation.navigate(MOVIEDETAIL,{movieId: notification.value})}}
    style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Notification color="white" size={40} />
        {!notification.show && (
          <View
            style={{
              backgroundColor: 'red',
              width: 14,
              height: 14,
              borderRadius: 100,
              position: 'absolute',
              right: 15,
              top: 2,
            }}
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 24,
            color: 'white',
          }}>
          {notification.title}
        </Text>
        <Text
     /*    numberOfLines={2} */
          style={{
            fontSize: 15,
            color: 'gray',
          }}>
          {notification.body}
        </Text>
      </View>

       <View style={{}}>
        <Text
       /*  numberOfLines={2} */
          style={{
            fontSize: 18,
            color: 'gray',
          }}>
          {moment(notification.sentTime).format('HH:mm')}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
  },
});

export default NotificationCard;
