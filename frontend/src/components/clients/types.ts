export type Client = {
    id: number;
    nom: string;
    prenom: string;
    login: string;
    telephone: string;
    statut: "payé" | "avance" | "non payé";
    dt: number;
};

export type Terrain = {
    id: number;
    clientId: number;
    longueur: number;
    largeur: number;
    statut: "disponible" | "réservé" | "vendu";
    informe: "Oui" | "Non";
};

// Initial Data
export const initialClients: Client[] = [
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

export const initialTerrains: Terrain[] = [
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
