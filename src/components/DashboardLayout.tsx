import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import BeritaSection from "./BeritaSection";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-2 sm:p-6">
          <BeritaSection />
        </main>
      </div>
    </div>
  );
}
