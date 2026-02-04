import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

const AdminLayout = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <AdminNavbar />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;