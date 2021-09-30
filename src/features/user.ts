import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = { name: '', email: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
