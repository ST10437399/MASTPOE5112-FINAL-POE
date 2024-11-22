import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from './MenuContext'; // Import useMenu

const FullMenu = () => {
  const navigation = useNavigation();
  const { dishes } = useMenu(); // Access dishes from context
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [averagePrices, setAveragePrices] = useState({
    Starter: 0,
    'Main Course': 0,
    Dessert: 0,
  });

  // Filter dishes based on selected category
  const filteredItems = selectedCategory === 'All'
    ? dishes
    : dishes.filter((item) => item.category === selectedCategory);

  // Calculate average prices whenever dishes change
  useEffect(() => {
    const calculateAverages = () => {
      const categories = ['Starter', 'Main Course', 'Dessert'];
      const averages = {};

      categories.forEach((category) => {
        const categoryDishes = dishes.filter((dish) => dish.category === category);
        const total = categoryDishes.reduce((sum, dish) => sum + dish.price, 0);
        averages[category] = categoryDishes.length
          ? (total / categoryDishes.length).toFixed(2)
          : 0;
      });

      setAveragePrices(averages);
    };

    calculateAverages();
  }, [dishes]);

  // Render each menu item
  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>R{item.price}</Text>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => navigation.navigate('Reservation', { dish: item })} // Ensure 'Reservation' is in the stack
      >
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.totalDishesText}>Menu</Text>

      {/* Average Prices */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.averageText}>Average Prices:</Text>
        <Text style={styles.averageText}>Starters: R{averagePrices.Starter}</Text>
        <Text style={styles.averageText}>Main Meals: R{averagePrices['Main Course']}</Text>
        <Text style={styles.averageText}>Desserts: R{averagePrices.Dessert}</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'All' && styles.activeButton]}
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={styles.filterButtonText}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Starter' && styles.activeButton]}
          onPress={() => setSelectedCategory('Starter')}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Main Course' && styles.activeButton]}
          onPress={() => setSelectedCategory('Main Course')}
        >
          <Text style={styles.filterButtonText}>Main Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Dessert' && styles.activeButton]}
          onPress={() => setSelectedCategory('Dessert')}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      {/* List of Dishes */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  totalDishesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  averageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: '#b1b482',
  },
  menuList: {
    flexGrow: 1,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    marginTop: 5,
    color: '#555',
  },
  itemPrice: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
  reserveButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reserveButtonText: {
    color: 'white',
  },
});

export default FullMenu;
