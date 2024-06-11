import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const getThemeState = createSelector(
  (state: RootState) => state,
  (state) => state.theme
);

export default themeSlice.reducer;
