import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Button, TouchableOpacity, ScrollView, Alert, TextInput, Image, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ route }) => {
  const navigation = useNavigation();
  const { customerDetails, peopleNumber, totalReservationPrice, cartItems: routeCartItems } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cardDetails, setCardDetails] = useState({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
  const [cardType, setCardType] = useState('');

  const isCartEmpty = cartItems.length === 0;

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];
        setCartItems(routeCartItems || parsedCart); // Load from route.params if available, fallback to AsyncStorage
      } catch (error) {
        console.error('Failed to load cart items', error);
      }
    };
    loadCartItems();
  }, [routeCartItems]);

  const removeFromCart = async (meal) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== meal.id);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      Alert.alert('Item removed!', `${meal.mealName} has been removed from your cart.`);
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  };

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleCardModal = () => setCardModalVisible(!cardModalVisible);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollView>
        <Text style={styles.title}>Your Cart</Text>

        {isCartEmpty ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <ScrollView>
            {cartItems.map((meal, index) => (
              <View key={index} style={styles.cartItem}>
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.mealName}</Text>
                  <Text>{meal.description}</Text>
                  <Text style={styles.mealPrice}>R{meal.price}.00</Text>
                  <Button title="Remove" onPress={() => removeFromCart(meal)} />
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={styles.title}>Reservation Summary</Text>
        {customerDetails ? (
          <>
            <Text style={styles.detailText}>Reserved by: {customerDetails.customerName}</Text>
            <Text style={styles.detailText}>Phone Number: {customerDetails.phoneNumber}</Text>
            <Text style={styles.detailText}>Email: {customerDetails.emailAddress}</Text>
            <Text style={styles.detailText}>Number of People: {peopleNumber}</Text>
            <Text style={styles.detailText}>Total Reservation Price: R{totalReservationPrice}</Text>
          </>
        ) : (
          <Text style={styles.detailText}>No reservation details available.</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reservation')}>
          <Text style={styles.buttonText}>Reservation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isCartEmpty ? styles.disabledButton : {}]}
          onPress={toggleModal}
          disabled={isCartEmpty}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    backgroundColor: '#fff',
    padding: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },

  emptyCartText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },

  cartItem: {
    flexDirection: 'row',
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  mealImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 40,
  },

  mealDetails: {
    flex: 1,
  },

  mealName: {
    fontWeight: 'bold',
  },

  mealPrice: {
    color: '#6b7b59',
  },

  detailText: {
    marginVertical: 2,
  },

  button: {
    backgroundColor: '#373737',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },

  disabledButton: {
    backgroundColor: '#ccc',
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default Cart;
