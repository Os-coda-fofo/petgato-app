import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface InputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  checked?: boolean;
  onChangeText?: (value: string) => void;
  value: string;
}

const Input = ({ checked, placeholder, placeholderTextColor, secureTextEntry, onChangeText, value }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, isFocused && styles.focusedContainer]} >
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor={ placeholderTextColor ? placeholderTextColor : '#aaa' }
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      { checked &&
      <Feather 
        name="check" 
        size={24}
        color="#88c9bf"
        style={{ position: 'absolute', right: 16, top: 16 }}
      />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 10,
  },
  inputContainer: {
    width: '100%',
    color: '#333', 
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  focusedContainer: {
    borderBottomColor: '#88c9bf',
    borderBottomWidth: 2,
  }
});

export default Input;
