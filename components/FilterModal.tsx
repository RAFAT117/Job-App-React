import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Platform,
  TextInput,
  Animated,
  Dimensions
} from 'react-native';
import { X, MapPin, Briefcase, Star, Wifi } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { JobFilter } from '@/types/job';
import { experienceLevels, jobTypes, swedishCities } from '@/constants/swedish-data';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filter: JobFilter;
  onApplyFilters: (filter: Partial<JobFilter>) => void;
  onResetFilters: () => void;
}

export const FilterModal = ({
  visible,
  onClose,
  filter,
  onApplyFilters,
  onResetFilters,
}: FilterModalProps) => {
  const [localFilter, setLocalFilter] = useState<JobFilter>(filter);
  const [animation] = useState(new Animated.Value(0));
  const { height } = Dimensions.get('window');

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter, visible]);

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animation]);

  const handleApplyFilters = () => {
    onApplyFilters(localFilter);
    onClose();
  };

  const handleResetFilters = () => {
    onResetFilters();
    onClose();
  };

  const updateFilter = (key: keyof JobFilter, value: any) => {
    setLocalFilter((prev) => ({ ...prev, [key]: value }));
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const backdropOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.backdrop,
            { opacity: backdropOpacity }
          ]}
          onTouchEnd={onClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY }] }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Filter Jobs</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Location Filter */}
            <View style={styles.filterSection}>
              <View style={styles.sectionHeader}>
                <MapPin size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Location</Text>
              </View>
              
              <View style={styles.locationInputContainer}>
                <TextInput
                  style={styles.locationInput}
                  placeholder="City or municipality"
                  placeholderTextColor={colors.textLight}
                  value={localFilter.location || ''}
                  onChangeText={(text) => updateFilter('location', text || null)}
                />
              </View>
              
              <Text style={styles.sectionSubtitle}>Popular locations</Text>
              <View style={styles.optionsContainer}>
                {swedishCities.slice(0, 6).map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.optionButton,
                      localFilter.location === city && styles.selectedOptionButton,
                    ]}
                    onPress={() => updateFilter('location', city)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilter.location === city && styles.selectedOptionText,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Remote Filter */}
            <View style={styles.filterSection}>
              <View style={styles.sectionHeader}>
                <Wifi size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Remote Work</Text>
              </View>
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Show remote jobs only</Text>
                <Switch
                  value={localFilter.remote === true}
                  onValueChange={(value) => updateFilter('remote', value ? true : null)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : localFilter.remote === true ? colors.primaryLight : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Job Type Filter */}
            <View style={styles.filterSection}>
              <View style={styles.sectionHeader}>
                <Briefcase size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Job Type</Text>
              </View>
              
              <View style={styles.optionsContainer}>
                {jobTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.optionButton,
                      localFilter.type === type && styles.selectedOptionButton,
                    ]}
                    onPress={() => updateFilter('type', localFilter.type === type ? null : type)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilter.type === type && styles.selectedOptionText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Experience Level Filter */}
            <View style={styles.filterSection}>
              <View style={styles.sectionHeader}>
                <Star size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Experience Level</Text>
              </View>
              
              <View style={styles.optionsContainer}>
                {experienceLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.optionButton,
                      localFilter.experience === level && styles.selectedOptionButton,
                    ]}
                    onPress={() => updateFilter('experience', localFilter.experience === level ? null : level)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilter.experience === level && styles.selectedOptionText,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    maxHeight: '70%',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  locationInputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    margin: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedOptionButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedOptionText: {
    color: colors.card,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});