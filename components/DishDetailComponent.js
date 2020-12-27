import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dishes: DISHES
        }
    }
    render(){
        const dishId = this.props.route.params.dishId;
        return(
        <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
 
}

export default Dishdetail;