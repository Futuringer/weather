import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
