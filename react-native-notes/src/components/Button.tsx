import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => any;
};

const Button = ({title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    backgroundColor: '#003FA0',
    width: 250,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
