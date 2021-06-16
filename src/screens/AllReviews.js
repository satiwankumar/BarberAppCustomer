import React from 'react';
import { Text, StyleSheet, Image,StatusBar,TouchableOpacity,ScrollView ,ImageBackground} from 'react-native';
import { Container, Header, Content,Card,CardItem,Body,FooterTab, Form, Item, Input,Icon, Button, View, Label } from 'native-base';
import {  COLORS, SIZES,TEXTSTYLES  } from '../constants'
import Review from './components/Review'

const AllReviews = props => {
    return(
        <Container style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
        <View style={{marginTop:30}}>
    <Text style={TEXTSTYLES.sectionHead}>Reviews</Text>
    </View>
        
    <Review
               authImg={require("../assets/images/p1.jpg")}
               authName="John Wilson"
               reviewDate="26 Feb,2021"
               review="I received excellent service for my first haircut at UA! Faith gave me tips for my scalp and cut my hair exactly the way I wanted it!"
                navigation={props.navigation}
                
              />
               <Review
               authImg={require("../assets/images/p1.jpg")}
               authName="John Wilson"
               reviewDate="26 Feb,2021"
               review="I had my first visit ever to United Artists. I chose this salon per the recommendation of a good friend who has been going to Kristin for her coloring needs for a while now. Kristin was a delight to talk to and so kind and funny. She made it a great experience and was very informative and helpful. The salon was a lot larger than I anticipated but everyone seemed very friendly. I’m sure I’ll return! Thanks!"
                navigation={props.navigation}
                
              />
               <Review
               authImg={require("../assets/images/p1.jpg")}
               authName="John Wilson"
               reviewDate="26 Feb,2021"
               review="I received excellent service for my first haircut at UA! Faith gave me tips for my scalp and cut my hair exactly the way I wanted it!"
                navigation={props.navigation}
                
              />
            </ScrollView>
            </Container>
    )
}

export default AllReviews;
const styles = StyleSheet.create({
    container: {                
      backgroundColor: COLORS.primary,
    },
})