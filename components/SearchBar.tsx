import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Keyboard, 
  Animated, 
  Platform 
} from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar = ({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'Search jobs, companies...',
  autoFocus = false,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, animatedValue]);

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary]
  });

  const shadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.2]
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          borderColor,
          shadowOpacity,
        }
      ]}
    >
      <Search size={20} color={isFocused ? colors.primary : colors.textSecondary} style={styles.searchIcon} />
      
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        onSubmitEditing={() => Keyboard.dismiss()}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={colors.primary}
      />
      
      {Platform.OS !== 'ios' && value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <X size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
      
      {onFilterPress && (
        <TouchableOpacity 
          onPress={onFilterPress} 
          style={styles.filterButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <SlidersHorizontal size={20} color={colors.primary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    marginLeft: 8,
    padding: 4,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingLeft: 12,
  },
});