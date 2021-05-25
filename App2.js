import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App2 extends React.Component {
    render()
    {
    const {value, handleOnPress} = this.props;
      return (
           <TouchableOpacity style={{flex: 1,margin:3,backgroundColor: 'skyblue',justifyContent:'center',alignItems:'center'}}
                             onPress={()=>handleOnPress(value)}
           >
           
                <Text style={{color:'black',fontSize:30,fontWeight:'bold'}}>
                {value}
                </Text>
           </TouchableOpacity>
      );
    }
}