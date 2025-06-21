
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  Activity, 
  Apple, 
  BarChart3, 
  Dumbbell, 
  Target, 
  Utensils, 
  Calendar, 
  Users, 
  Bell, 
  User 
} from "lucide-react";

interface SwipeableMenuGridProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SwipeableMenuGrid = ({ activeTab, onTabChange }: SwipeableMenuGridProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { id: "calories", label: "Calories", icon: Apple, color: "bg-gradient-to-br from-green-500 to-green-600" },
    { id: "metrics", label: "Metrics", icon: BarChart3, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { id: "workouts", label: "Workouts", icon: Dumbbell, color: "bg-gradient-to-br from-red-500 to-red-600" },
    { id: "goals", label: "Goals", icon: Target, color: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
    { id: "nutrition", label: "Nutrition", icon: Utensils, color: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    { id: "diet-planner", label: "Diet Plan", icon: Calendar, color: "bg-gradient-to-br from-pink-500 to-pink-600" },
    { id: "social", label: "Social", icon: Users, color: "bg-gradient-to-br from-teal-500 to-teal-600" },
    { id: "notifications", label: "Alerts", icon: Bell, color: "bg-gradient-to-br from-orange-500 to-orange-600" },
    { id: "profile", label: "Profile", icon: User, color: "bg-gradient-to-br from-cyan-500 to-cyan-600" },
  ];

  // Show only first 4 menu items
  const visibleMenuItems = menuItems.slice(0, 4);

  return (
    <div className="mb-8 mx-4">
      {/* White container with proper padding and rounded corners */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="grid grid-cols-4 gap-3">
          {visibleMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <div
                key={item.id}
                className={`
                  cursor-pointer transition-all duration-300 hover:scale-105
                  ${isActive 
                    ? 'ring-2 ring-orange-500 shadow-lg shadow-orange-500/30 rounded-lg' 
                    : 'hover:shadow-md'
                  }
                `}
                onClick={() => onTabChange(item.id)}
              >
                <div className="p-2 text-center min-w-0">
                  <div className={`
                    w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1 
                    ${item.color} shadow-md
                    ${isActive ? 'scale-110' : ''}
                    transition-transform duration-200
                  `}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <p className={`
                    text-xs font-medium transition-colors duration-200 truncate
                    ${isActive ? 'text-orange-500' : 'text-slate-600'}
                  `}>
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SwipeableMenuGrid;
