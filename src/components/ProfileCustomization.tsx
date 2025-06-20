import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, Save, Camera, Award, Settings } from "lucide-react";

const ProfileCustomization = ({ user, onUpdateUser }) => {
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    age: user.age || "",
    height: user.height || "",
    weight: user.weight || "",
    fitnessGoal: user.fitnessGoal || "",
    activityLevel: user.activityLevel || "",
    bio: user.bio || "",
    favoriteWorkout: user.favoriteWorkout || "",
    preferredWorkoutTime: user.preferredWorkoutTime || "morning",
    avatar: user.avatar || ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const mockAchievements = [
      { id: 1, title: "First Workout", description: "Completed your first workout", date: "2024-01-15", icon: "🏋️‍♀️" },
      { id: 2, title: "Week Warrior", description: "Worked out 5 times in a week", date: "2024-02-01", icon: "🔥" },
      { id: 3, title: "Consistency King", description: "7-day workout streak", date: "2024-02-10", icon: "👑" },
      { id: 4, title: "Nutrition Ninja", description: "Logged meals for 30 days", date: "2024-02-20", icon: "🥗" },
      { id: 5, title: "Goal Getter", description: "Achieved your first fitness goal", date: "2024-03-01", icon: "🎯" }
    ];
    setAchievements(mockAchievements);
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    onUpdateUser(updatedUser);
    localStorage.setItem("fitnessUser", JSON.stringify(updatedUser));
    setIsEditing(false);
    
    toast({
      title: "Profile updated! ✨",
      description: "Your profile has been successfully updated",
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData({ ...profileData, avatar: result });
        toast({
          title: "Profile picture updated! 📸",
          description: "Your new profile picture has been uploaded successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateBMI = () => {
    const heightM = parseFloat(profileData.height) / 100;
    const weightKg = parseFloat(profileData.weight);
    if (heightM && weightKg) {
      return (weightKg / (heightM * heightM)).toFixed(1);
    }
    return "N/A";
  };

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmiValue < 25) return { category: "Normal", color: "text-green-600" };
    if (bmiValue < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const bmi = calculateBMI();
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.avatar} alt="Profile picture" />
                <AvatarFallback className="text-2xl bg-white text-orange-600 font-bold">
                  {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-gray-50">
                <Camera className="w-4 h-4 text-orange-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
              <p className="text-orange-100 mb-4">
                {profileData.fitnessGoal?.replace("-", " ").toUpperCase()} • {profileData.activityLevel?.toUpperCase()} ACTIVITY
              </p>
              <div className="flex space-x-4 text-sm">
                <div>
                  <span className="opacity-80">Age: </span>
                  <span className="font-semibold">{profileData.age}</span>
                </div>
                <div>
                  <span className="opacity-80">Height: </span>
                  <span className="font-semibold">{profileData.height} cm</span>
                </div>
                <div>
                  <span className="opacity-80">Weight: </span>
                  <span className="font-semibold">{profileData.weight} kg</span>
                </div>
                <div>
                  <span className="opacity-80">BMI: </span>
                  <span className="font-semibold">{bmi}</span>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={profileData.height}
                        onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Preferred Workout Time</Label>
                      <Select
                        value={profileData.preferredWorkoutTime}
                        onValueChange={(value) => setProfileData({ ...profileData, preferredWorkoutTime: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about your fitness journey..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="favoriteWorkout">Favorite Workout</Label>
                    <Input
                      id="favoriteWorkout"
                      value={profileData.favoriteWorkout}
                      onChange={(e) => setProfileData({ ...profileData, favoriteWorkout: e.target.value })}
                      placeholder="e.g., Deadlifts, Running, Yoga..."
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Email</Label>
                      <p className="text-gray-600">{profileData.email || "Not provided"}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Preferred Workout Time</Label>
                      <p className="text-gray-600 capitalize">{profileData.preferredWorkoutTime}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Favorite Workout</Label>
                      <p className="text-gray-600">{profileData.favoriteWorkout || "Not specified"}</p>
                    </div>
                  </div>
                  {profileData.bio && (
                    <div>
                      <Label className="font-medium">Bio</Label>
                      <p className="text-gray-600 mt-1">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{bmi}</div>
                  <div className="text-sm text-gray-600">BMI</div>
                  <div className={`text-xs font-medium ${bmiInfo.color}`}>
                    {bmiInfo.category}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {parseFloat(profileData.weight) - 5}
                  </div>
                  <div className="text-sm text-gray-600">Target Weight (kg)</div>
                  <div className="text-xs text-gray-500">Goal</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((parseFloat(profileData.height) / 100) * (parseFloat(profileData.height) / 100) * 22)}
                  </div>
                  <div className="text-sm text-gray-600">Ideal Weight (kg)</div>
                  <div className="text-xs text-gray-500">BMI 22</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total workouts</span>
                  <span className="text-sm font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current streak</span>
                  <span className="text-sm font-medium">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Achievements</span>
                  <span className="text-sm font-medium">{achievements.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomization;
