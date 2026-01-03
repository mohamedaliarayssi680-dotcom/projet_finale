import { useState } from "react";
import { Modal } from "./Modal"; // ton modal existant
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Client {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
  statut: string;
}

export default function ClientsFormModal({
  isOpen,
  onClose,
  onSubmit,
  clientData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Client) => void;
  clientData?: Client;
}) {
  const [formData, setFormData] = useState<Client>(
    clientData || { nom: "", email: "", telephone: "", statut: "Non payé" }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {clientData ? "Modifier Client" : "Ajouter Client"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Nom</label>
          <Input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du client"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Téléphone
          </label>
          <Input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="+216 99 999 999"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Statut
          </label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white p-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="Payé">Payé</option>
            <option value="Non payé">Non payé</option>
            <option value="Avance">Avance</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">{clientData ? "Modifier" : "Ajouter"}</Button>
        </div>
      </form>
    </Modal>
  );
}
