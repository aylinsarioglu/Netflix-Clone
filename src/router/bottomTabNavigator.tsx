import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import {DOWNLOADS, HOME, MYLIST, NOTIFICATIONS, SEARCH} from '../utils/route';
import Search from '../screens/search';
import Downloads from '../screens/downloads';
import TabBarIcon from '../components/router/tabBarIcon';
import {TouchableOpacity, View, Text} from 'react-native';
import {NotificationBing} from 'iconsax-react-nativejs';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MyList from '../screens/myList';

const BottomTabNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const {notifications} = useSelector((state:RootState) => state.notifications)
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarStyle: {backgroundColor: 'black'},
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        tabBarLabelStyle: {
          color: 'white',
        },
        tabBarIcon: ({size, focused, color}) => (
          <TabBarIcon
            name={route.name}
            color={color}
            size={size}
            focused={focused}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate(NOTIFICATIONS)}>
            <NotificationBing color="white" size={35} />
           {notifications?.filter(item=>item.show == false).length!=0 &&
            <View
              style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                width: 20,
                height: 20,
                borderRadius:100,
                position:"absolute",
                right:0,
                top:0
              }}>
              <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>
                {notifications?.filter(item=>item.show == false).length}
              </Text>
            </View>}
          </TouchableOpacity>
        ),
      })}>
      <Tab.Screen name={HOME} component={Home} />
      <Tab.Screen name={MYLIST} component={MyList} />
      <Tab.Screen name={SEARCH} component={Search} />
      <Tab.Screen name={DOWNLOADS} component={Downloads} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
