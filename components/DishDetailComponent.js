import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';

import {baseUrl} from '../shared/baseUrl';
import {connect} from 'react-redux';
import {postFavorite, postComment} from '../redux/ActionCreators';


const mapStateToProps = state =>{
    return{
        dishes : state.dishes,
        comments : state.comments,
        favorites : state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite : (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId,rating,author,comment)),
});

function RenderDish({
    dish,
    favorite,
    markedFavorite,
    toggleModal
}) {

    
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
                name={favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={()=> favorite ? alert("Already Favorite") : markedFavorite()}
                />
                <Icon 
                raised
                name='pencil'
                color= "#512DA8"
                type='font-awesome'
                onPress={()=> {toggleModal()}}
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
            rating : 0,
            author : '',
            comment : '',
            showModal : false
        }
    }

    markedFavorite(dishId){
       this.props.postFavorite(dishId);
    }

    toggleModal(){
        this.setState({showModal : !this.state.showModal})
    }

    handleSubmit(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.setState({
            rating: 0,
            author: '',
            comment : '',
            showModal : false
        })
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                 favorite={this.props.favorites.some(el => el === dishId)}
                 markFavorite={() => this.markFavorite(dishId)}
                 toggleModal={()=>{this.toggleModal()}}
                />
                <RenderComment comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)}/>
                <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={()=> this.toggleModal()}
                onRequestClose={()=> this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add Comment</Text>
                        <Rating 
                        fractions={1} 
                        minValue={1}
                        showRating={true}
                        startingValue={this.state.rating}
                        type="custom"
                        onFinishRating={(rating)=> {this.setState({rating})}}
                        />

                        <Input 
                        placeholder="Author"
                        leftIcon={{type : 'font-awesome', name : 'user'}}
                        onChangeText={(value) => {this.setState({author : value})}}
                        />
                        <Input 
                        placeholder="Comment"
                        leftIcon={{type : 'font-awesome', name : 'comment'}}
                        onChangeText={(value) => {this.setState({comment : value})}}
                        />
                        <View style={styles.modalItem}>
                            <Button 
                            color= "#512DA8"
                            title="Submit"
                            onPress={()=> {this.handleSubmit(dishId)}}//this will allow us to post comment
                            />
                        </View>
                        <View style={styles.modalItem}>
                            <Button
                            color= "#A9A9A9"
                            title="Cancle" 
                            onPress={()=> {this.toggleModal()}}
                            />
                        </View>
                       
                    </View>

                </Modal>
            </ScrollView>
        
        );
    }
 
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     modalItem : {
         margin: 20
     }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
