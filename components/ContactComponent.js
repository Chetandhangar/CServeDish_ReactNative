import React, {Component} from 'react';
import {Card , Button, Icon} from 'react-native-elements';
import {Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component{
    
   
    sendEmail(){
        MailComposer.composeAsync({
            recipients : ['chetansdhangar@gmail.com'],
            subject : 'Enquiry',
            body : 'I really enjoy the services'
        })
    }


    render(){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card>
                    <Card.Title style={{fontSize:20, fontWeight: 'bold'}}>Contact Information</Card.Title>
                    <Card.Divider/>
                    <Text style={styles.textStyle}>  
                    121, Clear Water Bay Road{'\n'}
                    Clear Water Bay, Kowloon{'\n'}
                    HONG KONG{'\n'}
                    Tel: +852 1234 5678{'\n'}
                    Fax: +852 8765 4321{'\n'}
                    Email:confusion@food.net{'\n'}
                    </Text>
                    <Button 
                    title = "Send Email"
                    onPress ={this.sendEmail}
                    buttonStyle ={{backgroundColor : "#512DA8"}}
                    icon = {<Icon name='envelope-o' type = 'font-awesome' />}
                    />
                </Card>
            </Animatable.View>
     
        );
    }
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 18,
    }
})

export default Contact;