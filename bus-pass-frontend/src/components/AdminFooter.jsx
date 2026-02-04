import { Container, Text } from "@mantine/core";

const AdminFooter = () => {
  return (
    <footer
      style={{
        width: "100vw",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        padding: "1.25rem 0",
        textAlign: "center",
      }}
    >
      <Container size="lg">
        <Text size="sm" c="rgba(255,255,255,0.85)">
          © 2026 Bus Pass System. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
};

export default AdminFooter;