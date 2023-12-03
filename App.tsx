import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from '@/navigation';
import { APIProvider } from '@/api/provider';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <APIProvider>
        <RootNavigator />
      </APIProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
