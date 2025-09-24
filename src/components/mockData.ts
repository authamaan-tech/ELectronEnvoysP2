export interface DeviceStatus {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'socket';
  isOn: boolean;
  power: number; // watts
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  isOccupied: boolean;
  occupantName?: string;
  devices: DeviceStatus[];
  energyToday: number; // kWh
  energyThisMonth: number; // kWh
  lastActivity: Date;
}

export interface EnergyReading {
  time: string;
  value: number;
}

export const mockRooms: Room[] = [
  {
    id: 'room-101',
    number: '101',
    floor: 1,
    isOccupied: true,
    occupantName: 'John Doe',
    devices: [
      { id: 'light-101-1', name: 'Main Light', type: 'light', isOn: true, power: 15 },
      { id: 'light-101-2', name: 'Desk Light', type: 'light', isOn: false, power: 8 },
      { id: 'fan-101', name: 'Ceiling Fan', type: 'fan', isOn: true, power: 60 },
      { id: 'socket-101-1', name: 'Power Socket 1', type: 'socket', isOn: true, power: 45 },
      { id: 'socket-101-2', name: 'Power Socket 2', type: 'socket', isOn: false, power: 0 },
    ],
    energyToday: 3.2,
    energyThisMonth: 96.5,
    lastActivity: new Date('2024-01-15T14:30:00'),
  },
  {
    id: 'room-102',
    number: '102',
    floor: 1,
    isOccupied: false,
    devices: [
      { id: 'light-102-1', name: 'Main Light', type: 'light', isOn: false, power: 15 },
      { id: 'light-102-2', name: 'Desk Light', type: 'light', isOn: false, power: 8 },
      { id: 'fan-102', name: 'Ceiling Fan', type: 'fan', isOn: true, power: 60 },
      { id: 'socket-102-1', name: 'Power Socket 1', type: 'socket', isOn: false, power: 0 },
      { id: 'socket-102-2', name: 'Power Socket 2', type: 'socket', isOn: false, power: 0 },
    ],
    energyToday: 1.4,
    energyThisMonth: 42.3,
    lastActivity: new Date('2024-01-15T09:15:00'),
  },
  {
    id: 'room-201',
    number: '201',
    floor: 2,
    isOccupied: true,
    occupantName: 'Jane Smith',
    devices: [
      { id: 'light-201-1', name: 'Main Light', type: 'light', isOn: true, power: 15 },
      { id: 'light-201-2', name: 'Desk Light', type: 'light', isOn: true, power: 8 },
      { id: 'fan-201', name: 'Ceiling Fan', type: 'fan', isOn: false, power: 0 },
      { id: 'socket-201-1', name: 'Power Socket 1', type: 'socket', isOn: true, power: 120 },
      { id: 'socket-201-2', name: 'Power Socket 2', type: 'socket', isOn: true, power: 25 },
    ],
    energyToday: 4.1,
    energyThisMonth: 123.8,
    lastActivity: new Date('2024-01-15T16:45:00'),
  },
  {
    id: 'room-202',
    number: '202',
    floor: 2,
    isOccupied: true,
    occupantName: 'Mike Johnson',
    devices: [
      { id: 'light-202-1', name: 'Main Light', type: 'light', isOn: false, power: 0 },
      { id: 'light-202-2', name: 'Desk Light', type: 'light', isOn: true, power: 8 },
      { id: 'fan-202', name: 'Ceiling Fan', type: 'fan', isOn: true, power: 60 },
      { id: 'socket-202-1', name: 'Power Socket 1', type: 'socket', isOn: true, power: 75 },
      { id: 'socket-202-2', name: 'Power Socket 2', type: 'socket', isOn: false, power: 0 },
    ],
    energyToday: 2.8,
    energyThisMonth: 84.2,
    lastActivity: new Date('2024-01-15T18:20:00'),
  },
  {
    id: 'room-301',
    number: '301',
    floor: 3,
    isOccupied: false,
    devices: [
      { id: 'light-301-1', name: 'Main Light', type: 'light', isOn: false, power: 0 },
      { id: 'light-301-2', name: 'Desk Light', type: 'light', isOn: false, power: 0 },
      { id: 'fan-301', name: 'Ceiling Fan', type: 'fan', isOn: false, power: 0 },
      { id: 'socket-301-1', name: 'Power Socket 1', type: 'socket', isOn: false, power: 0 },
      { id: 'socket-301-2', name: 'Power Socket 2', type: 'socket', isOn: false, power: 0 },
    ],
    energyToday: 0.2,
    energyThisMonth: 15.6,
    lastActivity: new Date('2024-01-14T22:00:00'),
  },
];

export const generateEnergyData = (days: number = 7): EnergyReading[] => {
  const data: EnergyReading[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic energy consumption pattern
    const baseConsumption = 25; // Base consumption in kWh
    const variation = Math.random() * 10 - 5; // Random variation
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.8 : 1.0; // Lower consumption on weekends
    
    data.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round((baseConsumption + variation) * weekendMultiplier * 10) / 10,
    });
  }
  
  return data;
};

export const generateHourlyData = (): EnergyReading[] => {
  const data: EnergyReading[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i, 0, 0, 0);
    
    // Generate realistic hourly consumption pattern
    const hour = time.getHours();
    let baseConsumption = 0.5; // Base hourly consumption in kWh
    
    // Higher consumption during active hours
    if (hour >= 6 && hour <= 23) {
      baseConsumption = 1.2 + Math.random() * 0.8;
    } else {
      baseConsumption = 0.3 + Math.random() * 0.4;
    }
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      value: Math.round(baseConsumption * 10) / 10,
    });
  }
  
  return data;
};

export const getOccupancyHistory = (roomId: string, days: number = 7) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic occupancy pattern
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseOccupancy = isWeekend ? 75 : 60; // Higher occupancy on weekends
    const variation = Math.random() * 20 - 10;
    
    data.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      occupancy: Math.max(0, Math.min(100, Math.round(baseOccupancy + variation))),
    });
  }
  
  return data;
};