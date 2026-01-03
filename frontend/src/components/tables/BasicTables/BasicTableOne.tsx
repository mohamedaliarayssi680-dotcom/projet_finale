// src/components/tables/BasicTableOne.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Order {
  id: number;
  user: { image: string; name: string; role: string };
  projectName: string;
  team: { images: string[] };
  status: string;
}

export default function BasicTableOne() {
  const [tableData, setTableData] = useState<Order[]>([
    {
      id: 1,
      user: {
        image: "/images/user/user-17.jpg",
        name: "Lindsey Curtis",
        role: "Web Designer",
      },
      projectName: "Agency Website",
      team: {
        images: [
          "/images/user/user-22.jpg",
          "/images/user/user-23.jpg",
          "/images/user/user-24.jpg",
        ],
      },
      status: "Active",
    },
    {
      id: 2,
      user: {
        image: "/images/user/user-18.jpg",
        name: "Kaiya George",
        role: "Project Manager",
      },
      projectName: "Technology",
      team: {
        images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
      },
      status: "Pending",
    },
  ]);

  const [editingUser, setEditingUser] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    projectName: "",
    status: "Active",
  });

  // Cliquer sur modifier
  const handleEdit = (user: Order) => {
    setEditingUser(user);
    setFormData({
      name: user.user.name,
      role: user.user.role,
      image: user.user.image,
      projectName: user.projectName,
      status: user.status,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll vers le formulaire en haut
  };

  // Cliquer sur supprimer
  const handleDelete = (id: number) => {
    if (
      window.confirm(`Voulez-vous vraiment supprimer l'utilisateur ${id} ?`)
    ) {
      setTableData(tableData.filter((u) => u.id !== id));
    }
  };

  // Cliquer sur ajouter
  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      role: "",
      image: "",
      projectName: "",
      status: "Active",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll vers le formulaire en haut
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setTableData(
        tableData.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                user: {
                  image: formData.image,
                  name: formData.name,
                  role: formData.role,
                },
                projectName: formData.projectName,
                status: formData.status,
              }
            : u
        )
      );
    } else {
      const newUser: Order = {
        id: Date.now(),
        user: {
          image: formData.image,
          name: formData.name,
          role: formData.role,
        },
        projectName: formData.projectName,
        team: { images: [] },
        status: formData.status,
      };
      setTableData([...tableData, newUser]);
    }
    setEditingUser(null);
    setFormData({
      name: "",
      role: "",
      image: "",
      projectName: "",
      status: "Active",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Formulaire d'ajout / modification uniquement visible lorsqu'on clique */}
      {showForm && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Rôle"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="URL Image"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Nom du projet"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Cancel">Cancel</option>
            </select>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {editingUser ? "Modifier" : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des utilisateurs */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-white/[0.05]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Liste des utilisateurs
          </h2>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  Project Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  Team
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.05] transition"
                >
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                        <img
                          src={order.user.image}
                          alt={order.user.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {order.user.name}
                        </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                          {order.user.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {order.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {order.team.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-800"
                        >
                          <img
                            src={img}
                            alt={`Team ${idx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 transition"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="flex items-center justify-center w-8 h-8 text-red-600 bg-red-50 rounded hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
