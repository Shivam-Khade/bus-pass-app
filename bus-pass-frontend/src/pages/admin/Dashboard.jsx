import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  SimpleGrid,
  Loader,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconClock,
  IconX,
  IconChartBar,
} from "@tabler/icons-react";
import "./Dashboard.css";
import adminImg1 from '../../assets/admin_img1.avif';
import adminImg2 from '../../assets/admin_img2.avif';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/api/pass/admin/all`);

      if (response.ok) {
        const data = await response.json();
        calculateStats(data);
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to fetch statistics",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter((app) => app.status === "PENDING").length,
      approved: data.filter((app) => app.status === "APPROVED").length,
      rejected: data.filter((app) => app.status === "REJECTED").length,
    });
  };

  if (loading) {
    return (
      <Center style={{ minHeight: "60vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* MAIN CONTENT */}
      <Container size="xl" className="admin-dashboard-content" style={{ overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="dashboard-header">
          <Title order={2} mb="md">
            Admin Dashboard
          </Title>
          <Text c="dimmed" size="sm" mb="lg">
            Overview of bus pass system analytics
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
          <Card className="stat-card">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text size="md" c="dimmed" tt="uppercase" fw={700} mb={5}>
                  Total Applications
                </Text>
                <Text size="3rem" fw={900} lh={1}>
                  {stats.total}
                </Text>
              </div>
              <IconChartBar size={50} color="#667eea" stroke={1.5} />
            </Group>
          </Card>


          <Card className="stat-card">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                  Pending
                </Text>
                <Text size="2rem" fw={800} c="yellow" lh={1}>
                  {stats.pending}
                </Text>
              </div>
              <IconClock size={42} color="#fab005" />
            </Group>
          </Card>

          <Card className="stat-card">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                  Approved
                </Text>
                <Text size="2rem" fw={800} c="green" lh={1}>
                  {stats.approved}
                </Text>
              </div>
              <IconCheck size={42} color="#51cf66" />
            </Group>
          </Card>

          <Card className="stat-card">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                  Rejected
                </Text>
                <Text size="2rem" fw={800} c="red" lh={1}>
                  {stats.rejected}
                </Text>
              </div>
              <IconX size={42} color="#ff6b6b" />
            </Group>
          </Card>
        </SimpleGrid>

        <Card shadow="sm" padding="xl" radius="md">
          <Title order={3} mb="lg">
            System Overview
          </Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <div>
              <Text size="sm" c="dimmed" mb={5}>
                Approval Rate
              </Text>
              <Text size="2rem" fw={800} c="green">
                {stats.total > 0
                  ? Math.round((stats.approved / stats.total) * 100)
                  : 0}
                %
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={5}>
                Pending Review
              </Text>
              <Text size="2rem" fw={800} c="yellow">
                {stats.pending} applications
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed" mb={5}>
                Active Passes
              </Text>
              <Text size="2rem" fw={800} c="violet">
                {stats.approved} passes
              </Text>
            </div>
          </SimpleGrid>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;
