import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setAmount, setFrom, setTo, fetchRate } from '../redux/currencySlice';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CurrencySelector from '../components/CurrencySelector';


export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { from, to, amount, result, loading } = useSelector((state: RootState) => state.currency);

  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);

  useEffect(() => {
    if (!isNaN(amount) && amount > 0) {
      dispatch(fetchRate({ from, to, amount }));
    }
  }, [amount, from, to]);

  const handleSwap = () => {
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const numeric = parseFloat(cleaned);
    if (!isNaN(numeric)) {
      dispatch(setAmount(numeric));
    } else {
      dispatch(setAmount(0));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <View style={styles.card}>
        <View style={styles.currencyRow}>
          <TouchableOpacity onPress={() => setShowFromModal(true)}>
            <Text style={styles.label}>From: {from}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSwap}>
            <Ionicons name="swap-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowToModal(true)}>
            <Text style={styles.label}>To: {to}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          keyboardType="decimal-pad"
          value={amount.toString()}
          onChangeText={handleAmountChange}
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#666"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(fetchRate({ from, to, amount }))}
        >
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>

        <Text style={styles.result}>
          {loading
            ? 'Loading...'
            : result !== undefined && !isNaN(result)
            ? `Result: ${result.toFixed(2)} ${to}`
            : 'Enter valid amount'}
        </Text>
      </View>

      <CurrencySelector
        visible={showFromModal}
        onClose={() => setShowFromModal(false)}
        onSelect={(currency) => dispatch(setFrom(currency))}
      />
      <CurrencySelector
        visible={showToModal}
        onClose={() => setShowToModal(false)}
        onSelect={(currency) => dispatch(setTo(currency))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#aaa',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#2C2C2C',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  result: {
    marginTop: 24,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
