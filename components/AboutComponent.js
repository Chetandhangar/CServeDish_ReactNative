import React,{Component} from 'react';
import {Text ,ScrollView,FlatList} from 'react-native';
import {Avatar, Card,ListItem} from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable'


const mapStateToProps = state =>{
   return{
       leaders : state.leaders
   }
}

class About extends Component{


    render(){

        const renderAboutItem = ({item, index}) =>{
            return(
                <ListItem key={index}>
                <Avatar rounded source={{uri : baseUrl + item.image}}/>
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


        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if(this.props.leaders.errMess){
            return(
               <ScrollView>
                   <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <RednerHistory />
                    <Card 
                        title="Corporate LeaderShip">
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                   </Animatable.View>
                
               </ScrollView>
            );
        }
        else{
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
                  <RednerHistory />
                <Card title="Corporate LeaderShip">
                <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderAboutItem}
                keyExtractor={item => item.id.toString()}
                />
                </Card>
                    </Animatable.View>
                </ScrollView>
              
            );
        }

       
    }
}

export default connect(mapStateToProps)(About);