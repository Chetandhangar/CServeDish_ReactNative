import React,{Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return{
        dishes: state.dishes,
        favorites : state.favorites
    }
}

class Favorites extends Component{

    static navigationOptions ={
        title : 'My Favorites'
    }

    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item , index}) =>{
            return(
                <ListItem key={index}>
                 <Avatar rounded source={{uri : baseUrl + item.image}}/>
                 <ListItem.Content>
                 <ListItem.Title>{item.name}</ListItem.Title>
                 <ListItem.Subtitle>{item.description}</ListItem.Subtitle>

                 </ListItem.Content>
                </ListItem>
            );
        };

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        else if(this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            
            );
        }
        else{
            return(
                <FlatList 
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
            );
        }
      
    }
}

export default connect(mapStateToProps)(Favorites);