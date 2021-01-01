import React from 'react';
import { Text, View, ScrollView, FlatList} from 'react-native';
import { Card, Icon } from 'react-native-elements';

import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return{
        dishes : state.dishes,
        comments : state.comments
    }
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                <Icon
                raised
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={()=> props.favorite ? alert("Already Favorite") : props.onPress()}
                />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item,index}) =>{
            return(
               <View key={index} style={{margin: 10}}>
                   <Text style={{fontSize:14}}>{item.comment}</Text>
                    <Text style={{fontSize:12}}>{item.rating + '  stars'}</Text>
                    <Text style={{fontSize:12}}>{item.date}{'~~ ' + item.author}</Text>
               </View>
            );
    }
    if(comments !=null){
        return(
            <Card title="Comments">
                <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        );
    }
    else{
        return(<View></View>)
    }
  
}

class Dishdetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            favorites: []
        }
    }

    markedFavorite(dishId){
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        })
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.state.favorites.some(el => el === dishId)}
                onPress={()=> this.markedFavorite(dishId)}
                />
                <RenderComment comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)}/>
            </ScrollView>
        
        );
    }
 
}

export default connect(mapStateToProps)(Dishdetail);