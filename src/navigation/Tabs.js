import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import JobDetails from '../screens/JobDetails'
import PostedJobs from '../screens/PostedJobs'
import UserProfile from '../screens/UserProfile'
import {COLORS} from '../constants'
import { UserBookings } from '../screens';
import { Icon } from 'native-base';



const Tab = createBottomTabNavigator();
const Tabs = () => {
    return(
        <Tab.Navigator
        tabBarOptions={{
         
          activeTintColor: COLORS.secondry,
          labelStyle: {
            fontSize: 13,
            margin: 0,
            padding: 0,
          },
          style: {
            backgroundColor: COLORS.black,
            borderTopColor:COLORS.transparent,
            height:55,
          },
        }}
        
        >

<Tab.Screen name="Home" component={Home}  options={{
  
           tabBarIcon:({tintColor,focused})=>(    
            <Icon style={{fontSize:27, color: focused ? COLORS.secondry : COLORS.lightGray}} name='home-outline' />
          
        )  
      }}/>
      <Tab.Screen name="Bookings" component={UserBookings}  options={{
           tabBarIcon:({tintColor,focused})=>(  
            <Icon style={{fontSize:27, color: focused ? COLORS.secondry : COLORS.lightGray}} name='calendar-outline' />
        )  
      }}/>

<Tab.Screen name="Jobs" component={PostedJobs}  options={{
           tabBarIcon:({tintColor,focused})=>(  
            <Icon style={{fontSize:27, color: focused ? COLORS.secondry : COLORS.lightGray}} name='hourglass-outline' />
        )  
      }}/>
          <Tab.Screen name="Profile" component={UserProfile}   options={{
            showLabel:false,
           tabBarIcon:({tintColor,focused})=>(  
            <Icon style={{fontSize:27, color: focused ? COLORS.secondry : COLORS.lightGray}} name='person-outline' />
        )  
      }}/>
    </Tab.Navigator>
    )
}




export default Tabs;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });