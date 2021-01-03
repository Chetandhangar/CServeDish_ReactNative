import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const  fetchComments = () => (dispatch) =>{
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
            }

        },
        error =>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))

};

export const commentsFailed = (errmess) =>({
    type: ActionTypes.COMMENTS_FAILED,
    payload : errmess
});

export const addComments = (comments) =>({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

//add comment to the comment list from the user Input value
export const addComment = (comment) =>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});


export const postComment = (dishId, rating, author , comment) => (dispatch) => {
    const newComment = {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    };
    newComment.date = new Date().toISOString();

    setTimeout(() => {
        dispatch(addComment(newComment));
    }, 2000);
};

//Action Creator for Dishes

export const  fetchDishes = () => (dispatch) =>{

    dispatch(dishesLoading())

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
            }

        },
        error =>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))

};
export const dishesLoading = () =>({
    type : ActionTypes.LOADING_DISHES
})

export const dishesFailed = (errmess) =>({
    type: ActionTypes.DISHES_FAILED,
    payload : errmess
});

export const addDishes = (dishes) =>({
    type : ActionTypes.ADD_DISHES ,
    payload : dishes
});

//Action Creators for promotions

export const  fetchPromos = () => (dispatch) =>{

    dispatch(promosLoading())

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
            }

        },
        error =>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(dishesFailed(error.message)))

};
export const promosLoading = () =>({
    type : ActionTypes.LOADING_PROMOS
});

export const promosFailed = (errmess) =>({
    type: ActionTypes.PROMOS_FAILED,
    payload : errmess
});

export const addPromos = (promos) =>({
    type : ActionTypes.ADD_PROMOS ,
    payload : promos
});


//Action Creators for leaders

export const  fetchLeaders = () => (dispatch) =>{

    dispatch(leadersLoading())

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response= response;
                throw error;
            }

        },
        error =>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))

};
export const leadersLoading = () =>({
    type : ActionTypes.LOADING_LEADERS
});

export const leadersFailed = (errmess) =>({
    type: ActionTypes.LEADERS_FAILED,
    payload : errmess
});

export const addLeaders = (leaders) =>({
    type : ActionTypes.ADD_LEADERS ,
    payload : leaders
});


//Action creator for the favorites

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(()=> {
        dispatch(addFavorite(dishId));
    },2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});