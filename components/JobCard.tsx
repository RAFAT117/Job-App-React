import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, MapPin, Clock, Briefcase } from 'lucide-react-native';
import { JobPosting } from '@/types/job';
import { colors } from '@/constants/colors';
import { useJobStore } from '@/store/jobStore';
import { formatRelativeTime } from '@/utils/dateUtils';

interface JobCardProps {
  job: JobPosting;
  showActions?: boolean;
}

export const JobCard = memo(({ job, showActions = true }: JobCardProps) => {
  const router = useRouter();
  const { isJobSaved, toggleSaveJob, isJobApplied } = useJobStore();
  const isSaved = isJobSaved(job.id);
  const isApplied = isJobApplied(job.id);

  const handlePress = () => {
    router.push(`/job/${job.id}`);
  };

  const handleSave = (e: any) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isApplied && styles.appliedContainer]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {isApplied && (
        <View style={styles.appliedBadge}>
          <Text style={styles.appliedBadgeText}>Applied</Text>
        </View>
      )}
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {job.company.logo ? (
            <Image 
              source={{ uri: job.company.logo }} 
              style={styles.logo}
              defaultSource={undefined}
            />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Text style={styles.logoPlaceholderText}>
                {job.company.name.charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.company} numberOfLines={1}>{job.company.name}</Text>
          <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
        </View>
        {showActions && (
          <TouchableOpacity 
            style={[styles.saveButton, isSaved && styles.savedButton]} 
            onPress={handleSave}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Heart 
              size={18} 
              color={isSaved ? colors.secondary : colors.textLight} 
              fill={isSaved ? colors.secondary : 'transparent'} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MapPin size={14} color={colors.textLight} />
          <Text style={styles.detailText} numberOfLines={1}>{job.location}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Briefcase size={14} color={colors.textLight} />
          <Text style={styles.detailText}>{job.type}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={14} color={colors.textLight} />
          <Text style={styles.detailText}>{formatRelativeTime(job.postedAt)}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        {job.salary ? (
          <Text style={styles.salary}>{job.salary}</Text>
        ) : (
          <Text style={styles.noSalary}>Salary not specified</Text>
        )}
        {job.remote && <View style={styles.remoteBadge}><Text style={styles.remoteBadgeText}>Remote</Text></View>}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  appliedContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  appliedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  appliedBadgeText: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  logoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logoPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.card,
  },
  headerContent: {
    flex: 1,
  },
  company: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 24,
  },
  saveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  savedButton: {
    backgroundColor: colors.secondaryLight,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salary: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  noSalary: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  remoteBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  remoteBadgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});