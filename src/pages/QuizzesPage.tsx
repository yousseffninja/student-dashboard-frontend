import React, { useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { fetchQuizzes } from 'store/slices/quizSlice';

const QuizzesPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { quizzes, loading, error } = useAppSelector((state) => state.quizzes);

  useEffect(() => {
    dispatch(fetchQuizzes());
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
        {t('nav.quizzes')}
      </Typography>

      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Card key={quiz._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{quiz.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {quiz.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {quiz.questions.length} {t('common.questions', { count: quiz.questions.length })}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          {t('quiz.noQuizzes')}
        </Typography>
      )}
    </Box>
  );
};

export default QuizzesPage;
