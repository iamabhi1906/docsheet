import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth-slice";
import documentReducer from "@/features/document-slice";

export function store() {
  return configureStore({
    reducer: {
      auth: authReducer,
      documents: documentReducer,
    },
  });
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
