import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAuthChecked: (state) => {
      state.loading = false;
    },
  },
});

export const { setAuthUser, clearUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
