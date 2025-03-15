import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

export default function DamageScreen() {
  const [description, setDescription] = useState('');
  const [signature, setSignature] = useState('');

  const handleOK = (sig: string) => {
    setSignature(sig);
  };

  const handleSubmit = () => {
    Alert.alert("Протокол оформлено!", "Опис та ескіз пошкоджень збережено.");
    console.log("Опис пошкодження:", description);
    console.log("Ескіз ДТП:", signature);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Сторона та опис пошкоджень"
        multiline
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.sketchLabel}>Ескіз ДТП:</Text>

      <View style={styles.canvasContainer}>
        <SignatureCanvas
          onOK={handleOK}
          descriptionText="Намалюйте ескіз ДТП"
          clearText="Очистити"
          confirmText="Зберегти"
        />
      </View>

      <Button title="Відправити протокол" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  sketchLabel: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  canvasContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
});
