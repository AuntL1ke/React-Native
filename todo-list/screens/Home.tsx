// === 📁 src/screens/Home.tsx ===
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Task } from '../types/Task';
import { getTasksFromDb } from '../db/queries';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasksFromDb().then(setTasks);
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{item.title} - {item.priority} - {item.status}</Text>
        </View>
      )}
    />
  );
}