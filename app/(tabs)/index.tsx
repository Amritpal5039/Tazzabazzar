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

interface FreshPick {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  isNew: boolean;
  discount?: number;
}

const categories: Category[] = [
  {
    id: 'seasonal',
    name: 'Seasonal',
    icon: <Calendar size={20} color="#FFFFFF" strokeWidth={2} />,
    count: 15,
    color: '#F59E0B',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: <Apple size={20} color="#FFFFFF" strokeWidth={2} />,
    count: 25,
    color: '#EF4444',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'non-seasonal',
    name: 'Non-Seasonal',
    icon: <Leaf size={20} color="#FFFFFF" strokeWidth={2} />,
    count: 20,
    color: '#22C55E',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'others',
    name: 'Others',
    icon: <Grid3X3 size={20} color="#FFFFFF" strokeWidth={2} />,
    count: 12,
    color: '#8B5CF6',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
];

const freshPicks: FreshPick[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=200',
    isNew: true,
    discount: 10,
  },
  {
    id: '2',
    name: 'Green Spinach',
    price: 25,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=200',
    isNew: true,
  },
  {
    id: '3',
    name: 'Bell Peppers',
    price: 80,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=200',
    isNew: false,
    discount: 15,
  },
  {
    id: '4',
    name: 'Fresh Carrots',
    price: 35,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=200',
    isNew: true,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProfilePress = () => {
    router.push('/profile');
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
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
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
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.categoryCircle, { backgroundColor: category.color }]}>
                  <Image source={{ uri: category.image }} style={styles.categoryBackgroundImage} />
                  <View style={styles.categoryOverlay}>
                    {category.icon}
                  </View>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fresh Picks</Text>
            <Text style={styles.sectionSubtitle}>Latest additions & best deals</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContainer}
          >
            {freshPicks.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredCard}>
                <View style={styles.featuredImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.featuredImage} />
                  {item.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                  )}
                  {item.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>{item.discount}% OFF</Text>
                    </View>
                  )}
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{item.name}</Text>
                  <View style={styles.priceContainer}>
                    {item.discount ? (
                      <>
                        <Text style={styles.originalPrice}>₹{item.price}</Text>
                        <Text style={styles.discountedPrice}>
                          ₹{Math.round(item.price * (1 - item.discount / 100))}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.featuredPrice}>₹{item.price}</Text>
                    )}
                    <Text style={styles.priceUnit}>/{item.unit}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.promotionSection}>
          <View style={styles.promotionCard}>
            <View style={styles.promotionContent}>
              <Text style={styles.promotionTitle}>🎉 Special Offer</Text>
              <Text style={styles.promotionText}>Get 20% off on your first order above ₹500</Text>
              <TouchableOpacity style={styles.promotionButton}>
                <Text style={styles.promotionButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.promotionImage}
            />
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
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  categoriesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 80,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.3,
  },
  categoryOverlay: {
    zIndex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  featuredSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  featuredScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  featuredCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImageContainer: {
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  originalPrice: {
    fontSize: 12,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },
  priceUnit: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 2,
  },
  promotionSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  promotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  promotionContent: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  promotionText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },
  promotionButton: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  promotionImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
});