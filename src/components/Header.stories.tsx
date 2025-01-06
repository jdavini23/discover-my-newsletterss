import React from 'react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

export const DefaultHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

export const LoggedInHeader = () => (
  <BrowserRouter>
    <Header isLoggedIn={true} />
  </BrowserRouter>
);

export const AdminHeader = () => (
  <BrowserRouter>
    <Header isAdmin={true} />
  </BrowserRouter>
);

DefaultHeader.ladle = {
  name: 'Default Header',
  description: 'Header in default state',
};

LoggedInHeader.ladle = {
  name: 'Logged In Header',
  description: 'Header for authenticated users',
};

AdminHeader.ladle = {
  name: 'Admin Header',
  description: 'Header with admin navigation options',
};
