import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#e8f4f2',
  },
  logo:{
    alignItems: 'center',
    marginBottom: 50,
  },
  input:{
    height: 40,
    marginBottom: 10,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});