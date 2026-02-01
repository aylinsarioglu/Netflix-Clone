import React,{memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SectionTitleProps } from '../../models/ui/sectionTitleProps';

const SectionTitle: React.FC<SectionTitleProps> = ({ title,onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{fontSize: 15, color: 'yellow', fontWeight: '500'}}>
          See All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(SectionTitle);
