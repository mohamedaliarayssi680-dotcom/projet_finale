import { useState } from "react";
import {
    Client,
    initialClients,
    initialTerrains,
    Terrain,
} from "../../components/clients/types";
import Header from "../../components/clients/Header";
import TableHeader from "../../components/clients/TableHeader";
import EmptyState from "../../components/clients/EmptyState";
import { ClientRow } from "../../components/clients/ClientRow";
import Modal from "../../components/clients/Modal";
import ClientForm from "../../components/clients/ClientForm";
import SuccessModal from "../../components/clients/SuccessModal";
import ConfirmationModal from "../../components/clients/ConfirmationModal";
import TerrainForm from "../../components/clients/TerrainForm";

export default function ClientsList() {
    const [clients] = useState<Client[]>(initialClients);
    const [terrains, setTerrains] = useState(initialTerrains);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatut, setFilterStatut] = useState("all");

    // Modales client
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isClientSuccessModalOpen, setIsClientSuccessModalOpen] =
        useState(false);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

    // Modales terrain
    const [isTerrainModalOpen, setIsTerrainModalOpen] = useState(false);
    const [editingTerrain, setEditingTerrain] = useState<Terrain | null>(null);
    const [terrainToDelete, setTerrainToDelete] = useState<Terrain | null>(
        null
    );
    const [selectedClientId, setSelectedClientId] = useState<number | null>(
        null
    );

    // Filtrage clients
    const filteredClients = clients.filter((c) => {
        const q = searchTerm.trim().toLowerCase();
        const matchesSearch =
            !q ||
            c.nom.toLowerCase().includes(q) ||
            c.prenom.toLowerCase().includes(q) ||
            c.telephone.toLowerCase().includes(q) ||
            c.login.toLowerCase().includes(q);
        const matchesFilter =
            filterStatut === "all" || c.statut === filterStatut;
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

    const handleSaveClient = () => {
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
            setTerrains((prev) =>
                prev.filter((t) => t.id !== terrainToDelete.id)
            );
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
                <Header
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filterStatut={filterStatut}
                    onFilterChange={setFilterStatut}
                    onAddClient={openAddClient}
                />

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <TableHeader />
                            <tbody>
                                {filteredClients.length === 0 && <EmptyState />}
                                {filteredClients.map((c) => {
                                    const clientTerrains = terrains.filter(
                                        (t) => t.clientId === c.id
                                    );
                                    return (
                                        <ClientRow
                                            key={c.id}
                                            client={c}
                                            clientTerrains={clientTerrains}
                                            onViewDetails={(client) =>
                                                alert(
                                                    `Détails de : ${client.prenom} ${client.nom}`
                                                )
                                            }
                                            onEditClient={openEditClient}
                                            onDeleteClient={
                                                openDeleteClientConfirmation
                                            }
                                            onAddTerrain={openAddTerrain}
                                            onEditTerrain={openEditTerrain}
                                            onDeleteTerrain={
                                                openDeleteTerrainConfirmation
                                            }
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modales */}
                <Modal
                    isOpen={isClientModalOpen}
                    onClose={closeClientModal}
                    title={
                        editingClient
                            ? "Modifier le client"
                            : "Ajouter un nouveau client"
                    }>
                    <ClientForm
                        client={editingClient}
                        onSave={handleSaveClient}
                        onCancel={closeClientModal}
                    />
                </Modal>

                <SuccessModal
                    isOpen={isClientSuccessModalOpen}
                    onClose={closeClientSuccessModal}
                />

                <ConfirmationModal
                    isOpen={clientToDelete !== null}
                    onClose={closeDeleteClientModal}
                    onConfirm={confirmDeleteClient}
                    title="Confirmer la suppression ?"
                    message={
                        clientToDelete && (
                            <>
                                Vous allez supprimer{" "}
                                <strong>
                                    {clientToDelete.prenom} {clientToDelete.nom}
                                </strong>{" "}
                                et tous ses terrains.
                            </>
                        )
                    }
                    confirmText="Supprimer"
                />

                {isTerrainModalOpen && selectedClientId !== null && (
                    <Modal
                        isOpen={isTerrainModalOpen}
                        onClose={closeTerrainModal}
                        title={
                            editingTerrain
                                ? "Modifier le terrain"
                                : "Ajouter un terrain"
                        }>
                        <TerrainForm
                            terrain={editingTerrain}
                            clientId={selectedClientId}
                            onSave={handleSaveTerrain}
                            onCancel={closeTerrainModal}
                        />
                    </Modal>
                )}

                <ConfirmationModal
                    isOpen={terrainToDelete !== null}
                    onClose={closeDeleteTerrainModal}
                    onConfirm={confirmDeleteTerrain}
                    title="Supprimer ce terrain ?"
                    message={
                        terrainToDelete && (
                            <>
                                Terrain : {terrainToDelete.longueur}m ×{" "}
                                {terrainToDelete.largeur}m
                            </>
                        )
                    }
                />
            </div>
        </div>
    );
}
