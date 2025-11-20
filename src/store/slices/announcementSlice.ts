import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/api';
import { Announcement } from 'types';

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async () => {
    const response = await api.get('/announcements');
    return response.data;
  }
);

export const createAnnouncement = createAsyncThunk(
  'announcements/create',
  async (announcementData: Omit<Announcement, '_id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/announcements', announcementData);
    return response.data;
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcements/update',
  async ({ id, announcementData }: { id: string; announcementData: Partial<Omit<Announcement, '_id' | 'userId' | 'createdAt' | 'updatedAt'>> }) => {
    const response = await api.patch(`/announcements/${id}`, announcementData);
    return response.data;
  }
);

export const deleteAnnouncement = createAsyncThunk(
  'announcements/delete',
  async (id: string) => {
    await api.delete(`/announcements/${id}`);
    return id;
  }
);

const announcementSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch announcements
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch announcements';
      })
      // Create announcement
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements.push(action.payload);
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create announcement';
      })
      // Update announcement
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.announcements.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update announcement';
      })
      // Delete announcement
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = state.announcements.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete announcement';
      });
  },
});

export default announcementSlice.reducer;