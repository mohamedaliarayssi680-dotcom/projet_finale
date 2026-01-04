import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash,
  FiEye,
  FiPlus,
  FiSearch,
  FiFilter,
  FiX,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

// Types
type Commande = {
  id: number;
  reference: string;
  type: string;
  prix: number;
  nom: string;
  prenom: string;
  telephone: string;
  date: string; // format: "YYYY-MM-DD"
  statut: "Clôturé" | "En cours";
  statutP: "Payé" | "Non payé";
};

type Terrain = {
  id: number;
  commandeId: number;
  longitude: number;
  latitude: number;
};

// Données initiales
const initialCommandes: Commande[] = [
  {
    id: 1,
    reference: "CMD-2024-001",
    type: "Vente terrain",
    prix: 120000,
    nom: "Ben Salah",
    prenom: "Karim",
    telephone: "20 456 789",
    date: "2024-03-15",
    statut: "En cours",
    statutP: "Non payé",
  },
  {
    id: 2,
    reference: "CMD-2024-002",
    type: "Réservation",
    prix: 50000,
    nom: "Trabelsi",
    prenom: "Nadia",
    telephone: "21 123 456",
    date: "2024-02-28",
    statut: "Clôturé",
    statutP: "Payé",
  },
  {
    id: 3,
    reference: "CMD-2024-003",
    type: "Vente maison",
    prix: 350000,
    nom: "Gharbi",
    prenom: "Youssef",
    telephone: "98 765 432",
    date: "2024-04-10",
    statut: "En cours",
    statutP: "Non payé",
  },
];

const initialTerrains: Terrain[] = [
  { id: 101, commandeId: 1, longitude: 36.8065, latitude: 10.1815 },
  { id: 102, commandeId: 1, longitude: 36.8123, latitude: 10.1921 },
  { id: 201, commandeId: 2, longitude: 35.8245, latitude: 9.2654 },
  { id: 301, commandeId: 3, longitude: 37.1234, latitude: 11.4567 },
  { id: 302, commandeId: 3, longitude: 37.1256, latitude: 11.4589 },
];

