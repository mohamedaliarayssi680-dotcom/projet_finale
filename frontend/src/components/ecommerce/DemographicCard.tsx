import { FiDroplet, FiBox, FiUsers } from "react-icons/fi";
import { GiWheat } from "react-icons/gi"; // remplacé FiSeed
import Badge from "../ui/badge/Badge";

export default function AgricultureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
      {/* Card 1 : Water Usage */}
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl dark:bg-blue-800">
          <FiDroplet className="text-blue-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Eau utilisée (L)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 dark:text-white/90">
              3,500
            </h4>
          </div>
          <Badge color="error">4.5%</Badge>
        </div>
      </div>

      {/* Card 2 : Equipment */}
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl dark:bg-green-800">
          <FiBox className="text-green-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Équipements
            </span>
            <h4 className="mt-2 font-bold text-gray-800 dark:text-white/90">
              120
            </h4>
          </div>
          <Badge color="success">7.2%</Badge>
        </div>
      </div>

      {/* Card 3 : Workers */}
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-xl dark:bg-yellow-800">
          <FiUsers className="text-yellow-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Travailleurs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 dark:text-white/90">
              35
            </h4>
          </div>
          <Badge color="success">10%</Badge>
        </div>
      </div>

      {/* Card 4 : Seeds */}
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-xl dark:bg-orange-800">
          <GiWheat className="text-orange-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Graines plantées
            </span>
            <h4 className="mt-2 font-bold text-gray-800 dark:text-white/90">
              1,200
            </h4>
          </div>
          <Badge color="success">6.7%</Badge>
        </div>
      </div>
    </div>
  );
}
