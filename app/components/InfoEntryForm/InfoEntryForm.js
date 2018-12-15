'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';

const DEFAULT_BORDER_COLOR = '#ffffff';
const ERROR_BORDER_COLOR = '#ff0000';

export default class InfoEntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseCode: '',
      title: '',
      location: '',
      courseBorderColor: DEFAULT_BORDER_COLOR,
      titleBorderColor: DEFAULT_BORDER_COLOR
    };
  }

  submitForm(){
    // Form Validation
    if (this.state.courseCode == '' || this.state.title == '') {
      this.setState({courseBorderColor: this.state.course ? DEFAULT_BORDER_COLOR : ERROR_BORDER_COLOR});
      this.setState({titleBorderColor: this.state.title ? DEFAULT_BORDER_COLOR : ERROR_BORDER_COLOR});
      return ;
    }
    Actions.mainScanner({
      courseCode: this.state.courseCode,
      title: this.state.title,
      location: this.state.location
    });
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
          borderTopColor: this.state.titleBorderColor, 
          borderBottomColor: this.state.titleBorderColor,
          borderWidth: 2
        }, styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Title (Midterm, Exam, etc.)'
              returnKeyType="done"
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText = {(text) => this.setState({
                title: text
              })}
              />
        <TextInput style = {[{ 
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderTopColor: this.state.courseBorderColor, 
          borderBottomColor: this.state.courseBorderColor,
          borderWidth: 2
        }, styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='CSC148'
              returnKeyType="done"
              autoCapitalize='characters'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText = {(text) => this.setState({
                courseCode: text
              })}
              />
        <TextInput style = {[{ 
          borderColor: 'white',
          borderWidth: 2
        }, styles.input]}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              placeholder='EX 100'
              autoCapitalize='characters'
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText = {(text) => this.setState({
                location: text
              })}
              focus
              />

        <TouchableOpacity style={styles.buttonContainer}
                          onPress={this.submitForm.bind(this)}>
                    <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}