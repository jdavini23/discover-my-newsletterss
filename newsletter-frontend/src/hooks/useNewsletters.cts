import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsletterApi } from '../services/api/newsletterApi';
import type { NewsletterSearchFilters } from '../types/newsletter';

export const useNewsletters = () => {
  const queryClient = useQueryClient();

  const search = (filters: NewsletterSearchFilters) =>
    useQuery({
      queryKey: ['newsletters', 'search', filters],
      queryFn: () => newsletterApi.search(filters),
    });

  const getNewsletter = (id: string) =>
    useQuery({
      queryKey: ['newsletter', id],
      queryFn: () => newsletterApi.getById(id),
    });

  const getRecommended = () =>
    useQuery({
      queryKey: ['newsletters', 'recommended'],
      queryFn: () => newsletterApi.getRecommended(),
    });

  const getFeatured = () =>
    useQuery({
      queryKey: ['newsletters', 'featured'],
      queryFn: () => newsletterApi.getFeatured(),
    });

  const subscribe = useMutation({
    mutationFn: newsletterApi.subscribe,
    onSuccess: (_, newsletterId) => {
      queryClient.invalidateQueries({ queryKey: ['newsletter', newsletterId] });
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });
    },
  });

  const unsubscribe = useMutation({
    mutationFn: newsletterApi.unsubscribe,
    onSuccess: (_, newsletterId) => {
      queryClient.invalidateQueries({ queryKey: ['newsletter', newsletterId] });
      queryClient.invalidateQueries({ queryKey: ['newsletters'] });
    },
  });

  return {
    search,
    getNewsletter,
    getRecommended,
    getFeatured,
    subscribe,
    unsubscribe,
  };
};
