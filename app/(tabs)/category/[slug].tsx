import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

interface Vegetable {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  inStock: boolean;
}

const vegetableData: Record<string, Vegetable[]> = {
  seasonal: [
    {
      id: '1',
      name: 'Winter Carrots',
      price: 35,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh winter carrots, sweet and crunchy',
      inStock: true,
    },
    {
      id: '2',
      name: 'Cauliflower',
      price: 30,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1458677/pexels-photo-1458677.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh white cauliflower, perfect for winter',
      inStock: true,
    },
    {
      id: '3',
      name: 'Green Peas',
      price: 60,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1359533/pexels-photo-1359533.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Sweet green peas, seasonal specialty',
      inStock: true,
    },
  ],
  fruits: [
    {
      id: '4',
      name: 'Fresh Apples',
      price: 120,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Crisp red apples, imported quality',
      inStock: true,
    },
    {
      id: '5',
      name: 'Bananas',
      price: 40,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh yellow bananas, perfect ripeness',
      inStock: true,
    },
    {
      id: '6',
      name: 'Orange',
      price: 80,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Juicy oranges, rich in vitamin C',
      inStock: true,
    },
  ],
  'non-seasonal': [
    {
      id: '7',
      name: 'Tomatoes',
      price: 40,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh red tomatoes, perfect for cooking',
      inStock: true,
    },
    {
      id: '8',
      name: 'Onions',
      price: 25,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh red onions, essential for cooking',
      inStock: true,
    },
    {
      id: '9',
      name: 'Potatoes',
      price: 20,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh potatoes, multiple varieties',
      inStock: true,
    },
  ],
  others: [
    {
      id: '10',
      name: 'Spinach',
      price: 25,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Fresh green spinach, rich in iron',
      inStock: true,
    },
    {
      id: '11',
      name: 'Bell Peppers',
      price: 80,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Colorful bell peppers, sweet and crunchy',
      inStock: true,
    },
  ],
};

const categoryNames: Record<string, string> = {
  seasonal: 'Seasonal Vegetables',
  fruits: 'Fresh Fruits',
  'non-seasonal': 'Non-Seasonal Vegetables',
  others: 'Other Vegetables',
};

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);

  useEffect(() => {
    if (slug && vegetableData[slug]) {
      setVegetables(vegetableData[slug]);
    }
  }, [slug]);

  const updateQuantity = (id: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(0, (prev[id] || 0) + change);
      if (newQuantity === 0) {
        const { [id]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQuantity };
    });
  };

  const addToCart = (vegetable: Vegetable) => {
    const quantity = quantities[vegetable.id] || 0;
    if (quantity === 0) {
      Alert.alert('Select Quantity', 'Please select a quantity before adding to cart.');
      return;
    }
    
    Alert.alert(
      'Added to Cart',
      `${vegetable.name} (${quantity}kg) has been added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  if (!slug || !vegetables.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Category not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1E293B" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryNames[slug]}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.vegetablesGrid}>
          {vegetables.map((vegetable) => (
            <View key={vegetable.id} style={styles.vegetableCard}>
              <Image source={{ uri: vegetable.image }} style={styles.vegetableImage} />
              <View style={styles.vegetableInfo}>
                <Text style={styles.vegetableName}>{vegetable.name}</Text>
                <Text style={styles.vegetableDescription}>{vegetable.description}</Text>
                <Text style={styles.vegetablePrice}>₹{vegetable.price}/{vegetable.unit}</Text>
                
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity (kg):</Text>
                  <View style={styles.quantitySelector}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(vegetable.id, -0.5)}
                    >
                      <Minus size={16} color="#22C55E" strokeWidth={2} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {quantities[vegetable.id] || 0}
                    </Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(vegetable.id, 0.5)}
                    >
                      <Plus size={16} color="#22C55E" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(vegetable)}
                >
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
    flexDirection: 'row',
    alignItems: 'center',
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  vegetablesGrid: {
    gap: 16,
  },
  vegetableCard: {
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
  },
  vegetableImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  vegetableInfo: {
    padding: 16,
  },
  vegetableName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  vegetableDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  vegetablePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    marginBottom: 12,
  },
  quantityContainer: {
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#64748B',
  },
});