import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'default' | 'facebook' | 'google' | 'main' | 'yellow' | 'white' | 'fade';
  textColor?: string;
}

const Button = ({ textColor, title, onPress, variant = 'default' }: ButtonProps) => {
  const getIcon = () => {
    switch (variant) {
      case 'facebook':
        return <Entypo name="facebook" size={24} color="white" />;
      case 'google':
        return <Entypo name="google-" size={24} color="white" />;
      default:
        return null;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      {getIcon()}
      <Text style={[
        styles.buttonText, 
        { color: textColor } 
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 12,
  },

  buttonText: {
    color: '#434343',
    fontSize: 12,
  },

  icon: {
    width: 24,
    height: 24,
  },

  default: {
    backgroundColor: '#ffd358', 
  },
  facebook: {
    backgroundColor: '#194f7c',
  },
  google: {
    backgroundColor: '#f15f5c', 
  },
  main: {
    backgroundColor: '#88c9bf',
  },
  yellow: {
    backgroundColor: '#ffd358',
  },
  white: {
    backgroundColor: '#f1f2f2',
  },
  fade: {
    backgroundColor: '#e0e0e0',
  },
});

export default Button;
