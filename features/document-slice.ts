import { DocumentRecord } from "@/types/document";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  documents: DocumentRecord[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  documents: [],
  isLoading: true,
  error: null,
};

const documentSlice = createSlice({
  name: "do",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentRecord[]>) => {
      state.documents = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setDocumentsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearDocuments: (state) => {
      state.documents = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setDocuments, setDocumentsError, clearDocuments } =
  documentSlice.actions;
export default documentSlice.reducer;
