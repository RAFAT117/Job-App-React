import React, { useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Easing 
} from 'react-native';
import { JobCategory } from '@/types/job';
import { colors } from '@/constants/colors';
import { jobCategories } from '@/constants/swedish-data';

interface CategoryFilterProps {
  selectedCategory: JobCategory;
  onSelectCategory: (category: JobCategory) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<Record<string, Animated.Value>>({});

  // Initialize animated values for each category
  jobCategories.forEach(category => {
    if (!animatedValues.current[category]) {
      animatedValues.current[category] = new Animated.Value(category === selectedCategory ? 1 : 0);
    }
  });

  const handleCategoryPress = (category: JobCategory) => {
    // Animate the previously selected category out
    if (selectedCategory !== category) {
      Animated.timing(animatedValues.current[selectedCategory], {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    // Animate the newly selected category in
    Animated.timing(animatedValues.current[category], {
      toValue: 1,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();

    onSelectCategory(category);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={120}
      snapToAlignment="start"
    >
      {jobCategories.map((category) => {
        const animatedValue = animatedValues.current[category] || new Animated.Value(0);
        
        const backgroundColor = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.card, colors.primary]
        });
        
        const textColor = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.textSecondary, colors.card]
        });
        
        const borderColor = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.border, colors.primary]
        });
        
        const scale = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05]
        });

        return (
          <Animated.View
            key={category}
            style={[
              styles.categoryButtonContainer,
              {
                transform: [{ scale }]
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => handleCategoryPress(category as JobCategory)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor,
                    borderColor,
                  }
                ]}
              >
                <Animated.Text
                  style={[
                    styles.categoryText,
                    {
                      color: textColor,
                    }
                  ]}
                >
                  {category}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexGrow: 1,
  },
  categoryButtonContainer: {
    marginRight: 8,
    minWidth: 120,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
  },
});