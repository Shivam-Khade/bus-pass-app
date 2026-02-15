import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Select,
  Text,
  Center,
  Box,
  PinInput,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate, Link } from "react-router-dom";
import { IconMail, IconLock, IconUser, IconPhone, IconBus } from "@tabler/icons-react";
import { register, sendOtp } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    otp: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSendOtp = async () => {
    if (!form.email) {
      notifications.show({
        color: "red",
        title: "Validation error",
        message: "Please enter your email address",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      notifications.show({
        color: "red",
        title: "Validation error",
        message: "Please enter a valid email address",
      });
      return;
    }

    try {
      setSendingOtp(true);
      await sendOtp(form.email);
      setOtpSent(true);
      notifications.show({
        color: "green",
        title: "OTP Sent",
        message: "Please check your email for the OTP code",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        title: "Failed to send OTP",
        message: err.message,
      });
    } finally {
      setSendingOtp(false);
    }
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

    if (!form.otp || form.otp.length !== 6) {
      notifications.show({
        color: "red",
        title: "Validation error",
        message: "Please enter the 6-digit OTP",
      });
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    input: {
      height: 48,
      fontSize: "0.95rem",
    },
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0f0f1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)",
        top: "-10%",
        left: "-10%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(118,75,162,0.1) 0%, transparent 70%)",
        bottom: "-5%",
        right: "-5%",
        pointerEvents: "none",
      }} />

      <Center style={{ width: "100%", padding: "1rem" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            animation: "cardFloat 0.6s ease-out",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--user-gradient)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                boxShadow: "0 8px 32px rgba(124, 92, 252, 0.3)",
              }}
            >
              <IconBus size={36} color="white" stroke={1.5} />
            </div>
            <Title order={2} fw={800} style={{ letterSpacing: "-0.5px" }}>
              Create Account
            </Title>
            <Text size="sm" c="dimmed" mt={6}>
              Get started in just a minute
            </Text>
          </div>

          {/* Glass Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-xl)",
              padding: "2rem",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Stack gap="md">
              <TextInput
                id="register-name"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                leftSection={<IconUser size={16} stroke={1.5} />}
                size="md"
                styles={inputStyles}
                required
              />

              <TextInput
                id="register-email"
                name="email"
                label="Email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                leftSection={<IconMail size={16} stroke={1.5} />}
                size="md"
                styles={inputStyles}
                required
                disabled={otpSent}
              />

              <PasswordInput
                id="register-password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                leftSection={<IconLock size={16} stroke={1.5} />}
                size="md"
                styles={inputStyles}
                required
              />

              <Select
                id="register-role"
                label="Role"
                placeholder="Select your role"
                data={[
                  { value: "STUDENT", label: "Student" },
                  { value: "USER", label: "User" },
                ]}
                value={form.role}
                onChange={(value) =>
                  setForm({ ...form, role: value })
                }
                size="md"
                styles={inputStyles}
                required
              />

              <TextInput
                id="register-phone"
                name="phone"
                label="Phone (optional)"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={handleChange}
                leftSection={<IconPhone size={16} stroke={1.5} />}
                size="md"
                styles={inputStyles}
              />

              {!otpSent ? (
                <Button
                  id="register-send-otp"
                  fullWidth
                  size="lg"
                  loading={sendingOtp}
                  onClick={handleSendOtp}
                  variant="gradient"
                  gradient={{ from: "#667eea", to: "#764ba2", deg: 135 }}
                  styles={{
                    root: {
                      height: 50,
                      fontSize: "1rem",
                      fontWeight: 600,
                    },
                  }}
                >
                  Send OTP
                </Button>
              ) : (
                <>
                  <Box>
                    <Text size="sm" fw={600} mb={8} style={{ color: "var(--text-secondary)" }}>
                      Enter OTP
                    </Text>
                    <Group justify="center">
                      <PinInput
                        id="register-otp"
                        length={6}
                        type="number"
                        value={form.otp}
                        onChange={(value) =>
                          setForm({ ...form, otp: value })
                        }
                        size="md"
                      />
                    </Group>
                    <Text size="xs" c="dimmed" ta="center" mt={8}>
                      OTP sent to {form.email}
                    </Text>
                  </Box>

                  <Button
                    id="register-submit"
                    fullWidth
                    size="lg"
                    loading={loading}
                    onClick={handleRegister}
                    variant="gradient"
                    gradient={{ from: "#667eea", to: "#764ba2", deg: 135 }}
                    styles={{
                      root: {
                        height: 50,
                        fontSize: "1rem",
                        fontWeight: 600,
                      },
                    }}
                  >
                    Register
                  </Button>

                  <Button
                    id="register-resend"
                    fullWidth
                    size="sm"
                    variant="subtle"
                    color="violet"
                    loading={sendingOtp}
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </Button>
                </>
              )}

              <Text size="sm" ta="center" style={{ color: "var(--text-secondary)" }}>
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{
                    color: "var(--user-primary-light)",
                    fontWeight: 600,
                  }}
                >
                  Sign in
                </Link>
              </Text>
            </Stack>
          </div>
        </div>
      </Center>

      <style>{`
        @keyframes cardFloat {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </Box>
  );
}
