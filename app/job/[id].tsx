import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Share as RNShare
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Check, ChevronDown, ChevronUp, ExternalLink, Share2 } from 'lucide-react-native';
import { JobDetailHeader } from '@/components/JobDetailHeader';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { EmptyState } from '@/components/EmptyState';
import { useJobStore } from '@/store/jobStore';
import { colors } from '@/constants/colors';
import { JobPosting } from '@/types/job';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { 
    jobs, 
    isJobApplied, 
    applyToJob, 
    isLoading,
    error,
    fetchJobById
  } = useJobStore();
  
  const [job, setJob] = useState<JobPosting | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    responsibilities: true,
    requirements: true,
    benefits: false,
  });
  
  useEffect(() => {
    const loadJob = async () => {
      // First check if we already have the job in our store
      const cachedJob = jobs.find(j => j.id === id);
      if (cachedJob) {
        setJob(cachedJob);
        return;
      }
      
      // If not, fetch it from the API
      const fetchedJob = await fetchJobById(id);
      if (fetchedJob) {
        setJob(fetchedJob);
      }
    };
    
    loadJob();
  }, [id, jobs, fetchJobById]);
  
  const isApplied = job ? isJobApplied(job.id) : false;
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleApply = () => {
    if (!job) return;
    
    if (!isApplied) {
      if (job.sourceUrl) {
        Alert.alert(
          "External Application",
          "You'll be redirected to the employer's website to complete your application.",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "Continue", 
              onPress: () => {
                applyToJob(job.id);
                Linking.openURL(job.sourceUrl!);
              }
            }
          ]
        );
      } else {
        applyToJob(job.id);
        Alert.alert(
          "Application Submitted",
          "Your application has been recorded. You can track its status in the Applications tab."
        );
      }
    }
  };
  
  const handleShare = async () => {
    if (!job) return;
    
    if (Platform.OS !== 'web') {
      try {
        await RNShare.share({
          message: `Check out this job: ${job.title} at ${job.company.name}`,
          title: `${job.title} at ${job.company.name}`,
          url: job.sourceUrl,
        });
      } catch (error) {
        console.error('Error sharing job:', error);
      }
    }
  };

  if (isLoading && !job) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingIndicator text="Loading job details..." fullScreen />
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title="Error loading job"
          message={error}
          actionLabel="Go Back"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }
  
  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          title="Job not found"
          message="The job you're looking for doesn't exist or has been removed."
          actionLabel="Go Back"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <JobDetailHeader job={job} />
        
        {/* Description Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('description')}
          >
            <Text style={styles.sectionTitle}>Description</Text>
            {expandedSections.description ? (
              <ChevronUp size={20} color={colors.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.description && (
            <Text style={styles.descriptionText}>{job.description}</Text>
          )}
        </View>
        
        {/* Responsibilities Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('responsibilities')}
          >
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            {expandedSections.responsibilities ? (
              <ChevronUp size={20} color={colors.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.responsibilities && (
            <View style={styles.listContainer}>
              {job.responsibilities?.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
              {(!job.responsibilities || job.responsibilities.length === 0) && (
                <Text style={styles.emptyText}>No responsibilities specified</Text>
              )}
            </View>
          )}
        </View>
        
        {/* Requirements Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('requirements')}
          >
            <Text style={styles.sectionTitle}>Requirements</Text>
            {expandedSections.requirements ? (
              <ChevronUp size={20} color={colors.textSecondary} />
            ) : (
              <ChevronDown size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
          
          {expandedSections.requirements && (
            <View style={styles.listContainer}>
              {job.requirements?.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
              {(!job.requirements || job.requirements.length === 0) && (
                <Text style={styles.emptyText}>No requirements specified</Text>
              )}
            </View>
          )}
        </View>
        
        {/* Benefits Section */}
        {job.benefits && job.benefits.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => toggleSection('benefits')}
            >
              <Text style={styles.sectionTitle}>Benefits</Text>
              {expandedSections.benefits ? (
                <ChevronUp size={20} color={colors.textSecondary} />
              ) : (
                <ChevronDown size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
            
            {expandedSections.benefits && (
              <View style={styles.listContainer}>
                {job.benefits?.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        
        {/* Skills Section */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {job.skills?.map((skill: string, index: number) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
            {(!job.skills || job.skills.length === 0) && (
              <Text style={styles.emptyText}>No skills specified</Text>
            )}
          </View>
        </View>
        
        {job.company.website && (
          <TouchableOpacity 
            style={styles.companyWebsite}
            onPress={() => Linking.openURL(job.company.website!)}
          >
            <Text style={styles.companyWebsiteText}>Visit company website</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        {Platform.OS !== 'web' && (
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Share2 size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.applyButton,
            isApplied && styles.appliedButton,
          ]}
          onPress={handleApply}
          disabled={isApplied}
        >
          {isApplied ? (
            <>
              <Check size={20} color={colors.card} />
              <Text style={styles.applyButtonText}>Applied</Text>
            </>
          ) : (
            <Text style={styles.applyButtonText}>Apply Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 8,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 10,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  skillsSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
  companyWebsite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  companyWebsiteText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appliedButton: {
    backgroundColor: colors.success,
  },
  applyButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
  },
});