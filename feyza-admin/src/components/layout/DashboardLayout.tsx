import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(30,50%,98%)] to-[hsl(340,40%,96%)]">
      <Sidebar />
      <main className="ml-72 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
