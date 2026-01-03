import React, { useState } from "react";
import { FiEdit, FiPlus, FiTrash, FiX, FiCheckCircle } from "react-icons/fi";

type Terrain = {
  id: number;
  long: number;
  hat: number;
  statut: "pas de maladie" | "roulle jaune" | "autre";
  informé: "oui" | "non";
};

type TerrainTableProps = {
  clientId: number;
  clientName: string;
};

export default function TerrainTable({
  clientId,
  clientName,
}: TerrainTableProps) {
  // ✅ Données initiales (simulées — à remplacer par un appel API plus tard)
  const [terrains, setTerrains] = useState<Terrain[]>([
    {
      id: 1,
      long: 150,
      hat: 80,
      statut: "pas de maladie",
      informé: "oui",
    },
    {
      id: 2,
      long: 200,
      hat: 120,
      statut: "roulle jaune",
      informé: "non",
    },
  ]);

  // ✅ États modaux
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTerrain, setEditingTerrain] = useState<Terrain | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [terrainToDelete, setTerrainToDelete] = useState<Terrain | null>(null);

  // ✅ Ouvrir formulaire d’ajout
  const openAdd = () => {
    setEditingTerrain(null);
    setIsModalOpen(true);
  };

  // ✅ Ouvrir formulaire d’édition
  const openEdit = (terrain: Terrain) => {
    setEditingTerrain(terrain);
    setIsModalOpen(true);
  };

  // ✅ Fermer modals
  const closeModal = () => setIsModalOpen(false);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const closeDeleteModal = () => setTerrainToDelete(null);

  // ✅ Sauvegarder terrain
  const handleSave = (terrain: Terrain) => {
    if (editingTerrain) {
      setTerrains((prev) =>
        prev.map((t) => (t.id === terrain.id ? terrain : t))
      );
    } else {
      setTerrains((prev) => [{ ...terrain, id: Date.now() }, ...prev]);
    }
    closeModal();
    setIsSuccessModalOpen(true);
    setTimeout(() => setIsSuccessModalOpen(false), 3000);
  };

  // ✅ Suppression
  const openDeleteConfirmation = (terrain: Terrain) => {
    setTerrainToDelete(terrain);
  };

  const confirmDelete = () => {
    if (terrainToDelete) {
      setTerrains((prev) => prev.filter((t) => t.id !== terrainToDelete.id));
      closeDeleteModal();
    }
  };

  return (
    <div className="mt-6 border-t pt-6 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Terrains de {clientName}
        </h3>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm transition"
        >
          <FiPlus size={16} /> Ajouter Terrain
        </button>
      </div>

      {terrains.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">
          Aucun terrain enregistré.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-900/30 uppercase tracking-wider">
              <tr>
                <th className="p-3">Long (m)</th>
                <th className="p-3">Hat</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Informé</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {terrains.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                >
                  <td className="p-3 font-medium">{t.long}</td>
                  <td className="p-3">{t.hat}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        t.statut === "pas de maladie"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : t.statut === "roulle jaune"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {t.statut}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        t.informé === "oui"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {t.informé}
                    </span>
                  </td>
                  <td className="p-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-yellow-600 dark:text-yellow-400"
                      aria-label="Modifier"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteConfirmation(t)}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                      aria-label="Supprimer"
                    >
                      <FiTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeModal}
            >
              <FiX size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              {editingTerrain ? "Modifier le terrain" : "Ajouter un terrain"}
            </h3>
            <TerrainForm
              terrain={editingTerrain}
              onSave={handleSave}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}

      {/* MODAL SUCCÈS */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          <div className="relative w-full max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <FiCheckCircle
                className="text-green-600 dark:text-green-400"
                size={24}
              />
            </div>
            <p className="text-gray-800 dark:text-white font-medium">
              Terrain enregistré avec succès !
            </p>
            <button
              onClick={closeSuccessModal}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMATION SUPPRESSION */}
      {terrainToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
            onClick={closeDeleteModal}
          ></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-3">
              <FiTrash className="text-red-600 dark:text-red-400" size={24} />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-white">
              Confirmer la suppression ?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3 mt-5 justify-center">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------- FORMULAIRE TERRAIN -------------------- */
function TerrainForm({
  terrain,
  onSave,
  onCancel,
}: {
  terrain: Terrain | null;
  onSave: (t: Terrain) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Terrain>(
    terrain ?? {
      id: Date.now(),
      long: 0,
      hat: 0,
      statut: "pas de maladie",
      informé: "non",
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
          [name]: name === "long" || name === "hat" ? Number(value) : value,
        } as Terrain)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.long <= 0 || form.hat <= 0) {
      alert("Veuillez entrer des valeurs valides pour Long et Hat.");
      return;
    }
    onSave({ ...form, id: terrain?.id ?? Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Long (m)
        </label>
        <input
          type="number"
          name="long"
          min="0"
          step="0.1"
          value={form.long}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hat
        </label>
        <input
          type="number"
          name="hat"
          min="0"
          step="0.1"
          value={form.hat}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Statut
        </label>
        <select
          name="statut"
          value={form.statut}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pas de maladie">Pas de maladie</option>
          <option value="roulle jaune">Roulle jaune</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Informé
        </label>
        <select
          name="informé"
          value={form.informé}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm"
        >
          {terrain ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
