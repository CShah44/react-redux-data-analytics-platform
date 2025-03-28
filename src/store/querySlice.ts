import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultsData {
  type: string;
  title: string;
  data: { name: string; value: number }[];
  description: string;
  insights?: string[];
}

interface QueryState {
  currentQuery: string;
  queryHistory: {
    id: string;
    text: string;
    timestamp: number;
    result: ResultsData | null;
  }[];
  suggestions: string[];
  isLoading: boolean;
  error: string | null;
  results: ResultsData | null;
}

const initialState: QueryState = {
  currentQuery: "",
  queryHistory: [],
  suggestions: [
    "Show me monthly revenue for the last year",
    "What were our top selling products last quarter?",
    "Compare sales performance across regions",
    "What is our customer retention rate?",
    "Show me marketing campaign ROI",
  ],
  isLoading: false,
  error: null,
  results: null,
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    addToHistory: (
      state,
      action: PayloadAction<{ query: string; result: ResultsData }>
    ) => {
      const newQuery = {
        id: Date.now().toString(),
        text: action.payload.query,
        timestamp: Date.now(),
        result: action.payload.result,
      };

      state.queryHistory = [newQuery, ...state.queryHistory];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setResults: (state, action: PayloadAction<ResultsData>) => {
      state.results = action.payload;
    },
    clearResults: (state) => {
      state.results = null;
    },
    executeStoredQuery: (state, action: PayloadAction<string>) => {
      const q = state.queryHistory.find((q) => q.id === action.payload);
      const queryText = q?.text || "";
      state.currentQuery = queryText;
      state.results = q?.result;
    },
  },
});

export const {
  setCurrentQuery,
  addToHistory,
  setLoading,
  setError,
  setResults,
  clearResults,
  executeStoredQuery,
} = querySlice.actions;

export default querySlice.reducer;
