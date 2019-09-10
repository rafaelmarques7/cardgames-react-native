import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { brown } from '../styles';

// This is a button that uses flex
// to expand to match the parent container
const MyButton = ({ title, onPress, style={}, disabled=false }) => {
  const stylesContainer = [styles.container, style];
  const stylesText = [styles.text, style];
  if (disabled) {
    stylesContainer.push(styles.disabled)
  }
  return (
    <TouchableOpacity
      onPress={ () => {onPress()} }
      disabled={disabled} 
      style={stylesContainer} >
      <Text style={stylesText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 8,
    backgroundColor: brown,
    borderRadius: 2,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  disabled: {
    backgroundColor: '#dfdfdf',
  },
  text: {
    textAlign: 'center',
    padding: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto',    
  }
})

export default MyButton;
