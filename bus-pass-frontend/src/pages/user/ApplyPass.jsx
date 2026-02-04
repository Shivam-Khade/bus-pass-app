import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Select,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconTicket, IconArrowLeft } from "@tabler/icons-react";
import { getCurrentUser } from "../../api/auth";
import "./ApplyPass.css";

const ApplyPass = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    passType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.passType) {
      notifications.show({
        color: "red",
        title: "Validation Error",
        message: "Please select a pass type",
      });
      return;
    }

    setLoading(true);

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";

      const response = await fetch(`${BASE_URL}/api/pass/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          passType: form.passType,
          routeId: 1, // Default route
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to submit application");
      }

      notifications.show({
        color: "green",
        title: "Success! 🎉",
        message: "Your bus pass application has been submitted successfully!",
      });

      setForm({
        passType: "",
      });

      setTimeout(() => {
        navigate("/user/my-pass");
      }, 1500);
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error.message || "Failed to submit application",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-pass-container">
      <Container size="md">
        <div className="page-header">
          <Group gap="sm" mb="xl">
            <div className="header-icon">
              <IconTicket size={40} />
            </div>
            <div>
              <Title order={1}>Apply for Bus Pass</Title>
              <Text c="dimmed" size="sm">
                Select your preferred pass type to get started
              </Text>
            </div>
          </Group>
        </div>

        <Card shadow="md" padding="xl" radius="md" className="application-form">
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <Select
                label="Pass Type"
                placeholder="Select pass type"
                required
                size="md"
                data={[
                  {
                    value: "MONTHLY",
                    label: user?.role === "STUDENT"
                      ? "Monthly Pass - ₹400/month (20% Discount)"
                      : "Monthly Pass - ₹500/month"
                  },
                  {
                    value: "QUARTERLY",
                    label: user?.role === "STUDENT"
                      ? "Quarterly Pass - ₹960/3 months (20% Discount)"
                      : "Quarterly Pass - ₹1,200/3 months"
                  },
                  {
                    value: "YEARLY",
                    label: user?.role === "STUDENT"
                      ? "Annual Pass - ₹3,200/year (20% Discount)"
                      : "Annual Pass - ₹4,000/year"
                  },
                ]}
                value={form.passType}
                onChange={(value) => setForm({ ...form, passType: value })}
                styles={{
                  input: { fontSize: "16px" }
                }}
              />

              <Group justify="space-between" mt="xl">
                <Button
                  variant="subtle"
                  leftSection={<IconArrowLeft size={18} />}
                  onClick={() => navigate("/user")}
                  disabled={loading}
                >
                  Back to Dashboard
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  size="md"
                  leftSection={<IconTicket size={18} />}
                  gradient={{ from: "violet", to: "purple", deg: 135 }}
                  variant="gradient"
                >
                  Submit Application
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        <Card shadow="sm" padding="lg" mt="xl" radius="md" className="info-card">
          <Title order={4} mb="md" c="violet">
            📋 Important Information
          </Title>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              ✓ Processing time: 2-3 business days
            </Text>
            <Text size="sm" c="dimmed">
              ✓ You will be notified via email once approved
            </Text>
            <Text size="sm" c="dimmed">
              ✓ Make sure all information is accurate
            </Text>
            <Text size="sm" c="dimmed">
              ✓ Payment required after approval
            </Text>
          </Stack>
        </Card>
      </Container>
    </div>
  );
};

export default ApplyPass;