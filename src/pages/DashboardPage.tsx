import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { fetchQuizzes } from 'store/slices/quizSlice';
import { fetchAnnouncements } from 'store/slices/announcementSlice';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { quizzes, loading: quizzesLoading } = useAppSelector((state) => state.quizzes);
  const { announcements, loading: announcementsLoading } = useAppSelector((state) => state.announcements);

  useEffect(() => {
    // Fetch data when dashboard loads
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>

      <Grid container spacing={3}>
        {/* Upcoming Quizzes Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('dashboard.upcomingQuizzes')}
              </Typography>
              <Button size="small" onClick={() => navigate('/quizzes')}>
                {t('common.viewAll')}
              </Button>
            </Box>
            
            {quizzesLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress />
              </Box>
            ) : quizzes.length > 0 ? (
              quizzes.slice(0, 3).map((quiz) => (
                <Card key={quiz._id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => navigate('/quizzes')}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {quiz.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {quiz.questions.length} questions
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                {t('quiz.noQuizzes')}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Announcements Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('dashboard.recentAnnouncements')}
              </Typography>
              <Button size="small" onClick={() => navigate('/announcements')}>
                {t('common.viewAll')}
              </Button>
            </Box>
            
            {announcementsLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress />
              </Box>
            ) : announcements.length > 0 ? (
              announcements.slice(0, 3).map((announcement) => (
                <Card key={announcement._id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => navigate('/announcements')}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {announcement.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {announcement.content}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                {t('announcement.noAnnouncements')}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
