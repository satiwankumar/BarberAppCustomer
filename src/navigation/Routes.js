import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { StyleSheet, View,Text ,Button, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './Tabs'
import { Home, ResetCode, ServiceProvider, BookingComplete, ReviewAppointment, EditProfile, Notification, Payment, JobDetails, PostedJobs, LocationAccess, SplashScreen, UserBookings, UserProfile, FindServices, LoginScreen, SignUp, SignUp2, BookNow, ForgotPassword, VendorDetail, ViewAll, AllReviews, ResetPassword } from '../screens'
import { COLORS } from '../constants';
import { connect } from 'react-redux'
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();
const NotificationIcon = () => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity  onPress={() => navigation.navigate({name: 'Notification'})}>
            <Icon style={{fontSize:23, color: COLORS.lightGray,marginHorizontal:10}} name='notifications-outline' />
        </TouchableOpacity>
    )
}
const Routes = ({ Auth: { isAuthenticated } }) => {
    return (
        <NavigationContainer theme={DarkTheme} >
            <Stack.Navigator
             
                screenOptions={{ 
                    headerShown: true,
                    title: false,
                    
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                }}
                initialRouteName={"SplashScreen"}
               
            >
                {isAuthenticated ?
                        (
                          <>
                           <Stack.Screen  name="FindServices" component={FindServices} 
                          ></Stack.Screen>
                          <Stack.Screen name="LocationAccess" component={LocationAccess} ></Stack.Screen>
                           <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="Home" component={Tabs} ></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="ViewAll" component={ViewAll} ></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="VendorDetail" component={VendorDetail} ></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="PostedJobs" component={PostedJobs}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="JobDetails" component={JobDetails}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="UserBookings" component={UserBookings}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="UserProfile" component={UserProfile} ></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="EditProfile" component={EditProfile}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="AllReviews" component={AllReviews}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="ServiceProvider" component={ServiceProvider}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="BookNow" component={BookNow}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="ReviewAppointment" component={ReviewAppointment}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="Payment" component={Payment}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="BookingComplete" component={BookingComplete}></Stack.Screen>
                          <Stack.Screen name="Notification" component={Notification}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="ResetCode" component={ResetCode}></Stack.Screen>
                          <Stack.Screen options={{headerRight: () => (<NotificationIcon/>)}} name="ResetPassword" component={ResetPassword}></Stack.Screen>
                        </>
                        ) :
                        <>
                          <Stack.Screen name="SplashScreen" component={SplashScreen} ></Stack.Screen>
                          <Stack.Screen name="LoginScreen" component={LoginScreen} ></Stack.Screen>
                          <Stack.Screen name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
                          <Stack.Screen name="SignUp" component={SignUp} ></Stack.Screen>
                          <Stack.Screen name="SignUp2" component={SignUp2} ></Stack.Screen>
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = (state) => ({
    Auth: state.auth
});
export default connect(mapStateToProps)(Routes);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

