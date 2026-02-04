import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Stack,
  Loader,
  Center,
  SimpleGrid,
} from "@mantine/core";
import { IconTicket, IconCalendar, IconCheck, IconClock, IconX } from "@tabler/icons-react";
import { getCurrentUser } from "../../api/auth";
import "./MyPass.css";

const MyPass = () => {
  const user = getCurrentUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/api/pass/my-applications/${user.id}`);

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "green";
      case "PENDING":
        return "yellow";
      case "REJECTED":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <IconCheck size={16} />;
      case "PENDING":
        return <IconClock size={16} />;
      case "REJECTED":
        return <IconX size={16} />;
      default:
        return null;
    }
  };

  const getPassPrice = (passType) => {
    // 20% Discount for Student
    const isStudent = user?.role === "STUDENT";
    const discount = isStudent ? 0.8 : 1.0;

    switch (passType) {
      case "MONTHLY":
        return `₹${500 * discount}`;
      case "QUARTERLY":
        return `₹${1200 * discount}`;
      case "YEARLY":
      case "ANNUAL":
        return `₹${4000 * discount}`;
      default:
        return "N/A";
    }
  };

  if (loading) {
    return (
      <Center style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className="my-pass-container">
      <Container size="lg">
        <div className="page-header">
          <Group gap="sm" mb="xl">
            <div className="header-icon">
              <IconTicket size={40} />
            </div>
            <div>
              <Title order={1}>My Bus Passes</Title>
              <Text c="dimmed" size="sm">
                View and manage your bus pass applications
              </Text>
            </div>
          </Group>
        </div>

        {applications.length === 0 ? (
          <Card shadow="sm" padding="xl" radius="md" className="empty-state">
            <Center>
              <Stack align="center" gap="md">
                <IconTicket size={64} color="#ccc" />
                <Title order={3} c="dimmed">
                  No Applications Yet
                </Title>
                <Text c="dimmed" size="sm">
                  You haven't applied for any bus passes yet.
                </Text>
              </Stack>
            </Center>
          </Card>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
            {applications.map((app, index) => (
              <Card
                key={app.id}
                shadow="md"
                padding="lg"
                radius="md"
                className="pass-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="pass-card-header">
                  <Group justify="space-between" mb="md">
                    <Badge
                      color={getStatusColor(app.status)}
                      variant="filled"
                      leftSection={getStatusIcon(app.status)}
                    >
                      {app.status}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      ID: #{app.id}
                    </Text>
                  </Group>
                </div>

                <div className="pass-card-body">
                  <Stack gap="md">
                    <div>
                      <Text size="xs" c="dimmed" mb={4}>
                        Pass Type
                      </Text>
                      <Text size="lg" fw={700} c="violet">
                        {app.passType}
                      </Text>
                    </div>

                    <Group justify="space-between">
                      <div>
                        <Text size="xs" c="dimmed" mb={4}>
                          Price
                        </Text>
                        <Text size="md" fw={600}>
                          {getPassPrice(app.passType)}
                        </Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed" mb={4}>
                          User ID
                        </Text>
                        <Text size="md" fw={600}>
                          {app.userId}
                        </Text>
                      </div>
                    </Group>

                    {app.status === "APPROVED" && (
                      <div className="approved-badge">
                        <Group gap="xs">
                          <IconCheck size={18} color="white" />
                          <Text size="sm" c="white" fw={600}>
                            Active Pass
                          </Text>
                        </Group>
                      </div>
                    )}

                    {app.status === "PENDING" && (
                      <Text size="xs" c="dimmed" ta="center" mt="sm">
                        Your application is under review
                      </Text>
                    )}
                  </Stack>
                </div>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </div>
  );
};

export default MyPass;