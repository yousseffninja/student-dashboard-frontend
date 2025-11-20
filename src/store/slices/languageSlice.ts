import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language, Direction } from 'types';

interface LanguageState {
  language: Language;
  direction: Direction;
}

const savedLanguage = (localStorage.getItem('language') || 'en') as Language;

const initialState: LanguageState = {
  language: savedLanguage,
  direction: savedLanguage === 'ar' ? 'rtl' : 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;