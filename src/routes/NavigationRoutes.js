import { useDispatch, useSelector } from 'react-redux';
import AdminRoutes from './AdminRoutes.js';
import GlobalRoutes from './GlobalRoutes.js';
import { useNavigate } from 'react-router-dom';
import { userLogoutNotAdmin } from '../store/storeIndex.js';

const NavigationRoutes = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const userRole = useSelector((state) => state.user.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const routes = isLogin ? (
    userRole === 'Admin' ? (
      <AdminRoutes />
    ) : (
      dispatch(userLogoutNotAdmin(navigate))
    )
  ) : (
    <GlobalRoutes />
  );
  return routes;
};
export default NavigationRoutes;
