import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This text currently isn't shown because the Barcode scanner is full screen.</Text>
        <BarcodeScannerExample />
      </View>
    );
  }
}

class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
