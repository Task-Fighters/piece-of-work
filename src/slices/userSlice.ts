import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';
import { IUser } from '../types';

interface IState {
  user: IUser,
  status: string
}

const initialState: IState = {
  user: {} as IUser,
  status: ''
}

export const loginUser = createAsyncThunk('milk/fetchMilk', async () => {
  const response = await axios.get('/milk');
  return response.data.db.results;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer(state, action: PayloadAction<IUser>) {
      state.status = 'auth';
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {})
  }
})

export const selectUser = (state: RootState) => state.user;
export const { loginReducer } = userSlice.actions;
export default userSlice.reducer;
