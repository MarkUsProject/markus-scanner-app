'use strict';
import React, { Component } from 'react';
import * as constants from './constants';
import * as utils from './utils';
import {
  Alert,
  Button,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Vibration,
  Image,
  Linking,
  TextInput
} from 'react-native';
import Mailer from 'react-native-mail';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {

  constructor(props) {
    super(props);
    const {height, width } = Dimensions.get('window');
    this.maskRowHeight = Math.round((height - 300) / 20);
    this.maskColWidth = (width - 300) / 2;
    this.previous = null;

    this.state = {
      searchCode: constants.QRCODE_TYPE,
      searchLabel: constants.SEARCH_LABEL_EXAM_CODE,
      infoCounter: 0
    };
    this.dataStore = {"TESTQRCODE": "TESTBARCODE"};
  }

  onBarCodeRead(data) {
    this.processCodes(data.type, data.data);
  }

  onManualEntry(type, code) {
    Alert.alert('Button Please Show Up!');
  }

  processCodes(type, code) {
    if (type == this.state.searchCode && type == constants.QRCODE_TYPE) {
      this.previous = code;
      this.setState({
        searchCode: constants.BARCODE_TYPE,
        searchLabel: constants.SEARCH_LABEL_TCARD_CODE
      });
      Vibration.vibrate();
    } else if (type == this.state.searchCode && type == constants.BARCODE_TYPE) {
      this.dataStore[this.previous] = code;
      this.setState({
        searchCode: constants.QRCODE_TYPE,
        searchLabel: constants.SEARCH_LABEL_EXAM_CODE,
        infoCounter: this.state.infoCounter + 1
      });
      this.previous = null;
    }
  }

  saveInfoButton(){
    let csvInfo = Object.keys(this.dataStore).map(k => String(k) + ", " + String(this.dataStore[k])).join('\n');

    let sendMail = path => {
      Mailer.mail({
        subject: '',
        recipients: [],
        ccRecipients: [],
        bccRecipients: [],
        body: '',
        isHTML: true,
        attachment: {
          path: path,
          type: 'csv',
          name: 'student_exam_info.csv',
        }
      }, (error, event) => {});
    };

    // creates csv file and calls the sendMail function.
    utils.createCSV(csvInfo, sendMail);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.outter}>
          <View style={styles.logo}>
            <Image source={require('./imgs/markus_logo.png')}/>
          </View>
          <View style={styles.buttons}>
            <View>
              <Button onPress={this.saveInfoButton.bind(this)} title="Save" color="white"/>
            </View>
            <View>
              <Button onPress={this.onManualEntry.bind(this)} title="Manual" color="white"/>
            </View>
          </View>
        </View>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        {/* Mask around Scanner View */}
        <View style={maskStyles.maskOutter}>
          <View style={[{ flex: this.maskRowHeight, width: '100%' }, maskStyles.maskFrame]} />
            <View style={[{ flex: 30, flexDirection: 'row' }]}>
              <View style={[{ width: this.maskColWidth }, maskStyles.maskFrame]} />
              <View style={maskStyles.maskInner}/>
              <View style={[{ width: this.maskColWidth }, maskStyles.maskFrame]} />
            </View>
          <View style={[{ flex: this.maskRowHeight, width: '100%', alignItems: 'center'}, maskStyles.maskFrame]}>
            <Text style={{color: 'white', marginTop: 20}}> Total: {this.state.infoCounter} </Text>
            <Text style={styles.label}>{this.state.searchLabel}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  outter: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    left: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(1,1,1,0)'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  label: {
    color: "white",
    marginVertical: 5,
    zIndex: 100,
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  },
  logo: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 100
  }
});

// CSS styling to fill space around 300 by 300 transparent Camera View
const maskStyles = StyleSheet.create({
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  }
})



AppRegistry.registerComponent('App', () => App);