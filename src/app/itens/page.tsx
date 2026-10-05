"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import { CATEGORIES } from "@/lib/items-store";
import type { ItemRecord } from "@/lib/items-store";

export default function ItensPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCat = searchParams.get("categoria") || "Todos";

  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(initialQ);
  const [categoria, setCategoria] = useState(initialCat);
  const [type, setType] = useState("Todos");
  const [sort, setSort] = useState("recent");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categoria && categoria !== "Todos") params.set("categoria", categoria);
    if (type && type !== "Todos") params.set("type", type);
    if (sort) params.set("sort", sort);

    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/itens?${params.toString()}`);
        const json = await res.json();
        if (json.success) {
          setItems(json.data);
          setCount(json.count);
        }
      } catch {
        setItems([]);
        setCount(0);
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [q, categoria, type, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2D3748]">
        {categoria !== "Todos" ? `Categoria: ${categoria}` : "Todos os itens"}
      </h1>
      <p className="mt-2 text-[#718096]">
        {loading ? "Carregando..." : `${count} item(ns) encontrado(s)`}
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold text-[#718096]">Busca</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Título, descrição, cidade..."
            className="w-full rounded-xl border px-4 py-2.5 outline-none focus:border-[#9F7AEA]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#718096]">Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 md:w-44"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#718096]">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 md:w-36"
          >
            <option value="Todos">Todos</option>
            <option value="troca">Troca</option>
            <option value="doacao">Doação</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#718096]">Ordenar</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border px-4 py-2.5 md:w-40"
          >
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="title">Nome A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategoria(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              categoria === c
                ? "bg-[#9F7AEA] text-white"
                : "border border-[#9F7AEA]/30 bg-[#9F7AEA]/10 text-[#6B46C1]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-10 text-center text-[#718096]">Carregando itens da API...</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-center text-[#718096]">Nenhum item encontrado.</p>
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
