'use strict';
import React, { Component } from 'react';
import * as constants from './constants';
import * as utils from '../../utils';
import { generalStyles, maskStyles, modalStyles } from './styles';
import {
  Alert,
  Button,
  Dimensions,
  Text,
  View,
  Vibration,
  Image,
  Modal,
  TouchableOpacity,
  TextInput
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
      infoCounter: 0,
      modalVisible: false,
      miQRBorderColor: constants.DEFAULT_BORDER_COLOR,
      miStudentNumberBorderColor: constants.DEFAULT_BORDER_COLOR,
      miQRCode: '',
      miStudentNumber: ''
    };
    this.dataStore = {};
  }

  onBarCodeRead(data) {
    this.processCodes(data.type, data.data);
  }

  toggleModalVisible() {
    if (this.state.modalVisible) {
      this.setState({miQRBorderColor: constants.DEFAULT_BORDER_COLOR});
      this.setState({miStudentNumberBorderColor: constants.DEFAULT_BORDER_COLOR});
    }
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  resetScanner() {
    this.previous = null;
    this.setState({
      searchCode: constants.QRCODE_TYPE,
      searchLabel: constants.SEARCH_LABEL_EXAM_CODE,
    });
  }

  // Adds record to datastore and increments the counter
  addRecord(QRCode, studentNumber) {
    this.dataStore[QRCode] = studentNumber;
    this.setState({
      infoCounter: this.state.infoCounter + 1
    })
  }

  onManualEntry() {
    if (!this.state.miQRCode || !this.state.miStudentNumber) {
      this.setState({
        miQRBorderColor: this.state.miQRCode ? constants.DEFAULT_BORDER_COLOR : constants.ERROR_BORDER_COLOR,
        miStudentNumberBorderColor: this.state.miStudentNumber ? constants.DEFAULT_BORDER_COLOR : constants.ERROR_BORDER_COLOR
      });
      return;
    }
    
    this.addRecord(this.state.miQRCode, this.state.miStudentNumber);
    this.resetScanner();
    this.toggleModalVisible();
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
      this.addRecord(this.previous, code);
      this.setState({
        searchCode: constants.QRCODE_TYPE,
        searchLabel: constants.SEARCH_LABEL_EXAM_CODE,
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
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={modalStyles.container}>
            <View>
              <TextInput style = {[{ 
                borderLeftColor: 'white',
                borderRightColor: 'white',
                borderTopColor: this.state.miQRBorderColor, 
                borderBottomColor: this.state.miQRBorderColor,
                borderWidth: 2
              }, modalStyles.input]}
                autoCorrect={false}
                placeholder='QR Code'
                autoCapitalize='characters'
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText = {(text) => this.setState({
                  miQRCode: text
                })}
              />
              <TextInput style = {[{ 
                borderLeftColor: 'white',
                borderRightColor: 'white',
                borderTopColor: this.state.miStudentNumberBorderColor, 
                borderBottomColor: this.state.miStudentNumberBorderColor,
                borderWidth: 2
              }, modalStyles.input]}
                autoCorrect={false}
                placeholder='Student Number'
                autoCapitalize='characters'
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText = {(text) => this.setState({
                  miStudentNumber: text
                })}
              />

              <TouchableOpacity style={modalStyles.buttonContainer}
                onPress={this.onManualEntry.bind(this)}>
                <Text style={modalStyles.buttonText}>DONE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.buttonContainer}
                onPress={this.toggleModalVisible.bind(this)}>
                <Text style={modalStyles.buttonText}>HIDE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
                <Button onPress={this.toggleModalVisible.bind(this)} title="Manual" color="#12CBC4"/>
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
      </View>
    );
  }
}