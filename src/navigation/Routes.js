import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './Tabs'
import { Home, ResetCode, ServiceProvider, BookingComplete, ReviewAppointment, EditProfile, Notification, Payment, JobDetails, PostedJobs, LocationAccess, SplashScreen, UserBookings, UserProfile, FindServices, LoginScreen, SignUp, SignUp2, BookNow, ForgotPassword, VendorDetail, ViewAll, AllReviews, ResetPassword } from '../screens'
import { COLORS } from '../constants';
import { connect } from 'react-redux'

const Stack = createStackNavigator();

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
                           <Stack.Screen name="FindServices" component={FindServices} ></Stack.Screen>
                          <Stack.Screen name="LocationAccess" component={LocationAccess} ></Stack.Screen>
                           <Stack.Screen name="Home" component={Tabs} ></Stack.Screen>
                          <Stack.Screen name="ViewAll" component={ViewAll} ></Stack.Screen>
                          <Stack.Screen name="VendorDetail" component={VendorDetail} ></Stack.Screen>
                          <Stack.Screen name="PostedJobs" component={PostedJobs}></Stack.Screen>
                          <Stack.Screen name="JobDetails" component={JobDetails}></Stack.Screen>
                          <Stack.Screen name="UserBookings" component={UserBookings}></Stack.Screen>
                          <Stack.Screen name="UserProfile" component={UserProfile} ></Stack.Screen>
                          <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
                          <Stack.Screen name="AllReviews" component={AllReviews}></Stack.Screen>
                          <Stack.Screen name="ServiceProvider" component={ServiceProvider}></Stack.Screen>
                          <Stack.Screen name="BookNow" component={BookNow}></Stack.Screen>
                          <Stack.Screen name="ReviewAppointment" component={ReviewAppointment}></Stack.Screen>
                          <Stack.Screen name="Payment" component={Payment}></Stack.Screen>
                          <Stack.Screen name="BookingComplete" component={BookingComplete}></Stack.Screen>
                          <Stack.Screen name="Notification" component={Notification}></Stack.Screen>
                          <Stack.Screen name="ResetCode" component={ResetCode}></Stack.Screen>
                          <Stack.Screen name="ResetPassword" component={ResetPassword}></Stack.Screen>
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

