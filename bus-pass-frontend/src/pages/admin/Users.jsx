import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Card,
  Badge,
  Table,
  Loader,
  Center,
  Text,
  Button,
  Group,
  ActionIcon,
  Modal
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconAlertTriangle } from "@tabler/icons-react";
import { getCurrentUser } from "../../api/auth";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      // Fetch all users
      const response = await fetch(`${BASE_URL}/admin/users?adminEmail=${currentUser?.email}`);

      if (response.ok) {
        const data = await response.json();
        // Filter only active users
        const activeUsers = data.filter(user => user.active);
        setUsers(activeUsers);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    open();
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8081";
      const response = await fetch(`${BASE_URL}/admin/users/${userToDelete.id}?adminEmail=${currentUser?.email}`, {
        method: "DELETE",
      });

      if (response.ok) {
        notifications.show({
          color: "green",
          title: "Success",
          message: "User deactivated successfully",
        });
        // Remove from list
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        close();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to delete user",
      });
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
    <div className="users-container">
      <Container size="xl">
        <Title order={1} mb="xl" mt={50}>
          Active Users
        </Title>

        <Card shadow="md" padding="lg" radius="md">
          <div style={{ overflowX: "hidden" }}>
            <Table striped highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.id}</Table.Td>
                    <Table.Td>
                      <Text fw={500}>{user.name}</Text>
                    </Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>
                      <Badge color={user.role === "ADMIN" ? "red" : "blue"} variant="light">
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {user.role !== 'ADMIN' && (
                        <Button
                          color="red"
                          variant="light"
                          size="xs"
                          leftSection={<IconTrash size={14} />}
                          onClick={() => confirmDelete(user)}
                        >
                          Delete
                        </Button>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          {users.length === 0 && (
            <Center p="xl">
              <Text c="dimmed">No active users found</Text>
            </Center>
          )}
        </Card>
      </Container>

      <Modal opened={opened} onClose={close} title="Confirm Action" centered>
        <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
          <IconAlertTriangle size={50} color="orange" style={{ marginBottom: "1rem" }} />
          <Text size="lg" fw={500} mb="xs">Deactivate User?</Text>
          <Text c="dimmed" size="sm" mb="xl">
            Are you sure you want to deactivate <b>{userToDelete?.name}</b>? They will no longer be able to log in.
          </Text>

          <Group justify="center" gap="md">
            <Button variant="default" onClick={close}>Cancel</Button>
            <Button color="red" onClick={handleDelete}>Confirm Deactivation</Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default Users;