import { Bell, User, Wifi, Battery } from 'lucide-react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";

export function TopBar() {
  return (
    <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wifi className="h-4 w-4 text-green-600" />
          <span>Connected</span>
          <Battery className="h-4 w-4 text-green-600" />
          <span>98%</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <h4 className="text-sm mb-2">Recent Notifications</h4>
              <div className="space-y-2">
                <div className="p-2 rounded bg-red-50 border-l-4 border-red-500">
                  <p className="text-sm">High energy usage detected in Room 205</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="p-2 rounded bg-yellow-50 border-l-4 border-yellow-500">
                  <p className="text-sm">Room 102 fan left on for 8 hours</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <div className="p-2 rounded bg-green-50 border-l-4 border-green-500">
                  <p className="text-sm">Energy goal achieved for Floor 2</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm">Admin</p>
                <p className="text-xs text-muted-foreground">admin@hostel.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}