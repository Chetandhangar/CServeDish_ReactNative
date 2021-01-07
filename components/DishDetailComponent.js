import React from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, PanResponder, Alert, Share} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
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

    const ShareDish = (title, message , url) =>{
        Share.share({
            title : title,
            message : title + '  ' + message + '  ' + url,
            url : url
        }, {
            dialogTitle : 'Share ' + title
        })
    }

    function RenderDish({
        dish,
        favorite,
        markedFavorite,
        toggleModal
    }) {


        handleViewRef = ref => this.view = ref;

        const recognizeDrag = ({moveX, moveY, dx, dy}) => {
            if(dx < -200){
                return true;
            }
            else {
                return false;
            }
        }
        
        const recognizeComment = ({moveX, moveY, dx, dy}) =>{
            if(dx > 200){
                return true;
            }
            else{
                return false;
            }
        }
       

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder : (e, gestureState) =>{
                return true;
            },
            onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
          
            onPanResponderEnd : (e, gestureState) =>{
                console.log("Pan response End" , gestureState);
                if(recognizeDrag(gestureState)){
                    Alert.alert(
                        "Add Favorite",
                        'Are you sure you wish to add'+ dish.name + 'as favorite dish',
                        [
                            {
                                text : "Cancel",
                                type: 'cancel',
                                onPress: () => alert("You cancel the operation")
                            },
                            {
                                text : 'OK',
                                onPress : () => favorite ? alert("Already Favorite") : markedFavorite()
                            }
                        ],
                        {cancelable : false}
                    );
                }
                    else if(recognizeComment(gestureState)){
                        toggleModal();
                    }
                    return true ;
               
            }
            
        })
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                 ref={this.handleViewRef} 
                {...panResponder.panHandlers}
                >
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
                <Icon 
                raised
                name = 'share'
                type='font-awesome'
                color = '#51D2A8'
                onPress={()=> {ShareDish(dish.name, dish.description, baseUrl + dish.image)}}
                />
                </Card>
                </Animatable.View>
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
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
               <View key={index} style={{margin: 10}}>
                   <Text style={{fontSize:14}}>{item.comment}</Text>
                    <Text style={{fontSize:12}}>{item.rating + '  stars'}</Text>
                    <Text style={{fontSize:12}}>{item.date}{'~~ ' + item.author}</Text>
               </View>
               </Animatable.View>
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
                 markedFavorite={() => this.markedFavorite(dishId)}
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
