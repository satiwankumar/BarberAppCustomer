import React,{useEffect,useState} from 'react';
import { Text, StyleSheet, ScrollView, StatusBar,ActivityIndicator } from 'react-native';
import {  COLORS, GLOBALSTYLE, SIZES,TEXTSTYLES  } from '../constants'
import { Container, Header, Content, Accordion, Form, Item, Input, Button,Textarea, View, Icon, TouchableOpacity, Card, CardItem, Body } from 'native-base';
import {addReviews} from '../redux/actions/shops'
import {connect} from 'react-redux'
import { Rating, AirbnbRating } from 'react-native-ratings';


const PostReview = ({navigation,addReviews,route}) => {
  const shopId = route.params.shopId;
  
  const [rating,setRating] =useState(1)
  const [review,setReview] =useState('')
  const ratingCompleted = (rating) => {
    console.log("Rating",rating)
    setRating(rating)
  }
  const PostReview = (rating,reviewtext) =>{
    // console.log("rat",rating,reviewtext,shopId)
    addReviews(rating,reviewtext,shopId)
    navigation.goBack()
  }
  return (
    <Container style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
     
      <ScrollView>

       
        <Text style={TEXTSTYLES.sectionHead}>post review</Text>
        <View  style={styles.jobBox}>
        <Textarea onChangeText={(e)=> setReview(e)} value={review} style={{borderColor:COLORS.lightGray,color:COLORS.lightGray}} rowSpan={6} bordered placeholder="Write Review" />
        <Rating
        startingValue={1}
        type='custom'
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
  ratingBackgroundColor={COLORS.lightGray}
  ratingColor='#f3c030'
  imageSize={27}
  tintColor={COLORS.black}
/>
<Button onPress={()=> PostReview(rating,review) } style={GLOBALSTYLE.themebtn}>
  <Text style={{color:COLORS.white,textTransform:'uppercase',fontSize:16}}>
    Post Review
  </Text>
</Button>
          </View>

      </ScrollView>
    </Container>
  )
}



// export default Service;
export default connect(null,{addReviews})(PostReview);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  jobBox: {
    backgroundColor: COLORS.black,
    paddingVertical:20,
    width: '95%',
    borderRadius:6,
    alignSelf:'center',
    maxWidth: 500,
    paddingHorizontal:10
  },
  searchbar: {
    width: '95%',
    alignSelf: 'center',
  }

});