import React, {useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {screenStyle} from '../../styles/defaultScreenStyle';
import NotificationCard from '../../components/notifications/notificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {getNotificationList} from '../../store/actions/notificationAction';

const Notifications: React.FC = () => {
  const {notifications, token,pending} = useSelector(
    (state: RootState) => state.notifications,
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
      dispatch(getNotificationList(token));
  }, []);

  return (
    <View style={screenStyle.container}>
     {
      pending ? 
      <ActivityIndicator size={"large"} color={"gray"}/>
      : 
       <FlatList
        ListEmptyComponent={
          <Text style={{color: 'gray', fontSize: 20, textAlign: 'center'}}>
            No Data
          </Text>
        }
        data={notifications}
        renderItem={({item}) => <NotificationCard notification={item} />}
      />
     }
    </View>
  );
};

export default Notifications;
