import React from 'react';
import { FlatList ,View, Text} from 'react-native';
import { Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';


const mapStateToProps = state =>{
    return{
        dishes : state.dishes
    };
}

class Menu extends React.Component {
   

    static navigationOptions={
        title: 'Menu'
    }

    render(){
        const renderMenuItem = ({item, index}) =>{
            return(
                <Tile
                    key ={index} 
                    title={item.name}
                    featured
                    caption={item.description}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri : baseUrl + item.image}}
                />     
            );
        };

        const {navigate} = this.props.navigation;

    if(this.props.dishes.isLoading){
        return(
            <Loading/>
        );
    }
    else if(this.props.dishes.errMess){
        return(
            <View>
                <Text>{this.props.dishes.errMess}</Text>
            </View>
        );
    }
    else{
        return(
            <FlatList
                data={this.props.dishes.dishes}
                renderItem = {renderMenuItem}
                keyExtractor = {item => item.id.toString()}
            />
    )
    }
  
}
}



export default connect(mapStateToProps)(Menu);