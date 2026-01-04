import { FiEdit, FiEye, FiPlus, FiTrash } from "react-icons/fi";
import { Client, Terrain } from "./types";
import { TerrainsTable } from "./TerrainsTable";

export function ClientRow({
    client,
    clientTerrains,
    onViewDetails,
    onEditClient,
    onDeleteClient,
    onAddTerrain,
    onEditTerrain,
    onDeleteTerrain,
}: {
    client: Client;
    clientTerrains: Terrain[];
    onViewDetails: (client: Client) => void;
    onEditClient: (client: Client) => void;
    onDeleteClient: (client: Client) => void;
    onAddTerrain: (clientId: number) => void;
    onEditTerrain: (terrain: Terrain) => void;
    onDeleteTerrain: (terrain: Terrain) => void;
}) {
    return (
        <>
            <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {client.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {client.prenom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {client.login}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {client.telephone}
                </td>
                <td className="px-6 py-4 text-sm">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            client.statut === "payé"
                                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                : client.statut === "avance"
                                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                        }`}>
                        {client.statut}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {client.dt} DT
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {clientTerrains.length > 0
                        ? `${clientTerrains.length} terrain(s)`
                        : "Aucun"}
                </td>
                <td
                    colSpan={clientTerrains.length > 0 ? 2 : 1}
                    className="p-4 align-top">
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onViewDetails(client)}
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition shadow-sm"
                                aria-label="Voir détails">
                                <FiEye size={18} />
                            </button>
                            <button
                                onClick={() => onEditClient(client)}
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition shadow-sm"
                                aria-label="Modifier client">
                                <FiEdit size={18} />
                            </button>
                            <button
                                onClick={() => onDeleteClient(client)}
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 transition shadow-sm"
                                aria-label="Supprimer client">
                                <FiTrash size={18} />
                            </button>
                        </div>
                        <button
                            onClick={() => onAddTerrain(client.id)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white text-xs font-medium shadow transition"
                            aria-label="Ajouter un terrain">
                            <FiPlus size={14} />
                            Terrain
                        </button>
                    </div>
                </td>
            </tr>
            {clientTerrains.length > 0 && (
                <TerrainsTable
                    terrains={clientTerrains}
                    onEditTerrain={onEditTerrain}
                    onDeleteTerrain={onDeleteTerrain}
                />
            )}
        </>
    );
}
