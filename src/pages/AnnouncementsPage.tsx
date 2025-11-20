import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { fetchAnnouncements } from 'store/slices/announcementSlice';
import { format } from 'date-fns';

const AnnouncementsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector((state) => state.announcements);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('nav.announcements')}
      </Typography>

      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <Card key={announcement._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{announcement.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {announcement.content}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                {t('announcement.date')}: {format(new Date(announcement.createdAt), 'PPP')}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          {t('announcement.noAnnouncements')}
        </Typography>
      )}
    </Box>
  );
};

export default AnnouncementsPage;
