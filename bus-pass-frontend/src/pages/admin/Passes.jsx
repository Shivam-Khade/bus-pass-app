import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Group,
  Loader,
  Center,
  Button,
  ThemeIcon,
  Avatar,
  Box
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBus, IconCalendar, IconUser, IconId, IconDownload } from "@tabler/icons-react";
import "./Passes.css";

const Passes = () => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/api/pass/admin/all`);

      if (response.ok) {
        const data = await response.json();
        // Filter only approved passes
        const activePasses = data.filter((app) => app.status === "APPROVED");
        setPasses(activePasses);
      }
    } catch (error) {
      console.error("Error fetching passes:", error);
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to fetch passes",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPassColor = (type) => {
    return type === "STUDENT" ? "cyan" : "violet";
  };

  if (loading) {
    return (
      <Center style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className="passes-container">
      <Container size="xl">
        <Title order={1} mb="xl" mt={50}>
          Active Bus Passes
        </Title>

        {passes.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {passes.map((pass) => (
              <Card key={pass.id} shadow="sm" padding="lg" radius="md" className="pass-card" withBorder>
                <Group justify="space-between" mb="md">
                  <Badge
                    size="lg"
                    variant="gradient"
                    gradient={{ from: getPassColor(pass.passType), to: 'blue', deg: 90 }}
                  >
                    {pass.passType} PASS
                  </Badge>
                  <IconBus size={24} color="#868e96" />
                </Group>

                <Group mb="md">
                  <Avatar color="blue" radius="xl" size="lg">
                    <IconUser size={24} />
                  </Avatar>
                  <div>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>User ID</Text>
                    <Text fw={700} size="lg">{pass.userId}</Text>
                  </div>
                </Group>

                <Card.Section inheritPadding py="xs" bg="gray.0" style={{ marginTop: "1rem" }}>
                  <Group gap="xs">
                    <IconId size={16} color="gray" />
                    <Text size="sm" c="dimmed">Pass ID: {pass.id}</Text>
                  </Group>
                </Card.Section>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Center p="xl" style={{ flexDirection: 'column', gap: '1rem' }}>
            <ThemeIcon size={60} radius="circle" color="gray" variant="light">
              <IconBus size={30} />
            </ThemeIcon>
            <Text c="dimmed" size="lg">No active passes found</Text>
            <Text c="dimmed" size="sm">Approve applications to generate passes</Text>
          </Center>
        )}
      </Container>
    </div>
  );
};

export default Passes;