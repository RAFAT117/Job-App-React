import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  SafeAreaView, 
  RefreshControl,
  Text,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bookmark, ArrowDownUp, Clock, MapPin } from 'lucide-react-native';
import { JobCard } from '@/components/JobCard';
import { EmptyState } from '@/components/EmptyState';
import { useJobStore } from '@/store/jobStore';
import { colors } from '@/constants/colors';

type SortOption = 'newest' | 'oldest' | 'location';

export default function SavedJobsScreen() {
  const { jobs, savedJobs, refreshJobs } = useJobStore();
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  // Filter jobs to only show saved ones
  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));
  
  // Sort jobs based on selected option
  const sortedJobs = [...savedJobsList].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
    } else if (sortBy === 'location') {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshJobs();
    setRefreshing(false);
  }, [refreshJobs]);

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const selectSortOption = (option: SortOption) => {
    setSortBy(option);
    setShowSortOptions(false);
  };

  const renderSortIcon = () => {
    if (sortBy === 'newest' || sortBy === 'oldest') {
      return <Clock size={14} color={colors.textSecondary} />;
    } else if (sortBy === 'location') {
      return <MapPin size={14} color={colors.textSecondary} />;
    }
    return null;
  };

  const renderEmptyState = () => (
    <EmptyState
      title="No saved jobs yet"
      message="Save jobs you're interested in to view them later. Tap the heart icon on any job to save it."
      icon={<Bookmark size={48} color={colors.textLight} />}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {savedJobsList.length > 0 && (
        <View style={styles.sortContainer}>
          <TouchableOpacity style={styles.sortButton} onPress={toggleSortOptions}>
            <ArrowDownUp size={16} color={colors.primary} />
            <Text style={styles.sortButtonText}>Sort by</Text>
          </TouchableOpacity>
          
          <View style={styles.activeSortOption}>
            {renderSortIcon()}
            <Text style={styles.activeSortText}>
              {sortBy === 'newest' ? 'Newest first' : 
               sortBy === 'oldest' ? 'Oldest first' : 
               'Location'}
            </Text>
          </View>
          
          {showSortOptions && (
            <View style={styles.sortOptionsContainer}>
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'newest' && styles.selectedSortOption]} 
                onPress={() => selectSortOption('newest')}
              >
                <Clock size={16} color={sortBy === 'newest' ? colors.primary : colors.textSecondary} />
                <Text style={[styles.sortOptionText, sortBy === 'newest' && styles.selectedSortOptionText]}>
                  Newest first
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'oldest' && styles.selectedSortOption]} 
                onPress={() => selectSortOption('oldest')}
              >
                <Clock size={16} color={sortBy === 'oldest' ? colors.primary : colors.textSecondary} />
                <Text style={[styles.sortOptionText, sortBy === 'oldest' && styles.selectedSortOptionText]}>
                  Oldest first
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.sortOption, sortBy === 'location' && styles.selectedSortOption]} 
                onPress={() => selectSortOption('location')}
              >
                <MapPin size={16} color={sortBy === 'location' ? colors.primary : colors.textSecondary} />
                <Text style={[styles.sortOptionText, sortBy === 'location' && styles.selectedSortOptionText]}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      
      <FlatList
        data={sortedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  activeSortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  activeSortText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  sortOptionsContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 8,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectedSortOption: {
    backgroundColor: colors.primaryLight,
  },
  sortOptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  selectedSortOptionText: {
    color: colors.primary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    minHeight: '100%',
  },
});