import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Lightbulb, Fan, Plug, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockRooms, generateEnergyData } from './mockData';

interface DashboardProps {
  onRoomSelect: (roomId: string) => void;
  showRoomsOnly?: boolean;
}

export function Dashboard({ onRoomSelect, showRoomsOnly = false }: DashboardProps) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  
  const energyData = generateEnergyData(7);
  
  // Calculate totals
  const totalEnergyToday = mockRooms.reduce((sum, room) => sum + room.energyToday, 0);
  const totalEnergyMonth = mockRooms.reduce((sum, room) => sum + room.energyThisMonth, 0);
  const occupiedRooms = mockRooms.filter(room => room.isOccupied).length;
  const totalDevices = mockRooms.reduce((sum, room) => sum + room.devices.length, 0);
  const activeDevices = mockRooms.reduce((sum, room) => 
    sum + room.devices.filter(device => device.isOn).length, 0
  );
  
  // Device type counts
  const deviceCounts = mockRooms.reduce((acc, room) => {
    room.devices.forEach(device => {
      const key = device.type as keyof typeof acc;
      acc[key].total++;
      if (device.isOn) acc[key].active++;
    });
    return acc;
  }, { light: { active: 0, total: 0 }, fan: { active: 0, total: 0 }, socket: { active: 0, total: 0 } });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'light': return Lightbulb;
      case 'fan': return Fan;
      case 'socket': return Plug;
      default: return Zap;
    }
  };

  const filteredRooms = selectedFloor 
    ? mockRooms.filter(room => room.floor === selectedFloor)
    : mockRooms;

  const floors = [...new Set(mockRooms.map(room => room.floor))].sort();

  if (showRoomsOnly) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Rooms</h1>
          <div className="flex gap-2">
            <Button
              variant={selectedFloor === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFloor(null)}
            >
              All Floors
            </Button>
            {floors.map(floor => (
              <Button
                key={floor}
                variant={selectedFloor === floor ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFloor(floor)}
              >
                Floor {floor}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onRoomSelect(room.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Room {room.number}</CardTitle>
                  <Badge variant={room.isOccupied ? "default" : "secondary"}>
                    {room.isOccupied ? "Occupied" : "Vacant"}
                  </Badge>
                </div>
                {room.occupantName && (
                  <p className="text-sm text-muted-foreground">{room.occupantName}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Energy Today:</span>
                    <span className="font-semibold">{room.energyToday} kWh</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Devices:</span>
                    <div className="flex gap-1">
                      {room.devices.map((device) => {
                        const Icon = getDeviceIcon(device.type);
                        return (
                          <Icon
                            key={device.id}
                            className={`h-4 w-4 ${device.isOn ? 'text-green-600' : 'text-gray-300'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Last activity: {room.lastActivity.toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Energy Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          Live Data
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Energy Today</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalEnergyToday.toFixed(1)} kWh</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              12% less than yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{occupiedRooms}/{mockRooms.length}</div>
            <Progress value={(occupiedRooms / mockRooms.length) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((occupiedRooms / mockRooms.length) * 100)}% occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Devices</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeDevices}/{totalDevices}</div>
            <Progress value={(activeDevices / totalDevices) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((activeDevices / totalDevices) * 100)}% active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Monthly Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">₹2,340</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              18% more than last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(deviceCounts).map(([type, counts]) => {
          const Icon = getDeviceIcon(type);
          return (
            <Card key={type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm capitalize">{type}s</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{counts.active}/{counts.total}</div>
                <Progress value={(counts.active / counts.total) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((counts.active / counts.total) * 100)}% active
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Energy Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Consumption (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value} kWh`, 'Energy']} />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Room Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Room Overview</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedFloor === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFloor(null)}
            >
              All Floors
            </Button>
            {floors.map(floor => (
              <Button
                key={floor}
                variant={selectedFloor === floor ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFloor(floor)}
              >
                Floor {floor}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onRoomSelect(room.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Room {room.number}</CardTitle>
                    <Badge variant={room.isOccupied ? "default" : "secondary"}>
                      {room.isOccupied ? "Occupied" : "Vacant"}
                    </Badge>
                  </div>
                  {room.occupantName && (
                    <p className="text-sm text-muted-foreground">{room.occupantName}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Energy Today:</span>
                      <span className="font-semibold">{room.energyToday} kWh</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Devices:</span>
                      <div className="flex gap-1">
                        {room.devices.map((device) => {
                          const Icon = getDeviceIcon(device.type);
                          return (
                            <Icon
                              key={device.id}
                              className={`h-4 w-4 ${device.isOn ? 'text-green-600' : 'text-gray-300'}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Last activity: {room.lastActivity.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}