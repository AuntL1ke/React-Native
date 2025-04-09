import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyState {
  from: string;
  to: string;
  amount: number;
  result: number;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  from: 'USD',
  to: 'EUR',
  amount: 0,
  result: 0,
  loading: false,
  error: null,
};

export const fetchRate = createAsyncThunk(
  'currency/fetchRate',
  async ({ from, to, amount }: { from: string; to: string; amount: number }) => {
    const url = `https://open.er-api.com/v6/latest/${from}`;
    console.log('🌍 Requesting URL:', url);

    const res = await axios.get(url);
    const rates = res.data?.rates ?? res.data?.conversion_rates;

    if (!rates || !rates[to]) {
      throw new Error(`❌ Currency ${to} not found`);
    }

    const rate = rates[to];
    const converted = amount * rate;
    console.log(`💱 ${amount} ${from} = ${converted} ${to} (rate: ${rate})`);
    return converted;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRate.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(fetchRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
        console.log('❌ Fetch failed:', action.error.message);
      });
  },
});

export const { setFrom, setTo, setAmount } = currencySlice.actions;
export default currencySlice.reducer;
