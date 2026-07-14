import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User as FirebaseUser } from "firebase/auth";

export interface AuthState {
  user: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setAuthUser, setAuthError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
