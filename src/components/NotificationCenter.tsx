
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings, Trash2, CheckCircle, Clock, Trophy, Apple, Dumbbell } from "lucide-react";

interface Notification {
  id: number;
  type: 'workout' | 'nutrition' | 'achievement' | 'reminder' | 'social';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationSettings {
  workoutReminders: boolean;
  nutritionReminders: boolean;
  achievementAlerts: boolean;
  socialUpdates: boolean;
  dailyMotivation: boolean;
  weeklyReports: boolean;
}

const NotificationCenter = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    workoutReminders: true,
    nutritionReminders: true,
    achievementAlerts: true,
    socialUpdates: false,
    dailyMotivation: true,
    weeklyReports: true
  });
  const [activeTab, setActiveTab] = useState("notifications");
  const { toast } = useToast();

  useEffect(() => {
    initializeNotifications();
    loadSettings();
  }, []);

  const initializeNotifications = () => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: 'workout',
        title: 'Workout Reminder',
        message: "Time for your evening workout! You've got this 💪",
        timestamp: '5 minutes ago',
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Goal Achieved!',
        message: 'Congratulations! You completed your weekly workout goal 🏆',
        timestamp: '2 hours ago',
        read: false,
        priority: 'high'
      },
      {
        id: 3,
        type: 'nutrition',
        title: 'Nutrition Check',
        message: "Don't forget to log your dinner and track your macros",
        timestamp: '3 hours ago',
        read: true,
        priority: 'medium'
      },
      {
        id: 4,
        type: 'social',
        title: 'New Challenge Available',
        message: 'Join the "30-Day Squat Challenge" - 156 people already joined!',
        timestamp: '1 day ago',
        read: true,
        priority: 'medium'
      },
      {
        id: 5,
        type: 'reminder',
        title: 'Hydration Reminder',
        message: 'Remember to drink water! Stay hydrated throughout the day 💧',
        timestamp: '1 day ago',
        read: true,
        priority: 'low'
      },
      {
        id: 6,
        type: 'achievement',
        title: 'Streak Milestone',
        message: '7-day workout streak! Keep up the amazing consistency 🔥',
        timestamp: '2 days ago',
        read: true,
        priority: 'high'
      }
    ];

    setNotifications(mockNotifications);
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings));
    toast({
      title: "Settings saved! ⚙️",
      description: "Your notification preferences have been updated",
    });
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'workout': return <Dumbbell className="w-5 h-5 text-blue-500" />;
      case 'nutrition': return <Apple className="w-5 h-5 text-green-500" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-gray-500" />;
      case 'social': return <Bell className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notification Center
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white text-purple-600">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b">
        <Button
          variant={activeTab === "notifications" ? "default" : "ghost"}
          onClick={() => setActiveTab("notifications")}
          className="flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {unreadCount}
            </Badge>
          )}
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          onClick={() => setActiveTab("settings")}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>

      {activeTab === "notifications" && (
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet.</p>
                  <p className="text-sm mt-2">We'll notify you about important updates!</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${!notification.read ? 'text-blue-700' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                notification.priority === 'high' ? 'border-red-300 text-red-600' :
                                notification.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                                'border-green-300 text-green-600'
                              }`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <p className="text-sm text-gray-600">
                Customize when and how you receive notifications
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="workout-reminders" className="text-base font-medium">
                      Workout Reminders
                    </Label>
                    <p className="text-sm text-gray-600">
                      Get reminded when it's time for your scheduled workouts
                    </p>
                  </div>
                  <Switch
                    id="workout-reminders"
                    checked={settings.workoutReminders}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, workoutReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="nutrition-reminders" className="text-base font-medium">
                      Nutrition Reminders
                    </Label>
                    <p className="text-sm text-gray-600">
                      Reminders to log meals and track your nutrition
                    </p>
                  </div>
                  <Switch
                    id="nutrition-reminders"
                    checked={settings.nutritionReminders}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, nutritionReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="achievement-alerts" className="text-base font-medium">
                      Achievement Alerts
                    </Label>
                    <p className="text-sm text-gray-600">
                      Celebrate your milestones and goal completions
                    </p>
                  </div>
                  <Switch
                    id="achievement-alerts"
                    checked={settings.achievementAlerts}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, achievementAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="social-updates" className="text-base font-medium">
                      Social Updates
                    </Label>
                    <p className="text-sm text-gray-600">
                      Notifications about community challenges and friend activities
                    </p>
                  </div>
                  <Switch
                    id="social-updates"
                    checked={settings.socialUpdates}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, socialUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="daily-motivation" className="text-base font-medium">
                      Daily Motivation
                    </Label>
                    <p className="text-sm text-gray-600">
                      Receive daily motivational messages and tips
                    </p>
                  </div>
                  <Switch
                    id="daily-motivation"
                    checked={settings.dailyMotivation}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, dailyMotivation: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="weekly-reports" className="text-base font-medium">
                      Weekly Reports
                    </Label>
                    <p className="text-sm text-gray-600">
                      Get weekly summaries of your progress and achievements
                    </p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) =>
                      saveSettings({ ...settings, weeklyReports: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Workout Reminders</Label>
                  <p className="text-sm text-gray-600 mb-2">When to remind you about workouts</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      Morning (8:00 AM)
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Evening (6:00 PM)
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Meal Reminders</Label>
                  <p className="text-sm text-gray-600 mb-2">When to remind you to log meals</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      Breakfast
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Lunch
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      Dinner
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
