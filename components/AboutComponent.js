import React,{Component} from 'react';
import {Text ,ScrollView,FlatList} from 'react-native';
import {Avatar, Card,ListItem} from 'react-native-elements';
import {LEADERS} from '../shared/leaders';

class About extends Component{

    constructor(props){
        super(props);
        this.state={
            leaders : LEADERS
        }
    }

    render(){

        const renderAboutItem = ({item, index}) =>{
            return(
                <ListItem key={index}>
                <Avatar rounded source={require('./images/alberto.png')}/>
                <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            );
        }

        function RednerHistory(){
            return(
            <Card>
            <Card.Title style={{fontSize:20, fontWeight:'bold'}}>Our History</Card.Title>
            <Card.Divider/>
            <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
            With its unique brand of world fusion cuisine that can be found nowhere else, 
            it enjoys patronage from the A-list clientele in Hong Kong.  
            Featuring four of the best three-star Michelin chefs in the world, 
            you never know what will arrive on your plate the next time you visit us.
            {'\n'}
            {'\n'}
            {'\n'}
            The restaurant traces its humble beginnings to The Frying Pan, 
            a successful chain started by our CEO, Mr. Peter Pan, 
            that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
            );
        }

        return(
            <ScrollView>
              <RednerHistory />
            <Card>
                <Card.Title style={{fontSize:20}}>Corporate Leadership</Card.Title>
                <Card.Divider/>
            <FlatList
            data={this.state.leaders}
            renderItem={renderAboutItem}
            keyExtractor={item => item.id.toString()}
            />
            </Card>
          
            </ScrollView>
          
        );
    }
}

export default About;