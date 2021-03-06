import React, {Component } from 'react';
import {Text, View , ScrollView, Button, Switch, StyleSheet,Modal, Alert} from 'react-native' ;
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker'; //to user date and time use Datepicker from react-native-community/datetimepicker
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions  from 'expo-permissions';
import * as Calendar from 'expo-calendar';


class Reservation extends Component{
    constructor(props){
        super(props);
        this.state={
            date : '',
            guests : 1,
            smoking : false,
            showModal : false
        }
    }

   

    toggleMadal(){
        this.setState({showModal : !this.state.showModal})
    }
    
    resetForm(){
        this.setState({
            date: '',
            smoking : false,
            guests : 1
        })
    }


    obtainCalenderPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)

        if ( permission.status !== 'granted' ){
            permission = await Permissions.askAsync(Permissions.CALENDAR)
            if ( permission.status !== 'granted' ){
                Alert.alert("Permission not granted")
            }
        }
        return permission
    }

    getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync()
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default')
        return defaultCalendars[0].source
    }

    addReservationToCalendar = async ( date ) => {
        await this.obtainCalenderPermission()

        const defaultCalendarSource = Platform.OS === 'ios' ?
            await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        const tempDate = Date.parse(date)
        const startDate = new Date(tempDate)
        const endDate = new Date(tempDate + 2 * 60 * 60 * 1000)

        const calendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })

        await Calendar.createEventAsync(calendarID, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Kolkata',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
    }

    
    


    handleReservation(){
        console.log(JSON.stringify(this.state));
        //Alert to check the reservation is ok or not
        Alert.alert(
           "Your Reservation Ok?",
            'Number of Guests : ' + this.state.guests + '\n'
            + 'Smoking? : ' + this.state.smoking + '\n'
            + 'Date : ' + this.state.date + '\n',
           [
               {
                   text: "Cancel",
                   style : 'cancel',
                   onPress: () => {this.resetForm()}
               },
               {
                   text : "Ok",
                   onPress : () => {
                    this.presentLocalNotification( this.state.date )
                    this.addReservationToCalendar(this.state.date);
                    this.resetForm();},
                   
               }
               
           ],
           
        )
    };

 

    async obtainNotificationPermission (){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if(permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted'){
                Alert.alert("Permission not granted to show notification")
            }
        }
        return permission;
    }

    async presentLocalNotification (date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
           title : 'Your Reservation',
           body: 'Reservation for  ' + date + ' requested',
           ios : {
               sound : true
           },
           android: {
            sound : true,
            vibrate : true,
            color: '#512DA8'
            
        }

        });
        console.log('preserntLocalNotification');
    

    };
  
  

    

    render(){
        return(
           
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formItem}>Number of Guests</Text>
                    <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formItem}>Date and Time</Text>
                    <DatePicker
                    style={{flex: 2 , marginRight : 20}}
                    date={this.state.date}
                    format=""
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2017-05-10"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({date : date})}}>
                    </DatePicker>
                </View>
                <View style={styles.formRow}>
                    <Button 
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this button"
                    onPress={() => this.handleReservation()}
                    />
                </View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showModal}
                onDismiss={()=>this.toggleMadal()}
                onRequestClose={()=>this.toggleMadal()}
                >
                <View style={styles.modal}>
                <Text style={styles.modalTitle}>Reservation Details</Text>
                <Text style={styles.modalText}>Number of Guests : {this.state.guests}</Text>
                <Text style={styles.modalText}>Smoking? : {this.state.smoking ? "Yes" : "No"}</Text>
                <Text style={styles.modalText}>Reservation Date : {this.state.date}</Text>

                <Button 
                title="Close"
                color="#512DA8"
                onPress={() => {this.toggleMadal(), this.resetForm()}}
                />
                </View>
                </Modal>
                </Animatable.View>
            </ScrollView>
        );
    }
};


const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;