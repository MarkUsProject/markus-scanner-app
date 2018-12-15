'use strict';
import React, { Component } from 'react';
import * as constants from './constants';
import * as utils from '../../utils';
import { generalStyles, maskStyles } from './styles';
import {
  Alert,
  Button,
  Dimensions,
  Text,
  View,
  Vibration,
  Image,
} from 'react-native';
import Mailer from 'react-native-mail';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

export default class Scanner extends Component {

  constructor(props) {
    super(props);
    const {height, width } = Dimensions.get('window');
    this.maskRowHeight = Math.round((height - 300) / 19);
    this.maskColWidth = (width - 300) / 2;
    this.previous = null;

    this.state = {
      searchCode: constants.QRCODE_TYPE,
      searchLabel: constants.SEARCH_LABEL_EXAM_CODE,
      infoCounter: 0
    };
    this.dataStore = {};
  }

  onBarCodeRead(data) {
    this.processCodes(data.type, data.data);
  }

  onManualEntry(type, code) {
    Alert.alert('Button Please Show Up!!!');
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

  generateEmailSubject() {
    
  }

  saveInfoButton(){
    let csvInfo = Object.keys(this.dataStore).map(k => String(k) + ", " + String(this.dataStore[k])).join('\n');

    // Create Email Subject
    let emailSubject = `(${this.props.courseCode}) ${this.props.title}`
    emailSubject = this.props.location ? emailSubject + ` at ${this.props.location}` : emailSubject;

    let sendMail = path => {
      Mailer.mail({
        subject: emailSubject,
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
      <View style={generalStyles.container}>
        <View style={generalStyles.outter}>
          <View style={generalStyles.logo}>
            <Image source={require('../../imgs/markus_logo_bw.png')}/>
          </View>
          <View style={generalStyles.buttonBar}>
            <View>
              <Button onPress={this.saveInfoButton.bind(this)} title="Save" color="#A3CB38"/>
            </View>
            <View>
              <Button onPress={Actions.InfoEntry} title="New" color="blue"/>
            </View>
            <View>
              <Button onPress={this.onManualEntry.bind(this)} title="Manual" color="#12CBC4"/>
            </View>
          </View>
        </View>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {generalStyles.preview}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        {/* Mask around Scanner View */}
        <View style={maskStyles.maskOutter}>
          <View style={[{ flex: this.maskRowHeight, width: '100%'}, maskStyles.maskFrame]}/>
            <View style={[{ flex: 30, flexDirection: 'row' }]}>
              <View style={[{ width: this.maskColWidth }, maskStyles.maskFrame]} />
              <View style={maskStyles.maskInner}/>
              <View style={[{ width: this.maskColWidth }, maskStyles.maskFrame]} />
            </View>
          <View style={[{ flex: this.maskRowHeight, width: '100%', alignItems: 'center'}, maskStyles.maskFrame]}>
            <Text style={{color: 'white', marginTop: 20}}> Total: {this.state.infoCounter} </Text>
            <Text style={generalStyles.label}>{this.state.searchLabel}</Text>
          </View>
        </View>
      </View>
    );
  }
}