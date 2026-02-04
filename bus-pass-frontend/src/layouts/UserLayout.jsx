import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column" }}>
      <UserNavbar />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem", flex: 1, width: "100%" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;