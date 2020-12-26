import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishDetailComponent';
/**
* @auhor
* @class Main
**/
class Main extends Component {
    constructor(props){
        super(props);

        this.state={
            dishes : DISHES,
            selectedDish : null
        }
    }

    onDishSelect (dishId) {
        this.setState({selectedDish : dishId});
    }
 
 render(){
  const { container } = styles
  return(
      <View>
          <Menu dishes={this.state.dishes} onPress= {(dishId) => this.onDishSelect(dishId)}  />
          <Dishdetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/>
      </View>
   
   )
  }
 }


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default Main