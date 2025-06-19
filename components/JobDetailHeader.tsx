import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Share as RNShare,
  Platform,
  Linking
} from 'react-native';
import { Heart, Share2, MapPin, Clock, Briefcase, Users, ExternalLink } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { JobPosting } from '@/types/job';
import { useJobStore } from '@/store/jobStore';
import { formatRelativeTime } from '@/utils/dateUtils';

interface JobDetailHeaderProps {
  job: JobPosting;
}

export const JobDetailHeader = ({ job }: JobDetailHeaderProps) => {
  const { isJobSaved, toggleSaveJob } = useJobStore();
  const isSaved = isJobSaved(job.id);

  const handleSave = () => {
    toggleSaveJob(job.id);
  };

  const handleShare = async () => {
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

  const handleOpenSource = () => {
    if (job.sourceUrl) {
      Linking.openURL(job.sourceUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.companyContainer}>
        {job.company.logo ? (
          <Image 
            source={{ uri: job.company.logo }} 
            style={styles.logo}
          />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <Text style={styles.logoPlaceholderText}>
              {job.company.name.charAt(0)}
            </Text>
          </View>
        )}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{job.company.name}</Text>
          <Text style={styles.jobTitle}>{job.title}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, isSaved && styles.savedButton]} 
          onPress={handleSave}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Heart 
            size={20} 
            color={isSaved ? colors.secondary : colors.textLight} 
            fill={isSaved ? colors.secondary : 'transparent'} 
          />
        </TouchableOpacity>
        
        {Platform.OS !== 'web' && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleShare}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Share2 size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
        
        {job.sourceUrl && (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleOpenSource}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ExternalLink size={20} color={colors.textLight} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{job.location}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Briefcase size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{job.type}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Posted {formatRelativeTime(job.postedAt)}</Text>
          </View>
          
          {job.applicants !== undefined && job.applicants > 0 && (
            <View style={styles.detailItem}>
              <Users size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>{job.applicants} applicants</Text>
            </View>
          )}
        </View>
      </View>
      
      {job.lastApplicationDate && (
        <View style={styles.deadlineContainer}>
          <Text style={styles.deadlineLabel}>Application deadline</Text>
          <Text style={styles.deadline}>{new Date(job.lastApplicationDate).toLocaleDateString('sv-SE')}</Text>
        </View>
      )}
      
      <View style={styles.salaryContainer}>
        <Text style={styles.salaryLabel}>Salary</Text>
        <Text style={styles.salary}>{job.salary || 'Not specified'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: colors.primaryLight,
  },
  logoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logoPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.card,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: 28,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  savedButton: {
    backgroundColor: colors.secondaryLight,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  deadlineContainer: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  deadlineLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  deadline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  salaryContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 16,
  },
  salaryLabel: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 4,
  },
  salary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
});