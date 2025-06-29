import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Heart, ShoppingCart } from 'lucide-react-native';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

const favoriteItems: FavoriteItem[] = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Non-Seasonal',
  },
  {
    id: '2',
    name: 'Fresh Apples',
    price: 120,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Fruits',
  },
  {
    id: '3',
    name: 'Green Spinach',
    price: 25,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Others',
  },
];

export default function FavoritesScreen() {
  if (favoriteItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#CBD5E1" strokeWidth={1} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Add items to your favorites to see them here</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.itemCount}>{favoriteItems.length} items</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.favoritesGrid}>
          {favoriteItems.map((item) => (
            <View key={item.id} style={styles.favoriteCard}>
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <TouchableOpacity style={styles.heartButton}>
                <Heart size={20} color="#EF4444" fill="#EF4444" strokeWidth={2} />
              </TouchableOpacity>
              <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteCategory}>{item.category}</Text>
                <Text style={styles.favoriteName}>{item.name}</Text>
                <Text style={styles.favoritePrice}>₹{item.price}/{item.unit}</Text>
                <TouchableOpacity style={styles.addToCartButton}>
                  <ShoppingCart size={16} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#64748B',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  favoriteCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteInfo: {
    padding: 12,
  },
  favoriteCategory: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  favoriteName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  favoritePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});