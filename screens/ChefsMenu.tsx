import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Video } from 'expo-av';
import { useMenu } from './MenuContext'; // Access useMenu
import { Picker } from '@react-native-picker/picker'; // Import Picker

const ChefsMenu = () => {
  const { dishes, addDish, setDishes } = useMenu(); // Access MenuContext
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [localDishes, setLocalDishes] = useState([]); // Local state to display dishes

  useEffect(() => {
    loadDishes();
  }, []);

  // Load saved dishes from AsyncStorage
  const loadDishes = async () => {
    try {
      const savedDishes = await AsyncStorage.getItem('dishes');
      if (savedDishes) {
        const parsedDishes = JSON.parse(savedDishes);
        setDishes(parsedDishes); // Update global context
        setLocalDishes(parsedDishes); // Update local state
      }
    } catch (error) {
      console.error('Failed to load dishes:', error);
    }
  };

  // Save dishes to AsyncStorage
  const saveDishes = async (dishes) => {
    try {
      await AsyncStorage.setItem('dishes', JSON.stringify(dishes));
    } catch (error) {
      console.error('Failed to save dishes:', error);
    }
  };

  // Handle adding a dish
  const handleAddDish = () => {
    if (!selectedCategory || !dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      category: selectedCategory,
      name: dishName,
      description,
      price: parseFloat(price),
    };

    const updatedDishes = [...dishes, newDish];

    addDish(newDish); // Update global state
    setLocalDishes(updatedDishes); // Update local state
    saveDishes(updatedDishes); // Persist data to AsyncStorage

    setDishName(''); // Clear input fields
    setDescription('');
    setPrice('');
    setSelectedCategory('');
  };

  // Handle deleting a dish
  const handleDeleteDish = (id) => {
    const updatedDishes = dishes.filter((dish) => dish.id !== id);
    setDishes(updatedDishes); // Update global state
    setLocalDishes(updatedDishes); // Update local state
    saveDishes(updatedDishes); // Persist data
  };

  // Handle editing a dish
  const handleEditDish = (id, updatedDish) => {
    const updatedDishes = dishes.map((dish) =>
      dish.id === id ? { ...dish, ...updatedDish } : dish
    );
    setDishes(updatedDishes); // Update global state
    setLocalDishes(updatedDishes); // Update local state
    saveDishes(updatedDishes); // Persist data
  };

  // Render dish card
  const renderDish = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Category: {item.category}</Text>
      <Text style={styles.cardText}>Description: {item.description}</Text>
      <Text style={styles.cardText}>Price: R{item.price}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            handleEditDish(item.id, {
              name: `${item.name} (Edited)`,
              description: `${item.description} (Updated)`,
            })
          }
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteDish(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* Background Video */}
      <Video
        source={require('../assets/video/Chefs-Menu.mp4')}
        style={styles.backgroundVideo}
        rate={1.0}
        volume={0.0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
      />

      {/* Content Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Chef's Menu</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
            
          >
            <Picker.Item label="Select a category..." value="" color='white' />
            <Picker.Item label="Starter" value="Starter" color='white'  />
            <Picker.Item label="Main Course" value="Main Course" color='white'  />
            <Picker.Item label="Dessert" value="Dessert" color='white'  />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.addButtonText}>Add Dish</Text>
        </TouchableOpacity>

        <FlatList
          data={localDishes}
          keyExtractor={(item) => item.id}
          renderItem={renderDish}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default ChefsMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pickerContainer: {
 
  },
  picker: {
    
  },
  
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});
