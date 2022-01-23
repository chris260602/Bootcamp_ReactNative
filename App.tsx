import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AppNavigation from './src/navigation/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <AppNavigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeareaview: {
    display: 'flex',
    flexGrow: 1,
  },
});
