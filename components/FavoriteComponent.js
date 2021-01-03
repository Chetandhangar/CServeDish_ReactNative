import React,{Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';
import {deleteFavorite} from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state =>{
    return{
        dishes: state.dishes,
        favorites : state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component{

    static navigationOptions ={
        title : 'My Favorites'
    }

    render(){

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item , index}) =>{

            const rightButton =[
                {
                    text : 'delete',
                    type : 'delete',
                    onPress : () =>{
                        Alert.alert(
                            'Delete Favorite? ',
                            'Are you sure you wish to delete the favorite dish  ' + item.name + ' ?',
                            [
                                {
                                    text : 'Cancel',
                                    onPress : () => alert("Cancel deletion of " + item.name),
                                    style : 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress : () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            {cancelable : false}
                        )
                    }

                }
            ]

            return(
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                <Swipeout right={rightButton} autoClose={true}>
                     <ListItem key={index}
                    onPress={()=> navigate('Dishdetail', {dishId : item.id})}
                    >
                    <Avatar rounded source={{uri : baseUrl + item.image}}/>
                    <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>

                    </ListItem.Content>
                    </ListItem>
                </Swipeout>
                </Animatable.View>
                   
          
              
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);