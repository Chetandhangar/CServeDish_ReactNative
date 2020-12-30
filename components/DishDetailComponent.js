import React from 'react';
import { Text, View, ScrollView, FlatList} from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes';;
import {COMMENTS} from '../shared/comments'

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

function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item,index}) =>{
            return(
               <View key={index} style={{margin: 10}}>
                   <Text style={{fontSize:14}}>{item.comment}</Text>
                    <Text style={{fontSize:12}}>{item.rating}</Text>
                    <Text style={{fontSize:12}}>{'~~ ' + item.author}</Text>
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
            dishes: DISHES,
            comments: COMMENTS
        }
    }
    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} />
                <RenderComment comments={this.state.comments.filter((comment)=> comment.dishId === dishId)}/>
            </ScrollView>
        
        );
    }
 
}

export default Dishdetail;