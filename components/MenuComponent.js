import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ListItem, Avatar} from 'react-native-elements'


/**
* @author
* @function Menu
**/
const Menu = (props) => {

    const renderMenuItem = ({item, index}) =>{
        return(
           /* <ListItem >
                <Image rounded source={require('./images/vadonut.png')}/>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>

            </ListItem>*/

            <ListItem
                key ={index} 
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/uthappizza.png')}}
            />
              
              
           
        )
    }


 return(
        <FlatList
            data={props.dishes}
            renderItem = {renderMenuItem}
            keyExtractor = {item => item.id.toString()}
        />
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default Menu