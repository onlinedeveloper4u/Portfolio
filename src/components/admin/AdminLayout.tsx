import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 min-h-screen overflow-x-hidden flex flex-col">
        <AdminHeader />
        <div className="flex-1 p-4 md:p-8">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
