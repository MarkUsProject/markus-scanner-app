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
  input:{
    height: 40,
    marginBottom: 10,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderWidth: 2,
  },
  outer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    left: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(1,1,1,0)'
  },
  buttonBar: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
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
  },
});

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e8f4f2',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginVertical: 10
  },
});

// CSS styling to fill space around 300 by 300 transparent Camera View
export const maskStyles = StyleSheet.create({
  maskInner: {
    flex: 40,
    backgroundColor: 'transparent',
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskFrame: {
    flex: 20,
    backgroundColor: 'rgba(1,1,1,0.7)',
    width: '100%',
    alignItems: 'center',
  }
});
