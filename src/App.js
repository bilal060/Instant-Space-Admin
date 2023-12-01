import { Suspense, useEffect } from 'react';
import './App.css';
import './assets/css/notification.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Loading from './shared/Loading';
import NavigationRoutes from './routes/NavigationRoutes';
import { useSelector } from 'react-redux';
import Socket from './Socket';
import ErrorBoundary from './shared/ErrorBoundary';
import ErrorBoundaryAlert from './shared/ErrorBoundaryAlert';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

const AOS = require('aos');

function App() {
  const userId = useSelector((state) => state.user.user._id);
  useEffect(() => {
    Socket.emit('join', { userId });
    Socket.on('getUsers', () => {});
  }, [userId]);

  useEffect(() => {
    AOS.init(
      {
        offset: 200,
        duration: 800,
        easing: 'ease-in-out-sine',
        delay: 200,
        mirror: true
      },
      []
    );
  });
  AOS.init();

  return (
    <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
      <Suspense fallback={<Loading />}>
        <ProSidebarProvider>
          <Router>
            <NavigationRoutes />
          </Router>
        </ProSidebarProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
