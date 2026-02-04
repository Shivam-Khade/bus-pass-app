import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Card,
  Badge,
  Group,
  Table,
  Button,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import "./Applications.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/api/pass/admin/all`);

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to fetch applications",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/api/pass/admin/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        notifications.show({
          color: "green",
          title: "Success",
          message: `Application ${newStatus.toLowerCase()} successfully`,
        });
        fetchApplications();
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to update status",
      });
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

  if (loading) {
    return (
      <Center style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <div className="applications-container">
      <Container size="xl">
        <Title order={1} mb="xl" mt={50}>
          Manage Applications
        </Title>

        <Card shadow="md" padding="lg" radius="md">
          <div style={{ overflowX: "hidden" }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>User ID</Table.Th>
                  <Table.Th>Pass Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {applications.map((app) => (
                  <Table.Tr key={app.id}>
                    <Table.Td>{app.id}</Table.Td>
                    <Table.Td>{app.userId}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color="violet">
                        {app.passType}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(app.status)} variant="filled">
                        {app.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        {app.status === "PENDING" && (
                          <>
                            <Button
                              size="xs"
                              color="green"
                              onClick={() => updateStatus(app.id, "APPROVED")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="xs"
                              color="red"
                              onClick={() => updateStatus(app.id, "REJECTED")}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {app.status !== "PENDING" && (
                          <Button
                            size="xs"
                            variant="subtle"
                            onClick={() => updateStatus(app.id, "PENDING")}
                          >
                            Reset
                          </Button>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          {applications.length === 0 && (
            <Center p="xl">
              <Text c="dimmed">No applications found</Text>
            </Center>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Applications;