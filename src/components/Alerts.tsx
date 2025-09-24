import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertTriangle, Zap, Clock, CheckCircle, XCircle, Settings, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'high_usage' | 'device_offline' | 'schedule' | 'efficiency';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  room?: string;
  timestamp: Date;
  acknowledged: boolean;
}

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'high_usage',
      severity: 'high',
      title: 'High Energy Usage Detected',
      description: 'Room 205 has exceeded normal energy consumption by 40%',
      room: 'Room 205',
      timestamp: new Date('2024-01-15T14:30:00'),
      acknowledged: false,
    },
    {
      id: '2',
      type: 'device_offline',
      severity: 'medium',
      title: 'Device Offline',
      description: 'Ceiling fan in Room 102 is not responding',
      room: 'Room 102',
      timestamp: new Date('2024-01-15T13:15:00'),
      acknowledged: false,
    },
    {
      id: '3',
      type: 'schedule',
      severity: 'low',
      title: 'Scheduled Maintenance Due',
      description: 'Monthly maintenance check for Floor 3 devices',
      timestamp: new Date('2024-01-15T12:00:00'),
      acknowledged: true,
    },
    {
      id: '4',
      type: 'efficiency',
      severity: 'medium',
      title: 'Low Efficiency Alert',
      description: 'Floor 1 efficiency dropped below 85% threshold',
      timestamp: new Date('2024-01-15T11:45:00'),
      acknowledged: false,
    },
    {
      id: '5',
      type: 'high_usage',
      severity: 'high',
      title: 'Fan Running for Extended Period',
      description: 'Ceiling fan in Room 102 has been running for 8+ hours continuously',
      room: 'Room 102',
      timestamp: new Date('2024-01-15T10:00:00'),
      acknowledged: false,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    highUsage: true,
    deviceOffline: true,
    schedule: false,
    efficiency: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'high_usage': return Zap;
      case 'device_offline': return XCircle;
      case 'schedule': return Clock;
      case 'efficiency': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Alerts & Notifications</h1>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">{activeAlerts.length} Active</Badge>
          <Badge variant="secondary">{acknowledgedAlerts.length} Resolved</Badge>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500">
              {alerts.filter(a => a.severity === 'high' && !a.acknowledged).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Medium Priority</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">
              {alerts.filter(a => a.severity === 'medium' && !a.acknowledged).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Action recommended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Low Priority</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-500">
              {alerts.filter(a => a.severity === 'low' && !a.acknowledged).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Monitor when convenient</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">
              {acknowledgedAlerts.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Issues addressed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg">All Clear!</h3>
                  <p className="text-muted-foreground">No active alerts at this time.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            activeAlerts.map((alert) => {
              const Icon = getTypeIcon(alert.type);
              return (
                <Card key={alert.id} className="border-l-4" style={{
                  borderLeftColor: alert.severity === 'high' ? '#ef4444' : 
                                  alert.severity === 'medium' ? '#f97316' : '#3b82f6'
                }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-orange-500' : 'text-blue-500'
                        }`} />
                        <div>
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={getSeverityColor(alert.severity) as any}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            {alert.room && (
                              <Badge variant="outline">{alert.room}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {alert.timestamp.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...activeAlerts, ...acknowledgedAlerts]
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((alert) => {
                    const Icon = getTypeIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex items-start gap-3 p-3 border rounded">
                        <Icon className={`h-4 w-4 mt-0.5 ${
                          alert.acknowledged ? 'text-gray-400' : 
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-orange-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${alert.acknowledged ? 'text-muted-foreground' : ''}`}>
                              {alert.title}
                            </p>
                            {alert.acknowledged && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                            {alert.room && (
                              <Badge variant="outline" className="text-xs">{alert.room}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {alert.timestamp.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Usage Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when rooms exceed normal energy consumption</p>
                </div>
                <Switch
                  checked={notificationSettings.highUsage}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, highUsage: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Device Offline Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when devices go offline or stop responding</p>
                </div>
                <Switch
                  checked={notificationSettings.deviceOffline}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, deviceOffline: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Scheduled Maintenance</p>
                  <p className="text-sm text-muted-foreground">Get reminded about scheduled maintenance tasks</p>
                </div>
                <Switch
                  checked={notificationSettings.schedule}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, schedule: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Efficiency Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when efficiency drops below thresholds</p>
                </div>
                <Switch
                  checked={notificationSettings.efficiency}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, efficiency: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive instant push notifications</p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">High Usage Threshold</label>
                  <p className="text-xs text-muted-foreground mb-2">Alert when usage exceeds normal by:</p>
                  <select className="w-full p-2 border rounded">
                    <option value="30">30%</option>
                    <option value="40" selected>40%</option>
                    <option value="50">50%</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Efficiency Threshold</label>
                  <p className="text-xs text-muted-foreground mb-2">Alert when efficiency drops below:</p>
                  <select className="w-full p-2 border rounded">
                    <option value="80">80%</option>
                    <option value="85" selected>85%</option>
                    <option value="90">90%</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}