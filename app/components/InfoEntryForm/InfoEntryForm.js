'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { styles } from './styles';

export default class InfoEntryForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TextInput style = {styles.input}
               autoCapitalize="none"
               onSubmitEditing={() => this.passwordInput.focus()}
               autoCorrect={false}
               returnKeyType="next"
               placeholder='Course Code'
               placeholderTextColor='rgba(225,225,225,0.7)'/>

        <TextInput style = {styles.input}
                      returnKeyType="go" 
                      ref={(input)=> this.passwordInput = input}
                      placeholder='Password'
                      placeholderTextColor='rgba(225,225,225,0.7)'
                      secureTextEntry/>

        <TouchableOpacity style={styles.buttonContainer}
                            onPress={onButtonPress}>
                    <Text style={styles.buttonText}>ENTER</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}