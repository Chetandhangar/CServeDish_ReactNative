import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from  './AboutComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
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

const HomeNavigator = createStackNavigator();

 function HomeNavigatorScreen(){
     return(
        <HomeNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}
        >
        <HomeNavigator.Screen
        name="Home"
        component={Home}
        />

       

        </HomeNavigator.Navigator>
     );
 };

 const ContactNavigator =createStackNavigator();

    function ContactNavigatorScreen(){
        return(
            <ContactNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
            >
            <ContactNavigator.Screen
            name='Contact Us'
            component={Contact}
            />

            </ContactNavigator.Navigator>
        );
    }

    const AboutNavigator = createStackNavigator();

    function AboutNavigatorScreen(){
        return(
            <AboutNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
            >
            <AboutNavigator.Screen
            name="About Us"
            component={About}
            />

            </AboutNavigator.Navigator>
        );
    }

 const Drawer = createDrawerNavigator();

 function MainNavigatorScreen(){
     return(
     <Drawer.Navigator
       initialRouteName='Home'
       drawerStyle={{
        backgroundColor: '#C9DFE7',
        width: 240,
       }}
     >
         <Drawer.Screen 
           name="Home"
           component={HomeNavigatorScreen}
           options={{title:'Home',drawerLabel:'Home'}}
         />
         <Drawer.Screen
         name = "About Us"
         component={AboutNavigatorScreen}
         options={{title:'About Us', drawerLabel:'About Us'}}
         />
         <Drawer.Screen
         name="Menu"
         component={MenuNavigatorScreen}
         options={{title:'Menu',drawerLabel:'Menu'}}
         />
         <Drawer.Screen
         name="Contact"
         component={ContactNavigatorScreen}
         options={{title:"Contact Us",drawerLabel:'Contact Us'}}
         />

     </Drawer.Navigator>
     );
 }

class Main extends Component {
 
 render(){

  return(
      <NavigationContainer>
          <MainNavigatorScreen />
      </NavigationContainer>
   
   )
  }
 }



export default Main