import React from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const currencies = [
  'USD', 'EUR', 'GBP', 'UAH', 'JPY', 'CAD', 'AUD', 'CNY', 'CHF', 'PLN', 'TRY',
  'INR', 'RUB', 'SEK', 'NOK', 'ZAR', 'NZD',
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (currency: string) => void;
};

export default function CurrencySelector({ visible, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Currency</Text>
          <FlatList
            data={currencies}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                onSelect(item);
                onClose();
              }}>
                <Text style={styles.currency}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  currency: {
    padding: 12,
    color: '#fff',
    fontSize: 18,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  close: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
