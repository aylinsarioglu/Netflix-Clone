import React from 'react';
import { TabBarIconProps } from '../../models/ui/tabBarIconProps';
import {DOWNLOADS, HOME, MYLIST, SEARCH} from '../../utils/route';
import { ArrowCircleDown2, Home2, SearchNormal1, VideoPlay } from 'iconsax-react-nativejs';

const TabBarIcon: React.FC<TabBarIconProps> = ({name,color,size,focused}) => {
 switch(name){
    case HOME:
        return (
        <Home2 size={size} color={color} variant={focused? "Bold":"Outline"}/>
    )
     case MYLIST:
        return (
        <VideoPlay size={size} color={color} variant={focused? "Bold":"Outline"}/>
    )
     case SEARCH:
        return (
        <SearchNormal1 size={size} color={color} variant={focused? "Bold":"Outline"}/>
    )
     case DOWNLOADS:
        return (
        <ArrowCircleDown2 size={size} color={color} variant={focused? "Bold":"Outline"}/>
    ) 
 } 
};


export default TabBarIcon; 