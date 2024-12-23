import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userPreferencesApi } from '../services/api/userPreferencesApi';
import type { UpdateUserPreferencesRequest, UserPreferences } from '../types/userPreferences';

// Default preferences used when data is loading or unavailable
const defaultPreferences: UserPreferences = {
  id: '',
  favoriteNewsletters: [],
  interests: [],
  notificationSettings: {
    email: true,
    push: false,
    frequency: 'weekly',
  },
};

export const useUserPreferences = () => {
  const queryClient = useQueryClient();

  const preferences = useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => userPreferencesApi.get(),
    initialData: defaultPreferences,
    retry: 1,
  });

  const updatePreferences = useMutation({
    mutationFn: (data: UpdateUserPreferencesRequest) => userPreferencesApi.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const addFavorite = useMutation({
    mutationFn: userPreferencesApi.addFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: userPreferencesApi.removeFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const updateInterests = useMutation({
    mutationFn: userPreferencesApi.updateInterests,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const updateNotificationSettings = useMutation({
    mutationFn: userPreferencesApi.updateNotificationSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  return {
    preferences,
    updatePreferences,
    addFavorite,
    removeFavorite,
    updateInterests,
    updateNotificationSettings,
  };
};
