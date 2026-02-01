import React from 'react';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import { CategoryCardProps } from '../../models/ui/categoryCardProps';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/slices/moviesSlice';
import { screenHeight, screenWidth } from '../../utils/constants';

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
  const {selectedCategory}=useSelector((state:RootState)=> state.movies)
  const dispatch: AppDispatch= useDispatch();

  return (
    <TouchableOpacity 
    onPress={()=> dispatch(setCategory(category.category))}
    style={[styles.container,{backgroundColor:selectedCategory.category==category.category?"white":"black"}]}>
      <Text style={{ fontSize: 18,
    color:selectedCategory.category==category.category?"black":"white",}}>{category.categoryTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10,
    width:screenWidth/3,
    height:screenHeight*0.05,
    borderRadius:1000
  }
});

export default CategoryCard;