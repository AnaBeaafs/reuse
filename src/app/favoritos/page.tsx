"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import type { ItemRecord } from "@/lib/items-store";

export default function FavoritosPage() {
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const favIds: string[] = JSON.parse(localStorage.getItem("@ReUse:favorites") || "[]");
        if (!favIds.length) {
          setItems([]);
          setLoading(false);
          return;
        }
        const res = await fetch("/api/itens");
        const json = await res.json();
        if (json.success) {
          setItems(json.data.filter((i: ItemRecord) => favIds.includes(i.id)));
        }
      } catch {
        setItems([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2D3748]">Favoritos</h1>
      <p className="mt-2 text-[#718096]">Itens que você salvou para reutilizar depois.</p>

      {loading ? (
        <p className="mt-10 text-center text-[#718096]">Carregando...</p>
      ) : items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-[#718096]">Nenhum favorito ainda.</p>
          <Link href="/itens" className="mt-4 inline-block font-semibold text-[#6B46C1] hover:underline">
            Explorar itens
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      )}
    </div>
  );
}
