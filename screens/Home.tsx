import React, { useEffect, useRef } from 'react';
import { 
  Animated, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

const Home = ({ navigation }) => {
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true, 
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [textOpacity]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/Splash.png')} 
        style={styles.splashImage} 
        resizeMode="cover" 
      />

      
      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.animatedText}>OCEANO's CUISINE</Text>
      </Animated.View>

      <SafeAreaView>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Image 
              source={require('../assets/Icons/Chef-hat.png')} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('FullMenu')}>
            <Image 
              source={require('../assets/Icons/Menu.png')} 
              style={{ width: 40, height: 40 }} 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  splashImage: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    alignItems: 'center',
  },
  animatedText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  navbar: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
