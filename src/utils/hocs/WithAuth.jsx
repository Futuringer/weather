import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../api/authApiSlice';
import { UnauthError } from '../../components/UnauthError/UnauthError';

export const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('authToken');
    const value = token ? JSON.parse(token) : null;
    const username = value?.username;

    useEffect(() => {
      if (username) {
        dispatch(setUser(username));
      }
    }, [dispatch, username]);

    // Если токен отсутствует то отрисовываем на странице компонент ошибки
    if (!token) {
      return <UnauthError />;
    }

    // Если токен есть, рендерим обернутый компонент
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};
