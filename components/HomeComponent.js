import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

function RenderItem(props){
    const item = props.item;

    if(item != null){
        return(
            <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}
            >
            <Text
            style={{margin:10}}>
            {item.description}
            </Text>                
            </Card>
        );    
    }
    else{
        return (<View></View>)
    }
}

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            dishes: DISHES,
            leaders:LEADERS,
            promotions : PROMOTIONS
        }
    }

    static navigationOptions ={
        title :'Home'
    }

    render(){
        return(
            <ScrollView>
                <RenderItem 
                item={this.state.dishes.filter((dish)=> dish.featured)[0]}
                />
                <RenderItem
                item={this.state.leaders.filter((leader) => leader.featured)[0]}
                 />
                 <RenderItem
                 item={this.state.promotions.filter((promo)=> promo.featured)[0]}
                 />
            </ScrollView>
        );
    }
}

export default Home;