// === 📁 src/App.tsx ===
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { Provider } from 'react-redux';
import { store } from './store';
import { initDb } from './db/drizzle';

export default function App() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}

