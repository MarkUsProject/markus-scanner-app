import React, { Component } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
    };
  }

  submitForm = () => {
    if (this.state.courseCode !== '' && this.state.title !== '') {
      Actions.mainScanner({
        courseCode: this.state.courseCode,
        title: this.state.title,
        location: this.state.location
      });
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.logo}>
          <Image source={require('../../imgs/markus_logo.png')}/>
        </View>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder='Test name (Midterm, Exam, etc.) - REQUIRED'
          returnKeyType="next"
          onChangeText = {(text) => this.setState({title: text})}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder='Course code - REQUIRED'
          returnKeyType="next"
          autoCapitalize='characters'
          onChangeText = {(text) => this.setState({courseCode: text})}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          returnKeyType="done"
          placeholder='Location'
          autoCapitalize='characters'
          onChangeText = {(text) => this.setState({location: text})}
          focus
        />

        <Button
          style={styles.buttonContainer}
          onPress={this.submitForm}
          disabled={this.state.title === '' || this.state.courseCode === ''}
          title="Start session"
        />
      </View>
    );
  }
}
