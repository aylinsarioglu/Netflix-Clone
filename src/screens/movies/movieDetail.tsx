import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {screenStyle} from '../../styles/defaultScreenStyle';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {addMyList, getMovieDetail, getMyList} from '../../store/actions/moviesActions';
import {IMAGE_BASE_URL} from '../../service/urls';
import {screenHeight, screenWidth} from '../../utils/constants';
import IconButton from '../../components/ui/iconButton';
import {Add, ArrowDown, Like1, Play, Send} from 'iconsax-react-nativejs';
import Button from '../../components/ui/button';

const MovieDetail: React.FC = ({route}) => {
  const dispatch: AppDispatch = useDispatch();
  const {movie} = route.params;
  console.log(movie);
  const {movieDetailData, pendingMovieDetail} = useSelector(
    (state: RootState) => state.movies,
  );
  const {token} = useSelector((state: RootState) => state.notifications);
  const movieId = route.params.movieId;
  useEffect(() => {
    dispatch(getMovieDetail(movieId));
    return()=> {
      dispatch(getMyList(token))
    }
  }, []);
  const handleAddMyList = () => {
    const payload = {
      ...movieDetailData,
      userId: token,
    };
    dispatch(addMyList(payload));
  };

  return (
    <View style={screenStyle.container}>
      {!pendingMovieDetail ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={'large'} />
        </View>
      ) : (
        <ScrollView>
          <ImageBackground
            source={{uri: `${IMAGE_BASE_URL}${movieDetailData?.backdrop_path}`}}
            style={{
              width: screenWidth,
              height: screenHeight * 0.3,
              resizeMode: 'contain',
            }}>
            <View
              style={{
                top: screenHeight * 0.3 - screenHeight * 0.1,
                position: 'absolute',
                zIndex: 999,
              }}>
              <Image
                source={{
                  uri: `${IMAGE_BASE_URL}${movieDetailData?.poster_path}`,
                }}
                style={{
                  width: screenWidth / 3.5,
                  height: screenHeight * 0.18,
                  resizeMode: 'stretch',
                  borderRadius: 10,
                  left: 5,
                }}
              />
            </View>
            <View
              style={{
                top: screenHeight * 0.3 - screenHeight * 0.1,
                position: 'absolute',
                right: 0,
                width: screenWidth,
                height: screenHeight * 0.1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 14,
                  lineHeight: 20,
                }}>
                POPULARITY:
                <Text style={{color: 'white'}}>
                  {' '}
                  {movieDetailData?.popularity}{' '}
                </Text>
              </Text>
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 14,
                  lineHeight: 20,
                  marginTop: 10,
                }}>
                RATE:
                <Text style={{color: 'white'}}>
                  {' '}
                  {movieDetailData?.vote_average}{' '}
                </Text>
              </Text>
            </View>
          </ImageBackground>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <IconButton
              onPress={() => handleAddMyList()}
              title="My List"
              Icon={<Add color="white" size={25} />}
            />
            <IconButton title="Rate" Icon={<Like1 color="white" size={25} />} />
            <IconButton title="Share" Icon={<Send color="white" size={25} />} />
          </View>
          <View style={{marginVertical: 15, paddingHorizontal: 10}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 20,
              }}>
              {movieDetailData?.title}
            </Text>
            {movieDetailData?.release_date && (
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  lineHeight: 20,
                  marginTop: 10,
                }}>
                {movieDetailData?.tagline}
              </Text>
            )}
            {movieDetailData?.tagline && (
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  lineHeight: 20,
                  marginTop: 10,
                }}>
                {movieDetailData?.tagline}
              </Text>
            )}
            {
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  paddingVertical: 10,
                  backgroundColor: '#1c1B15',
                }}>
                {movieDetailData.production_companies?.map((company, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: `${IMAGE_BASE_URL}${company.logo_path}`,
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      borderRadius: 10,
                      left: 5,
                      marginHorizontal: 15,
                    }}
                  />
                ))}
              </View>
            }
          </View>

          <View style={{marginVertical: 15}}>
            <Button
              backgroundColor={'white'}
              title="Play"
              Icon={<Play color="black" size={25} variant="Bold" />}
            />
            <Button
              titleColor={'white'}
              backgroundColor={'gray'}
              title="Download"
              Icon={<ArrowDown color="white" size={25} variant="Bold" />}
            />
          </View>

          <View style={{marginVertical: 15, paddingHorizontal: 10}}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 16,
                lineHeight: 20,
              }}>
              {movieDetailData?.overview}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});

export default MovieDetail;
