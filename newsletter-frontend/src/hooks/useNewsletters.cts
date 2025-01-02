import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsletterApi } from '../services/api/newsletterApi';
import type { NewsletterSearchFilters } from '../types/newsletter';

export const useNewsletterSearch = (filters: NewsletterSearchFilters) => 
  useQuery({
    queryKey: ['newsletters', 'search', filters],
    queryFn: () => newsletterApi.search(filters),
  });

export const useNewsletter = (id: string) => 
  useQuery({
    queryKey: ['newsletter', id],
    queryFn: () => newsletterApi.getById(id),
  });

export const useRecommendedNewsletters = () => 
  useQuery({
    queryKey: ['newsletters', 'recommended'],
    queryFn: () => newsletterApi.getRecommended(),
  });

export const useFeaturedNewsletters = () => 
  useQuery({
    queryKey: ['newsletters', 'featured'],
    queryFn: () => newsletterApi.getFeatured(),
  });

export const useNewsletterSubscription = () => {
  const queryClient = useQueryClient();

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

  return { subscribe, unsubscribe };
};
