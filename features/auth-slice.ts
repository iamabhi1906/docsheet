import { AuthUser } from "@/services/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: AuthUser | null;
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
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
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
