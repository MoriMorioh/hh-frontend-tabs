import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Group,
  Image,
  Box,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import styles from '../App.module.css';
import SadCat from '../img/sad-cat.gif'

export function NotFoundPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <Container size="sm" mt={60} pb="xl">
        <Paper radius="lg" p="xl" bg="white">
          <Group justify="space-between" align="center" mb="md">
            <Box style={{ maxWidth: '70%' }}>
              <Title order={1} size="h2" fw={700} lh={1.2}>
                Упс! Такой страницы <br /> не существует
              </Title>
              <Text size="md" mt="xs">
                Давайте перейдём к началу.
              </Text>
            </Box>
            <Button
              justify='center'
              component={Link}
              to="/vacancies/moscow"
              color="blue"
              radius="sm"
              size="sm"
            >
              На главную
            </Button>
          </Group>
          <Box mt="lg" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src={SadCat}
              alt="404 Cat Gif"
              radius="md"
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
