'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';

export default class InfoEntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseCode: '',
      borderColor: '#ffffff'
    };
  }

  onButtonPress(){
    if (this.state.courseCode == '') {
      this.setState({borderColor: '#ff0000'});
      return ;
    }
    Actions.mainScanner({courseCode: this.state.courseCode});
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.logo}>
          <Image source={require('../../imgs/markus_logo.png')}/>
        </View>
        <TextInput style = {[{ 
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderTopColor: this.state.borderColor, 
          borderBottomColor: this.state.borderColor,
          borderWidth: 2
        }, styles.input]}
              autoCapitalize="none"
              onSubmitEditing={() => this.passwordInput.focus()}
              autoCorrect={false}
              returnKeyType="next"
              placeholder='Course Code'
              autoCapitalize='characters'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText = {(text) => this.setState({
                courseCode: text
              })}
              />

        <TouchableOpacity style={styles.buttonContainer}
                          onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}