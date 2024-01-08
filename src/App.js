import { Suspense, useEffect } from 'react';
import './App.css';
import './assets/css/notification.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Loading from './shared/Loading';
import NavigationRoutes from './routes/NavigationRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Socket from './Socket';
import ErrorBoundary from './shared/ErrorBoundary';
import ErrorBoundaryAlert from './shared/ErrorBoundaryAlert';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import { setSocket } from './store/storeIndex';

const AOS = require('aos');

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const User = useSelector((state) => state.user.user);
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) return;
    dispatch(setSocket(Socket));
  }, [isLogin, dispatch, Socket]);

  useEffect(() => {
    if (socket === null || !isLogin) return;
    socket.emit('addNewUser', User._id);
  }, [isLogin, socket, User._id]);

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
