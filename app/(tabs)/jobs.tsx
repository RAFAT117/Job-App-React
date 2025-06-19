import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, DollarSign, Clock, Search, Filter } from 'lucide-react-native';

const jobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$150k - $200k',
    postedTime: '2h ago',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$120k - $180k',
    postedTime: '5h ago',
    logo: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'iOS Developer',
    company: 'Meta',
    location: 'Remote',
    salary: '$130k - $190k',
    postedTime: '1d ago',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=200&fit=crop',
  },
];

export default function JobsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Jobs</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#8E8E93" />
            <Text style={styles.searchPlaceholder}>Search for jobs</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.jobCard}>
            <Image source={{ uri: item.logo }} style={styles.companyLogo} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.companyName}>{item.company}</Text>
              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#8E8E93" />
                  <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <DollarSign size={14} color="#8E8E93" />
                  <Text style={styles.detailText}>{item.salary}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#8E8E93" />
                  <Text style={styles.detailText}>{item.postedTime}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  companyName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  jobDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});