import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children, role, setRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f7]">
      
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <Topbar
          role={role}
          setRole={setRole}
          onMenuClick={() => setSidebarOpen(true)}
        />

        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
