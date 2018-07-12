import { StyleSheet } from 'react-native';

export const generalStyles = StyleSheet.create({
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
export const maskStyles = StyleSheet.create({
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
});