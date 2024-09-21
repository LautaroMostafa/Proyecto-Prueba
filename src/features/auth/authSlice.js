import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    idToken: null,
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.idToken = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
