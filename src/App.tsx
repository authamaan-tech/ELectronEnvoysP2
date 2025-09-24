import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { RoomDetail } from "./components/RoomDetail";
import { Analytics } from "./components/Analytics";
import { Alerts } from "./components/Alerts";
import { Settings } from "./components/Settings";
import { Home, Building, BarChart3, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'rooms', label: 'Rooms', icon: Building },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    if (currentPage === 'rooms' && selectedRoom) {
      return <RoomDetail roomId={selectedRoom} onBack={() => setSelectedRoom(null)} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onRoomSelect={(roomId) => {
          setSelectedRoom(roomId);
          setCurrentPage('rooms');
        }} />;
      case 'rooms':
        return <Dashboard onRoomSelect={(roomId) => setSelectedRoom(roomId)} showRoomsOnly={true} />;
      case 'analytics':
        return <Analytics />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onRoomSelect={(roomId) => {
          setSelectedRoom(roomId);
          setCurrentPage('rooms');
        }} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg">EnergyHub</h2>
                <p className="text-xs text-muted-foreground">Hostel Automation</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      setCurrentPage(item.id);
                      if (item.id !== 'rooms') {
                        setSelectedRoom(null);
                      }
                    }}
                    isActive={currentPage === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}