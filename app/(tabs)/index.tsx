import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { JobList } from '@/components/JobList';
import { colors } from '@/constants/colors';
import { useJobStore } from '@/store/jobStore';

export default function DiscoverScreen() {
  const { fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs(1);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <JobList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});