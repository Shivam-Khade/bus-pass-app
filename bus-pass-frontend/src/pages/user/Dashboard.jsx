import { Container, Title, Text, SimpleGrid, Card, Group } from "@mantine/core";
import { IconTicket, IconClock, IconShieldCheck } from "@tabler/icons-react";
import "./Dashboard.css";
import formImg from '../../assets/form_img.avif';
import approveImg from '../../assets/approve_img.avif';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Container size="lg">
          <div className="hero-content">
            <Title order={1} className="hero-title">
              Welcome to Bus Pass Management
            </Title>
            <Text size="xl" c="gray.3" className="hero-subtitle">
              Your one-stop solution for hassle-free bus pass applications
            </Text>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container size="lg" style={{ marginTop: "3rem" }}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          <Card shadow="md" padding="xl" className="feature-card">
            <Group justify="center" mb="md">
              <div className="icon-wrapper">
                <IconTicket size={48} stroke={1.5} />
              </div>
            </Group>
            <Title order={3} ta="center" mb="sm">
              Easy Application
            </Title>
            <Text ta="center" c="dimmed">
              Apply for your bus pass in just a few simple steps. Quick and convenient process.
            </Text>
          </Card>

          <Card shadow="md" padding="xl" className="feature-card">
            <Group justify="center" mb="md">
              <div className="icon-wrapper">
                <IconClock size={48} stroke={1.5} />
              </div>
            </Group>
            <Title order={3} ta="center" mb="sm">
              Fast Processing
            </Title>
            <Text ta="center" c="dimmed">
              Get your bus pass approved quickly. Track your application status in real-time.
            </Text>
          </Card>

          <Card shadow="md" padding="xl" className="feature-card">
            <Group justify="center" mb="md">
              <div className="icon-wrapper">
                <IconShieldCheck size={48} stroke={1.5} />
              </div>
            </Group>
            <Title order={3} ta="center" mb="sm">
              Secure & Reliable
            </Title>
            <Text ta="center" c="dimmed">
              Your data is safe with us. Secure payment and verification process.
            </Text>
          </Card>
        </SimpleGrid>
      </Container>

      {/* Image Section - You can add your image URLs here */}
      <Container size="lg" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <Title order={2} ta="center" mb="xl">
          How It Works
        </Title>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <div className="image-card">
            <img
              src={formImg}
              alt="Apply for pass"
              className="dashboard-image"
            />
            <Text ta="center" mt="md" fw={500} size="lg">
              Step 1: Fill Application Form
            </Text>
          </div>
          <div className="image-card">
            <img
              src={approveImg}
              alt="Get approved"
              className="dashboard-image"
            />
            <Text ta="center" mt="md" fw={500} size="lg">
              Step 2: Get Approved & View
            </Text>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default UserDashboard;