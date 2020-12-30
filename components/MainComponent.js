import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from  './AboutComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons'
/**
* @auhor
* @class Main
**/

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({navigation}){
    return(
      <MenuNavigator.Navigator
       initialRouteName="Menu"
       screenOptions={{
           headerStyle:{
               backgroundColor:"#512DA8"
           },
           headerTintColor:"#fff",
           headerTitleStyle:{
               color:"#fff"  }
       }}
     >
         <MenuNavigator.Screen
         name="Menu"
         component={Menu}
         options={{headerTitle:'Menu',
         headerLeft:() => ( <Icon name="menu" size={24} 
         color= 'white'
         onPress={ () => navigation.toggleDrawer() } />)
        }}
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

 function HomeNavigatorScreen({navigation}){
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
        options={{headerTitle: 'Home',
        headerLeft:() => ( <Icon name="menu" size={24} 
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />)
        }}
        />
        </HomeNavigator.Navigator>
     );
 };

 const ContactNavigator =createStackNavigator();

    function ContactNavigatorScreen({navigation}){
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
            options={{headerTitle: 'Contact Us',
            headerLeft:() => ( <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() } />)
            }}
            />

            </ContactNavigator.Navigator>
        );
    }

    const AboutNavigator = createStackNavigator();

    function AboutNavigatorScreen({navigation}){
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
            options={{headerTitle: 'About Us',
            headerLeft:() => ( <Icon name="menu" size={24} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() } />)
            }}
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
           options={{title:'Home',drawerLabel:'Home',
           drawerIcon: ({focused})=>(
            <Icon
            name='home'
            type='font-awesome'
            size={22}
            color={focused ? '#7cc' : '#ccc'}
            />
           ),}}
         />
         <Drawer.Screen
         name = "About Us"
         component={AboutNavigatorScreen}
         options={{title:'About Us', drawerLabel:'About Us',
         drawerIcon:({focused})=>(
            <Icon name='info-circle'
            type='font-awesome'
            size={22}
            color={focused ? '#7cc' : '#ccc'}
            />
         ),}}
         />
         <Drawer.Screen
         name="Menu"
         component={MenuNavigatorScreen}
         options={{title:'Menu',drawerLabel:'Menu',
         drawerIcon:({focused})=>(
            <MaterialCommunityIcons name='menu' color={focused ? '#7cc' : '#ccc'} size={22} />
        ),
        }}
         />
         <Drawer.Screen
         name="Contact"
         component={ContactNavigatorScreen}
         options={{title:"Contact Us",drawerLabel:'Contact Us',
         drawerIcon:({focused}) =>(
         <Icon 
         name='address-card'
         type='font-awesome'
         size={22}
         color={focused ? '#7cc' : '#ccc'}
         />
        ),}}
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