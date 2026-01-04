import { FiEdit, FiTrash } from "react-icons/fi";
import { Terrain } from "./types";

export default function TerrainRow({
    terrain,
    onEdit,
    onDelete,
}: {
    terrain: Terrain;
    onEdit: (terrain: Terrain) => void;
    onDelete: (terrain: Terrain) => void;
}) {
    return (
        <tr className="border-t border-gray-100 dark:border-gray-700">
            <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                {terrain.longueur}
            </td>
            <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                {terrain.largeur}
            </td>
            <td className="px-6 py-3 text-sm">
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        terrain.statut === "vendu"
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : terrain.statut === "réservé"
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                            : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    }`}>
                    {terrain.statut.charAt(0).toUpperCase() +
                        terrain.statut.slice(1)}
                </span>
            </td>
            <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">
                {terrain.informe}
            </td>
            <td className="px-6 py-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(terrain)}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition"
                        aria-label="Modifier terrain">
                        <FiEdit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(terrain)}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 transition"
                        aria-label="Supprimer terrain">
                        <FiTrash size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
