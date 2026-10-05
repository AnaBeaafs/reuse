import Link from "next/link";
import Image from "next/image";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";
import { listItems, CATEGORIES } from "@/lib/items-store";

export default function HomePage() {
  const items = listItems({ sort: "recent" }).slice(0, 8);

  return (
    <div>
      <section className="relative h-[380px] w-full md:h-[420px]">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1400&h=500&fit=crop"
          alt="Banner ReUse"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="max-w-2xl text-3xl font-bold md:text-5xl">
            Troque. Reutilize. Cuide do planeta.
          </h1>
          <p className="mt-4 max-w-xl text-lg">
            Pequenas ações geram grandes mudanças.
          </p>
          <Link
            href="/conscientizacao"
            className="mt-8 rounded-full bg-[#9F7AEA] px-8 py-3 font-semibold hover:bg-[#6B46C1]"
          >
            Saiba mais
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <SearchBar />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
            <Link
              key={cat}
              href={`/itens?categoria=${encodeURIComponent(cat)}`}
              className="whitespace-nowrap rounded-full border border-[#9F7AEA]/30 bg-[#9F7AEA]/10 px-5 py-2.5 text-sm font-medium text-[#6B46C1] hover:bg-[#9F7AEA] hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2D3748]">Itens recentes</h2>
            <p className="mt-1 text-sm text-[#718096]">Disponíveis para troca ou doação</p>
          </div>
          <Link href="/itens" className="text-sm font-semibold text-[#6B46C1] hover:underline">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              location={item.location}
              imageUrl={item.imageUrl}
              category={item.category}
              type={item.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
