import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

const forecast = [
  { day: "Mon", icon: <WiDaySunny size={30} />, temp: "25°C" },
  { day: "Tue", icon: <WiCloud size={30} />, temp: "22°C" },
  { day: "Wed", icon: <WiRain size={30} />, temp: "20°C" },
  { day: "Thu", icon: <WiDaySunny size={30} />, temp: "27°C" },
  { day: "Fri", icon: <WiCloud size={30} />, temp: "23°C" },
  { day: "Sat", icon: <WiRain size={30} />, temp: "19°C" },
  { day: "Sun", icon: <WiSnow size={30} />, temp: "0°C" },
];

export default function WeatherCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 w-full">
      {/* En-tête météo */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Weather Today
          </h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Current weather and 7-day forecast
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
            25°C
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Max 28°C • Min 18°C
          </p>
        </div>
      </div>

      {/* Prévision 7 jours */}
      <div className="grid grid-cols-7 gap-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-xl bg-gray-100 p-3 dark:bg-gray-800"
          >
            <span className="text-gray-500 text-sm dark:text-gray-400">
              {day.day}
            </span>
            <div className="my-2">{day.icon}</div>
            <span className="text-gray-800 font-semibold dark:text-white/90">
              {day.temp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
