import * as React from 'react';

// Define the shape of the context state
interface AppContextType {
  user: { id: string | null; name: string | null };
  setUser: React.Dispatch<React.SetStateAction<{ id: string | null; name: string | null }>>;
}

// Create the context with a default value
const AppContext = React.createContext<AppContextType>({
  user: { id: null, name: null },
  setUser: () => {},
});

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<{ id: string | null; name: string | null }>({ id: null, name: null });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