export default function CommandesList() {
  const [commandes] = useState<Commande[]>(initialCommandes);
  const [terrains, setTerrains] = useState<Terrain[]>(initialTerrains);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatut, setFilterStatut] = useState<string>("all");
  const [filterStatutP, setFilterStatutP] = useState<string>("all");

  // Modales commande
  const [isCommandeModalOpen, setIsCommandeModalOpen] = useState(false);
  const [editingCommande, setEditingCommande] = useState<Commande | null>(null);
  const [isCommandeSuccessModalOpen, setIsCommandeSuccessModalOpen] =
    useState(false);
  const [commandeToDelete, setCommandeToDelete] = useState<Commande | null>(
    null
  );

  // Modales terrain
  const [isTerrainModalOpen, setIsTerrainModalOpen] = useState(false);
  const [editingTerrain, setEditingTerrain] = useState<Terrain | null>(null);
  const [terrainToDelete, setTerrainToDelete] = useState<Terrain | null>(null);
  const [selectedCommandeId, setSelectedCommandeId] = useState<number | null>(
    null
  );

  // Filtrage
  const filteredCommandes = commandes.filter((c) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.reference.toLowerCase().includes(q) ||
      c.nom.toLowerCase().includes(q) ||
      c.prenom.toLowerCase().includes(q) ||
      c.telephone.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q);
    const matchesStatut = filterStatut === "all" || c.statut === filterStatut;
    const matchesStatutP =
      filterStatutP === "all" || c.statutP === filterStatutP;
    return matchesSearch && matchesStatut && matchesStatutP;
  });

  // === COMMANDES ===
  const openAddCommande = () => {
    setEditingCommande(null);
    setIsCommandeModalOpen(true);
  };

  const openEditCommande = (commande: Commande) => {
    setEditingCommande(commande);
    setIsCommandeModalOpen(true);
  };

  const closeCommandeModal = () => setIsCommandeModalOpen(false);
  const closeCommandeSuccessModal = () => setIsCommandeSuccessModalOpen(false);

  const openDeleteCommandeConfirmation = (commande: Commande) => {
    setCommandeToDelete(commande);
  };

  const closeDeleteCommandeModal = () => setCommandeToDelete(null);

  const confirmDeleteCommande = () => {
    if (commandeToDelete) {
      setTerrains((prev) =>
        prev.filter((t) => t.commandeId !== commandeToDelete.id)
      );
      closeDeleteCommandeModal();
    }
  };

  const handleSaveCommande = (commande: Commande) => {
    closeCommandeModal();
    setIsCommandeSuccessModalOpen(true);
    setTimeout(() => setIsCommandeSuccessModalOpen(false), 3000);
  };

  // === TERRAINS ===
  const openAddTerrain = (commandeId: number) => {
    setSelectedCommandeId(commandeId);
    setEditingTerrain(null);
    setIsTerrainModalOpen(true);
  };

  const openEditTerrain = (terrain: Terrain) => {
    setEditingTerrain(terrain);
    setSelectedCommandeId(terrain.commandeId);
    setIsTerrainModalOpen(true);
  };

  const closeTerrainModal = () => {
    setIsTerrainModalOpen(false);
    setEditingTerrain(null);
    setSelectedCommandeId(null);
  };

  const openDeleteTerrainConfirmation = (terrain: Terrain) => {
    setTerrainToDelete(terrain);
  };

  const closeDeleteTerrainModal = () => setTerrainToDelete(null);

  const confirmDeleteTerrain = () => {
    if (terrainToDelete) {
      setTerrains((prev) => prev.filter((t) => t.id !== terrainToDelete.id));
      closeDeleteTerrainModal();
    }
  };

  const handleSaveTerrain = (terrain: Terrain) => {
    if (editingTerrain) {
      setTerrains((prev) =>
        prev.map((t) => (t.id === terrain.id ? terrain : t))
      );
    } else {
      setTerrains((prev) => [...prev, { ...terrain, id: Date.now() }]);
    }
    closeTerrainModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER STYLE CLIENTSLIST === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Liste des Commandes
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <FiSearch className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <FiFilter className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              >
                <option value="all">Statut</option>
                <option value="Clôturé">Clôturé</option>
                <option value="En cours">En cours</option>
              </select>
            </div>

            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <FiFilter className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterStatutP}
                onChange={(e) => setFilterStatutP(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              >
                <option value="all">Paiement</option>
                <option value="Payé">Payé</option>
                <option value="Non payé">Non payé</option>
              </select>
            </div>

            <button
              onClick={openAddCommande}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <FiPlus size={16} /> Nouvelle commande
            </button>
          </div>
        </div>

        {/* === TABLE STYLE CLIENTSLIST === */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Référence</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Prix (DT)</th>
                  <th className="p-4 font-semibold">Nom</th>
                  <th className="p-4 font-semibold">Prénom</th>
                  <th className="p-4 font-semibold">Téléphone</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Statut</th>
                  <th className="p-4 font-semibold">Paiement</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCommandes.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="p-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      Aucune commande trouvée.
                    </td>
                  </tr>
                )}
                {filteredCommandes.map((c) => {
                  const commandeTerrains = terrains.filter(
                    (t) => t.commandeId === c.id
                  );

                  return (
                    <React.Fragment key={c.id}>
                      {/* Ligne commande */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 border-b border-gray-100 dark:border-gray-800">
                        <td className="p-4 font-mono font-medium text-indigo-600 dark:text-indigo-400">
                          {c.reference}
                        </td>
                        <td className="p-4">{c.type}</td>
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          {c.prix.toLocaleString()} DT
                        </td>
                        <td className="p-4 font-medium">{c.nom}</td>
                        <td className="p-4">{c.prenom}</td>
                        <td className="p-4 whitespace-nowrap font-mono">
                          {c.telephone}
                        </td>
                        <td className="p-4">
                          {new Date(c.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              c.statut === "Clôturé"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {c.statut}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              c.statutP === "Payé"
                                ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                            }`}
                          >
                            {c.statutP}
                          </span>
                        </td>
                        <td
                          rowSpan={commandeTerrains.length > 0 ? 2 : 1}
                          className="p-4 align-top"
                        >
                          <div className="flex flex-col items-center gap-2.5">
                            <button
                              onClick={() => alert(`Détails : ${c.reference}`)}
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition shadow-sm"
                              aria-label="Voir"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => openEditCommande(c)}
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition shadow-sm"
                              aria-label="Modifier"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteCommandeConfirmation(c)}
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 transition shadow-sm"
                              aria-label="Supprimer"
                            >
                              <FiTrash size={18} />
                            </button>
                            <button
                              onClick={() => openAddTerrain(c.id)}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white text-xs font-medium shadow transition"
                              aria-label="Ajouter un terrain"
                            >
                              <FiPlus size={14} />
                              Terrain
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Terrains de la commande */}
                      {commandeTerrains.length > 0 && (
                        <tr className="bg-gray-50 dark:bg-gray-900/20">
                          <td colSpan={9} className="p-4">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                                <thead className="bg-gray-100 dark:bg-gray-800/50">
                                  <tr>
                                    <th className="p-2.5 font-semibold">
                                      Longitude
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Latitude
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {commandeTerrains.map((terrain) => (
                                    <tr
                                      key={terrain.id}
                                      className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/30"
                                    >
                                      <td className="p-2.5 font-mono">
                                        {terrain.longitude.toFixed(4)}
                                      </td>
                                      <td className="p-2.5 font-mono">
                                        {terrain.latitude.toFixed(4)}
                                      </td>
                                      <td className="p-2.5">
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() =>
                                              openEditTerrain(terrain)
                                            }
                                            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition"
                                            aria-label="Modifier terrain"
                                          >
                                            <FiEdit size={16} />
                                          </button>
                                          <button
                                            onClick={() =>
                                              openDeleteTerrainConfirmation(
                                                terrain
                                              )
                                            }
                                            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 transition"
                                            aria-label="Supprimer terrain"
                                          >
                                            <FiTrash size={16} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* === MODALES (inchangées) === */}
        {isCommandeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
              onClick={closeCommandeModal}
            ></div>
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={closeCommandeModal}
                aria-label="Fermer"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                {editingCommande
                  ? "Modifier la commande"
                  : "Ajouter une commande"}
              </h2>
              <CommandeForm
                commande={editingCommande}
                onCancel={closeCommandeModal}
                onSave={handleSaveCommande}
              />
            </div>
          </div>
        )}

        {isCommandeSuccessModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center transform transition-all">
              <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                <FiCheckCircle
                  className="text-emerald-600 dark:text-emerald-400"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Succès !
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                La commande a été enregistrée.
              </p>
              <button
                onClick={closeCommandeSuccessModal}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition shadow-md"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {commandeToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
              onClick={closeDeleteCommandeModal}
            ></div>
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-center transform transition-all">
              <div className="mx-auto w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                <FiAlertTriangle
                  className="text-rose-600 dark:text-rose-400"
                  size={28}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Supprimer cette commande ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Réf: <strong>{commandeToDelete.reference}</strong> – Tous les
                terrains associés seront supprimés.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeDeleteCommandeModal}
                  className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteCommande}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {isTerrainModalOpen && selectedCommandeId !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
              onClick={closeTerrainModal}
            ></div>
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={closeTerrainModal}
                aria-label="Fermer"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                {editingTerrain ? "Modifier le terrain" : "Ajouter un terrain"}
              </h2>
              <TerrainForm
                terrain={editingTerrain}
                commandeId={selectedCommandeId}
                onCancel={closeTerrainModal}
                onSave={handleSaveTerrain}
              />
            </div>
          </div>
        )}

        {terrainToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
              onClick={closeDeleteTerrainModal}
            ></div>
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-center transform transition-all">
              <div className="mx-auto w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                <FiAlertTriangle
                  className="text-amber-600 dark:text-amber-400"
                  size={28}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Supprimer ce terrain ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Lon: {terrainToDelete.longitude.toFixed(4)}, Lat:{" "}
                {terrainToDelete.latitude.toFixed(4)}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeDeleteTerrainModal}
                  className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteTerrain}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white transition"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============== FORMULAIRES ===============
function CommandeForm({
  commande,
  onSave,
  onCancel,
}: {
  commande: Commande | null;
  onSave: (c: Commande) => void;
  onCancel: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<Commande>(
    commande ?? {
      id: Date.now(),
      reference: "",
      type: "",
      prix: 0,
      nom: "",
      prenom: "",
      telephone: "",
      date: today,
      statut: "En cours",
      statutP: "Non payé",
    }
  );

  useEffect(() => {
    setForm(
      commande ?? {
        id: Date.now(),
        reference: "",
        type: "",
        prix: 0,
        nom: "",
        prenom: "",
        telephone: "",
        date: today,
        statut: "En cours",
        statutP: "Non payé",
      }
    );
  }, [commande, today]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: name === "prix" ? Number(value) : value,
        } as Commande)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.reference.trim() ||
      !form.nom.trim() ||
      !form.prenom.trim() ||
      !form.telephone.trim()
    ) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Référence <span className="text-rose-500">*</span>
          </label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="CMD-2024-001"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Type
          </label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="Vente, Réservation..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Prix (DT)
          </label>
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            min={0}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nom <span className="text-rose-500">*</span>
          </label>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Prénom <span className="text-rose-500">*</span>
          </label>
          <input
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Téléphone <span className="text-rose-500">*</span>
          </label>
          <input
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Statut
          </label>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="En cours">En cours</option>
            <option value="Clôturé">Clôturé</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Paiement
          </label>
          <select
            name="statutP"
            value={form.statutP}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="Non payé">Non payé</option>
            <option value="Payé">Payé</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-7 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition font-medium"
        >
          {commande ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}

function TerrainForm({
  terrain,
  commandeId,
  onSave,
  onCancel,
}: {
  terrain: Terrain | null;
  commandeId: number;
  onSave: (t: Terrain) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Terrain>(
    terrain ?? { id: Date.now(), commandeId, longitude: 0, latitude: 0 }
  );

  useEffect(() => {
    setForm(
      terrain ?? { id: Date.now(), commandeId, longitude: 0, latitude: 0 }
    );
  }, [terrain, commandeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseFloat(value) || 0 } as Terrain));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.longitude || !form.latitude) {
      alert("Veuillez entrer des coordonnées valides.");
      return;
    }
    onSave({ ...form, commandeId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Longitude <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            step="0.0001"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Latitude <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            step="0.0001"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-7 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg transition font-medium"
        >
          {terrain ? "Enregistrer" : "Ajouter le terrain"}
        </button>
      </div>
    </form>
  );
}
