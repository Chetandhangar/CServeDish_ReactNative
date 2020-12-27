import React from 'react';
import { FlatList } from 'react-native';
import { ListItem,} from 'react-native-elements';
import {DISHES} from '../shared/dishes';


/**
* @author
* @function Menu
**/
class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dishes : DISHES
        }
    }

    static navigationOptions={
        title: 'Menu'
    }

    render(){
        const renderMenuItem = ({item, index}) =>{
            return(
                <ListItem
                    key ={index} 
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png')}}
                />     
            );
        };

        const {navigate} = this.props.navigation;

 return(
        <FlatList
            data={this.state.dishes}
            renderItem = {renderMenuItem}
            keyExtractor = {item => item.id.toString()}
        />
  )
}
}



export default Menu