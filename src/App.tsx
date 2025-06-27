import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BrandDashboard from './pages/BrandDashboard/BrandDashboard';
import InfluencerDashboard from './pages/InfluencerDashboard/InfluencerDashboard';
import BrandProfile from './pages/ProfilePage/BrandProfilePage';
import InfluencerProfile from './pages/ProfilePage/InfluencerProfilePage';
import SearchPage from './pages/SearchPage/SearchPage';
import CampaignPage from './pages/CampaignPage/CampaignPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import HelpPage from './pages/HelpPage/HelpPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="brand/dashboard" element={<BrandDashboard />} />
          <Route path="influencer/dashboard" element={<InfluencerDashboard />} />
          <Route path="brand/profile/:id" element={<BrandProfile />} />
          <Route path="influencer/profile/:id" element={<InfluencerProfile />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="campaign/:id" element={<CampaignPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;