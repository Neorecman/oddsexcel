import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Analysis from './components/Analysis';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import AgeVerification from './components/AgeVerification';
import AnalysesPage from './components/AnalysesPage';
import About from './components/About';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import TelegramButton from './components/TelegramButton';
import ConnectionStatus from './components/ConnectionStatus';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const initializeApp = useCallback(async (mounted: boolean) => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (currentSession && !localStorage.getItem('rememberedCredentials')) {
        await supabase.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
        if (!mounted) return;
        setSession(null);
      } else if (currentSession) {
        if (!mounted) return;
        setSession(currentSession);
        
        // Fetch user role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentSession.user.id)
          .single();
          
        if (!error && profile) {
          setUserRole(profile.role);
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Initialization error:', error);
      if (!mounted) return;
      setConnectionError(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      setSession(session);
      
      if (session) {
        // Fetch user role when auth state changes
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (!error && profile) {
          setUserRole(profile.role);
        }
      } else {
        setUserRole(null);
      }
    });

    initializeApp(mounted);

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [initializeApp]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Bağlantı Hatası</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sunucuya bağlanırken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AgeVerification />
        {!window.location.pathname.startsWith('/admin') && <Navbar session={session} />}
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Analysis />
              <Pricing />
            </>
          } />
          <Route path="/analyses" element={
            session ? <AnalysesPage /> : <Navigate to="/login" replace />
          } />
          <Route path="/register" element={
            !session ? <Register /> : <Navigate to="/analyses" replace />
          } />
          <Route path="/register/:plan" element={
            !session ? <Register /> : <Navigate to="/analyses" replace />
          } />
          <Route path="/login" element={
            !session ? <Login /> : <Navigate to="/analyses" replace />
          } />
          <Route path="/payment/:plan" element={
            session ? <Payment /> : <Navigate to="/login" replace />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/*" element={
            session && userRole === 'admin' ? <AdminPanel /> : <Navigate to="/login" replace />
          } />
        </Routes>
        {!window.location.pathname.startsWith('/admin') && <Footer />}
        <ThemeToggle />
        <TelegramButton />
        <ConnectionStatus />
      </div>
    </Router>
  );
}

export default App;