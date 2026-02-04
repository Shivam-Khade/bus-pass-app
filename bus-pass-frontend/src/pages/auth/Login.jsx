import { useState } from "react";
import { Link } from "react-router-dom";
import {
	TextInput,
	PasswordInput,
	Button,
	Card,
	Title,
	Stack,
	Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleLogin = async () => {
		if (!form.email || !form.password) {
			notifications.show({
				color: "red",
				title: "Validation error",
				message: "Email and password are required",
			});
			return;
		}

		try {
			const data = await login(form.email, form.password);

			notifications.show({
				color: "green",
				title: "Login successful",
				message: `Welcome ${data.name}!`,
			});

			// 🔁 Redirect by role
			if (data.role === "ADMIN") {
				navigate("/admin");
			} else {
				navigate("/user");
			}
		} catch (err) {
			notifications.show({
				color: "red",
				title: "Login failed",
				message: err.message,
			});
		}
	};

	return (
		<Card shadow="md" radius="md" p="lg" w={360} mx="auto" mt={100}>
			<Title order={3} ta="center">
				Login
			</Title>

			<Stack mt="md">
				<TextInput
					label="Email"
					name="email"
					placeholder="you@example.com"
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

				<Button fullWidth mt="md" onClick={handleLogin}>
					Login
				</Button>

				<Text size="sm" ta="center">
					Don’t have an account? <Link to="/register">Register</Link>
				</Text>
			</Stack>
		</Card>
	);
}
