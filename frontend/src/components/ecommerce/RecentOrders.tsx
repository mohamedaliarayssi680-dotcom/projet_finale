import { useState, ReactElement } from "react";
import Badge from "../ui/badge/Badge";
import { WiDaySunny, WiRain, WiCloud } from "react-icons/wi";
import { GiWheat, GiCorn, GiTomato } from "react-icons/gi";

interface FarmData {
  id: number;
  name: string;
  crop: string;
  temperature: string;
  humidity: string;
  weather: "Sunny" | "Rainy" | "Cloudy";
  icon: ReactElement;
}

const farmData: FarmData[] = [
  {
    id: 1,
    name: "North Farm",
    crop: "Wheat",
    temperature: "28°C",
    humidity: "65%",
    weather: "Sunny",
    icon: <GiWheat className="text-yellow-500 w-16 h-16" />,
  },
  {
    id: 2,
    name: "Green Valley",
    crop: "Corn",
    temperature: "24°C",
    humidity: "70%",
    weather: "Cloudy",
    icon: <GiCorn className="text-green-500 w-16 h-16" />,
  },
  {
    id: 3,
    name: "Sunny Fields",
    crop: "Tomato",
    temperature: "30°C",
    humidity: "55%",
    weather: "Sunny",
    icon: <GiTomato className="text-red-500 w-16 h-16" />,
  },
  {
    id: 4,
    name: "Rainy Hills",
    crop: "Rice",
    temperature: "22°C",
    humidity: "80%",
    weather: "Rainy",
    icon: <GiWheat className="text-blue-500 w-16 h-16" />, // Remplacement de GiRice par GiWheat
  },
];

export default function AgricultureDashboard() {
  const [filter, setFilter] = useState<"All" | "Sunny" | "Rainy" | "Cloudy">(
    "All"
  );

  const filteredData =
    filter === "All" ? farmData : farmData.filter((f) => f.weather === filter);

  const weatherIcon = (weather: string) => {
    if (weather === "Sunny")
      return <WiDaySunny className="w-6 h-6 text-yellow-400" />;
    if (weather === "Rainy")
      return <WiRain className="w-6 h-6 text-blue-400" />;
    return <WiCloud className="w-6 h-6 text-gray-400" />;
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Agriculture & Weather Dashboard
        </h2>
        <div className="flex gap-2">
          {["All", "Sunny", "Rainy", "Cloudy"].map((w) => (
            <button
              key={w}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  filter === w
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              onClick={() => setFilter(w as any)}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((farm) => (
          <div
            key={farm.id}
            className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-500 bg-white dark:bg-gray-800 flex flex-col items-center p-6"
          >
            <div className="mb-4">{farm.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {farm.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-300">{farm.crop}</p>
            <div className="flex justify-between items-center w-full mt-3">
              <span className="text-gray-700 dark:text-gray-200">
                {farm.temperature} | {farm.humidity}
              </span>
              {weatherIcon(farm.weather)}
            </div>
            <Badge
              size="sm"
              color={
                farm.weather === "Sunny"
                  ? "success"
                  : farm.weather === "Rainy"
                  ? "info"
                  : "warning"
              }
              className="mt-3"
            >
              {farm.weather}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
