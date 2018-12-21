import React, { Component } from 'react';
import * as constants from './constants';
import { generalStyles, maskStyles, modalStyles } from './styles';
import {
  Alert,
  Button,
  Text,
  View,
  Image,
  Modal,
  TextInput
} from 'react-native';
import Mailer from 'react-native-mail';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

export default class Scanner extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qrCode: null,
      infoCounter: 0,
      modalVisible: false,
      studentNumber: '',
      matches: []
    };
    this.dataStore = {};
  }

  // Triggered when camera processes a QR code or barcode.
  onBarCodeRead = (event) => {
    if (event.type === RNCamera.Constants.BarCodeType.qr) {
      // Read a new QR code; now need to search for a barcode.
      this.setState({
        qrCode: event.data,
      });
    } else if (event.type == RNCamera.Constants.BarCodeType.codabar && this.state.qrCode !== null) {
      // Read a new barcode; store the QR code and barcode mapping.
      this.addRecord(this.state.qrCode, event.data);
      this.resetScanner();
    }
  }

  // Adds record to datastore and increments the counter
  addRecord(QRCode, studentNumber) {
    this.dataStore[QRCode] = studentNumber;
    this.setState({
      infoCounter: this.state.infoCounter + 1,
      matches: this.state.matches.concat([[QRCode, studentNumber]])
    })
  }

  resetScanner = () => {
    this.setState({
      qrCode: null,
    });
  }

  // Manual entry modal
  toggleModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  onManualEntry = () => {
    if (this.state.qrCode !== '' && this.state.studentNumber !== '') {
      this.addRecord(this.state.qrCode, this.state.studentNumber);
      this.resetScanner();
      this.toggleModalVisible();
    }
  }

  saveInfoButton = () => {
    const csvInfo = Object.keys(this.dataStore).map(k => String(k) + ", " + String(this.dataStore[k])).join('\n');

    const emailSubject = this.getEmailSubject();

    // Creates csv file and calls the sendMail function.
    Mailer.mail({
      subject: emailSubject,
      recipients: [],
      ccRecipients: [],
      bccRecipients: [],
      body: csvInfo,
      isHTML: false,
    }, (error, event) => {});
  }

  // Helpers for email reports
  getEmailSubject = () => {
    let subject = `(${this.props.courseCode}) ${this.props.title}`;
    if (this.props.location) {
      subject += ` at ${this.props.location}`
    }
    return subject;
  }

  render() {
    const label = this.state.qrCode === null ?
                  constants.SEARCH_LABEL_EXAM_CODE :
                  constants.SEARCH_LABEL_TCARD_CODE;
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleModalVisible}>
          <View style={modalStyles.container}>
            <View>
              <TextInput style = {modalStyles.input}
                autoCorrect={false}
                defaultValue={this.state.qrCode || ''}
                placeholder='QR Code'
                autoCapitalize='characters'
                onChangeText = {text => this.setState({qrCode: text})}
              />
              <TextInput style = {modalStyles.input}
                autoCorrect={false}
                keyboardType='numeric'
                placeholder='Student Number'
                onChangeText = {text => this.setState({studentNumber: text})}
              />

              <Button
                style={modalStyles.buttonContainer}
                onPress={this.onManualEntry}
                disabled={this.state.qrCode === '' || this.state.studentNumber === ''}
                title="Record entry"/>

              <Button style={modalStyles.buttonContainer}
                onPress={this.toggleModalVisible}
                title="Cancel" />
            </View>
          </View>
        </Modal>

        <View style={generalStyles.container}>
          <View style={generalStyles.outer}>
            <View style={generalStyles.logo}>
              <Image source={require('../../imgs/markus_logo_bw.png')}/>
              { this.state.qrCode &&
                <Button onPress={this.resetScanner} title="Reset" color="#d63031"/>
              }
            </View>
            <View style={generalStyles.buttonBar}>
                <Button onPress={this.toggleModalVisible} title="Manual" color="#2980b6"/>
                <Button onPress={this.saveInfoButton} title="Email" color="#2980b6"/>
                <Button onPress={Actions.infoEntry} title="Reset" color="#2980b6"/>
            </View>
          </View>
          <RNCamera
            ref={ref => this.camera = ref}
            style={generalStyles.preview}
            onBarCodeRead={this.onBarCodeRead}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your phone\'s camera.'}
          />
          {/* Mask around Scanner View */}
          <View style={maskStyles.maskOuter}>
            <View style={maskStyles.maskFrame}/>
            <View style={maskStyles.maskInner}/>
            <View style={maskStyles.maskFrame}>
              <Text style={generalStyles.label}>{label}</Text>
              <Text style={generalStyles.label}>Total: {this.state.matches.length}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
