import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload;
    },
    logoutUser(state) {
      state.username = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
