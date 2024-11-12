import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { checkAuth } from '../redux/slices/userSlice';
import { dataStatus } from '../types/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedUserRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const candidates = useAppSelector((state: RootState) => state.candidates)
    const navigator = useNavigate()
useEffect(() => {
    dispatch(checkAuth())
},[])

  return (<>
      {user.isAuthenticated && user.user && user.status === dataStatus.SUCCESS && children}
      {!user.isAuthenticated && user.status === dataStatus.FAILED && navigator("/login")}
      {user.status === dataStatus.LOADING && <h1>Loading...</h1>}  
  </>

  )
  
};
