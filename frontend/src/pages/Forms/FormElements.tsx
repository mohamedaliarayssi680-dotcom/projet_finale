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
type Client = {
  id: number;
  nom: string;
  prenom: string;
  login: string;
  telephone: string;
  statut: "payé" | "avance" | "non payé";
  dt: number;
};

type Terrain = {
  id: number;
  clientId: number;
  longueur: number; // en mètres
  largeur: number; // en mètres
  statut: "disponible" | "réservé" | "vendu";
  informe: "Oui" | "Non";
};

// ✅ Données clients réalistes
const initialClients: Client[] = [
  {
    id: 1,
    nom: "Ben Salah",
    prenom: "Karim",
    login: "karim.bs",
    telephone: "20 456 789",
    statut: "payé",
    dt: 1200,
  },
  {
    id: 2,
    nom: "Trabelsi",
    prenom: "Nadia",
    login: "n.trabelsi",
    telephone: "21 123 456",
    statut: "avance",
    dt: 500,
  },
  {
    id: 3,
    nom: "Gharbi",
    prenom: "Youssef",
    login: "y.gharbi",
    telephone: "98 765 432",
    statut: "non payé",
    dt: 0,
  },
  {
    id: 4,
    nom: "Zouari",
    prenom: "Leila",
    login: "l.zouari",
    telephone: "22 333 444",
    statut: "payé",
    dt: 950,
  },
];

// ✅ Données terrains réalistes (sans "nom")
const initialTerrains: Terrain[] = [
  {
    id: 101,
    clientId: 1,
    longueur: 25,
    largeur: 20,
    statut: "vendu",
    informe: "Oui",
  },
  {
    id: 102,
    clientId: 1,
    longueur: 30,
    largeur: 15,
    statut: "réservé",
    informe: "Non",
  },
  {
    id: 201,
    clientId: 2,
    longueur: 20,
    largeur: 20,
    statut: "disponible",
    informe: "Oui",
  },
  {
    id: 202,
    clientId: 2,
    longueur: 35,
    largeur: 10,
    statut: "disponible",
    informe: "Non",
  },
  {
    id: 401,
    clientId: 4,
    longueur: 40,
    largeur: 25,
    statut: "vendu",
    informe: "Oui",
  },
];

