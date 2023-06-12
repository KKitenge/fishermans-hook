import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import PostsPage from './components/posts/PostsPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ProfilePage from './components/profile/ProfilePage';
import FriendsPage from './components/friends';
// import Messages from './components/messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HamburgerMenu from './components/common/hamburgermenu';
import { Card, CardContent } from '@mui/material';
import AuthService from './utils/auth';
import { AppStateProvider } from './app-state';
import Footer from './components/common/Footer';

function App() {

  return (

    <AppStateProvider>
      <Router>
        <div>
          <HamburgerMenu />
          <Card className="container">
            <CardContent>
              <ToastContainer />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<ProtectedRoutes />} />
              </Routes>
            </CardContent>
          </Card>
          <Footer />
        </div>

      </Router>
    </AppStateProvider>
  );
}

function ProtectedRoutes() {
  const isAuthenticated = AuthService.loggedIn();
  const history = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      history("/login")
    }
  })
  
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* <Route path="/messages" element={<Messages />} /> */}
      <Route path="/friends" element={<FriendsPage />} />
    </Routes>);
}

export default App;
