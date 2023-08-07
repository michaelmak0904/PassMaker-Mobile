import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screen/SignInScreen';
import HomeScreen from './screen/HomeScreen';
import EventScreen from './screen/EventScreen';
import SuccessScreen from './screen/SuccessScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51L535EL5BXNDh6RUBlsJLdcSvXL8g51F7cFm0QEbM9nSFitrnJMK7HfTB49fK8h9M8P9PDQXHyAHEHv6qP6l3Hkn004fdTqbdn"
      merchantIdentifier="merchant.ttp.charge"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Success">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          {/* Add other screens here if needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
