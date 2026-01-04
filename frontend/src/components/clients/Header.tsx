import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";

export default function Header({
    searchTerm,
    onSearchChange,
    filterStatut,
    onFilterChange,
    onAddClient,
}: {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filterStatut: string;
    onFilterChange: (value: string) => void;
    onAddClient: () => void;
}) {
    return (
        <div className="mb-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gestion des Clients & Terrains
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <FiSearch className="text-gray-400 dark:text-gray-300" />
                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="ml-2 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-300 text-gray-800 dark:text-white"
                    />
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <FiFilter className="text-gray-400 dark:text-gray-300" />
                    <select
                        value={filterStatut}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="bg-transparent outline-none text-sm text-gray-800 dark:text-white">
                        <option value="all">Tous les statuts</option>
                        <option value="payé">Payé</option>
                        <option value="avance">Avance</option>
                        <option value="non payé">Non payé</option>
                    </select>
                </div>
                <button
                    onClick={onAddClient}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium shadow-md transition">
                    <FiPlus size={18} />
                    Nouveau client
                </button>
            </div>
        </div>
    );
}
