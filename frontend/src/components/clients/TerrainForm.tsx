import { useState } from "react";
import { Terrain } from "./types";

export default function TerrainForm({
    terrain,
    clientId,
    onSave,
    onCancel,
}: {
    terrain: Terrain | null;
    clientId: number;
    onSave: (t: Terrain) => void;
    onCancel: () => void;
}) {
    const [form, setForm] = useState<Terrain>(
        terrain ?? {
            id: Date.now(),
            clientId,
            longueur: 0,
            largeur: 0,
            statut: "disponible",
            informe: "Non",
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value } as Terrain));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.longueur <= 0 || form.largeur <= 0) {
            alert("La longueur et la largeur doivent être supérieures à 0.");
            return;
        }
        onSave({ ...form, clientId });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Longueur (m) *
                </label>
                <input
                    type="number"
                    name="longueur"
                    value={form.longueur}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Largeur (m) *
                </label>
                <input
                    type="number"
                    name="largeur"
                    value={form.largeur}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Statut du terrain
                </label>
                <select
                    name="statut"
                    value={form.statut}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="disponible">Disponible</option>
                    <option value="réservé">Réservé</option>
                    <option value="vendu">Vendu</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client informé ?
                </label>
                <select
                    name="informe"
                    value={form.informe}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                </select>
            </div>
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    Annuler
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition">
                    {terrain ? "Enregistrer" : "Ajouter le terrain"}
                </button>
            </div>
        </form>
    );
}
