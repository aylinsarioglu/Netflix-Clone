import {createSlice} from '@reduxjs/toolkit';
import {NotificationState} from '../../models/data/notificationState';
import { getNotificationList } from '../actions/notificationAction';

const initialState: NotificationState = {
  notifications: [],
  token:null,
  pending:false
};

const notificationsSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
     setToken: (state, action) => {
      state.token= action.payload;
    },
    addNewNotification: (state, action) => {
      state.notifications.push({...action.payload, show:false});
    },
    readNotification: (state, action) => {
      const item = state.notifications.find(n => n.id===action.payload)
      if(item){
        item.show=true;
      }
    },
  },
  extraReducers(builder){
    builder
    .addCase(getNotificationList.pending, (state)=>{
      state.pending = true;
    })
     .addCase(getNotificationList.fulfilled, (state,action)=>{
      state.notifications = action.payload;
      state.pending = false;
    })
     .addCase(getNotificationList.rejected, (state)=>{
      state.pending = false;
    })
  }
});

export const {addNewNotification, readNotification,setToken} = notificationsSlice.actions;
export default notificationsSlice.reducer;
