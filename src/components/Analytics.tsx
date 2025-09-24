import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Zap, DollarSign, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { generateEnergyData } from './mockData';

export function Analytics() {
  const weeklyData = generateEnergyData(7);
  const monthlyData = generateEnergyData(30);
  
  const floorData = [
    { floor: 'Floor 1', energy: 48.5, cost: 582 },
    { floor: 'Floor 2', energy: 62.3, cost: 748 },
    { floor: 'Floor 3', energy: 31.2, cost: 374 },
  ];

  const deviceTypeData = [
    { name: 'Lights', value: 35, color: '#16a34a' },
    { name: 'Fans', value: 42, color: '#059669' },
    { name: 'Sockets', value: 23, color: '#10b981' },
  ];

  const efficiencyData = [
    { time: 'Jan', efficiency: 85, target: 90 },
    { time: 'Feb', efficiency: 88, target: 90 },
    { time: 'Mar', efficiency: 92, target: 90 },
    { time: 'Apr', efficiency: 87, target: 90 },
    { time: 'May', efficiency: 89, target: 90 },
    { time: 'Jun', efficiency: 91, target: 90 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Analytics</h1>
        <Badge variant="outline" className="text-sm">
          <Calendar className="h-3 w-3 mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Monthly Consumption</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">342.5 kWh</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              8% reduction from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">₹4,110</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              15% more than last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Efficiency Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">91%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Above 90% target
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Peak Usage Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8-10 PM</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average peak consumption
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="consumption" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Energy Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
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
                <CardTitle>Consumption by Floor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={floorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="floor" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${value} kWh`, 'Energy']} />
                    <Bar dataKey="energy" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Consumption Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value} kWh`, 'Energy']} />
                  <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Efficiency vs Target</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[80, 95]} />
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Efficiency']} />
                  <Line type="monotone" dataKey="efficiency" stroke="#16a34a" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Best Performing Floor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">Floor 2</div>
                <p className="text-sm text-green-600 mt-1">94% efficiency</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Most Efficient Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">2-6 AM</div>
                <p className="text-sm text-green-600 mt-1">98% efficiency</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Improvement Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-orange-600">12%</div>
                <p className="text-sm text-muted-foreground mt-1">Possible savings</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis by Floor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={floorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="floor" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`₹${value}`, 'Cost']} />
                  <Bar dataKey="cost" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Cost per Room</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">₹341</div>
                <p className="text-sm text-muted-foreground mt-1">Per month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Highest Cost Room</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">Room 201</div>
                <p className="text-sm text-red-600 mt-1">₹486/month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Most Efficient Room</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">Room 301</div>
                <p className="text-sm text-green-600 mt-1">₹187/month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Usage by Device Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Devices</span>
                    <Badge>25</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Devices</span>
                    <Badge variant="default">18</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Offline Devices</span>
                    <Badge variant="secondary">7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>High Usage Devices</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { device: 'Ceiling Fans', efficiency: 92, status: 'Excellent' },
                  { device: 'LED Lights', efficiency: 88, status: 'Good' },
                  { device: 'Power Sockets', efficiency: 85, status: 'Good' },
                  { device: 'Desk Lights', efficiency: 79, status: 'Fair' },
                ].map((item) => (
                  <div key={item.device} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{item.device}</p>
                      <p className="text-sm text-muted-foreground">{item.efficiency}% efficiency</p>
                    </div>
                    <Badge variant={item.status === 'Excellent' ? 'default' : item.status === 'Good' ? 'secondary' : 'outline'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}