import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const questions = [
  { question: 'Ви легко заводите нові знайомства?', type: 'sanguine' },
  { question: 'Вам складно справлятися з невдачами?', type: 'melancholic' },
  { question: 'Ви швидко реагуєте на події, легко заводитесь?', type: 'choleric' },
  { question: 'Ви віддаєте перевагу спокійним, розміреним заняттям?', type: 'phlegmatic' },
  { question: 'Ви часто міняєте свої настрої?', type: 'sanguine' }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({
    sanguine: 0,
    melancholic: 0,
    choleric: 0,
    phlegmatic: 0
  });
  const [started, setStarted] = useState(false);

  const handleAnswer = (answer) => {
    if (answer) {
      setScores((prevScores) => ({
        ...prevScores,
        [questions[index].type]: prevScores[questions[index].type] + 1
      }));
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      showResult();
    }
  };

  const showResult = () => {
    let result = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    Alert.alert('Результат', `Ваш темперамент: ${result.charAt(0).toUpperCase() + result.slice(1)}`);
    setIndex(0);
    setScores({ sanguine: 0, melancholic: 0, choleric: 0, phlegmatic: 0 });
    setStarted(false);
  };

  return (
    <View style={styles.container}>
      {!started ? (
        <Button title="Старт" onPress={() => setStarted(true)} />
      ) : (
        <View>
          <Text>{questions[index].question}</Text>
          <Button title="Так" onPress={() => handleAnswer(true)} />
          <Button title="Ні" onPress={() => handleAnswer(false)} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});