export default function ClientsList() {
  const [clients] = useState<Client[]>(initialClients);
  const [terrains, setTerrains] = useState<Terrain[]>(initialTerrains);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatut, setFilterStatut] = useState<string>("all");

  // Modales client
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isClientSuccessModalOpen, setIsClientSuccessModalOpen] =
    useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Modales terrain
  const [isTerrainModalOpen, setIsTerrainModalOpen] = useState(false);
  const [editingTerrain, setEditingTerrain] = useState<Terrain | null>(null);
  const [terrainToDelete, setTerrainToDelete] = useState<Terrain | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  // Filtrage clients
  const filteredClients = clients.filter((c) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      c.nom.toLowerCase().includes(q) ||
      c.prenom.toLowerCase().includes(q) ||
      c.telephone.toLowerCase().includes(q) ||
      c.login.toLowerCase().includes(q);
    const matchesFilter = filterStatut === "all" || c.statut === filterStatut;
    return matchesSearch && matchesFilter;
  });

  // === CLIENTS ===
  const openAddClient = () => {
    setEditingClient(null);
    setIsClientModalOpen(true);
  };

  const openEditClient = (client: Client) => {
    setEditingClient(client);
    setIsClientModalOpen(true);
  };

  const closeClientModal = () => setIsClientModalOpen(false);
  const closeClientSuccessModal = () => setIsClientSuccessModalOpen(false);

  const openDeleteClientConfirmation = (client: Client) => {
    setClientToDelete(client);
  };

  const closeDeleteClientModal = () => setClientToDelete(null);

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      setTerrains((prev) =>
        prev.filter((t) => t.clientId !== clientToDelete.id)
      );
      closeDeleteClientModal();
    }
  };

  const handleSaveClient = (client: Client) => {
    closeClientModal();
    setIsClientSuccessModalOpen(true);
    setTimeout(() => setIsClientSuccessModalOpen(false), 3000);
  };

  // === TERRAINS ===
  const openAddTerrain = (clientId: number) => {
    setSelectedClientId(clientId);
    setEditingTerrain(null);
    setIsTerrainModalOpen(true);
  };

  const openEditTerrain = (terrain: Terrain) => {
    setEditingTerrain(terrain);
    setSelectedClientId(terrain.clientId);
    setIsTerrainModalOpen(true);
  };

  const closeTerrainModal = () => {
    setIsTerrainModalOpen(false);
    setEditingTerrain(null);
    setSelectedClientId(null);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header
        className={`sticky top-0 z-20 bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-700/20 transition-all duration-300 ${
          isClientModalOpen ||
          clientToDelete ||
          isTerrainModalOpen ||
          terrainToDelete
            ? "hidden"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Gestion des Clients & Terrains
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 shadow-inner w-64">
              <FiSearch className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-2 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-300 text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 shadow-inner">
              <FiFilter className="text-gray-500 dark:text-gray-300 mr-2" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="payé">Payé</option>
                <option value="avance">Avance</option>
                <option value="non payé">Non payé</option>
              </select>
            </div>

            <button
              onClick={openAddClient}
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition dark:from-blue-700 dark:to-indigo-700"
            >
              <FiPlus /> Nouveau client
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700/30 transition">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Nom</th>
                  <th className="p-4 font-semibold">Prénom</th>
                  <th className="p-4 font-semibold">Login</th>
                  <th className="p-4 font-semibold">Téléphone</th>
                  <th className="p-4 font-semibold">Statut</th>
                  <th className="p-4 font-semibold">DT</th>
                  <th className="p-4 font-semibold">Terrains</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                )}
                {filteredClients.map((c) => {
                  const clientTerrains = terrains.filter(
                    (t) => t.clientId === c.id
                  );

                  return (
                    <React.Fragment key={c.id}>
                      {/* Ligne client */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 border-b border-gray-100 dark:border-gray-800">
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          {c.nom}
                        </td>
                        <td className="p-4">{c.prenom}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          {c.login}
                        </td>
                        <td className="p-4 whitespace-nowrap font-mono">
                          {c.telephone}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              c.statut === "payé"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                : c.statut === "avance"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                            }`}
                          >
                            {c.statut}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                          {c.dt} DT
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {clientTerrains.length > 0
                              ? `${clientTerrains.length} terrain(s)`
                              : "Aucun"}
                          </span>
                        </td>
                        <td
                          rowSpan={clientTerrains.length > 0 ? 2 : 1}
                          className="p-4 align-top"
                        >
                          <div className="flex flex-col items-center gap-2.5">
                            <button
                              onClick={() =>
                                alert(`Détails de : ${c.prenom} ${c.nom}`)
                              }
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition shadow-sm"
                              aria-label="Voir détails"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => openEditClient(c)}
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-amber-600 dark:text-amber-400 transition shadow-sm"
                              aria-label="Modifier client"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteClientConfirmation(c)}
                              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400 transition shadow-sm"
                              aria-label="Supprimer client"
                            >
                              <FiTrash size={18} />
                            </button>
                            {/* ✅ Bouton "Ajouter un terrain" avec texte */}
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

                      {/* Terrains du client */}
                      {clientTerrains.length > 0 && (
                        <tr className="bg-gray-50 dark:bg-gray-900/20">
                          <td colSpan={7} className="p-4">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                                <thead className="bg-gray-100 dark:bg-gray-800/50">
                                  <tr>
                                    <th className="p-2.5 font-semibold">
                                      Longueur (m)
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Largeur (m)
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Statut
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Informé
                                    </th>
                                    <th className="p-2.5 font-semibold">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {clientTerrains.map((terrain) => (
                                    <tr
                                      key={terrain.id}
                                      className="border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/30"
                                    >
                                      <td className="p-2.5 font-medium text-gray-900 dark:text-white">
                                        {terrain.longueur}
                                      </td>
                                      <td className="p-2.5 text-gray-700 dark:text-gray-300">
                                        {terrain.largeur}
                                      </td>
                                      <td className="p-2.5">
                                        <span
                                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                            terrain.statut === "disponible"
                                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                              : terrain.statut === "réservé"
                                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                              : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                          }`}
                                        >
                                          {terrain.statut
                                            .charAt(0)
                                            .toUpperCase() +
                                            terrain.statut.slice(1)}
                                        </span>
                                      </td>
                                      <td className="p-2.5">
                                        <span
                                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                            terrain.informe === "Oui"
                                              ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                                              : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                                          }`}
                                        >
                                          {terrain.informe}
                                        </span>
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
      </main>

      {/* === MODALES CLIENTS === */}
      {isClientModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
            onClick={closeClientModal}
          ></div>
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeClientModal}
              aria-label="Fermer"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
              {editingClient
                ? "Modifier le client"
                : "Ajouter un nouveau client"}
            </h2>
            <ClientForm
              client={editingClient}
              onCancel={closeClientModal}
              onSave={handleSaveClient}
            />
          </div>
        </div>
      )}

      {isClientSuccessModalOpen && (
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
              Le client a été enregistré avec succès.
            </p>
            <button
              onClick={closeClientSuccessModal}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition shadow-md"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {clientToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-black/60"
            onClick={closeDeleteClientModal}
          ></div>
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-center transform transition-all">
            <div className="mx-auto w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
              <FiAlertTriangle
                className="text-rose-600 dark:text-rose-400"
                size={28}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Confirmer la suppression ?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Vous allez supprimer{" "}
              <strong>
                {clientToDelete.prenom} {clientToDelete.nom}
              </strong>{" "}
              et tous ses terrains.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={closeDeleteClientModal}
                className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteClient}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-600 text-white transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODALES TERRAINS === */}
      {isTerrainModalOpen && selectedClientId !== null && (
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
              clientId={selectedClientId}
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
              Terrain : {terrainToDelete.longueur}m × {terrainToDelete.largeur}m
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
  );
}

// =============== FORMULAIRES ===============
function ClientForm({
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

  useEffect(() => {
    setForm(
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
  }, [client]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(
      (prev) =>
        ({ ...prev, [name]: name === "dt" ? Number(value) : value } as Client)
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nom <span className="text-rose-500">*</span>
          </label>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="Ex: Ben Salah"
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
            placeholder="Ex: Karim"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Login <span className="text-rose-500">*</span>
          </label>
          <input
            name="login"
            value={form.login}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            placeholder="karim.bs"
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
            placeholder="20 123 456"
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
            <option value="payé">Payé</option>
            <option value="avance">Avance</option>
            <option value="non payé">Non payé</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Montant (DT)
          </label>
          <input
            type="number"
            name="dt"
            value={String(form.dt)}
            onChange={handleChange}
            min={0}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
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
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition font-medium"
        >
          {client ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </form>
  );
}

function TerrainForm({
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

  useEffect(() => {
    setForm(
      terrain ?? {
        id: Date.now(),
        clientId,
        longueur: 0,
        largeur: 0,
        statut: "disponible",
        informe: "Non",
      }
    );
  }, [terrain, clientId]);

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Longueur (m) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="longueur"
            value={form.longueur}
            onChange={handleChange}
            min={0.1}
            step={0.1}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Largeur (m) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            name="largeur"
            value={form.largeur}
            onChange={handleChange}
            min={0.1}
            step={0.1}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Statut du terrain
          </label>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="disponible">Disponible</option>
            <option value="réservé">Réservé</option>
            <option value="vendu">Vendu</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Client informé ?
          </label>
          <select
            name="informe"
            value={form.informe}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
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
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg transition font-medium"
        >
          {terrain ? "Enregistrer" : "Ajouter le terrain"}
        </button>
      </div>
    </form>
  );
}
