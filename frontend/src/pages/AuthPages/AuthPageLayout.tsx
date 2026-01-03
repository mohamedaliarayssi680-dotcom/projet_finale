import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import {
  TbTractor,
  TbDrone,
  TbSpray,
  TbTools, // ✅ Outils (remplace TbPlow)
  TbBuilding, // ✅ Bâtiment (remplace TbBarn)
  TbPlant2,
  TbGrain, // ✅ Graines / céréales (meilleur que TbWheat)
  TbChartLine,
} from "react-icons/tb";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen bg-white dark:bg-gray-900">
      {/* Côté formulaire */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        {children}
      </div>

      {/* Côté illustration : Matériels agricoles modernes */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-blue-900 dark:to-teal-950">
        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <GridShape />
        </div>

        {/* Halo bleuté */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-200/20 via-transparent to-cyan-200/20 dark:from-blue-900/30 dark:to-cyan-900/20"></div>

        {/* Fond tech : données */}
        <TbChartLine className="absolute top-10 left-10 w-20 h-20 text-blue-300/50 dark:text-cyan-700 z-0" />
        <TbChartLine className="absolute bottom-10 right-10 w-24 h-24 text-cyan-300/50 dark:text-blue-700 rotate-12 z-0" />

        {/* Grille d'icônes agricoles (sûres) */}
        <div className="relative flex items-center justify-center w-full h-full z-10 px-8">
          <div className="relative grid grid-cols-3 gap-6 w-full max-w-2xl aspect-square">
            {/* Ligne 1 */}
            <TbDrone className="text-6xl sm:text-7xl text-blue-500 dark:text-cyan-400 drop-shadow-lg animate-bounce delay-100" />
            <TbTractor className="text-7xl sm:text-8xl text-blue-600 dark:text-cyan-300 drop-shadow-lg animate-pulse" />
            <TbSpray className="text-6xl sm:text-7xl text-sky-400 dark:text-blue-300 drop-shadow-lg animate-bounce delay-200" />

            {/* Ligne 2 */}
            <TbBuilding className="text-6xl sm:text-7xl text-blue-400 dark:text-cyan-500 drop-shadow-lg animate-bounce delay-300" />
            <TbPlant2 className="text-5xl sm:text-6xl text-emerald-400 dark:text-lime-300 drop-shadow animate-bounce delay-150" />
            <TbGrain className="text-6xl sm:text-7xl text-amber-300 dark:text-yellow-200 drop-shadow-lg animate-bounce delay-250" />

            {/* Ligne 3 - Outils centrés */}
            <TbTools className="text-6xl sm:text-7xl text-blue-500 dark:text-blue-400 drop-shadow-lg animate-bounce delay-350 col-start-2 justify-self-center" />
          </div>
        </div>
      </div>

      {/* Bouton de changement de thème */}
      <div className="fixed z-50 bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
