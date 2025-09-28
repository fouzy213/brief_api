import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './component/pages/HomePage';
import SeriePage from './component/pages/SeriePage';
import './index.css';
import MoviePage from './component/pages/MoviePage';
import MoviebyIdPage from './component/pages/MovieById';
import SerieByIdPage from './component/pages/SerieByIdPage';

const router = createBrowserRouter([
  {
    element: <App />, 
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/series", element: <SeriePage /> },
      {path:"/movies",element:<MoviePage/>},
      {path:`/movie/:id`,element:<MoviebyIdPage/>},
      {path:`/serie/:id`,element:<SerieByIdPage/>},

    ],
  },
]);




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);




