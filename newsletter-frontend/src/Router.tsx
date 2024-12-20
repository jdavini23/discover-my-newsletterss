import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import App from './App';

// Placeholder pages
const Home = () => <div>Home Page</div>;
const Newsletters = () => <div>Newsletters Page</div>;
const Profile = () => <div>User Profile</div>;

const Router: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="newsletters" element={<Newsletters />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default Router;
