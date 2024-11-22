import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mainpage from './screens/LoginPage';
import ChefsMenu from './screens/ChefsMenu'; // Adjusted path
import LoginPage from './screens/LoginPage';
import Home from './screens/Home';
import FullMenu from './screens/FullMenu';
import Cart from './screens/Cart';
import Reservation from './screens/Reservation';
import { MenuProvider } from './screens/MenuContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChefsMenu"
            component={ChefsMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FullMenu"
            component={FullMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reservation"
            component={Reservation} // Updated name casing
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
