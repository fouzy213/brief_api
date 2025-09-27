import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './component/pages/HomePage';
import SeriePage from './component/pages/SeriePage';
import './index.css';

const router = createBrowserRouter([
  {
    element: <App />, 
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/series", element: <SeriePage /> },
    ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);




