import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  TextInput,
  Button,
  Group,
  Title,
  Pagination,
  Stack,
  Loader,
  Text,
  Grid,
  Box,
  Tabs,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { JobCard } from '../components/JobCard';
import { fetchJobs } from '../store/jobsSlice';
import type { AppDispatch, RootState } from '../store/store';
import styles from '../App.module.css';

const LIMIT = 10;

const CITY_MAP: Record<string, string> = {
  moscow: 'Москва',
  petersburg: 'Санкт-Петербург',
};

export function VacanciesPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();


  if (citySlug && !CITY_MAP[citySlug]) {
    return <Navigate to="/404" replace />;
  }

  const currentCityName = CITY_MAP[citySlug || 'moscow'];

  const { jobs, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.jobs
  );

  const paramSearch = searchParams.get('search') || '';
  const paramSkills = searchParams.get('skills')
    ? searchParams.get('skills')!.split(',')
    : ['JavaScript', 'React', 'Redux', 'Python'];
  const paramPage = Number(searchParams.get('page')) || 1;

  const [search, setSearch] = useState(paramSearch);
  const [activeSearch, setActiveSearch] = useState(paramSearch);
  const [skills, setSkills] = useState<string[]>(paramSkills);
  const [page, setPage] = useState(paramPage);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlSkills = searchParams.get('skills')
      ? searchParams.get('skills')!.split(',')
      : ['JavaScript', 'React', 'Redux', 'Python'];
    const urlPage = Number(searchParams.get('page')) || 1;

    setSearch(urlSearch);
    setActiveSearch(urlSearch);
    setSkills(urlSkills);
    setPage(urlPage);
  }, [searchParams]);

  const updateQueryParams = (newParams: {
    search?: string;
    skills?: string[];
    page?: number;
  }) => {
    const params: Record<string, string> = {};

    const currentSearch =
      newParams.search !== undefined ? newParams.search : activeSearch;
    const currentSkills =
      newParams.skills !== undefined ? newParams.skills : skills;
    const currentPage = newParams.page !== undefined ? newParams.page : page;

    if (currentSearch) params.search = currentSearch;
    if (currentSkills.length > 0) {
      params.skills = currentSkills.join(',');
    }
    if (currentPage > 1) {
      params.page = currentPage.toString();
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(
      fetchJobs({
        search: activeSearch,
        city: currentCityName,
        skills: skills.join(','),
        page,
        limit: LIMIT,
      })
    );
  }, [dispatch, activeSearch, currentCityName, skills, page]);

  const handleSearch = () => {
    setActiveSearch(search);
    setPage(1);
    updateQueryParams({ search, page: 1 });
  };

  const handleTabChange = (value: string | null) => {
    if (value && value !== citySlug) {
      setPage(1);
      const currentQuery = searchParams.toString();
      navigate(`/vacancies/${value}${currentQuery ? `?${currentQuery}` : ''}`);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <Container size="xl" mt="xl">
        <Grid justify="space-between" align="flex-end" mb="xl">
          <Grid.Col span={{ base: 12, md: 5, lg: 3.5 }}>
            <Title order={1} size="h2" fw={700}>
              Список вакансий
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
              по профессии Frontend-разработчик
            </Text>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8, lg: 8.5 }}>
            <Box pl={{ base: 0, md: 'md', lg: 'lg' }}>
              <Group gap="xs" style={{ width: '65%' }}>
                <TextInput
                  placeholder="Должность или название компании"
                  value={search}
                  leftSection={<IconSearch size={18} color="#adb5bd" />}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1 }}
                  radius="md"
                  bg="white"
                />
                <Button onClick={handleSearch} color="blue" radius="md">
                  Найти
                </Button>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4, lg: 3.5 }}>
            <Filters
              skills={skills}
              onSkillsChange={(newSkills) => {
                setSkills(newSkills);
                setPage(1);
                updateQueryParams({ skills: newSkills, page: 1 });
              }}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8, lg: 8.5 }}>
            
            <Tabs style={{ display: 'inline-block' }}
              value={citySlug || 'moscow'}
              onChange={handleTabChange}
              mb="md"
            >
              <Tabs.List>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            
            {isLoading && (
              <Loader size="xl" mx="auto" my="xl" display="block" />
            )}

            {!isLoading && error && (
              <Text c="red" size="lg">
                {error}
              </Text>
            )}

            {!isLoading && !error && jobs.length === 0 && (
              <Text size="lg" c="dimmed" mt="md">
                Вакансии не найдены
              </Text>
            )}

            {!isLoading && !error && jobs.length > 0 && (
              <Stack gap="md">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}

                {totalPages > 1 && (
                  <Group justify="center" mt="xl" mb="xl">
                    <Pagination
                      total={totalPages}
                      value={page}
                      onChange={handlePageChange}
                      withEdges
                      radius="xs"
                      size="sm"
                      styles={{
                        control: {
                          border: '1px solid #dee2e6',
                          backgroundColor: '#ffffff',
                          color: '#212529',
                          fontWeight: 500,
                          '&[data-active]': {
                            backgroundColor: '#ffffff',
                            borderColor: '#adb5bd',
                            color: '#000000',
                            fontWeight: 700,
                          },
                        },
                      }}
                    />
                  </Group>
                )}
              </Stack>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}