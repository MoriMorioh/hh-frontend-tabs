import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store/store';
import App from './App';
import { VacanciesPage } from './pages/VacanciesPage';
import { JobPage } from './pages/JobPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navigate } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#EDF2FF',
      '#DBE4FF',
      '#BAC8FF',
      '#91A7FF',
      '#748FFC',
      '#5C7CFA',
      '#4C6EF5',
      '#4263EB',
      '#3B5BDB',
      '#364FC7',
    ],
  },
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <Navigate to="/vacancies/moscow" replace />,
        },
        {
          path: 'vacancies',
          element: <Navigate to="/vacancies/moscow" replace />,
        },
        {
          path: 'vacancies/:citySlug',
          element: <VacanciesPage />,
        },
        {
          path: 'vacancies/job/:id',
          element: <JobPage />,
        },
        {
          path: '404',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);