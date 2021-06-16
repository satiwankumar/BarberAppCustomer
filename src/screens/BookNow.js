import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView ,TouchableOpacity} from "react-native";
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button,  Label,Icon, Segment,ListItem,Radio } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import Team from './components/Team'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux'
import { getEmployeesByShopService } from '../redux/actions/employees'

const BookNow = ({route,getEmployeesByShopService,Employees:{employees,loading},navigation}) => {
  const Shop= route.params.Shop
  const Service= route.params.Service
  const [empSelected,setEmpSelected] = useState(null)
  const [timeSelected,setEmpTimeSelected] = useState(null)
  useEffect(() => {
    getEmployeesByShopService('60bcc7a7faeaaa0022cb83fc','60b52715ce9a9b002246afbf')
  }, [Shop,Service])

    const [appointmentDate,setAppointmentDate] = useState(new Date())
    const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const daylist = [ "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]
    const [isDayPickerVisible, setDayPickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const showDayPicker = () => {
        setDayPickerVisibility(true);
      };
      const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
      const hideDayPicker = () => {
        setDayPickerVisibility(false);
      };
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
    
      const handleConfirmDay = (date) => {
        setAppointmentDate(date)
        console.log(appointmentDate)
        hideDayPicker();
      };
      const handleConfirmTime = (date) => {
        console.warn("A date has been picked: ", date);
        hideTimePicker();
      };
        return (
            <View style={GLOBALSTYLE.screenbg} >
            <StatusBar translucent backgroundColor="transparent" />
            
            <ImageBackground source={require("../assets/images/shopImg1.jpg")}
                style={styles.imageBg}>
              </ImageBackground>
        
            <Animatable.View style={styles.formPart}
            
            >
               <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                 <View style={{paddingLeft:10}}>
                 <View style={styles.serviceDesc}>
                        <Text style={styles.serviceName}>{Service.title} </Text>
                        <Text style={styles.price}>$ {Service.charges}</Text>
                    </View>
                    <Text style={{color:COLORS.lightGray,fontSize:15,}}>{Service.description}</Text>
                    <Text style={{color:COLORS.white,fontSize:15,marginTop:10}}>By - {Shop.title}</Text>
                 </View>
                 <Text style={TEXTSTYLES.sectionHead}>Select A Date  </Text>
       
                 <Item
                   style={styles.inputBox}>
                     
                      
                   <Input
                       style={styles.textContent}
                       autoCorrect={false}
                       placeholderTextColor={COLORS.lightGray}
                       placeholder="SELECT DATE"
                       autoCapitalize="none"
                       disabled={true}
                       value={daylist[appointmentDate.getDay()].toString() + " - " + mlist[appointmentDate.getMonth()].toString() + " " + appointmentDate.getDate().toString() + ", " + appointmentDate.getFullYear().toString()}
                   />
                     <Icon onPress={showDayPicker} style={{color:COLORS.lightGray}} name="calendar-outline"></Icon>
               </Item>
        
        <DateTimePickerModal
        isVisible={isDayPickerVisible}
        mode="date"
        onConfirm={handleConfirmDay}
        onCancel={hideDayPicker}
      />
               
                    
      <Text style={TEXTSTYLES.sectionHead}>Choose Stylist</Text>
      <ScrollView scrollEventThrottle={16} horizontal={true}  showsHorizontalScrollIndicator={false} >

      { employees && Object.keys(employees).length>0?

employees.data.map((item,index)=>(
        
        <ListItem key={item._id}  onPress={() => setEmpSelected(item)} style={{borderColor:COLORS.transparent,padding:0,margin:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0}} >
        <Radio
        onPress={() => setEmpSelected(item)}
            color={COLORS.transparent}
            selectedColor={COLORS.transparent}
            selected={empSelected == item ? true : false}
            style={{padding:0,margin:0}}
          />
          
           <View key={item._id}   style={empSelected == item ? styles.selectedTeam : styles.notSelected} >
           <Team   imageUri={{uri: item.image}} memberName ={item.name}/>
         </View>
      </ListItem>

        
        
      )
      ):
      <Text style={{color:COLORS.white,paddingHorizontal:10}}>No Employees Found</Text>
}
          
            </ScrollView>

            <Text style={TEXTSTYLES.sectionHead}>Availible time slots </Text>
            <ScrollView scrollEventThrottle={16} horizontal={true}  showsHorizontalScrollIndicator={false}>
{
  empSelected !== null ? 
  <>

{empSelected.slots.map((item,index) => (
  <>
  

                <ListItem key={index}  onPress={() => setEmpTimeSelected(item)}   style={{borderColor:COLORS.transparent,padding:0,margin:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0}} >
        <Radio
        onPress={() => setEmpTimeSelected(item)}
            color={COLORS.transparent}
            selectedColor={COLORS.transparent}
            style={{padding:0,margin:0}}
            selected={timeSelected == item ? true : false}
          />
          
           <View >
           <View style={timeSelected == item ? styles.timeSelect : styles.time}>
                <Text style={{color:COLORS.white,textTransform:'uppercase'}}>{empSelected.slots[index][0]} - {empSelected.slots[index][1]}</Text>
                </View>
         </View>
      </ListItem>
                </>
                ))
            }
  </>

   : <Text style={{color:COLORS.white,paddingHorizontal:10}}>Select Employee to get Respective Time Slots</Text>
}

       
          
    </ScrollView>
    <Button disabled={empSelected !== null && timeSelected !== null ? false : true} style={empSelected !== null && timeSelected !== null ? GLOBALSTYLE.themebtn : styles.disbaleBtn} onPress={()=> navigation.navigate('ReviewAppointment',{Shop: Shop, Service: Service , AppointmentDate: appointmentDate , EmployeeId : empSelected._id , TimeSlot: timeSelected})}>
                        <Text style={{color:COLORS.white,textTransform:'uppercase'}}>Review appointment</Text>
                    </Button>
               </ScrollView>
            </Animatable.View>
           </View>
            
          );

};

const mapStateToProps = state => ({
  Employees: state.employees

})
export default connect(mapStateToProps, { getEmployeesByShopService })(BookNow);

const styles = StyleSheet.create({
    formPart:{
        flex:3,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:COLORS.primary,
        paddingVertical:30,
        paddingHorizontal:10
    },
    inputBox:{
      backgroundColor:COLORS.black,
      borderColor:COLORS.transparent,
      paddingHorizontal:10,
      width:'80%',
      borderRadius:6

    },
    imageBg:{
        width:'100%',
        resizeMode:'cover',
        flex:1,
        height:300,
        backgroundColor: COLORS.secondry,
        opacity: 0.5,
    },
    datePicker:{
        alignSelf:'center'
    
    },
    disbaleBtn:{ 
      marginTop: 20,
      width: 200,
      height: 50,
      backgroundColor: COLORS.black,
      borderColor:COLORS.lightGray,
      borderWidth:1,
      alignSelf:'center',
      justifyContent:'center',
      borderRadius: 8,
      textAlign:'center',
      opacity:0.5
},
    selectedTeam:{padding:0,borderColor:COLORS.secondry,borderWidth:2,borderRadius:11},
    notSelected:{padding:0,borderColor:COLORS.transparent,borderWidth:2,borderRadius:11},
     timeslots:{
         flexDirection:'row',
         marginHorizontal:15,
         marginVertical:15
     },
     textContent:{
      textTransform:'uppercase',
      color:COLORS.lightGray
     },
     time:{
         borderWidth:1,
         borderColor:COLORS.lightGray,
         paddingVertical:10,
         paddingHorizontal:20,
         marginRight:0,
         borderRadius:30,
     },
     timeSelect:{
      borderWidth:1,
      borderColor:COLORS.secondry,
      paddingVertical:10,
      paddingHorizontal:20,
      marginRight:0,
      borderRadius:30,
     },
     serviceDesc:{
         flexDirection:'row',
         justifyContent:'space-between',
    
     },
     serviceName:{
         color:COLORS.white,
         fontSize:27,
         fontWeight:'bold',
         width:'60%'    
     }
     ,price:{
         color:COLORS.lightGray,
         fontSize:25,
     }
});


