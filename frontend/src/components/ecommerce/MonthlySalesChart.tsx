import { useState } from "react";
import { GiWheat, GiWateringCan, GiCorn } from "react-icons/gi"; // Icônes agriculture
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi"; // Icônes météo
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MoreDotIcon } from "../../icons";

export default function AgricultureCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Agriculture Insights
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <div
              onClick={closeDropdown}
              className="cursor-pointer px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-white/5"
            >
              View More
            </div>
            <div
              onClick={closeDropdown}
              className="cursor-pointer px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-white/5"
            >
              Refresh
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Cards Content */}
      <div className="grid grid-cols-5 gap-4 text-center">
        {/* Wheat Growth */}
        <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:shadow-lg dark:border-gray-800">
          <GiWheat className="text-green-500 text-4xl mb-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Wheat Growth
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Healthy Fields
          </span>
        </div>

        {/* Irrigation */}
        <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:shadow-lg dark:border-gray-800">
          <GiWateringCan className="text-blue-500 text-4xl mb-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Irrigation
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Optimal Watering
          </span>
        </div>

        {/* Corn Growth */}
        <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:shadow-lg dark:border-gray-800">
          <GiCorn className="text-yellow-500 text-4xl mb-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Corn Growth
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Field Status
          </span>
        </div>

        {/* Sunny Weather */}
        <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:shadow-lg dark:border-gray-800">
          <WiDaySunny className="text-orange-500 text-4xl mb-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Sunny
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Good for Crops
          </span>
        </div>

        {/* Rain Forecast */}
        <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:shadow-lg dark:border-gray-800">
          <WiRain className="text-blue-400 text-4xl mb-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Rain
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Irrigation Needed
          </span>
        </div>
      </div>
    </div>
  );
}
