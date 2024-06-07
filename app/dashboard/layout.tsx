import SideNav from '@/components/sideNav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <SideNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
