import { Group, Button, Text, Menu, Avatar, Badge } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../api/auth";
import { IconBus, IconLogout, IconShieldCheck } from "@tabler/icons-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      width: "100vw",
      background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
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
            <Group gap="xs" style={{ cursor: "pointer" }} onClick={() => navigate("/admin")}>
              <IconBus size={32} color="white" stroke={2} />
              <Text size="xl" fw={700} c="white" style={{ letterSpacing: "0.5px" }}>
                Bus Pass Admin
              </Text>
              <Badge
                color="white"
                variant="filled"
                leftSection={<IconShieldCheck size={14} />}
                style={{ color: "#059669" }}
              >
                ADMIN
              </Badge>
            </Group>

            <Group gap="sm" style={{ marginLeft: "1rem" }}>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/admin")}
                style={{
                  color: "white",
                  borderBottom: location.pathname === "/admin" ? "2px solid white" : "2px solid transparent",
                  borderRadius: 0
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/admin/applications")}
                style={{
                  color: "white",
                  borderBottom: location.pathname.includes("/admin/applications") ? "2px solid white" : "2px solid transparent",
                  borderRadius: 0
                }}
              >
                Applications
              </Button>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/admin/passes")}
                style={{
                  color: "white",
                  borderBottom: location.pathname.includes("/admin/passes") ? "2px solid white" : "2px solid transparent",
                  borderRadius: 0
                }}
              >
                Passes
              </Button>
              <Button
                variant="subtle"
                color="white"
                onClick={() => navigate("/admin/users")}
                style={{
                  color: "white",
                  borderBottom: location.pathname.includes("/admin/users") ? "2px solid white" : "2px solid transparent",
                  borderRadius: 0
                }}
              >
                Users
              </Button>
            </Group>
          </Group>

          <Group>
            <Menu shadow="md" width={220}>
              <Menu.Target>
                <Button
                  variant="white"
                  leftSection={<Avatar size="sm" radius="xl" color="red">{user?.name?.charAt(0)}</Avatar>}
                  style={{ fontWeight: 500 }}
                >
                  {user?.name}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Admin Account</Menu.Label>
                <Menu.Item leftSection={<IconShieldCheck size={16} />}>
                  <div>
                    <Text size="sm" fw={500}>{user?.name}</Text>
                    <Text size="xs" c="dimmed">{user?.email}</Text>
                    <Text size="xs" c="red" fw={500}>{user?.role}</Text>
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

export default AdminNavbar;