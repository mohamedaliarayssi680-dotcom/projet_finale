import TerrainRow from "./TerrainRow";
import { Terrain } from "./types";

export function TerrainsTable({
    terrains,
    onEditTerrain,
    onDeleteTerrain,
}: {
    terrains: Terrain[];
    onEditTerrain: (terrain: Terrain) => void;
    onDeleteTerrain: (terrain: Terrain) => void;
}) {
    return (
        <tr>
            <td colSpan={8} className="p-0">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Longueur (m)
                                </th>
                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Largeur (m)
                                </th>
                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Statut
                                </th>
                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Informé
                                </th>
                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {terrains.map((terrain) => (
                                <TerrainRow
                                    key={terrain.id}
                                    terrain={terrain}
                                    onEdit={onEditTerrain}
                                    onDelete={onDeleteTerrain}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
}
