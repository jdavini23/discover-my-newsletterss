export const useRouter = () => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  reload: vi.fn(),
  prefetch: vi.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
});

export const Router = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  reload: vi.fn(),
  prefetch: vi.fn(),
};
