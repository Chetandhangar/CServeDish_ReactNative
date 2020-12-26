import React, { Component } from 'react'
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
/**
* @auhor
* @class Main
**/

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen(){
    return(
      <MenuNavigator.Navigator
       initialRouteName="Menu"
       screenOptions={{
           headerStyle:{
               backgroundColor:"#512DA8"
           },
           headerTintColor:"#fff",
           headerTitleStyle:{
               color:"#fff"           }
       }}
     >
         <MenuNavigator.Screen
         name="Menu"
         component={Menu}
         />
         <MenuNavigator.Screen
         name="Dishdetail"
         component={Dishdetail}
         options={{headerTitle:"Dish Detail"}}
         />

         

      </MenuNavigator.Navigator>
    );
}

class Main extends Component {
 
 render(){

  return(
      <NavigationContainer>
          <MenuNavigatorScreen />
      </NavigationContainer>
   
   )
  }
 }



export default Main