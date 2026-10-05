"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { listItems } from "@/lib/items-store";
import ItemCard from "@/components/ItemCard";
import type { ItemRecord } from "@/lib/items-store";

export default function PerfilPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [myItems, setMyItems] = useState<ItemRecord[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }
    if (user) {
      setMyItems(listItems({ status: "disponivel" }).filter((i) => i.userId === user.id));
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="py-20 text-center text-[#718096]">Carregando perfil...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl bg-gradient-to-br from-[#9F7AEA] to-[#6B46C1] p-8 text-white">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="mt-1 opacity-90">{user.email}</p>
        <div className="mt-6 flex flex-wrap gap-8">
          <div>
            <p className="text-2xl font-bold">{user.points}</p>
            <p className="text-sm opacity-90">Pontos</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.level}</p>
            <p className="text-sm opacity-90">Nível</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {user.city}/{user.state}
            </p>
            <p className="text-sm opacity-90">Local</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="mt-6 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold hover:bg-white/10"
        >
          Sair da conta
        </button>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#2D3748]">Meus itens</h2>
        <Link href="/itens/novo" className="text-sm font-semibold text-[#6B46C1] hover:underline">
          + Publicar
        </Link>
      </div>

      {myItems.length === 0 ? (
        <p className="mt-6 text-[#718096]">Você ainda não publicou itens nesta sessão.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {myItems.map((item) => (
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
