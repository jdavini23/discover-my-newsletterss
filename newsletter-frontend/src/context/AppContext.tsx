import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state
interface AppContextType {
  user: { id: string | null; name: string | null };
  setUser: (user: { id: string | null; name: string | null }) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType>({
  user: { id: null, name: null },
  setUser: () => {},
});

// Create a provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({ id: null, name: null });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
