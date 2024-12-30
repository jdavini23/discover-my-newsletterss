import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userPreferencesApi } from '@/services/api/userPreferencesApi';
import { UserPreferences, UpdateUserPreferencesRequest } from '@/types/userPreferences';

const defaultPreferences: UserPreferences = {
  userId: '',
  interests: [],
  newsletterSubscriptions: [],
  notificationSettings: {
    email: true,
    push: false,
    sms: false
  }
};

export const useUserPreferences = () => {
  const queryClient = useQueryClient();

  const preferences = useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => userPreferencesApi.getUserPreferences(''),
    initialData: defaultPreferences,
    retry: 1,
  });

  const updatePreferences = useMutation({
    mutationFn: (data: UpdateUserPreferencesRequest) => {
      const { userId, ...preferences } = data;
      return userPreferencesApi.updateUserPreferences(userId, {
        ...preferences,
        notificationSettings: preferences.notificationSettings ?? defaultPreferences.notificationSettings
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const addFavorite = useMutation({
    mutationFn: (params: { userId: string; newsletterId: string }) => {
      const currentPreferences = queryClient.getQueryData(['userPreferences']) as UserPreferences;
      return userPreferencesApi.updateUserPreferences(params.userId, {
        ...currentPreferences,
        newsletterSubscriptions: [...currentPreferences.newsletterSubscriptions, params.newsletterId]
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const removeFavorite = useMutation({
    mutationFn: (params: { userId: string; newsletterId: string }) => {
      const currentPreferences = queryClient.getQueryData(['userPreferences']) as UserPreferences;
      return userPreferencesApi.updateUserPreferences(params.userId, {
        ...currentPreferences,
        newsletterSubscriptions: currentPreferences.newsletterSubscriptions.filter(id => id !== params.newsletterId)
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const updateInterests = useMutation({
    mutationFn: (params: { userId: string; interests: string[] }) => 
      userPreferencesApi.updateUserPreferences(params.userId, { interests: params.interests }),
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  const updateNotificationSettings = useMutation({
    mutationFn: (params: { userId: string; settings: UserPreferences['notificationSettings'] }) => 
      userPreferencesApi.updateUserPreferences(params.userId, { notificationSettings: params.settings }),
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
    },
  });

  return {
    preferences: preferences.data,
    updatePreferences: updatePreferences.mutate,
    addFavorite: addFavorite.mutate,
    removeFavorite: removeFavorite.mutate,
    updateInterests: updateInterests.mutate,
    updateNotificationSettings: updateNotificationSettings.mutate,
    get: userPreferencesApi.getUserPreferences,
    update: userPreferencesApi.updateUserPreferences
  };
};
