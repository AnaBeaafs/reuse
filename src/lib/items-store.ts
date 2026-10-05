export type ItemRecord = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  category: string;
  location: string;
  imageUrl: string | null;
  type: string;
  status: string;
  userId: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  city: string | null;
  state: string | null;
  points: number;
  level: string;
};

const now = () => new Date().toISOString();

const mockUsers: UserRecord[] = [
  {
    id: "user-1",
    name: "João Verde",
    email: "joao@reuse.app",
    city: "Campinas",
    state: "SP",
    points: 1240,
    level: "Guardião",
  },
  {
    id: "user-2",
    name: "Maria Silva",
    email: "maria@reuse.app",
    city: "São Paulo",
    state: "SP",
    points: 890,
    level: "Protetor",
  },
  {
    id: "user-3",
    name: "Ana Souza",
    email: "ana@reuse.app",
    city: "Hortolândia",
    state: "SP",
    points: 560,
    level: "Iniciante",
  },
];

let mockItems: ItemRecord[] = [
  {
    id: "item-1",
    title: "Jaqueta jeans oversized",
    description: "Jaqueta em ótimo estado, tamanho M. Perfeita para o inverno.",
    price: 85,
    category: "Roupas",
    location: "Campinas, SP",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-1",
    userName: "João Verde",
    createdAt: "2026-09-20T10:00:00.000Z",
    updatedAt: "2026-09-20T10:00:00.000Z",
  },
  {
    id: "item-2",
    title: "Vestido floral midi",
    description: "Vestido leve e confortável, tamanho G.",
    price: 120,
    category: "Roupas",
    location: "Campinas, SP",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-2",
    userName: "Maria Silva",
    createdAt: "2026-09-22T10:00:00.000Z",
    updatedAt: "2026-09-22T10:00:00.000Z",
  },
  {
    id: "item-3",
    title: "Fone de ouvido sem fio",
    description: "Bluetooth com boa bateria e estojo original.",
    price: 149,
    category: "Eletrônicos",
    location: "São Paulo, SP",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-2",
    userName: "Maria Silva",
    createdAt: "2026-09-25T10:00:00.000Z",
    updatedAt: "2026-09-25T10:00:00.000Z",
  },
  {
    id: "item-4",
    title: "Sapiens - Yuval Harari",
    description: "Livro em excelente estado, poucas marcas de uso.",
    price: 0,
    category: "Livros",
    location: "Campinas, SP",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    type: "doacao",
    status: "disponivel",
    userId: "user-1",
    userName: "João Verde",
    createdAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-09-26T10:00:00.000Z",
  },
  {
    id: "item-5",
    title: "Cadeira ergonômica",
    description: "Ideal para home office, regulagens completas.",
    price: 220,
    category: "Móveis",
    location: "São Paulo, SP",
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388cf8?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-3",
    userName: "Ana Souza",
    createdAt: "2026-09-28T10:00:00.000Z",
    updatedAt: "2026-09-28T10:00:00.000Z",
  },
  {
    id: "item-6",
    title: "Paleta de sombras neutras",
    description: "Quase nova, usada apenas 2 vezes.",
    price: 68,
    category: "Beleza",
    location: "Campinas, SP",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-3",
    userName: "Ana Souza",
    createdAt: "2026-09-30T10:00:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
  },
  {
    id: "item-7",
    title: "Tênis esportivo 40",
    description: "Pouco uso, ideal para caminhadas.",
    price: 0,
    category: "Esportes",
    location: "Valinhos, SP",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    type: "doacao",
    status: "disponivel",
    userId: "user-1",
    userName: "João Verde",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-10-01T10:00:00.000Z",
  },
  {
    id: "item-8",
    title: "Luminária de mesa vintage",
    description: "Base de metal, cúpula em tecido.",
    price: 55,
    category: "Decoração",
    location: "Campinas, SP",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop",
    type: "troca",
    status: "disponivel",
    userId: "user-2",
    userName: "Maria Silva",
    createdAt: "2026-10-02T10:00:00.000Z",
    updatedAt: "2026-10-02T10:00:00.000Z",
  },
];

export type ListParams = {
  q?: string;
  categoria?: string;
  type?: string;
  sort?: string;
  status?: string;
};

export function listItems(params: ListParams = {}): ItemRecord[] {
  const status = params.status || "disponivel";
  let items = mockItems.filter((i) => i.status === status);

  const q = (params.q || "").toLowerCase().trim();
  if (q) {
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.description || "").toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
    );
  }

  if (params.categoria && params.categoria !== "Todos") {
    items = items.filter((i) => i.category === params.categoria);
  }

  if (params.type && params.type !== "Todos") {
    items = items.filter((i) => i.type === params.type);
  }

  const sort = params.sort || "recent";
  if (sort === "price-asc") items = [...items].sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (sort === "price-desc") items = [...items].sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (sort === "title") items = [...items].sort((a, b) => a.title.localeCompare(b.title));
  else items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return items;
}

export function getItemById(id: string): ItemRecord | null {
  return mockItems.find((i) => i.id === id) || null;
}

export function createItem(data: {
  title: string;
  description?: string;
  price?: number | null;
  category: string;
  location: string;
  imageUrl?: string;
  type: string;
  userId?: string;
  userName?: string;
}): ItemRecord {
  const ts = now();
  const item: ItemRecord = {
    id: `item-${Date.now()}`,
    title: data.title,
    description: data.description || null,
    price: data.price ?? null,
    category: data.category,
    location: data.location,
    imageUrl: data.imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
    type: data.type,
    status: "disponivel",
    userId: data.userId || "user-1",
    userName: data.userName || "João Verde",
    createdAt: ts,
    updatedAt: ts,
  };
  mockItems = [item, ...mockItems];
  return item;
}

export function deleteItem(id: string): boolean {
  const before = mockItems.length;
  mockItems = mockItems.filter((i) => i.id !== id);
  return mockItems.length < before;
}

export function listUsers(): UserRecord[] {
  return [...mockUsers].sort((a, b) => b.points - a.points);
}

export function getUserById(id: string): UserRecord | null {
  return mockUsers.find((u) => u.id === id) || null;
}

export const CATEGORIES = [
  "Todos",
  "Roupas",
  "Beleza",
  "Eletrônicos",
  "Livros",
  "Móveis",
  "Decoração",
  "Esportes",
];
