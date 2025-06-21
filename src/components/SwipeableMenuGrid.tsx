
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

  // Split items into groups of 5
  const itemGroups = [];
  for (let i = 0; i < menuItems.length; i += 5) {
    itemGroups.push(menuItems.slice(i, i + 5));
  }

  return (
    <div className="mb-8">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {itemGroups.map((group, groupIndex) => (
            <CarouselItem key={groupIndex} className="basis-full">
              <div className="grid grid-cols-5 gap-3 px-2">
                {group.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Card
                      key={item.id}
                      className={`
                        cursor-pointer transition-all duration-300 hover:scale-105 border-0 
                        ${isActive 
                          ? 'ring-2 ring-orange-500 shadow-lg shadow-orange-500/30' 
                          : 'hover:shadow-md'
                        }
                      `}
                      onClick={() => onTabChange(item.id)}
                    >
                      <div className="p-3 text-center">
                        <div className={`
                          w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 
                          ${item.color} shadow-lg
                          ${isActive ? 'scale-110' : ''}
                          transition-transform duration-200
                        `}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <p className={`
                          text-xs font-medium transition-colors duration-200
                          ${isActive ? 'text-orange-400' : 'text-slate-300'}
                        `}>
                          {item.label}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {itemGroups.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700" />
            <CarouselNext className="right-2 bg-slate-800/80 border-slate-600 text-white hover:bg-slate-700" />
          </>
        )}
      </Carousel>
      
      {/* Pagination dots */}
      {itemGroups.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {itemGroups.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-slate-600 opacity-50"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwipeableMenuGrid;
