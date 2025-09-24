import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Settings as SettingsIcon, User, Shield, Wifi, Database, Moon, Sun, Globe, Monitor, HardDrive, Cpu, Wifi as WifiIcon, Phone, Mail, FileText, HelpCircle } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    general: {
      hostelName: 'Green Valley Hostel',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      language: 'English',
      darkMode: false,
    },
    energy: {
      autoShutoff: true,
      autoShutoffTime: 30,
      energyTarget: 90,
      peakHourStart: '18:00',
      peakHourEnd: '22:00',
      nightModeStart: '23:00',
      nightModeEnd: '06:00',
      temperatureThreshold: 24,
      brightnessLevel: 80,
      maxPowerConsumption: 150,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      loginAttempts: 3,
      passwordExpiry: 90,
    },
    notifications: {
      emailReports: true,
      weeklyReports: true,
      monthlyReports: true,
      maintenanceReminders: true,
      alertThreshold: 85,
      reportFrequency: 7,
    },
  });

  const updateSetting = (category: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" />
        <h1>Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Reports</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelName">Hostel Name</Label>
                  <Input
                    id="hostelName"
                    value={settings.general.hostelName}
                    onChange={(e) => updateSetting('general', 'hostelName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSetting('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.general.currency}
                    onValueChange={(value) => updateSetting('general', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => updateSetting('general', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.general.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                </div>
                <Switch
                  checked={settings.general.darkMode}
                  onCheckedChange={(checked) => updateSetting('general', 'darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto Shutoff</p>
                  <p className="text-sm text-muted-foreground">Automatically turn off devices when rooms are vacant</p>
                </div>
                <Switch
                  checked={settings.energy.autoShutoff}
                  onCheckedChange={(checked) => updateSetting('energy', 'autoShutoff', checked)}
                />
              </div>

              {settings.energy.autoShutoff && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shutoffTime">Auto Shutoff Delay: {settings.energy.autoShutoffTime} minutes</Label>
                    <p className="text-sm text-muted-foreground">How long to wait before turning off devices in vacant rooms</p>
                  </div>
                  <Slider
                    id="shutoffTime"
                    min={5}
                    max={120}
                    step={5}
                    value={[settings.energy.autoShutoffTime]}
                    onValueChange={(value) => updateSetting('energy', 'autoShutoffTime', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 min</span>
                    <span>120 min</span>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="energyTarget">Energy Efficiency Target: {settings.energy.energyTarget}%</Label>
                    <p className="text-sm text-muted-foreground">Set your energy saving goal</p>
                  </div>
                  <Slider
                    id="energyTarget"
                    min={50}
                    max={100}
                    step={5}
                    value={[settings.energy.energyTarget]}
                    onValueChange={(value) => updateSetting('energy', 'energyTarget', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Peak Hours</Label>
                  <div className="flex gap-2">
                    <Input
                      type="time"
                      value={settings.energy.peakHourStart}
                      onChange={(e) => updateSetting('energy', 'peakHourStart', e.target.value)}
                    />
                    <span className="flex items-center">to</span>
                    <Input
                      type="time"
                      value={settings.energy.peakHourEnd}
                      onChange={(e) => updateSetting('energy', 'peakHourEnd', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Night Mode Start</Label>
                  <Input
                    type="time"
                    value={settings.energy.nightModeStart}
                    onChange={(e) => updateSetting('energy', 'nightModeStart', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Night Mode End</Label>
                  <Input
                    type="time"
                    value={settings.energy.nightModeEnd}
                    onChange={(e) => updateSetting('energy', 'nightModeEnd', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <h4 className="font-medium">Device Control Settings</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="temperatureThreshold">Temperature Threshold: {settings.energy.temperatureThreshold}°C</Label>
                      <p className="text-sm text-muted-foreground">Auto AC control temperature</p>
                    </div>
                    <Slider
                      id="temperatureThreshold"
                      min={18}
                      max={30}
                      step={1}
                      value={[settings.energy.temperatureThreshold]}
                      onValueChange={(value) => updateSetting('energy', 'temperatureThreshold', value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>18°C</span>
                      <span>30°C</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="brightnessLevel">Default Brightness: {settings.energy.brightnessLevel}%</Label>
                      <p className="text-sm text-muted-foreground">Automatic lighting brightness</p>
                    </div>
                    <Slider
                      id="brightnessLevel"
                      min={10}
                      max={100}
                      step={10}
                      value={[settings.energy.brightnessLevel]}
                      onValueChange={(value) => updateSetting('energy', 'brightnessLevel', value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxPowerConsumption">Max Power Per Room: {settings.energy.maxPowerConsumption}W</Label>
                    <p className="text-sm text-muted-foreground">Alert when room exceeds this power usage</p>
                  </div>
                  <Slider
                    id="maxPowerConsumption"
                    min={50}
                    max={500}
                    step={25}
                    value={[settings.energy.maxPowerConsumption]}
                    onValueChange={(value) => updateSetting('energy', 'maxPowerConsumption', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50W</span>
                    <span>500W</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout: {settings.security.sessionTimeout} minutes</Label>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Slider
                    id="sessionTimeout"
                    min={15}
                    max={240}
                    step={15}
                    value={[settings.security.sessionTimeout]}
                    onValueChange={(value) => updateSetting('security', 'sessionTimeout', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15 min</span>
                    <span>240 min</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts: {settings.security.loginAttempts}</Label>
                    <p className="text-sm text-muted-foreground">Failed attempts before lockout</p>
                  </div>
                  <Slider
                    id="loginAttempts"
                    min={3}
                    max={10}
                    step={1}
                    value={[settings.security.loginAttempts]}
                    onValueChange={(value) => updateSetting('security', 'loginAttempts', value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry: {settings.security.passwordExpiry} days</Label>
                  <p className="text-sm text-muted-foreground">Force password change after this period</p>
                </div>
                <Slider
                  id="passwordExpiry"
                  min={30}
                  max={365}
                  step={30}
                  value={[settings.security.passwordExpiry]}
                  onValueChange={(value) => updateSetting('security', 'passwordExpiry', value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 days</span>
                  <span>365 days</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">Change Password</Button>
                <Button variant="outline" className="w-full">Download Security Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Reports</p>
                  <p className="text-sm text-muted-foreground">Receive detailed reports via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailReports}
                  onCheckedChange={(checked) => updateSetting('notifications', 'emailReports', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Get weekly energy consumption summaries</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Monthly Reports</p>
                  <p className="text-sm text-muted-foreground">Get monthly detailed analytics reports</p>
                </div>
                <Switch
                  checked={settings.notifications.monthlyReports}
                  onCheckedChange={(checked) => updateSetting('notifications', 'monthlyReports', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminders for scheduled maintenance</p>
                </div>
                <Switch
                  checked={settings.notifications.maintenanceReminders}
                  onCheckedChange={(checked) => updateSetting('notifications', 'maintenanceReminders', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-6">
                <h4 className="font-medium">Alert Settings</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="alertThreshold">Energy Alert Threshold: {settings.notifications.alertThreshold}%</Label>
                      <p className="text-sm text-muted-foreground">Send alerts when usage exceeds this percentage</p>
                    </div>
                    <Slider
                      id="alertThreshold"
                      min={50}
                      max={100}
                      step={5}
                      value={[settings.notifications.alertThreshold]}
                      onValueChange={(value) => updateSetting('notifications', 'alertThreshold', value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reportFrequency">Report Frequency: Every {settings.notifications.reportFrequency} days</Label>
                      <p className="text-sm text-muted-foreground">How often to send energy reports</p>
                    </div>
                    <Slider
                      id="reportFrequency"
                      min={1}
                      max={30}
                      step={1}
                      value={[settings.notifications.reportFrequency]}
                      onValueChange={(value) => updateSetting('notifications', 'reportFrequency', value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Daily</span>
                      <span>Monthly</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <Label>Software Version</Label>
                  </div>
                  <p className="text-sm bg-muted p-3 rounded-lg font-mono">EnergyHub v2.1.0</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <Label>Last Update</Label>
                  </div>
                  <p className="text-sm bg-muted p-3 rounded-lg">September 24, 2025</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <Label>System Status</Label>
                  </div>
                  <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm">All systems operational</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <WifiIcon className="h-4 w-4 text-muted-foreground" />
                    <Label>Connected Devices</Label>
                  </div>
                  <p className="text-sm bg-muted p-3 rounded-lg">25 devices online</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-medium">
                  <HardDrive className="h-4 w-4" />
                  System Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-medium">
                  <Database className="h-4 w-4" />
                  Data Management
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Import Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Backup Config
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-medium">
                  <Cpu className="h-4 w-4" />
                  System Maintenance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    <Monitor className="h-4 w-4 mr-2" />
                    Check Updates
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Cpu className="h-4 w-4 mr-2" />
                    Diagnostics
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Support & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4" />
                    Technical Support
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@energyhub.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-medium">
                    <FileText className="h-4 w-4" />
                    Documentation
                  </h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start p-3">
                      <FileText className="h-4 w-4 mr-3" />
                      User Manual
                    </Button>
                    <Button variant="ghost" className="w-full justify-start p-3">
                      <Database className="h-4 w-4 mr-3" />
                      API Documentation
                    </Button>
                    <Button variant="ghost" className="w-full justify-start p-3">
                      <HelpCircle className="h-4 w-4 mr-3" />
                      FAQ & Troubleshooting
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <WifiIcon className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">System Health Status</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="font-medium">99.98%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="font-medium">45ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Accuracy</p>
                    <p className="font-medium">99.9%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Backup</p>
                    <p className="font-medium">2h ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}