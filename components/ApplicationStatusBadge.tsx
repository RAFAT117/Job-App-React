import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/constants/colors';

interface ApplicationStatusBadgeProps {
  status: string;
  size?: 'small' | 'medium' | 'large';
}

export const ApplicationStatusBadge = ({ 
  status, 
  size = 'medium' 
}: ApplicationStatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Applied':
        return {
          bg: colors.primaryLight,
          text: colors.primary,
        };
      case 'Viewed':
        return {
          bg: colors.infoLight,
          text: colors.info,
        };
      case 'Interviewing':
        return {
          bg: colors.secondaryLight,
          text: colors.secondary,
        };
      case 'Offered':
        return {
          bg: colors.successLight,
          text: colors.success,
        };
      case 'Rejected':
        return {
          bg: colors.errorLight,
          text: colors.error,
        };
      case 'Withdrawn':
        return {
          bg: colors.warningLight,
          text: colors.warning,
        };
      default:
        return {
          bg: colors.primaryLight,
          text: colors.primary,
        };
    }
  };

  const statusColor = getStatusColor();
  
  const sizeStyles = {
    small: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      fontSize: 10,
    },
    medium: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      fontSize: 12,
    },
    large: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 14,
    },
  };

  return (
    <View 
      style={[
        styles.badge,
        { backgroundColor: statusColor.bg },
        {
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          paddingVertical: sizeStyles[size].paddingVertical,
        }
      ]}
    >
      <Text 
        style={[
          styles.text,
          { color: statusColor.text },
          { fontSize: sizeStyles[size].fontSize }
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
  },
});