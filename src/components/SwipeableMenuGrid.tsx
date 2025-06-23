
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  ];

  const itemGroups = [];
  for (let i = 0; i < menuItems.length; i += 3) {
    itemGroups.push(menuItems.slice(i, i + 3));
  }

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {itemGroups.map((group, groupIndex) => (
              <CarouselItem key={groupIndex} className="pl-1 pr-1">
                <div className="grid grid-cols-3 gap-2">
                  {group.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
                        onClick={() => onTabChange(item.id)}
                      >
                        <div className="p-2 text-center min-w-0">
                          <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1
                            ${item.color} shadow-md transition-transform duration-200`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-xs font-medium transition-colors duration-200 truncate text-slate-600">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows visible on md+ only */}
          {itemGroups.length > 1 && (
            <>
              <CarouselPrevious className="left-1 w-8 h-8 bg-slate-100/90 border-slate-300 text-slate-600 hover:bg-slate-200 hidden md:flex" />
              <CarouselNext className="right-1 w-8 h-8 bg-slate-100/90 border-slate-300 text-slate-600 hover:bg-slate-200 hidden md:flex" />
            </>
          )}
        </Carousel>

        {/* Pagination dots */}
        {itemGroups.length > 1 && (
          <div className="flex justify-center mt-3 space-x-1">
            {itemGroups.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-slate-300" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableMenuGrid;
