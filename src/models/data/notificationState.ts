interface Notification{
    id:number,
    title:string,
    body:string,
    show:boolean,
    value:string,
    sentTime:number,
    notificationId:string ,
}

interface  NotificationState {
    notifications: Notification[];
    token: string | null;
    pending: boolean;
}
export type {Notification,NotificationState};