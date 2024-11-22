import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, TextInput, KeyboardAvoidingView, Platform, Button, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const Reservation = () => {
  const navigation = useNavigation();
  const [openTableModal, setOpenTableModal] = useState(false);
  const [customerDetailsModal, setCustomerDetailModal] = useState(false);
  const [seatPrice, setSeatPrice] = useState(20);
  const [selectedDate, setSelectedDate] = useState(null);

  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    phoneNumber: '',
    emailAddress: '',
    peopleNumber: '',
  });

  const [reservationInfo, setReservationInfo] = useState(null);
  const [showMakeReservationButton, setShowMakeReservationButton] = useState(true);

  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAddToCart = () => {
    if (reservationInfo) {
      navigation.navigate('Cart', {
        peopleNumber: reservationInfo.peopleNumber,
        totalReservationPrice: seatPrice * reservationInfo.peopleNumber,
        customerDetails: reservationInfo,
        seatPrice: seatPrice,
      });
    } else {
      Alert.alert("Error", "Please make a reservation first.");
    }
  };

  const toggleModal = () => {
    setOpenTableModal(!openTableModal);
  };

  const toggleChangeDetailsModal = () => {
    if (reservationInfo) {
      setCustomerDetails(reservationInfo);
    }
    setOpenTableModal(true);
  };

  const handleInputChange = (name, value) => {
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const validateInputs = () => {
    const { customerName, phoneNumber, emailAddress, peopleNumber } = customerDetails;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Object.values(customerDetails).some(field => field.trim() === '')) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert("Error", "Phone number must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(emailAddress)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const toggleFinish = () => {
    if (validateInputs()) {
      Alert.alert(
        "Success",
        "Reservation details submitted!",
        [
          {
            text: "OK",
            onPress: () => {
              setReservationInfo(customerDetails);
              setCustomerDetails({
                customerName: '',
                phoneNumber: '',
                emailAddress: '',
                peopleNumber: '',
              });
              setCustomerDetailModal(false);
              toggleModal();
              setShowMakeReservationButton(false);
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Reservation.webp')}
        style={styles.image}
      />

      <Text style={styles.title}>Make a Reservation</Text>

      <Text style={styles.label}>Select a Date:</Text>
      <Calendar
        onDayPress={handleDateSelection}
        markedDates={
          selectedDate
            ? { [selectedDate]: { selected: true, selectedColor: 'grey' } }
            : {}
        }
      />
      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
      )}

      {reservationInfo && (
        <View>
          <Text style={styles.reservationInfoText}>
            Reserved by {reservationInfo.customerName}
          </Text>
          <Text style={styles.reservationInfoText}>
            {reservationInfo.peopleNumber} people
          </Text>
          <Text style={styles.reservationInfoText}>
            Contact:
          </Text>
          <Text style={styles.reservationInfoText}>
            {reservationInfo.phoneNumber}
          </Text>
          <Text style={styles.reservationInfoText}>
            {reservationInfo.emailAddress}
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={toggleChangeDetailsModal}
          >
            <Text style={styles.buttonText}>Change Reservation Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {showMakeReservationButton && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={toggleModal}
        >
          <Text style={styles.buttonText}>Make Reservation</Text>
        </TouchableOpacity>
      )}

      {reservationInfo && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Continue to payment</Text>
        </TouchableOpacity>
      )}

      {/* Table Reservation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openTableModal}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={toggleModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Table Reservation</Text>
            <Text style={styles.modalText}>Enter Customer Details:</Text>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              placeholderTextColor={'black'}
              value={customerDetails.customerName}
              onChangeText={(text) => handleInputChange('customerName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor={'black'}
              maxLength={10}
              value={customerDetails.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={'black'}
              value={customerDetails.emailAddress}
              onChangeText={(text) => handleInputChange('emailAddress', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of people attending"
              keyboardType="numeric"
              placeholderTextColor={'black'}
              value={customerDetails.peopleNumber}
              onChangeText={(text) => handleInputChange('peopleNumber', text)}
            />
            <TouchableOpacity style={styles.button} onPress={toggleFinish}>
              <Text style={styles.buttonText}>Submit details</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDateText: {
    fontSize: 18,
    marginBottom: 10,
  },
  reservationInfoText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default Reservation;
