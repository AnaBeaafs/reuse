import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "joao@reuse.app" },
    update: {},
    create: {
      name: "João Verde",
      email: "joao@reuse.app",
      city: "Campinas",
      state: "SP",
      points: 1240,
      level: "Guardião",
    },
  });

  const items = [
    {
      title: "Jaqueta jeans oversized",
      description: "Jaqueta em ótimo estado, tamanho M",
      price: 85,
      category: "Roupas",
      location: "Campinas, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop",
      type: "troca",
      userId: user.id,
    },
    {
      title: "Vestido floral midi",
      description: "Vestido leve e confortável",
      price: 120,
      category: "Roupas",
      location: "Campinas, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop",
      type: "troca",
      userId: user.id,
    },
    {
      title: "Fone de ouvido sem fio",
      description: "Bluetooth com boa bateria",
      price: 149,
      category: "Eletrônicos",
      location: "São Paulo, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      type: "troca",
      userId: user.id,
    },
    {
      title: "Sapiens - Yuval Harari",
      description: "Livro em excelente estado",
      price: 45,
      category: "Livros",
      location: "Campinas, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
      type: "doacao",
      userId: user.id,
    },
    {
      title: "Cadeira ergonômica",
      description: "Ideal para home office",
      price: 220,
      category: "Móveis",
      location: "São Paulo, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1580480055273-228ff5388cf8?w=600&h=400&fit=crop",
      type: "troca",
      userId: user.id,
    },
    {
      title: "Paleta de sombras neutras",
      description: "Quase nova",
      price: 68,
      category: "Beleza",
      location: "Campinas, SP",
      imageUrl:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop",
      type: "troca",
      userId: user.id,
    },
  ];

  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.item.createMany({ data: items });

  console.log(`Seed concluído: 1 usuário e ${items.length} itens.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
