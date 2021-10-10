import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: UserState = { name: '', email: '', isLoggedIn: false };

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    login: (state, action: PayloadAction<Omit<UserState, 'isLoggedIn'>>) => {
      state.value = { ...action.payload, isLoggedIn: true };
    },
    logout: (state) => {
      state.value = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
