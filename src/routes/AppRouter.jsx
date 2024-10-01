import { Layout } from '../components/layouts/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { withAuth } from '../utils/hocs/WithAuth';

const ProtectedMainPage = withAuth(MainPage);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<ProtectedMainPage />} />
          <Route path="*" element={<ProtectedMainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
