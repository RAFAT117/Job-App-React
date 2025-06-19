import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView
} from 'react-native';
import { useJobStore } from '@/store/jobStore';
import { JobCard } from '@/components/JobCard';
import { colors } from '@/constants/colors';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, MapPin } from 'lucide-react-native';
import { JobCategory } from '@/types/job';
import { FilterModal } from '@/components/FilterModal';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES: (JobCategory | 'Alla')[] = [
  'Alla',
  'IT',
  'Vård & Omsorg',
  'Utbildning',
  'Teknik',
  'Ekonomi',
  'Försäljning',
  'Marknadsföring',
  'Kundservice',
  'Administration',
  'Övrigt'
];

export const JobList = () => {
  const { 
    jobs, 
    isLoading, 
    error, 
    pagination, 
    fetchJobs, 
    refreshJobs,
    setFilter,
    filter,
    sortBy,
    setSortBy,
  } = useJobStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filter.query || '');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | 'Alla' | null>(filter.category || 'Alla');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleSearch = () => {
    setFilter({ query: searchQuery });
    fetchJobs(1);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshJobs();
    setRefreshing(false);
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchJobs(pagination.currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      fetchJobs(pagination.currentPage - 1);
    }
  };

  const handleCategorySelect = (category: JobCategory | 'Alla') => {
    const newCategory = selectedCategory === category ? 'Alla' : category;
    setSelectedCategory(newCategory);
    if (newCategory === 'Alla') {
      setFilter({ category: null });
    } else {
      setFilter({ category: newCategory as JobCategory });
    }
    fetchJobs(1);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleSort = (newSortBy: string | null) => {
    setSortBy(newSortBy);
  };

  const renderCategory = (category: JobCategory | 'Alla') => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryPill,
        selectedCategory === category && styles.categoryPillSelected
      ]}
      onPress={() => handleCategorySelect(category)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category && styles.categoryTextSelected
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading && jobs.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Söker jobb i Sverige...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => fetchJobs(1)}
        >
          <Text style={styles.retryButtonText}>Försök igen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Sök jobb..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleFilterPress}>
            <SlidersHorizontal size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {filter.location && (
          <TouchableOpacity 
            style={styles.locationPill}
            onPress={() => setFilter({ location: null })}
          >
            <MapPin size={14} color={colors.primary} />
            <Text style={styles.locationText}>{filter.location}</Text>
            <Text style={styles.locationClear}>×</Text>
          </TouchableOpacity>
        )}
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(renderCategory)}
        </ScrollView>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sortera efter:</Text>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'newest' && styles.activeSort]}
          onPress={() => handleSort('newest')}
        >
          <Text style={[styles.sortText, sortBy === 'newest' && styles.activeSortText]}>
            Nyaste
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'oldest' && styles.activeSort]}
          onPress={() => handleSort('oldest')}
        >
          <Text style={[styles.sortText, sortBy === 'oldest' && styles.activeSortText]}>
            Äldsta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'location' && styles.activeSort]}
          onPress={() => handleSort('location')}
        >
          <Text style={[styles.sortText, sortBy === 'location' && styles.activeSortText]}>
            Plats
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      />

      {pagination.totalJobs > 0 && (
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            Visar {jobs.length} av {pagination.totalJobs} jobb
          </Text>
          <View style={styles.paginationButtons}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                !pagination.hasPrevPage && styles.paginationButtonDisabled
              ]}
              onPress={handlePrevPage}
              disabled={!pagination.hasPrevPage}
            >
              <Text style={[
                styles.paginationButtonText,
                !pagination.hasPrevPage && styles.paginationButtonTextDisabled
              ]}>
                Föregående
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                !pagination.hasNextPage && styles.paginationButtonDisabled
              ]}
              onPress={handleNextPage}
              disabled={!pagination.hasNextPage}
            >
              <Text style={[
                styles.paginationButtonText,
                !pagination.hasNextPage && styles.paginationButtonTextDisabled
              ]}>
                Nästa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filter={filter}
        onApplyFilters={setFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  locationClear: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryPill: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontSize: 14,
  },
  categoryTextSelected: {
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  paginationContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  paginationText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginationButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  paginationButtonDisabled: {
    backgroundColor: colors.border,
  },
  paginationButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  paginationButtonTextDisabled: {
    color: colors.textSecondary,
  },
  listContent: {
    padding: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortLabel: {
    marginRight: 8,
    fontSize: 16,
    color: colors.text,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: colors.lightGray,
  },
  activeSort: {
    backgroundColor: colors.primary,
  },
  sortText: {
    color: colors.text,
  },
  activeSortText: {
    color: colors.white,
  },
}); 