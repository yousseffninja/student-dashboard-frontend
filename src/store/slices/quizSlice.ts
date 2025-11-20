import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/api';
import { Quiz } from 'types';

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const fetchQuizzes = createAsyncThunk('quizzes/fetchAll', async () => {
  const response = await api.get('/quizzes');
  return response.data;
});

export const createQuiz = createAsyncThunk(
  'quizzes/create',
  async (quizData: Omit<Quiz, '_id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  }
);

export const updateQuiz = createAsyncThunk(
  'quizzes/update',
  async ({ id, quizData }: { id: string; quizData: Partial<Omit<Quiz, '_id' | 'userId' | 'createdAt' | 'updatedAt'>> }) => {
    const response = await api.patch(`/quizzes/${id}`, quizData);
    return response.data;
  }
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/delete',
  async (id: string) => {
    await api.delete(`/quizzes/${id}`);
    return id;
  }
);

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quizzes';
      })
      // Create quiz
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.push(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create quiz';
      })
      // Update quiz
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.quizzes.findIndex((q) => q._id === action.payload._id);
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update quiz';
      })
      // Delete quiz
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete quiz';
      });
  },
});

export default quizSlice.reducer;