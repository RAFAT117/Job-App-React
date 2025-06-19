import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Easing,
  Platform 
} from 'react-native';
import { Edit2, MapPin, Mail, Phone } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileHeaderProps {
  onEditPress?: () => void;
  expanded?: boolean;
}

export const ProfileHeader = ({ onEditPress, expanded = false }: ProfileHeaderProps) => {
  const { profile } = useUserStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [imageLoaded, fadeAnim]);

  if (!profile) return null;

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primaryLight, colors.card]}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {profile.resume?.url ? (
            <View style={styles.avatarImageContainer}>
              <Animated.Image 
                source={{ uri: profile.resume.url }}
                style={[styles.avatarImage, { opacity: fadeAnim }]}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
              )}
            </View>
          ) : (
            <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
          )}
        </View>
        
        {onEditPress && (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={onEditPress}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Edit2 size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.title}>{profile.title || 'Add your title'}</Text>
      
      <View style={styles.locationContainer}>
        <MapPin size={16} color={colors.textSecondary} />
        <Text style={styles.location}>{profile.location || 'Add your location'}</Text>
      </View>
      
      {expanded && (
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Mail size={16} color={colors.textSecondary} />
            <Text style={styles.contactText}>{profile.email}</Text>
          </View>
          
          {profile.phone && (
            <View style={styles.contactItem}>
              <Phone size={16} color={colors.textSecondary} />
              <Text style={styles.contactText}>{profile.phone}</Text>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.skillsContainer}>
        {profile.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: Platform.OS === 'ios' ? 3 : 0,
    borderColor: colors.card,
  },
  avatarImageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.card,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  editButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  skillBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  skillText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});