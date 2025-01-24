import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Icons
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  variant?: 'default' | 'yellow';
  showShareIcon?: boolean;
  showSearchIcon?: boolean;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onSharePress?: () => void;
  onSearchPress?: () => void;
}

const Header = ({
  title, 
  variant = 'default', 
  showBackButton = false,
  showMenuButton = false,
  showShareIcon = false,
  showSearchIcon = false,
  onBackPress,
  onMenuPress,
  onSharePress,
  onSearchPress,
}: HeaderProps) => {
  return (
    <View style={[ styles.headerContainer, styles[variant]]}>

      {showBackButton && (
        <TouchableOpacity onPress={onBackPress}>
          <AntDesign name="arrowleft" size={24} color="#434343" style={styles.leftIcon}/>
        </TouchableOpacity>
      )} 

      {showMenuButton && (
        <TouchableOpacity onPress={onMenuPress} style={styles.leftIcon}>
          <Feather name="menu" size={24} color="#434343" />
        </TouchableOpacity>
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightIcons} >
        {showShareIcon && (
          <TouchableOpacity onPress={onSharePress} >
            <Entypo name="share" size={24} color="#434343" />
          </TouchableOpacity>
        )}

        {showSearchIcon && (
          <TouchableOpacity onPress={onSearchPress} >
            <Feather name="search" size={24} color="#434343" />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );  
}

const styles = StyleSheet.create({
  // Header style
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    zIndex: 1,
    backgroundColor: '#cfe9e5',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    color: '#434343',
  },

  // Icons
  leftIcon: {
    marginRight: 16,
  },

  rightIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 16,
  },

  // Color Variants
  default: {
    backgroundColor: '#cfe9e5',
  },
  yellow: {
    backgroundColor: '#ffd358',
  },
});

export default Header;
