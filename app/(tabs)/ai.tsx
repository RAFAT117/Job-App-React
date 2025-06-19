import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Send, Sparkles, FileText, PenTool } from 'lucide-react-native';
import { useState } from 'react';

export default function AIScreen() {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistent</Text>
        <Text style={styles.subtitle}>Låt AI hjälpa dig med jobbsökandet</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.featuresGrid}>
          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <FileText size={24} color="#0B4F6C" />
            </View>
            <Text style={styles.featureTitle}>CV-Granskning</Text>
            <Text style={styles.featureDescription}>
              Få expertråd om hur du kan förbättra ditt CV
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <PenTool size={24} color="#2E7D32" />
            </View>
            <Text style={styles.featureTitle}>Personligt Brev</Text>
            <Text style={styles.featureDescription}>
              Skapa anpassade ansökningsbrev för varje tjänst
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chatSection}>
          <Text style={styles.chatTitle}>Fråga AI-assistenten</Text>
          
          <View style={styles.messageContainer}>
            <View style={styles.aiMessage}>
              <Sparkles size={16} color="#0B4F6C" style={styles.messageIcon} />
              <Text style={styles.messageText}>
                Hej! Jag är din AI-assistent. Hur kan jag hjälpa dig med din jobbsökning idag?
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Skriv ditt meddelande här..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 28,
    marginBottom: 8,
    color: '#0B4F6C',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  content: {
    flex: 1,
  },
  featuresGrid: {
    padding: 20,
    flexDirection: 'row',
    gap: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginBottom: 8,
    color: '#0B4F6C',
  },
  featureDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  chatSection: {
    padding: 20,
  },
  chatTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 16,
    color: '#0B4F6C',
  },
  messageContainer: {
    marginBottom: 20,
  },
  aiMessage: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageIcon: {
    marginRight: 8,
    marginTop: 4,
  },
  messageText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0B4F6C',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    paddingTop: 12,
    minHeight: 48,
    maxHeight: 100,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0B4F6C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});