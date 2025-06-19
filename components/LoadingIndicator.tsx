import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { colors } from '@/constants/colors';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingIndicator = ({ 
  size = 'small', 
  text = 'Loading...', 
  fullScreen = false 
}: LoadingIndicatorProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ])
    );
    
    spinAnimation.start();
    pulseAnimation.start();
    
    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, [spinValue, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const opacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  const indicatorSize = size === 'small' ? 24 : 48;

  const indicator = (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.spinner, 
            { 
              width: indicatorSize, 
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              transform: [{ rotate: spin }, { scale }],
              opacity,
            }
          ]}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </View>
  );

  return fullScreen ? (
    <View style={styles.overlay}>
      {indicator}
    </View>
  ) : indicator;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
  },
  spinner: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
    marginBottom: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
});