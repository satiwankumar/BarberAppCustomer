import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet,Image,ImageBackground,StatusBar,ScrollView ,TouchableOpacity} from "react-native";
import { COLORS, SIZES, GLOBALSTYLE, TEXTSTYLES } from '../constants';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Form, Item, Input, Button,  Label,Icon, Segment,ListItem,Radio } from 'native-base';
import Team from './components/Team'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux'
import { getEmployeesByShopService,getTimeSlots } from '../redux/actions/employees'
import moment from 'moment';


const BookNow = ({route,getEmployeesByShopService,getTimeSlots,Employees:{employees,loading,timelsots},navigation}) => {
  const Shop= route.params?.Shop
  const Service= route.params?.Service
  const [empSelected,setEmpSelected] = useState(null)
  const [timeSelected,setEmpTimeSelected] = useState(null)
  useEffect(() => {
    getEmployeesByShopService(Shop._id,Service._id)
  }, [Shop,Service])

    const [appointmentDate,setAppointmentDate] = useState(new Date())
    const [isDayPickerVisible, setDayPickerVisibility] = useState(false);
    const EmployeeSlot = (item) => {
console.log("**SELECTED EMPLOYEES",item)
setEmpSelected(item)
getTimeSlots(item._id,Service._id,appointmentDate)
console.log("**EMPLOYEE TIMESLOTS ",timelsots)
    }
    const showDayPicker = () => {
        setDayPickerVisibility(true);                        
      };
      const hideDayPicker = () => {
        setDayPickerVisibility(false);
      };
      const handleConfirmDay = (date)  => {
        setAppointmentDate(moment(date).utc('MM-DD-YYYY'))
        hideDayPicker();
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
                        <Text style={styles.serviceName}>{Service?.title} </Text>
                        <Text style={styles.price}>$ {Service?.charges}</Text>
                    </View>
                    <Text style={{color:COLORS.lightGray,fontSize:15,}}>{Service?.description}</Text>
                    <Text style={{color:COLORS.white,fontSize:15,marginTop:10}}>By - {Shop?.title}</Text>
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
                       value={moment(appointmentDate).format('LL')}
                   />
                     <Icon onPress={showDayPicker} style={{color:COLORS.lightGray}} name="calendar-outline"></Icon>
               </Item>
        
        <DateTimePickerModal
        isVisible={isDayPickerVisible}
        mode="date"
        onConfirm={handleConfirmDay}
        onCancel={hideDayPicker}
        minimumDate={moment().toDate()}
      />
               
                    
      <Text style={TEXTSTYLES.sectionHead}>Choose Stylist</Text>
      <ScrollView scrollEventThrottle={16} horizontal={true}  showsHorizontalScrollIndicator={false} >

      { employees && Object.keys(employees).length>0?

employees.data.map((item,index)=>(
        
        <TouchableOpacity key={item._id}  onPress={() => EmployeeSlot(item)} style={{borderColor:COLORS.transparent,padding:0,margin:0,marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:0}} >
        <Radio
        onPress={() => EmployeeSlot(item)}
            color={COLORS.transparent}
            selectedColor={COLORS.transparent}
            selected={empSelected == item ? true : false}
            style={{position:'absolute'}}
           
          />
          
           <View style={empSelected == item ? styles.selectedTeam : styles.notSelected} >
           <Team   imageUri={{uri: item.image}} memberName ={item.name}/>
         </View>
      </TouchableOpacity>

        
        
      )
      ):
      <Text style={{color:COLORS.white,paddingHorizontal:10}}>No Employees Found</Text>
}
          
            </ScrollView>

            <Text style={[TEXTSTYLES.sectionHead,styles.mb]}>Availible time slots </Text>
            <ScrollView scrollEventThrottle={16} horizontal={true}  showsHorizontalScrollIndicator={false}>
{
  empSelected !== null  ? 
  <>

{
  timelsots && Object.keys(timelsots).length>0 ? 
timelsots.hours.map((item,index) => (
  <>
  

                <TouchableOpacity key={index} disabled={item.available ? false : true}  onPress={() => setEmpTimeSelected(item)}   style={{borderColor:COLORS.transparent,marginHorizontal:4}} >
        <Radio
        onPress={() => setEmpTimeSelected(item)}
            color={COLORS.transparent}
            selectedColor={COLORS.transparent}
            style={{position:'absolute'}}
            selected={timeSelected == item ? true : false}
          />
          
           <View >
           <View style={timeSelected == item ? styles.timeSelect : (item.available ?  styles.time : styles.disabledTime)}>
                <Text style={{color:COLORS.white,textTransform:'uppercase'}}>{item.startTime }{item.available} - {item.endTime}</Text>
                </View>
         </View>
      </TouchableOpacity>
                </>
                )): null
            }
  </>

   : <Text style={{color:COLORS.white,paddingHorizontal:10}}>Select Employee to get Respective Time Slots</Text>
}

       
          
    </ScrollView>
    <View style={{marginTop:20}}>
    <Button  disabled={empSelected !== null && timeSelected !== null ? false : true} style={empSelected !== null && timeSelected !== null ? GLOBALSTYLE.themebtn : styles.disbaleBtn} onPress={()=> navigation.navigate('ReviewAppointment',{Shop: Shop, Service: Service , AppointmentDate: appointmentDate.toString() , EmployeeId : empSelected._id , TimeSlot: timeSelected})}>
                        <Text style={{color:COLORS.white,textTransform:'uppercase'}}>Review appointment</Text>
                    </Button>
    </View>
    
               </ScrollView>
            </Animatable.View>
           </View>
            
          );

};

const mapStateToProps = state => ({
  Employees: state.employees

})
export default connect(mapStateToProps, { getEmployeesByShopService,getTimeSlots })(BookNow);

const styles = StyleSheet.create({
    formPart:{
        flex:3,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:COLORS.primary,
        paddingVertical:30,
        paddingHorizontal:10
    },
    mb:{
      marginBottom:10
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
    disabledTime:{
      borderWidth:1,
      borderColor:COLORS.lightGray,
      paddingVertical:10,
      paddingHorizontal:20,
      marginRight:0,
      borderRadius:30,
      opacity:0.3
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


