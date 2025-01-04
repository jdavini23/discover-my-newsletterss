interface SubscriptionsState {
  subscriptions: Newsletter[];
  isLoading: boolean;
  error: string | null;
  fetchSubscriptions: (userId: string) => Promise<void>;
  unsubscribeNewsletter: (newsletterId: string) => Promise<void>;
}

const useSubscriptionsStore = create<SubscriptionsState>(
  devtools(
    (set, get) => ({
      subscriptions: [],
      isLoading: false,
      error: null,

      fetchSubscriptions: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const subscriptions = await NewsletterService.fetchUserSubscriptions(userId);
          set({ subscriptions, isLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch subscriptions';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },

      unsubscribeNewsletter: async (newsletterId: string) => {
        const { subscriptions } = get();
        try {
          await NewsletterService.unsubscribeNewsletter(newsletterId);

          // Optimistically remove the newsletter from subscriptions
          const updatedSubscriptions = subscriptions.filter(
            newsletter => newsletter.id !== newsletterId
          );

          set({ subscriptions: updatedSubscriptions });
          toast.success('Successfully unsubscribed from newsletter');
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to unsubscribe from newsletter';

          toast.error(errorMessage);
        }
      },
    }),
    { name: 'SubscriptionsStore' }
  ) as StateCreator<SubscriptionsState, [], []>
);

export default useSubscriptionsStore;
