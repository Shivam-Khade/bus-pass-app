import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Title,
  Stack,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      notifications.show({
        color: "red",
        title: "Validation error",
        message: "Please fill all required fields",
      });
      return;
    }

    try {
      await register(form);

      notifications.show({
        color: "green",
        title: "Success",
        message: "Registered successfully 🎉",
      });

      navigate("/");
    } catch (err) {
      notifications.show({
        color: "red",
        title: "Registration failed",
        message: err.message,
      });
    }
  };

  return (
    <Card shadow="md" radius="md" p="lg" w={360} mx="auto" mt={80}>
      <Title order={3} ta="center">
        Create Account
      </Title>

      <Stack mt="md">
        <TextInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Select
          label="Role"
          placeholder="Select role"
          data={[
            { value: "STUDENT", label: "Student" },
            { value: "USER", label: "User" },
          ]}
          value={form.role}
          onChange={(value) =>
            setForm({ ...form, role: value })
          }
          required
        />

        <TextInput
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <Button fullWidth mt="md" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
    </Card>
  );
}