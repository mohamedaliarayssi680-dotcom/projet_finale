import { useState } from "react";
import { Client } from "./types";

export default function ClientForm({
    client,
    onSave,
    onCancel,
}: {
    client: Client | null;
    onSave: (c: Client) => void;
    onCancel: () => void;
}) {
    const [form, setForm] = useState<Client>(
        client ?? {
            id: Date.now(),
            nom: "",
            prenom: "",
            login: "",
            telephone: "",
            statut: "non payé",
            dt: 0,
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(
            (prev) =>
                ({
                    ...prev,
                    [name]: name === "dt" ? Number(value) : value,
                } as Client)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !form.nom.trim() ||
            !form.prenom.trim() ||
            !form.login.trim() ||
            !form.telephone.trim()
        ) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom *
                </label>
                <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom *
                </label>
                <input
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Login *
                </label>
                <input
                    type="text"
                    name="login"
                    value={form.login}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone *
                </label>
                <input
                    type="text"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Statut
                </label>
                <select
                    name="statut"
                    value={form.statut}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="payé">Payé</option>
                    <option value="avance">Avance</option>
                    <option value="non payé">Non payé</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Montant (DT)
                </label>
                <input
                    type="number"
                    name="dt"
                    value={form.dt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                    {client ? "Enregistrer" : "Ajouter"}
                </button>
            </div>
        </form>
    );
}
