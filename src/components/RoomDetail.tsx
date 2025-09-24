import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, Lightbulb, Fan, Plug, User, Clock, Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockRooms, generateHourlyData, getOccupancyHistory } from './mockData';

interface RoomDetailProps {
  roomId: string;
  onBack: () => void;
}

export function RoomDetail({ roomId, onBack }: RoomDetailProps) {
  const room = mockRooms.find(r => r.id === roomId);
  const [devices, setDevices] = useState(room?.devices || []);
  
  if (!room) {
    return <div>Room not found</div>;
  }

  const energyData = generateHourlyData();
  const occupancyData = getOccupancyHistory(roomId);
  
  const toggleDevice = (deviceId: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? { 
              ...device, 
              isOn: !device.isOn, 
              power: !device.isOn ? (device.type === 'fan' ? 60 : device.type === 'light' ? 15 : 45) : 0 
            }
          : device
      )
    );
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'light': return Lightbulb;
      case 'fan': return Fan;
      case 'socket': return Plug;
      default: return Zap;
    }
  };

  const totalPower = devices.reduce((sum, device) => sum + device.power, 0);
  const activeDevices = devices.filter(device => device.isOn).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1>Room {room.number}</h1>
            <p className="text-muted-foreground">Floor {room.floor}</p>
          </div>
        </div>
        <Badge variant={room.isOccupied ? "default" : "secondary"} className="text-sm px-3 py-1">
          {room.isOccupied ? "Occupied" : "Vacant"}
        </Badge>
      </div>

      {/* Room Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Current Power</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalPower}W</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Devices</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeDevices}/{devices.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Devices online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Energy Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{room.energyToday} kWh</div>
            <p className="text-xs text-green-600 mt-1">8% below average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Occupant</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{room.occupantName || 'Vacant'}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Last seen: {room.lastActivity.toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Device Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${device.isOn ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.isOn ? `${device.power}W` : 'Off'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={device.isOn}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Energy Usage (Last 24 Hours)</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Occupancy History (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Occupancy']} />
                <Bar dataKey="occupancy" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Details */}
      <Card>
        <CardHeader>
          <CardTitle>Device Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device, index) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <div key={device.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${device.isOn ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{device.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={device.isOn ? "default" : "secondary"}>
                          {device.isOn ? 'ON' : 'OFF'}
                        </Badge>
                        <span className="text-sm">{device.power}W</span>
                      </div>
                    </div>
                  </div>
                  {index < devices.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}