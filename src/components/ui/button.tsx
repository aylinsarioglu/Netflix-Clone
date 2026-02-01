import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button: React.FC<Props> = ({ Icon, title, onPress, backgroundColor, titleColor ="black"}) => {
    
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button,{backgroundColor:backgroundColor}]} >
        {Icon}
        <Text style={[styles.title,{color:titleColor}]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:10,
    margin:5,
    borderRadius:10
  },
  text: {
    fontSize: 30,
  },
  title:{
    fontSize:18,
    fontWeight:"500",
    marginLeft:10,
  }
});

export default Button;
