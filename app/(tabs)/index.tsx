import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { Search, User, Apple, Leaf, Calendar, Grid3x3 as Grid3X3 } from 'lucide-react-native';
import { router } from 'expo-router';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 'seasonal',
    name: 'Seasonal',
    icon: <Calendar size={24} color="#FFFFFF" strokeWidth={2} />,
    count: 15,
    color: '#F59E0B',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: <Apple size={24} color="#FFFFFF" strokeWidth={2} />,
    count: 25,
    color: '#EF4444',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'non-seasonal',
    name: 'Non-Seasonal',
    icon: <Leaf size={24} color="#FFFFFF" strokeWidth={2} />,
    count: 20,
    color: '#22C55E',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'others',
    name: 'Others',
    icon: <Grid3X3 size={24} color="#FFFFFF" strokeWidth={2} />,
    count: 12,
    color: '#8B5CF6',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vegetables, fruits..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <User size={24} color="#22C55E" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Good Morning! 🌱</Text>
          <Text style={styles.welcomeSubtext}>What would you like to buy today?</Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <View style={[styles.categoryOverlay, { backgroundColor: `${category.color}CC` }]}>
                  <View style={styles.categoryIconContainer}>
                    {category.icon}
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count} items</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Fresh Picks</Text>
          <View style={styles.featuredGrid}>
            <TouchableOpacity style={styles.featuredCard}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>Fresh Tomatoes</Text>
                <Text style={styles.featuredPrice}>₹40/kg</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>Green Spinach</Text>
                <Text style={styles.featuredPrice}>₹25/kg</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryCard: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryIconContainer: {
    alignSelf: 'flex-start',
  },
  categoryInfo: {
    alignItems: 'flex-start',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  featuredSection: {
    paddingHorizontal: 20,
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  featuredCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C55E',
  },
});