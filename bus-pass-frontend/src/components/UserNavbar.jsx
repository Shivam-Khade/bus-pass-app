import { Group, Button, Text, Menu, Avatar } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../api/auth";
import { IconBus, IconLogout, IconUser } from "@tabler/icons-react";

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      width: "100vw",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "1rem 2rem"
      }}>
        <Group justify="space-between">
          <Group gap="xl">
            <Group
              gap="xs"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/user")}
            >
              <IconBus size={32} color="white" stroke={2} />
              <Text size="xl" fw={700} c="white" style={{ letterSpacing: "0.5px" }}>
                Bus Pass System
              </Text>
            </Group>

            <Group gap="sm" style={{ marginLeft: "2rem" }}>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/user")}
                style={{
                  color: "white",
                  borderBottom: isActive("/user") ? "3px solid white" : "3px solid transparent",
                  borderRadius: 0,
                  paddingBottom: "0.5rem"
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/user/apply")}
                style={{
                  color: "white",
                  borderBottom: isActive("/user/apply") ? "3px solid white" : "3px solid transparent",
                  borderRadius: 0,
                  paddingBottom: "0.5rem"
                }}
              >
                Apply Pass
              </Button>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/user/my-pass")}
                style={{
                  color: "white",
                  borderBottom: isActive("/user/my-pass") ? "3px solid white" : "3px solid transparent",
                  borderRadius: 0,
                  paddingBottom: "0.5rem"
                }}
              >
                My Pass
              </Button>
            </Group>
          </Group>

          <Group>
            <Menu shadow="md" width={220}>
              <Menu.Target>
                <Button
                  variant="white"
                  leftSection={<Avatar size="sm" radius="xl" color="violet">{user?.name?.charAt(0)}</Avatar>}
                  style={{ fontWeight: 500 }}
                >
                  {user?.name}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account Details</Menu.Label>
                <Menu.Item leftSection={<IconUser size={16} />}>
                  <div>
                    <Text size="sm" fw={500}>{user?.name}</Text>
                    <Text size="xs" c="dimmed">{user?.email}</Text>
                    <Text size="xs" c="blue" fw={500}>{user?.role}</Text>
                  </div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </div>
    </div>
  );
};

export default UserNavbar;