import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { VacanciesPage } from './pages/VacanciesPage';
import { JobPage } from './pages/JobPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFoundPage />}>
      <Route index element={<Navigate to="/vacancies/moscow" replace />} />
      <Route
        path="vacancies"
        element={<Navigate to="/vacancies/moscow" replace />}
      />
      <Route path="vacancies/:citySlug" element={<VacanciesPage />} />
      <Route path="vacancies/job/:id" element={<JobPage />} />
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  ),

);