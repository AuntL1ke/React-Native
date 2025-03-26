// === 📁 src/screens/AddTask.tsx ===
import React, { useState } from 'react';
import { View, TextInput, Button, Picker } from 'react-native';
import { Task } from '../types/Task';
import { addTaskToDb } from '../db/queries';
import { v4 as uuidv4 } from 'uuid';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'mid' | 'high'>('low');

  const handleAdd = async () => {
    const task: Task = {
      id: uuidv4(),
      title,
      date,
      priority,
      status: 'to-do',
    };

    await addTaskToDb(task);
    setTitle('');
    setDate('');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <Picker selectedValue={priority} onValueChange={val => setPriority(val)}>
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Mid" value="mid" />
        <Picker.Item label="High" value="high" />
      </Picker>
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
}
