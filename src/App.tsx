import { Routes, Route, Navigate } from 'react-router-dom';
import { VacanciesPage } from './pages/VacanciesPage';
import { JobPage } from './pages/JobPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
      <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />}
      />
      <Route path="/hh-frontend-tabs/" element={<Navigate to="/vacancies/moscow" replace/>} />
      <Route path="/vacancies/:citySlug" element={<VacanciesPage />} />
      <Route path="/vacancies/job/:id" element={<JobPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
