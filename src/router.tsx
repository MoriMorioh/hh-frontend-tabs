import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { VacanciesPage } from "./pages/VacanciesPage";
import { JobPage } from "./pages/JobPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} errorElement={<NotFoundPage />} />
      <Route path="/vacancies" element={<Navigate to="/vacancies/moscow" replace />} />
      <Route path="/hh-frontend-tabs/" element={<Navigate to="/vacancies/moscow" replace/>} />
      <Route path="/vacancies/:citySlug" element={<VacanciesPage />} />
      <Route path="/vacancies/job/:id" element={<JobPage />}  errorElement={<NotFoundPage />}/>
    </>
),
 { basename: "/hh-frontend-tabs" }
);