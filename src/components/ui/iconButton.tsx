import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = RouteType<'IconButton'>;

const IconButton: React.FC<Props> = ({title,Icon,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        {Icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    margin:10
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginTop:5
  },
});

export default IconButton;
